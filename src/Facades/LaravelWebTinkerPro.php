<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Luminarix\LaravelWebTinkerPro\LaravelWebTinkerPro
 */
class LaravelWebTinkerPro extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Luminarix\LaravelWebTinkerPro\LaravelWebTinkerPro::class;
    }
}
