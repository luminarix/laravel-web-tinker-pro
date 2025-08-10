<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Luminarix\LaravelWebTinkerPro\Http\Controllers\WebTinkerController;

Route::group([
    'prefix' => config('web-tinker-pro.path'),
    'middleware' => 'web-tinker-pro',
], function () {
    Route::get('/', [WebTinkerController::class, 'index']);
    Route::post('/', [WebTinkerController::class, 'execute']);
});
