<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Luminarix\LaravelWebTinkerPro\LaravelWebTinkerPro;

class WebTinkerController
{
    public function index(): View
    {
        $view = 'local';
        if (app()->isProduction()) {
            $view = 'production';
        }

        // @phpstan-ignore argument.type
        return view("web-tinker-pro::{$view}");
    }

    public function execute(Request $request, LaravelWebTinkerPro $tinker): string
    {
        $validated = $request->validate([
            'code' => 'required',
        ]);

        return $tinker->execute($validated['code']);
    }
}
