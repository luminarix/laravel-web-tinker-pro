<?php

declare(strict_types=1);

use Luminarix\LaravelWebTinkerPro\OutputModifiers\BasicModifier;

it('formats byte counts within the supported units', function () {
    $modifier = new BasicModifier;

    expect($modifier->formatBytes(0))->toBe('0.00 B')
        ->and($modifier->formatBytes(1_024))->toBe('1.00 KB')
        ->and($modifier->formatBytes(PHP_INT_MAX))->toBe('8,388,608.00 TB');
});
