<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CertAuth
{
    /**
     * Tolak akses dokumen sertifikat kalau session belum terverifikasi.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->get(config('cert.session_key'))) {
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json([
                    'authenticated' => false,
                    'message' => 'Silakan masukkan kata sandi terlebih dahulu.',
                ], 401);
            }

            return response(
                "Akses ditolak.\nDokumen ini dilindungi kata sandi. Buka halaman /#/sertifikasi untuk memasukkan kata sandi.",
                403,
                ['Content-Type' => 'text/plain; charset=UTF-8']
            );
        }

        return $next($request);
    }
}
