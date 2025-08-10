<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Luminarix\LaravelWebTinkerPro\Http\Controllers\WebTinkerController;

/** @var array<class-string> $middlewares */
$middlewares = config('web-tinker-pro.middlewares', []);
Route::middlewareGroup('web-tinker-pro', $middlewares);

Route::group([
    'prefix' => config('web-tinker-pro.path'),
    'middleware' => 'web-tinker-pro',
], function () {
    Route::get('/', [WebTinkerController::class, 'index']);
    Route::post('/', [WebTinkerController::class, 'execute']);
});
