import { useEffect, useRef, useState } from 'react';

let pdfjsPromise = null;

const loadPdfJs = () => {
    if (!pdfjsPromise) {
        pdfjsPromise = Promise.all([
            import('pdfjs-dist'),
            import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ]).then(([pdfjs, worker]) => {
            pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
            return pdfjs;
        });
    }

    return pdfjsPromise;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function PdfViewer({ url, title }) {
    const [doc, setDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [fitWidth, setFitWidth] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const canvasRef = useRef(null);
    const scrollRef = useRef(null);
    const renderTaskRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        let loadedDoc = null;

        setLoading(true);
        setError('');
        setDoc(null);
        setPageNum(1);
        setZoom(1);

        loadPdfJs()
            .then((pdfjs) => pdfjs.getDocument({ url, withCredentials: true }).promise)
            .then((loaded) => {
                loadedDoc = loaded;

                if (cancelled) {
                    loaded.destroy();
                    return;
                }

                setDoc(loaded);
            })
            .catch(() => {
                if (!cancelled) setError('Dokumen tidak bisa dimuat.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
            loadedDoc?.destroy();
        };
    }, [url]);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return undefined;

        const measure = () => setFitWidth(el.clientWidth);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!doc || !fitWidth) return undefined;

        let cancelled = false;

        doc.getPage(pageNum).then((page) => {
            if (cancelled) return;

            const canvas = canvasRef.current;
            if (!canvas) return;

            const base = page.getViewport({ scale: 1 });
            const available = Math.max(220, fitWidth - 40);
            const fit = Math.min(1.4, available / base.width);
            const scale = fit * zoom;
            // Saat diperbesar, cukup 1x agar kanvas tidak memakan memori berlebih.
            const dpr = scale > 1.5 ? 1 : Math.min(2, window.devicePixelRatio || 1);
            const viewport = page.getViewport({ scale: scale * dpr });

            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            canvas.style.width = `${Math.floor(viewport.width / dpr)}px`;
            canvas.style.height = `${Math.floor(viewport.height / dpr)}px`;

            const context = canvas.getContext('2d', { alpha: false });

            renderTaskRef.current?.cancel();

            const task = page.render({ canvas, canvasContext: context, viewport });
            renderTaskRef.current = task;

            task.promise.catch((reason) => {
                if (cancelled || reason?.name === 'RenderingCancelledException') return;
                setError('Halaman gagal ditampilkan.');
            });
        });

        return () => {
            cancelled = true;
        };
    }, [doc, pageNum, zoom, fitWidth]);

    const zoomOut = () => setZoom((value) => clamp(Number((value - 0.2).toFixed(2)), 0.4, 3));
    const zoomIn = () => setZoom((value) => clamp(Number((value + 0.2).toFixed(2)), 0.4, 3));

    return (
        <div className="pf-doc-viewer">
            <div className="pf-doc-toolbar">
                <div className="pf-doc-zoom">
                    <button
                        type="button"
                        className="pf-doc-btn"
                        onClick={zoomOut}
                        disabled={zoom <= 0.4}
                        aria-label="Perkecil"
                    >
                        −
                    </button>
                    <span>{Math.round(zoom * 100)}%</span>
                    <button
                        type="button"
                        className="pf-doc-btn"
                        onClick={zoomIn}
                        disabled={zoom >= 3}
                        aria-label="Perbesar"
                    >
                        +
                    </button>
                    <button
                        type="button"
                        className="pf-doc-btn pf-doc-reset"
                        onClick={() => setZoom(1)}
                    >
                        Sesuaikan
                    </button>
                </div>

                {doc && doc.numPages > 1 && (
                    <div className="pf-doc-pages">
                        <button
                            type="button"
                            className="pf-doc-btn"
                            onClick={() => setPageNum((value) => Math.max(1, value - 1))}
                            disabled={pageNum <= 1}
                            aria-label="Halaman sebelumnya"
                        >
                            ‹
                        </button>
                        <span>
                            {pageNum} / {doc.numPages}
                        </span>
                        <button
                            type="button"
                            className="pf-doc-btn"
                            onClick={() => setPageNum((value) => Math.min(doc.numPages, value + 1))}
                            disabled={pageNum >= doc.numPages}
                            aria-label="Halaman berikutnya"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            <div className="pf-doc-scroll" ref={scrollRef}>
                {loading && <p className="pf-doc-state">Memuat dokumen…</p>}
                {!loading && error && <p className="pf-doc-state">{error}</p>}
                <canvas
                    ref={canvasRef}
                    aria-label={title}
                    onContextMenu={(event) => event.preventDefault()}
                    style={{ display: loading || error ? 'none' : 'block' }}
                />
            </div>
        </div>
    );
}
