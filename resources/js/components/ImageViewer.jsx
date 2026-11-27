import { useState } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function ImageViewer({ url, title }) {
    const [zoom, setZoom] = useState(1);

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
            </div>

            <div className="pf-doc-scroll">
                <img
                    src={url}
                    alt={title}
                    onContextMenu={(event) => event.preventDefault()}
                    style={{ width: `${Math.round(zoom * 100)}%`, maxWidth: 'none' }}
                />
            </div>
        </div>
    );
}
