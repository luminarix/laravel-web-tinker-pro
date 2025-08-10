<?php

namespace Luminarix\LaravelWebTinkerPro\OutputModifiers;

final class BasicModifier implements OutputModifier
{
    public function modify(mixed ...$args): string
    {
        $output = $args['output'];
        /** @var int $runtime */
        $runtime = $args['runtime'];
        $memoryUsage = $args['memoryUsage'];
        $timestamp = now()->format('Y-m-d H:i:s');
        $formattedRuntime = number_format($runtime / 1_000, 3);

        $json = json_encode(
            value: compact(
                'timestamp',
                'formattedRuntime',
                'memoryUsage',
                'output'
            )
        );

        return $json !== false ? $json : '';
    }
}
