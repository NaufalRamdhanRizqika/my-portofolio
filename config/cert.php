<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Kata sandi dokumen sertifikat
    |--------------------------------------------------------------------------
    |
    | Diisi lewat environment variable CERT_PASSWORD (jangan ditulis langsung
    | di file ini karena repo bersifat publik). Kalau kosong, semua akses
    | dokumen ditolak (fail closed).
    |
    */

    'password' => env('CERT_PASSWORD'),

    /*
    | Kunci session penanda bahwa pengunjung sudah memasukkan kata sandi.
    */

    'session_key' => 'cert_authorized',

    /*
    |--------------------------------------------------------------------------
    | Kunci enkripsi dokumen (terpisah dari APP_KEY)
    |--------------------------------------------------------------------------
    |
    | Berkas .enc disimpan di repo, jadi kuncinya tidak boleh ada di repo.
    | Isi lewat environment variable CERT_KEY (nilai bebas, misalnya hasil
    | `php artisan key:generate --show`). Kenapa tidak memakai APP_KEY?
    | Karena APP_KEY bisa berbeda antara mesin lokal dan platform deploy,
    | sehingga dokumen yang dienkripsi lokal tidak bisa dibuka di server.
    |
    | Urutan kunci untuk mengenkripsi: CERT_KEY, lalu CERT_PASSWORD, lalu
    | APP_KEY. Saat membuka berkas, ketiganya dicoba satu per satu sampai
    | cocok, supaya dokumen tetap terbaca walau APP_KEY-nya berbeda.
    |
    */

    'key' => env('CERT_KEY'),

    /*
    | Lokasi berkas terenkripsi. Isinya bukan PDF asli, melainkan hasil
    | enkripsi Laravel, jadi aman disimpan di repo publik.
    | Berkas mentah disimpan di subfolder raw/ yang di-ignore Git.
    */

    'path' => storage_path('app/sertifikat'),

    /*
    | Daftar berkas yang boleh diakses (mencegah path traversal).
    | Nama di sini adalah nama publik; berkas di disk bernama "<nama>.enc".
    */

    'files' => [
        'bnsp-cwdev.pdf',
        'toefl.pdf',
        'ccna.pdf',
        'gemini.pdf',
    ],

];
