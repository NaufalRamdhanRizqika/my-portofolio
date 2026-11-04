import Reveal from './ui/Reveal';

const ORGANIZATIONS = [
    {
        role: 'Pengurus Divisi Kesenian & Olahraga (Kesra)',
        org: 'Himpunan Mahasiswa Teknik Informatika (HMIF) — UNIKOM',
        period: '2024 – 2025',
        body: 'Mengelola kegiatan kesenian dan olahraga di tingkat himpunan mahasiswa Teknik Informatika UNIKOM.',
        tools: ['Organisasi', 'Event', 'Kepanitiaan'],
    },
];

export default function Organization() {
    return (
        <Reveal as="section" id="organization" className="pf-section">
            <h2 className="pf-h-ripple font-display">
                Organisasi
                <span className="pf-ripple" aria-hidden="true" />
            </h2>

            <div className="mt-6 space-y-6">
                {ORGANIZATIONS.map((e) => (
                    <article key={e.role} className="pf-work">
                        <p className="pf-work-period">{e.period}</p>
                        <h3 className="font-display">
                            {e.role}{' '}
                            <span className="text-koi text-[0.78rem] font-normal">
                                {e.org}
                            </span>
                        </h3>
                        <p className="pf-work-body">{e.body}</p>
                        <div className="pf-work-tools">
                            {e.tools.map((t) => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </Reveal>
    );
}