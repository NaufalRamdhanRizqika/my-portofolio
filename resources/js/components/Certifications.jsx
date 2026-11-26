import Reveal from './ui/Reveal';

const CERTIFICATIONS = [
    {
        role: 'Certified Web Developer (CWDev), Pengembang Web',
        org: 'LSP Informatika (BNSP)',
        period: '17 Maret 2026, berlaku 3 tahun',
        body: 'Sertifikasi kompetensi di bidang Pengembangan Perangkat Lunak dan Pemrograman, mencakup 17 unit kompetensi (pemrograman terstruktur dan berorientasi objek, SQL dan akses basis data, algoritma, perancangan user experience, debugging, code review, dan pengujian kode).',
        tools: ['BNSP', 'Web Development'],
    },
    {
        role: 'English Proficiency Test (TOEFL), skor 403',
        org: 'UNIKOM Language Center',
        period: '13 Desember 2025, berlaku sampai 13 Desember 2027',
        body: 'Listening 38, Structure and Written Expression 41, Reading Comprehension 42.',
        tools: ['TOEFL', 'English'],
    },
    {
        role: 'CCNAv7: Introduction to Networks',
        org: 'Cisco Networking Academy',
        period: '17 Februari 2024',
        body: 'Kursus dasar jaringan komputer melalui program Cisco Networking Academy.',
        tools: ['Cisco', 'Networking'],
    },
    {
        role: 'Gemini Certified Student - University',
        org: 'Google for Education',
        period: '27 Agustus 2026, berlaku sampai 27 Agustus 2029',
        body: 'Kemampuan dasar menggunakan Google AI (Gemini) sebagai mahasiswa.',
        tools: ['Google', 'AI'],
    },
];

export default function Certifications() {
    return (
        <Reveal as="section" id="certifications" className="pf-section">
            <h2 className="pf-h-ripple font-display">
                Sertifikasi
                <span className="pf-ripple" aria-hidden="true" />
            </h2>

            <div className="mt-6 space-y-6">
                {CERTIFICATIONS.map((e) => (
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
