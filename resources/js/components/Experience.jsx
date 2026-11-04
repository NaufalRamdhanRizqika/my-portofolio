import Reveal from './ui/Reveal';

const EXPERIENCE = [
    {
        role: 'Magang — Modul Arsip & Manajemen Startup',
        org: 'MyBTP · Laravel + React',
        period: 'Juli – September 2025',
        body: 'CRUD surat masuk/keluar dengan pencarian dan penanda surat penting, katalog startup binaan (filter, pagination), profil startup dengan audit trail, data member berforeign key, serta user management.',
        tools: ['Laravel', 'React', 'Tailwind CSS', 'PostgreSQL'],
    },
    {
        role: 'Magang SMK — LMS & Website Reservasi',
        org: 'PT Inovindo (PKL) · PHP, MySQL',
        period: '2021',
        body: 'Membangun LMS e-learning (registrasi, pengumpulan tugas, manajemen tugas admin, absensi, ujian) dan website reservasi undangan (dashboard admin, formulir ke database, riwayat, hapus massal) selama PKL di SMK.',
        tools: ['PHP', 'MySQL', 'Bootstrap', 'AdminLTE'],
    },
];

export default function Experience() {
    return (
        <Reveal as="section" id="experience" className="pf-section">
            <h2 className="pf-h-ripple font-display">
                Experience
                <span className="pf-ripple" aria-hidden="true" />
            </h2>

            <div className="mt-6 space-y-6">
                {EXPERIENCE.map((e) => (
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