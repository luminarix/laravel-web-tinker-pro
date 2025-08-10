<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Luminarix\LaravelWebTinkerPro\Commands\LaravelWebTinkerProInstallCommand;
use Luminarix\LaravelWebTinkerPro\Commands\LaravelWebTinkerProUpdateCommand;
use Luminarix\LaravelWebTinkerPro\OutputModifiers\OutputModifier;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LaravelWebTinkerProServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('laravel-web-tinker-pro')
            ->hasConfigFile('web-tinker-pro')
            ->hasViews('web-tinker-pro')
            ->hasAssets()
            // ->hasMigration('create_web_tinker_pro_tables')
            ->hasCommands([
                LaravelWebTinkerProInstallCommand::class,
                LaravelWebTinkerProUpdateCommand::class,
            ])
            ->hasRoute('web-tinker-pro');
    }

    public function bootingPackage(): void
    {
        $this
            ->registerMiddlewareGroup()
            ->registerWebTinkerProGate();
        /** @var class-string $outputModifier */
        $outputModifier = config('web-tinker-pro.output_modifier');
        $this->app->bind(OutputModifier::class, $outputModifier);
    }

    protected function registerWebTinkerProGate(): self
    {
        Gate::define('viewWebTinkerPro', function ($user = null) {
            return app()->environment('local');
        });

        return $this;
    }

    protected function registerMiddlewareGroup(): self
    {
        /** @var array<class-string> $middlewares */
        $middlewares = config('web-tinker-pro.middlewares', []);
        Route::middlewareGroup('web-tinker-pro', $middlewares);

        return $this;
    }
}
