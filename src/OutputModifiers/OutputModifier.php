<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro\OutputModifiers;

interface OutputModifier
{
    public function modify(mixed ...$args): string;
}
