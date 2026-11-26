import { useEffect, useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';

export default function Sertifikasi() {
    const [active, setActive] = useState(null);

    useEffect(() => {
        const prev = document.title;
        document.title = 'Sertifikasi — Naufal Ramdhan Rizqika';
        return () => {
            document.title = prev;
        };
    }, []);

    useEffect(() => {
        if (!active) return;

        const onKey = (e) => e.key === 'Escape' && setActive(null);
        const prevOverflow = document.body.style.overflow;

        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [active]);

    return (
        <div className="pf-cert-page">
            <div className="pf-cert-bar">
                <a className="pf-btn pf-btn-ghost" href="#/">← Kembali</a>
                <a className="pf-btn pf-btn-ghost" href="#/cv">Lihat CV</a>
            </div>

            <header className="pf-cert-head">
                <h1 className="font-display">Sertifikasi</h1>
                <p>Klik salah satu sertifikat untuk melihat dokumen aslinya.</p>
            </header>

            <div className="pf-cert-grid">
                {CERTIFICATIONS.map((c) => (
                    <article key={c.role} className="pf-cert-card">
                        <p className="pf-work-period">{c.period}</p>
                        <h2 className="font-display">{c.role}</h2>
                        <p className="pf-cert-org">{c.org}</p>
                        <p className="pf-cert-body">{c.body}</p>
                        <div className="pf-work-tools">
                            {c.tools.map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="pf-btn pf-cert-open"
                            onClick={() => setActive(c)}
                        >
                            Lihat sertifikat
                        </button>
                    </article>
                ))}
            </div>

            {active && (
                <div
                    className="pf-cert-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.role}
                    onClick={() => setActive(null)}
                >
                    <div
                        className="pf-cert-modal-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="pf-cert-modal-head">
                            <p>{active.role}</p>
                            <div className="pf-cert-modal-actions">
                                <a
                                    className="pf-btn pf-btn-ghost"
                                    href={active.file}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Tab baru
                                </a>
                                <a className="pf-btn pf-btn-ghost" href={active.file} download>
                                    Unduh
                                </a>
                                <button
                                    type="button"
                                    className="pf-btn"
                                    onClick={() => setActive(null)}
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                        <div className="pf-cert-modal-body">
                            {active.kind === 'image' ? (
                                <img src={active.file} alt={active.role} />
                            ) : (
                                <iframe src={active.file} title={active.role} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
