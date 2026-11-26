import { useEffect, useRef, useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';

const getXsrfToken = () => {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

const postJson = (url, body) =>
    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify(body ?? {}),
    });

export default function Sertifikasi() {
    // null = sedang memeriksa, false = belum login, true = sudah login
    const [auth, setAuth] = useState(null);
    const [active, setActive] = useState(null);
    const [pending, setPending] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const passwordRef = useRef(null);

    useEffect(() => {
        const prev = document.title;
        document.title = 'Sertifikasi — Naufal Ramdhan Rizqika';
        return () => {
            document.title = prev;
        };
    }, []);

    useEffect(() => {
        let alive = true;

        fetch('/sertifikat/status', {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        })
            .then((res) => (res.ok ? res.json() : { authenticated: false }))
            .then((data) => {
                if (alive) setAuth(Boolean(data.authenticated));
            })
            .catch(() => {
                if (alive) setAuth(false);
            });

        return () => {
            alive = false;
        };
    }, []);

    useEffect(() => {
        if (!active && !pending) return;

        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            if (pending) setPending(null);
            else setActive(null);
        };

        const prevOverflow = document.body.style.overflow;

        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [active, pending]);

    useEffect(() => {
        if (pending) passwordRef.current?.focus();
    }, [pending]);

    const openCertificate = (cert) => {
        if (auth) {
            setActive(cert);
            return;
        }

        setPending(cert);
        setPassword('');
        setError('');
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!password.trim() || busy) return;

        setBusy(true);
        setError('');

        try {
            const res = await postJson('/sertifikat/login', { password });
            const data = await res.json().catch(() => ({}));

            if (res.ok && data.authenticated) {
                const target = pending;
                setAuth(true);
                setPending(null);
                setPassword('');
                setActive(target);
                return;
            }

            setError(
                res.status === 419
                    ? 'Sesi kedaluwarsa. Muat ulang halaman lalu coba lagi.'
                    : data.message || 'Kata sandi salah.',
            );
        } catch {
            setError('Tidak bisa menghubungi server. Coba lagi.');
        } finally {
            setBusy(false);
        }
    };

    const handleLogout = async () => {
        setBusy(true);

        try {
            await postJson('/sertifikat/logout');
        } catch {
            /* diamkan saja, tetap tutup akses di sisi klien */
        } finally {
            setBusy(false);
            setAuth(false);
            setActive(null);
            setPending(null);
        }
    };

    const docUrl = (cert) => `/sertifikat/${cert.file}`;

    return (
        <div className="pf-cert-page">
            <div className="pf-cert-bar">
                <a className="pf-btn pf-btn-ghost" href="#/">
                    ← Kembali
                </a>
                <div className="pf-cert-actions">
                    {auth && <span className="pf-cert-badge">Akses pemilik</span>}
                    <a className="pf-btn pf-btn-ghost" href="#/cv">
                        Lihat CV
                    </a>
                    {auth && (
                        <button
                            type="button"
                            className="pf-btn pf-btn-ghost"
                            onClick={handleLogout}
                            disabled={busy}
                        >
                            Keluar
                        </button>
                    )}
                </div>
            </div>

            <header className="pf-cert-head">
                <h1 className="font-display">Sertifikasi</h1>
                <p>
                    {auth === null && 'Memeriksa akses dokumen…'}
                    {auth === false &&
                        'Dokumen sertifikat dilindungi. Klik salah satu untuk memasukkan kata sandi.'}
                    {auth === true &&
                        'Klik salah satu sertifikat untuk melihat dokumen aslinya.'}
                </p>
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
                            onClick={() => openCertificate(c)}
                        >
                            {auth ? 'Lihat sertifikat' : 'Buka dengan kata sandi'}
                        </button>
                    </article>
                ))}
            </div>

            {pending && (
                <div
                    className="pf-cert-modal pf-login-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Masukkan kata sandi"
                    onClick={() => setPending(null)}
                >
                    <div className="pf-login-box" onClick={(e) => e.stopPropagation()}>
                        <h2 className="font-display">Dokumen dilindungi</h2>
                        <p>
                            Masukkan kata sandi untuk membuka{' '}
                            <strong>{pending.role}</strong>.
                        </p>

                        <form className="pf-login-form" onSubmit={handleLogin}>
                            <label htmlFor="pf-cert-password">Kata sandi</label>
                            <input
                                id="pf-cert-password"
                                ref={passwordRef}
                                className="pf-login-input"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={busy}
                            />
                            {error && <p className="pf-login-error">{error}</p>}
                            <div className="pf-login-actions">
                                <button
                                    type="button"
                                    className="pf-btn pf-btn-ghost"
                                    onClick={() => setPending(null)}
                                    disabled={busy}
                                >
                                    Batal
                                </button>
                                <button type="submit" className="pf-btn" disabled={busy}>
                                    {busy ? 'Memeriksa…' : 'Masuk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {active && (
                <div
                    className="pf-cert-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={active.role}
                    onClick={() => setActive(null)}
                >
                    <div className="pf-cert-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="pf-cert-modal-head">
                            <p>{active.role}</p>
                            <div className="pf-cert-modal-actions">
                                <a
                                    className="pf-btn pf-btn-ghost"
                                    href={docUrl(active)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Tab baru
                                </a>
                                <a
                                    className="pf-btn pf-btn-ghost"
                                    href={`${docUrl(active)}/unduh`}
                                >
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
                                <img src={docUrl(active)} alt={active.role} />
                            ) : (
                                <iframe src={docUrl(active)} title={active.role} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
