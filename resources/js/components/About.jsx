import Reveal from './ui/Reveal';

const FACTS = [
    {
        title: 'Pendidikan',
        body: 'S1 Teknik Informatika di Universitas Komputer Indonesia (lulus 2026) dengan IPK 3,18/4,00, setelah Rekayasa Perangkat Lunak di SMK Negeri 4 Bandung (2022). Skripsi: Implementasi Smart Aquaculture Berbasis IoT untuk Optimalisasi Pertumbuhan Ikan Koi.',
    },
    {
        title: 'Fokus Teknologi',
        body: 'Web dev (React + Laravel), IoT (ESP32), eksplorasi 3D/AR & machine learning.',
    },
    {
        title: 'Pengalaman',
        body: 'PKL di PT Inovindo (PHP, MySQL) dan magang di Bandung Techno Park Telkom University mengembangkan modul aplikasi web MyBTP (arsip surat, manajemen startup, user management), hingga riset lapangan IoT.',
    },
    {
        title: 'Sertifikasi',
        body: 'Certified Web Developer (CWDev) dari BNSP, CCNA Introduction to Networks, TOEFL, dan Gemini Certified Student.',
    },
];
export default function About() {
    return (
        <Reveal as="section" id="about" className="pf-about">
            <h2 className="font-display">About</h2>

            <p>
                Saya Naufal Ramdhan Rizqika, lulusan S1 Teknik Informatika Universitas
                Komputer Indonesia (UNIKOM) dengan IPK 3,18/4,00 yang memiliki minat pada
                pengembangan web dan IoT.
            </p>
            <p className="mt-3">
                Perjalanan saya di dunia pemrograman dimulai sejak SMK jurusan Rekayasa
                Perangkat Lunak. Saat PKL di PT Inovindo, saya mengerjakan LMS e-learning
                dan website reservasi undangan motivator bisnis menggunakan PHP dan MySQL,
                mulai dari perancangan UML, ERD, dan database hingga implementasi fitur dan
                pengujian di hosting.
            </p>
            <p className="mt-3">
                Sejak itu saya terus mengembangkan kemampuan dengan React, Laravel, dan
                Tailwind CSS. Pada magang di Bandung Techno Park Telkom University, saya
                mengembangkan modul arsip surat, manajemen startup, dan user management
                pada aplikasi MyBTP, lengkap dengan pencarian, filter, validasi, dan
                komponen antarmuka yang bisa dipakai ulang. Bersertifikat Certified Web
                Developer (CWDev) dari BNSP.
            </p>
            <p className="mt-3">
                Di luar web, skripsi saya membangun sistem monitoring kolam ikan koi
                berbasis ESP32 dan Firebase yang mengontrol pemanas, kipas, dan pemberi
                pakan otomatis, dengan notifikasi lewat Telegram. Saya juga pernah
                mengerjakan proyek AR berbasis lokasi dengan Three.js, klasifikasi gambar,
                dan analisis sentimen.
            </p>
            <p className="mt-3">
                Saya teliti, cepat belajar, dan senang menerjemahkan kebutuhan nyata
                menjadi solusi yang bisa dipakai. Saat ini saya mencari kesempatan magang
                atau kerja di bidang web development, IoT, atau software engineering untuk
                terus berkembang dalam tim profesional.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {FACTS.map((f) => (
                    <div key={f.title} className="pf-card">
                        <h3 className="font-display">{f.title}</h3>
                        <p>{f.body}</p>
                    </div>
                ))}
            </div>
        </Reveal>
    );
}