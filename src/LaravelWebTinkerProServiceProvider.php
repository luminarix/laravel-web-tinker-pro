<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro;

use Illuminate\Support\Facades\Gate;
use Luminarix\LaravelWebTinkerPro\Commands\LaravelWebTinkerProInstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LaravelWebTinkerProServiceProvider extends PackageServiceProvider
{
    public function boot(): void
    {
        $this->registerWebTinkerProGate();
    }

    public function configurePackage(Package $package): void
    {
        $package
            ->name('laravel-web-tinker-pro')
            ->hasConfigFile('web-tinker-pro.php')
            ->hasViews('web-tinker-pro')
            ->hasMigration('create_laravel-web-tinker-pro_table')
            ->hasCommand(LaravelWebTinkerProInstallCommand::class)
            ->hasRoute('web-tinker-pro.php');
    }

    protected function registerWebTinkerProGate(): self
    {
        Gate::define('viewWebTinkerPro', function ($user = null) {
            return app()->environment('local');
        });

        return $this;
    }
}
