<?php
declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;

class Authorize
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($this->allowedToUseTinkerPro(), 403);

        return $next($request);
    }

    protected function allowedToUseTinkerPro(): bool
    {
        return config('web-tinker-pro.enabled') && Gate::check('viewWebTinkerPro');
    }
}
