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
| Dokumen sertifikat:
| - Melihat  : terbuka untuk umum (perusahaan bisa meninjau dokumen).
| - Mengunduh: hanya setelah memasukkan kata sandi (session terverifikasi).
| Berkas asli tersimpan terenkripsi di storage/app/sertifikat.
*/
Route::prefix('sertifikat')->group(function () {
    Route::get('/status', [CertificateController::class, 'status']);
    Route::post('/login', [CertificateController::class, 'login'])->middleware('throttle:10,1');
    Route::post('/logout', [CertificateController::class, 'logout']);

    Route::get('/{file}', [CertificateController::class, 'show'])
        ->where('file', '[A-Za-z0-9._-]+');

    Route::middleware('cert.auth')->group(function () {
        Route::get('/{file}/unduh', [CertificateController::class, 'download'])
            ->where('file', '[A-Za-z0-9._-]+');
    });
});
