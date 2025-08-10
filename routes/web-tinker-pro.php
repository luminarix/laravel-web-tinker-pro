<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::middlewareGroup('web-tinker', config('web-tinker-pro.middleware', []));

Route::group([
    'prefix' => config('web-tinker.path'),
    'middleware' => 'web-tinker',
], function () {
    Route::get('/', [WebTinkerController::class, 'index']);
    Route::post('/', [WebTinkerController::class, 'execute']);
});
