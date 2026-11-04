export const projects = [
    {
        id: 'mybtp',
        title: 'MyBTP',
        category: 'SUPERAPPS / WEB DEVELOPMENT',
        summary:
            'Super-app layanan publik yang memadukan berbagai fitur administrasi dalam satu platform terpadu.',
        body:
            'Berperan dalam pengembangan antarmuka berbagai modul layanan. Berfokus pada konsistensi antar-modul, kecepatan render halaman, dan pengalaman pengguna yang menyatu di dalam satu ekosistem aplikasi.',
        highlights: [
            'Membangun antarmuka modul-modul layanan dengan React + Tailwind CSS',
            'Mengelola state antar-halaman agar navigasi modul terasa menyatu',
            'Menyusun komponen reusable agar skala fitur tetap rapi dan cepat',
        ],
        tools: ['React', 'Laravel', 'PostgreSQL', 'Tailwind CSS'],
        gradient: 'from-emerald-900 to-teal-900',
    },
    {
        id: 'mybtp-arsip-startup',
        title: 'Arsip & Startup Module',
        category: 'FULL-STACK / WEB DEVELOPMENT',
        summary:
            'Modul CRUD arsip surat masuk-keluar dan manajemen data startup binaan di dalam super-app MyBTP.',
        body:
            'Sisi administrasi super-app layanan publik: arsip surat masuk dan keluar dikelola lewat CRUD lengkap — nomor surat, tanggal, perihal, pengirim, penerima, dan lampiran — ditampilkan pada tabel dengan pencarian serta penanda surat penting. Modul startup menyediakan daftar startup binaan dalam bentuk kartu dengan pencarian, filter kategori, pagination, dan halaman profil yang menampilkan identitas, kontak, website, deskripsi, logo, beserta daftar anggotanya.',
        highlights: [
            'CRUD surat masuk & keluar dengan pencarian, flag surat penting, dan notifikasi status simpan/edit/hapus',
            'Validasi unggahan lampiran (PDF) pada form surat',
            'Katalog startup: kartu, filter kategori, pagination, dan tombol Details ke profil startup',
            'Edit profil startup tervalidasi (format email & URL) dengan audit trail timestamp perubahan',
            'Data member ber-relasi foreign key ke startup sehingga otomatis tampil di profil, plus halaman user management',
        ],
        tools: ['Laravel', 'React', 'PostgreSQL', 'Tailwind CSS'],
        gradient: 'from-sky-900 to-indigo-900',
    },
    {
        id: 'smart-aquaculture',
        title: 'Smart Aquaculture',
        category: 'IOT / RESEARCH',
        summary:
            'Sistem monitoring kolam koi berbasis IoT — ESP32, sensor, dan Firebase untuk akuakultur otomatis.',
        body:
            'Penelitian skripsi: kolam dipantau otomatis dengan ESP32 dan Firebase. Suhu, pH, dan amonia dibaca berkala; pemanas serta kipas dikendalikan lewat relay; pakan dijadwalkan lewat servo. Kejadian penting masuk ke notifikasi Telegram.',
        highlights: [
            'Logging alasan restart (brownout, panic, watchdog) untuk melacak masalah daya',
            'Timeout I2C/ADS1115/HTTP serta uji-mandiri WiFi demi stabilitas',
            'Performa budidaya dievaluasi lewat SGR, SR, dan FCR',
        ],
        tools: ['ESP32', 'Firebase', 'DS18B20', 'ADS1115', 'Telegram API'],
        gradient: 'from-teal-900 to-cyan-900',
    },
    {
        id: 'geo-ar',
        title: 'Geo AR',
        category: 'THREE.JS / AR',
        summary:
            'Augmented reality berbasis lokasi menggunakan Three.js untuk visualisasi objek digital di dunia nyata.',
        body:
            'Eksperimen AR yang menggabungkan data geolokasi dengan rendering 3D real-time. Objek virtual diposisikan berdasarkan koordinat dunia nyata dan ditampilkan melalui pandangan kamera.',
        highlights: [
            'Rendering objek 3D real-time dengan Three.js',
            'Posisi objek diselaraskan lewat magnetometer, GPS, dan orientasi perangkat',
            'Optimasi performa rendering untuk perangkat mobile',
        ],
        tools: ['Three.js', 'JavaScript', 'AR', 'Geolocation'],
        gradient: 'from-amber-900 to-orange-900',
    },
    {
        id: 'garbage-classification',
        title: 'Garbage Classification',
        category: 'MACHINE LEARNING',
        summary:
            'Klasifikasi gambar sampah untuk memilah jenis limbah secara otomatis lewat computer vision.',
        body:
            'Model machine learning dilatih untuk mengenali kategori limbah dari gambar, sehingga memudahkan pemilahan sampah secara otomatis sebelum masuk ke tahap daur ulang atau pengolahan.',
        highlights: [
            'Pipeline praproses & augmentasi data gambar',
            'Pelatihan model klasifikasi dan evaluasi akurasi',
            'Integrasi hasil prediksi ke antarmuka sederhana',
        ],
        tools: ['Python', 'Machine Learning', 'Computer Vision', 'TensorFlow'],
        gradient: 'from-red-900 to-pink-900',
    },
    {
        id: 'sentiment-analysis',
        title: 'Sentiment Analysis',
        category: 'MACHINE LEARNING',
        summary:
            'Analisis sentimen teks dengan Natural Language Processing untuk memahami opini publik.',
        body:
            'Sistem yang mengolah data teks untuk mengklasifikasikan sentimen positif, negatif, atau netral. Cocok untuk memantau opini publik dari ulasan, media sosial, maupun survei.',
        highlights: [
            'Praproses teks: cleaning, tokenizing, dan stemming',
            'Eksperimen beberapa model klasifikasi & perbandingan performa',
            'Visualisasi sebaran sentimen dari data nyata',
        ],
        tools: ['Python', 'NLP', 'Scikit-learn', 'Pandas'],
        gradient: 'from-violet-900 to-purple-900',
    },
];