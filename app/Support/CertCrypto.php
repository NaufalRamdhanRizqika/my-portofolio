<?php

namespace App\Support;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Crypt;

/**
 * Enkripsi dan dekripsi dokumen sertifikat.
 *
 * Berkas .enc disimpan di repo publik, jadi kunci enkripsinya tidak boleh
 * ikut masuk repo. Kunci diambil dari environment variable, dengan urutan:
 *
 *   1. CERT_KEY   — kunci khusus dokumen (disarankan untuk deploy)
 *   2. CERT_PASSWORD — kunci diturunkan dari kata sandi akses pemilik
 *   3. APP_KEY    — cadangan lama, hanya cocok kalau APP_KEY-nya sama persis
 *
 * Saat membuka, ketiganya dicoba satu per satu sampai ada yang cocok, supaya
 * dokumen tetap terbaca walau satu environment memakai APP_KEY berbeda.
 */
class CertCrypto
{
    public const SOURCE_KEY = 'CERT_KEY';

    public const SOURCE_PASSWORD = 'CERT_PASSWORD';

    public const SOURCE_APP_KEY = 'APP_KEY';

    /**
     * Nama sumber kunci yang akan dipakai untuk mengenkripsi (tanpa nilainya).
     */
    public static function source(): string
    {
        $candidates = self::candidates();

        return $candidates === [] ? self::SOURCE_APP_KEY : array_key_first($candidates);
    }

    /**
     * Enkripsi konten PDF menjadi string aman untuk disimpan di repo.
     */
    public static function encrypt(string $plain): string
    {
        $candidates = self::candidates();

        if ($candidates === []) {
            // Tidak ada CERT_KEY/CERT_PASSWORD: pakai APP_KEY seperti biasa.
            return Crypt::encryptString($plain);
        }

        $material = reset($candidates);

        return self::encrypter($material)->encrypt($plain, false);
    }

    /**
     * Buka berkas .enc. Mencoba semua kunci yang tersedia sampai cocok.
     *
     * @throws DecryptException kalau tidak ada satu pun kunci yang cocok
     */
    public static function decrypt(string $payload): string
    {
        $errors = [];

        foreach (self::candidates() as $source => $material) {
            try {
                return self::encrypter($material)->decrypt($payload, false);
            } catch (DecryptException $e) {
                $errors[] = $source;
            }
        }

        // Cadangan terakhir: APP_KEY lingkungan ini.
        try {
            return Crypt::decryptString($payload);
        } catch (DecryptException $e) {
            $errors[] = self::SOURCE_APP_KEY;
        }

        throw new DecryptException(
            'Kunci dokumen tidak cocok (sudah dicoba: '.implode(', ', $errors).').'
        );
    }

    /**
     * Daftar kunci yang tersedia di lingkungan ini, dalam urutan prioritas.
     *
     * @return array<string, string> nama sumber => material kunci 32 byte
     */
    private static function candidates(): array
    {
        $candidates = [];

        $key = self::setting('key', 'CERT_KEY');
        if ($key !== '') {
            $candidates[self::SOURCE_KEY] = hash('sha256', $key, true);
        }

        $password = self::setting('password', 'CERT_PASSWORD');
        if ($password !== '') {
            $candidates[self::SOURCE_PASSWORD] = hash('sha256', $password, true);
        }

        return $candidates;
    }

    /**
     * Baca nilai setting; kalau config sudah di-cache saat build tanpa env
     * var, jatuh membaca env secara langsung (sama seperti login sertifikat).
     */
    private static function setting(string $config, string $env): string
    {
        $value = config($config);

        if ($value === null || $value === '') {
            $value = env($env);
        }

        return trim((string) $value);
    }

    private static function encrypter(string $material): Encrypter
    {
        return new Encrypter($material, 'AES-256-CBC');
    }
}
