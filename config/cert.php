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
    | Lokasi berkas terenkripsi. Isinya bukan PDF asli, melainkan hasil
    | enkripsi Laravel (APP_KEY), jadi aman disimpan di repo publik.
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
