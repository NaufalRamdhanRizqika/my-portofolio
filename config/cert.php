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
    | Lokasi penyimpanan dokumen. Sengaja di luar public/ supaya tidak bisa
    | diakses langsung lewat URL tanpa melewati pengecekan login.
    */

    'path' => storage_path('app/sertifikat'),

    /*
    | Daftar berkas yang boleh diakses (mencegah path traversal).
    */

    'files' => [
        'bnsp-cwdev.pdf',
        'toefl.pdf',
        'ccna.pdf',
        'gemini.pdf',
    ],

];
