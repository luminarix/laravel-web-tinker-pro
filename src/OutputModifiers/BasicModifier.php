<?php

namespace Luminarix\LaravelWebTinkerPro\OutputModifiers;

final class BasicModifier implements OutputModifier
{
    public function modify(mixed ...$args): string
    {
        /** @var string $output */
        $output = $args['output'];
        /** @var int $runtime */
        $runtime = $args['runtime'];
        /** @var int $memoryUsage */
        $memoryUsage = $args['memoryUsage'];

        $memoryUsageFormatted = $this->formatBytes($memoryUsage);
        $timestamp = now()->timestamp;
        $formattedRuntime = round($runtime / 1_000, 3);
        $outputSizeFormatted = $this->formatBytes(mb_strlen($output, 'binary'));

        $json = json_encode(
            value: compact(
                'timestamp',
                'formattedRuntime',
                'memoryUsageFormatted',
                'output',
                'outputSizeFormatted'
            )
        );

        return $json !== false ? $json : '';
    }

    public function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $power = $bytes > 0 ? floor(log($bytes, 1_024)) : 0;

        return number_format($bytes / (1_024 ** $power), 2) . ' ' . $units[$power];
    }
}
