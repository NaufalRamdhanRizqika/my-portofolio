import { useEffect } from 'react';
import { cv } from '../data/cv';
import { skillGroups } from '../data/skills';

export default function Cv() {
    useEffect(() => {
        const prev = document.title;
        document.title = `${cv.name} — CV`;
        return () => {
            document.title = prev;
        };
    }, []);

    return (
        <div className="pf-cv-page">
            <div className="pf-cv-bar no-print">
                <a className="pf-btn pf-btn-ghost" href="#top">← Kembali</a>
                <button className="pf-btn" type="button" onClick={() => window.print()}>
                    Download PDF
                </button>
            </div>

            <p className="pf-cv-hint no-print">
                Klik <strong>Download PDF</strong>, lalu pilih{' '}
                <strong>Save as PDF</strong> pada dialog cetak.
            </p>

            <article className="pf-cv">
                <header className="pf-cv-head">
                    <h1>{cv.name}</h1>
                    <p className="pf-cv-role">{cv.title}</p>
                    <p className="pf-cv-contact">
                        {cv.contacts.map((c, i) => (
                            <span key={c.label}>
                                {i > 0 && <span aria-hidden="true"> | </span>}
                                <a href={c.href}>{c.label}</a>
                            </span>
                        ))}
                    </p>
                </header>

                <section>
                    <h2>Ringkasan</h2>
                    <p>{cv.summary}</p>
                </section>

                <section>
                    <h2>Pendidikan</h2>
                    {cv.education.map((e) => (
                        <div className="pf-cv-item" key={e.degree}>
                            <div className="pf-cv-item-head">
                                <h3>{e.degree}</h3>
                                {e.period && <span className="pf-cv-period">{e.period}</span>}
                            </div>
                            {e.school && <p className="pf-cv-org">{e.school}</p>}
                            {e.detail && <p>{e.detail}</p>}
                        </div>
                    ))}
                </section>

                <section>
                    <h2>Keahlian</h2>
                    <div className="pf-cv-skillcols">
                        <div>
                            {skillGroups.map((g) => (
                                <p key={g.title} className="pf-cv-line">
                                    <strong>{g.title}:</strong> {g.skills.join(', ')}
                                </p>
                            ))}
                        </div>
                        <div>
                            <p className="pf-cv-line">
                                <strong>Softskill:</strong> {cv.softSkills.join(', ')}
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Pengalaman</h2>
                    {cv.experience.map((e) => (
                        <div className="pf-cv-item" key={e.role}>
                            <div className="pf-cv-item-head">
                                <h3>{e.role}</h3>
                                <span className="pf-cv-period">{e.period}</span>
                            </div>
                            <p className="pf-cv-org">{e.org}</p>
                            <ul>
                                {e.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h2>Pengalaman Organisasi</h2>
                    {cv.organizations.map((e) => (
                        <div className="pf-cv-item" key={e.role}>
                            <div className="pf-cv-item-head">
                                <h3>{e.role}</h3>
                                <span className="pf-cv-period">{e.period}</span>
                            </div>
                            <p className="pf-cv-org">{e.org}</p>
                            <ul>
                                {e.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h2>Proyek</h2>
                    {cv.projects.map((p) => (
                        <div className="pf-cv-item" key={p.name}>
                            <div className="pf-cv-item-head">
                                <h3>{p.name}</h3>
                            </div>
                            <p>{p.body}</p>
                            <p className="pf-cv-tools">
                                <strong>Teknologi:</strong> {p.tools}
                            </p>
                        </div>
                    ))}
                </section>

            </article>
        </div>
    );
}
