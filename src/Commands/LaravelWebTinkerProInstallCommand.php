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

        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-config']);
        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-views']);
        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-assets']);
        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-migrations']);

        $this->info('Laravel Web Tinker Pro installed successfully.');

        return self::SUCCESS;
    }
}
