<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Commands;

use Illuminate\Console\Command;

class LaravelWebTinkerProInstallCommand extends Command
{
    public $signature = 'laravel-web-tinker-pro:install';

    public $description = 'Install the Laravel Web Tinker Pro resources';

    public function handle(): int
    {
        $this->comment('Publishing Laravel Web Tinker Pro Assets...');

        $this->call('vendor:publish', ['--tag' => 'laravel-web-tinker-config']);
        $this->call('vendor:publish', ['--tag' => 'laravel-web-tinker-views']);
        $this->call('vendor:publish', ['--tag' => 'laravel-web-tinker-assets']);

        $this->info('Laravel Web Tinker Pro installed successfully.');

        return self::SUCCESS;
    }
}
