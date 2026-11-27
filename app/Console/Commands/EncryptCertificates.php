<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Crypt;

class EncryptCertificates extends Command
{
    protected $signature = 'cert:encrypt {file? : Nama berkas PDF di folder raw}';

    protected $description = 'Enkripsi dokumen sertifikat mentah menjadi berkas .enc (kunci dari APP_KEY)';

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

            file_put_contents($target, Crypt::encryptString((string) file_get_contents($source)));

            $this->info(sprintf(
                'Terenkripsi: %s (%s KB)',
                basename($target),
                number_format(filesize($target) / 1024, 0, ',', '.')
            ));
        }

        $this->newLine();
        $this->line('Kunci dekripsi memakai APP_KEY. Jangan mengganti APP_KEY setelah ini.');

        return self::SUCCESS;
    }
}
