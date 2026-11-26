<?php

use App\Http\Controllers\CertificateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

/*
| Dokumen sertifikat dilindungi kata sandi. Berkas aslinya disimpan di
| storage/app/sertifikat (bukan public/), jadi hanya bisa diambil lewat
| route di bawah ini setelah session terverifikasi.
*/
Route::prefix('sertifikat')->group(function () {
    Route::get('/status', [CertificateController::class, 'status']);
    Route::post('/login', [CertificateController::class, 'login'])->middleware('throttle:10,1');
    Route::post('/logout', [CertificateController::class, 'logout']);

    Route::middleware('cert.auth')->group(function () {
        Route::get('/{file}', [CertificateController::class, 'show'])
            ->where('file', '[A-Za-z0-9._-]+');
        Route::get('/{file}/unduh', [CertificateController::class, 'download'])
            ->where('file', '[A-Za-z0-9._-]+');
    });
});
