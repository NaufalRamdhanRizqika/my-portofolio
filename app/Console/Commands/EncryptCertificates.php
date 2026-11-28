<?php

namespace App\Console\Commands;

use App\Support\CertCrypto;
use Illuminate\Console\Command;

class EncryptCertificates extends Command
{
    protected $signature = 'cert:encrypt {file? : Nama berkas PDF di folder raw}';

    protected $description = 'Enkripsi dokumen sertifikat mentah menjadi berkas .enc';

    public function handle(): int
    {
        $base = rtrim((string) config('cert.path'), '/\\');
        $rawDir = $base.DIRECTORY_SEPARATOR.'raw';

        if (! is_dir($rawDir)) {
            $this->error("Folder mentah tidak ditemukan: {$rawDir}");
            $this->line('Simpan PDF asli di folder tersebut, lalu jalankan ulang perintah ini.');

            return self::FAILURE;
        }

        $argument = $this->argument('file');

        $files = $argument
            ? [$argument]
            : array_values(array_filter(
                scandir($rawDir),
                fn ($name) => str_ends_with(strtolower($name), '.pdf')
            ));

        if ($files === []) {
            $this->warn('Tidak ada berkas PDF di folder raw.');

            return self::SUCCESS;
        }

        foreach ($files as $name) {
            $source = $rawDir.DIRECTORY_SEPARATOR.$name;

            if (! is_file($source)) {
                $this->error("Tidak ditemukan: {$name}");

                continue;
            }

            $target = $base.DIRECTORY_SEPARATOR.$name.'.enc';

            file_put_contents($target, CertCrypto::encrypt((string) file_get_contents($source)));

            $this->info(sprintf(
                'Terenkripsi: %s (%s KB)',
                basename($target),
                number_format(filesize($target) / 1024, 0, ',', '.')
            ));
        }

        $this->newLine();
        $this->line('Kunci enkripsi memakai: '.CertCrypto::source());

        if (CertCrypto::source() === CertCrypto::SOURCE_APP_KEY) {
            $this->warn('CERT_KEY dan CERT_PASSWORD kosong, jadi kunci jatuh ke APP_KEY.');
            $this->warn('Berkas hanya bisa dibuka di lingkungan yang APP_KEY-nya sama persis.');
            $this->line('Isi CERT_KEY lalu jalankan perintah ini lagi supaya dokumen portabel.');
        } else {
            $this->line('Isi environment variable '.CertCrypto::source().' dengan nilai yang sama di server deploy.');
            $this->line('Jangan menulis nilainya ke file yang masuk repo.');
        }

        return self::SUCCESS;
    }
}
