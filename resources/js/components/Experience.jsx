import Reveal from './ui/Reveal';

const EXPERIENCE = [
    {
        role: 'Magang — Modul Arsip Surat & Manajemen Startup',
        org: 'Bandung Techno Park (MyBTP) · Laravel + React',
        period: 'Juli – September 2025',
        body: 'CRUD surat masuk/keluar dengan pencarian, penanda surat penting, validasi lampiran PDF, dan notifikasi status simpan/edit/hapus; katalog startup binaan (filter kategori, pagination); profil startup dengan audit trail; data member berforeign key; serta user management. Menyusun antarmuka modul dengan React dan Tailwind CSS, termasuk komponen reusable agar konsisten antar-modul.',
        tools: ['Laravel', 'React', 'Tailwind CSS', 'PostgreSQL'],
    },
    {
        role: 'Web Developer Intern (PKL) — LMS & Website Reservasi',
        org: 'PT Inovindo · PHP, MySQL',
        period: 'April – September 2021',
        body: 'Mengembangkan dashboard admin dan menghubungkan formulir ke database MySQL pada website reservasi undangan, termasuk hapus data massal dan perbaikan bug status. Merancang UML, ERD, database, dan mockup LMS Inovindo Academy, lalu mengimplementasikan fitur sisi siswa (registrasi, profil, pengumpulan tugas). Membangun manajemen tugas admin, memperbaiki absensi, sertifikat, dan halaman ujian, serta menyusun laporan dan presentasi akhir.',
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