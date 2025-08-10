<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Commands;

use Illuminate\Console\Command;

class LaravelWebTinkerProUpdateCommand extends Command
{
    public $signature = 'laravel-web-tinker-pro:update';

    public $description = 'Install the Laravel Web Tinker Pro resources';

    public function handle(): int
    {
        $this->comment('Updating Laravel Web Tinker Pro Assets...');

        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-views', '--force' => true]);
        $this->call('vendor:publish', ['--tag' => 'web-tinker-pro-assets', '--force' => true]);

        $this->info('Laravel Web Tinker Pro updated successfully.');
        $this->info('The configuration and migration files have not been updated. If you need to update them, please run the install command again.');

        return self::SUCCESS;
    }
}
