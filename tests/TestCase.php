<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Tests;

use Illuminate\Database\Eloquent\Factories\Factory;
use Luminarix\LaravelWebTinkerPro\LaravelWebTinkerProServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            fn (string $modelName) => 'Luminarix\\LaravelWebTinkerPro\\Database\\Factories\\' . class_basename($modelName) . 'Factory'
        );
    }

    protected function getPackageProviders($app)
    {
        return [
            LaravelWebTinkerProServiceProvider::class,
        ];
    }
}
