<?php

namespace App\Http\Controllers;

use App\Support\CertCrypto;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * Cek apakah pengunjung sudah memasukkan kata sandi pada session ini.
     */
    public function status(Request $request)
    {
        return response()->json([
            'authenticated' => (bool) $request->session()->get(config('cert.session_key')),
        ]);
    }

    /**
     * Verifikasi kata sandi lalu tandai session sebagai terverifikasi.
     */
    public function login(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string', 'max:200'],
        ]);

        $expected = (string) config('cert.password');

        // Cadangan kalau config di-cache saat build tanpa env var.
        if ($expected === '') {
            $expected = (string) env('CERT_PASSWORD');
        }

        if ($expected === '' || ! hash_equals($expected, (string) $request->input('password'))) {
            return response()->json([
                'authenticated' => false,
                'message' => 'Kata sandi salah.',
            ], 422);
        }

        $request->session()->regenerate();
        $request->session()->put(config('cert.session_key'), true);

        return response()->json(['authenticated' => true]);
    }

    /**
     * Hapus penanda login pada session.
     */
    public function logout(Request $request)
    {
        $request->session()->forget(config('cert.session_key'));
        $request->session()->regenerate();

        return response()->json(['authenticated' => false]);
    }

    /**
     * Tampilkan dokumen (inline) di penampil PDF browser.
     */
    public function show(string $file)
    {
        $content = $this->decrypted($file);

        return response($content, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$file.'"',
            'Content-Length' => (string) strlen($content),
            'Cache-Control' => 'private, no-store, max-age=0',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    /**
     * Unduh dokumen sebagai lampiran.
     */
    public function download(string $file)
    {
        $content = $this->decrypted($file);

        return response($content, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$file.'"',
            'Content-Length' => (string) strlen($content),
            'Cache-Control' => 'private, no-store, max-age=0',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    /**
     * Baca berkas terenkripsi lalu dekripsi di memori (memakai APP_KEY).
     */
    private function decrypted(string $file): string
    {
        $path = $this->resolve($file);

        abort_if($path === null, 404);

        try {
            return CertCrypto::decrypt((string) file_get_contents($path));
        } catch (DecryptException $e) {
            report($e);

            abort(500, 'Dokumen tidak bisa dibuka. Kunci sertifikat (CERT_KEY) mungkin belum diisi atau sudah berubah.');
        }
    }

    /**
     * Pastikan berkas terenkripsi ada di daftar putih dan benar-benar tersedia.
     */
    private function resolve(string $file): ?string
    {
        if (! in_array($file, (array) config('cert.files'), true)) {
            return null;
        }

        $path = rtrim((string) config('cert.path'), '/\\').DIRECTORY_SEPARATOR.$file.'.enc';

        return is_file($path) ? $path : null;
    }
}
