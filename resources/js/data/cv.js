export const cv = {
    name: 'Naufal Ramdhan Rizqika',
    title: 'Lulusan Teknik Informatika | Web Developer | IoT',
    contacts: [
        { label: 'Bandung, Indonesia', href: 'https://www.google.com/maps/search/Bandung,+Indonesia' },
        { label: 'naufalrizqika@gmail.com', href: 'mailto:naufalrizqika@gmail.com' },
        { label: '0851-5968-2991', href: 'tel:085159682991' },
        { label: 'github.com/NaufalRamdhanRizqika', href: 'https://github.com/NaufalRamdhanRizqika' },
        { label: 'linkedin.com/in/naufal-ramdhan-rizqika-04b3712b5', href: 'https://www.linkedin.com/in/naufal-ramdhan-rizqika-04b3712b5' },
        { label: 'my-portofolio.ethiodeploy.app', href: 'https://my-portofolio.ethiodeploy.app/' },
    ],
    summary:
        'Lulusan S1 Teknik Informatika UNIKOM (IPK 3,18/4,00) yang membangun aplikasi web dengan React, Laravel, dan Tailwind CSS serta sistem monitoring IoT berbasis ESP32. Berpengalaman magang di Bandung Techno Park dan PKL di PT Inovindo. Bersertifikat Certified Web Developer (CWDev) dari BNSP. Tertarik pada pengembangan web, IoT, dan software engineering.',

    softSkills: [
        'Komunikasi',
        'Kerja Tim & Kolaborasi',
        'Problem Solving',
        'Manajemen Waktu',
        'Adaptabilitas & Cepat Belajar',
    ],
    experience: [
        {
            role: 'Magang — MyBTP: Modul Arsip Surat & Manajemen Startup',
            period: 'Juli – September 2025',
            bullets: [
                'CRUD surat masuk/keluar (nomor, tanggal, perihal, pengirim, penerima, lampiran) dengan tabel arsip, pencarian, flag surat penting, validasi lampiran PDF, dan notifikasi status simpan/edit/hapus.',
                'Katalog startup binaan (kartu, pencarian, filter kategori, pagination) dan profil startup (identitas, kontak, website, logo) dengan form edit tervalidasi email/URL serta audit trail timestamp.',
                'Data member startup (nama, posisi, keahlian, status, dokumen CV) dengan relasi foreign key ke tabel startup, serta halaman user management.',
                'Menyusun antarmuka modul super-app Layanan Publik dengan React dan Tailwind CSS, termasuk komponen reusable untuk menjaga konsistensi antar-modul.',
            ],
        },
        {
            role: 'PT Inovindo — Web Developer Intern (PKL) · PHP, MySQL, Bootstrap, AdminLTE',
            period: 'April – September 2021',
            bullets: [
                'Mengembangkan dashboard dan halaman admin serta menghubungkan formulir ke database MySQL pada website reservasi undangan motivator bisnis (PHP, MySQL, AdminLTE), termasuk fitur hapus data massal dan perbaikan bug status.',
                'Merancang UML, ERD, database, dan mockup LMS E-learning Inovindo Academy, lalu mengimplementasikan fitur sisi siswa (registrasi, profil, pengumpulan tugas).',
                'Membangun tabel manajemen tugas admin dengan pencarian dan tabel revisi tugas, memperbaiki fitur absensi, sertifikat, dan halaman ujian, serta menyusun laporan dan presentasi akhir.',
            ],
        },
    ],
    organizations: [
        {
            role: 'Ketua Pelaksana',
            org: 'Informatics Sports Championship (ISC)',
            period: '2024/2025',
            bullets: [],
        },
        {
            role: 'Pengurus Divisi Kesenian & Olahraga (Kesra)',
            period: '2024 – 2025',
            bullets: [
                'Mengelola kegiatan kesenian dan olahraga di Himpunan Mahasiswa Teknik Informatika (HMIF) UNIKOM.',
            ],
        },
    ],
    projects: [
        {
            name: 'Smart Aquaculture — Penelitian Skripsi',
            body: 'Sistem monitoring kolam koi ESP32 + Firebase: sensor suhu, pH, dan amonia; kontrol pemanas, kipas, serta pakan otomatis via relay/servo; notifikasi Telegram. Evaluasi performa budidaya dengan indikator SGR, SR, dan FCR.',
            tools: 'ESP32, Firebase, DS18B20, ADS1115, Telegram API',
        },
        {
            name: 'Geo AR — Augmented Reality Berbasis Lokasi',
            body: 'AR yang memosisikan objek 3D berdasarkan koordinat dunia nyata dan menampilkannya lewat kamera perangkat.',
            tools: 'Three.js, JavaScript, Geolocation, Magnetometer',
        },
    ],
    education: [
        {
            degree: 'Sarjana Teknik Informatika (S1)',
            school: 'Universitas Komputer Indonesia (UNIKOM)',
            period: 'Lulus 2026',
            detail: 'Prodi Teknik Informatika. Skripsi: "Implementasi Smart Aquaculture Berbasis IoT untuk Optimalisasi Pertumbuhan Ikan Koi".',
        },
        {
            degree: 'Rekayasa Perangkat Lunak (RPL)',
            school: 'SMK Negeri 4 Bandung',
            period: 'Lulus 2022',
            detail: '',
        },
    ],
};
