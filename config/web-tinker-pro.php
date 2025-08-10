<?php

declare(strict_types=1);

return [
    'enabled' => env('TINKER_PRO_ENABLED', true),

    'path' => '/tinker-pro',

    'middleware' => [
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Session\Middleware\StartSession::class,
        Luminarix\LaravelWebTinker\Http\Middleware\Authorize::class,
    ],

    'config_file' => env('PSYSH_CONFIG', null),
];
