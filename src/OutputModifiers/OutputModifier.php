<?php

namespace Luminarix\LaravelWebTinkerPro\OutputModifiers;

interface OutputModifier
{
    public function modify(mixed ...$args): string;
}
