<?php

namespace Luminarix\LaravelWebTinkerPro\OutputModifiers;

interface OutputModifier
{
    public function modify(string $output, float $runtime): string;
}
