<?php

declare(strict_types=1);

namespace Luminarix\LaravelWebTinkerPro;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Application;
use Illuminate\Support\Benchmark;
use Illuminate\Support\Collection;
use Laravel\Tinker\ClassAliasAutoloader;
use Luminarix\LaravelWebTinkerPro\OutputModifiers\OutputModifier;
use Psy\Configuration;
use Psy\ExecutionLoopClosure;
use Psy\Shell;
use Symfony\Component\Console\Output\BufferedOutput;

class LaravelWebTinkerPro
{
    protected BufferedOutput $output;

    protected Shell $shell;

    public function __construct(protected OutputModifier $outputModifier)
    {
        $this->output = new BufferedOutput;

        $this->shell = $this->createShell($this->output);
    }

    public function execute(string $phpCode): string
    {
        $phpCode = $this->removeComments($phpCode);
        $this->shell->addInput($phpCode);

        $closure = new ExecutionLoopClosure($this->shell);
        $initialMemoryUsage = memory_get_usage();
        $runtime = Benchmark::measure(fn () => $closure->execute());
        $memoryUsage = max(memory_get_usage() - $initialMemoryUsage, 0);
        $output = $this->cleanOutput($this->output->fetch());

        return $this->outputModifier->modify(
            output: $output,
            runtime: $runtime,
            memoryUsage: $memoryUsage,
        );
    }

    public function removeComments(string $code): string
    {
        /** @var string $return */
        $return = collect(token_get_all("<?php\n" . $code . '?>'))
            ->reduce(
                callback: function ($carry, $token) {
                    return is_string($token)
                        ? $carry . $token
                        : $carry . $this->ignoreCommentsAndPhpTags($token);
                },
                initial: ''
            );

        return $return;
    }

    protected function createShell(BufferedOutput $output): Shell
    {
        /** @var ?string $configFile */
        $configFile = config('web-tinker-pro.config_file');

        $config = new Configuration([
            'updateCheck' => 'never',
            'configFile' => $configFile ? base_path($configFile) : null,
        ]);

        $config->setHistoryFile(defined('PHP_WINDOWS_VERSION_BUILD') ? 'null' : '/dev/null');

        $config->getPresenter()->addCasters([
            Collection::class => 'Laravel\Tinker\TinkerCaster::castCollection',
            Model::class => 'Laravel\Tinker\TinkerCaster::castModel',
            Application::class => 'Laravel\Tinker\TinkerCaster::castApplication',
        ]);

        $shell = new Shell($config);
        $shell->setOutput($output);

        $composerClassMap = base_path('vendor/composer/autoload_classmap.php');
        if (file_exists($composerClassMap)) {
            /** @var array<string> $alias */
            $alias = config('web-tinker-pro.alias', []);
            /** @var array<string> $dontAlias */
            $dontAlias = config('web-tinker-pro.dont_alias', []);

            ClassAliasAutoloader::register($shell, $composerClassMap, $alias, $dontAlias);
        }

        return $shell;
    }

    /**
     * @param array{
     *     0: int,
     *     1: string,
     *     2?: int
     * } $token
     */
    protected function ignoreCommentsAndPhpTags(array $token): string
    {
        [$id, $text] = $token;

        return in_array($id, [T_COMMENT, T_DOC_COMMENT, T_OPEN_TAG, T_CLOSE_TAG]) ? '' : $text;
    }

    protected function cleanOutput(string $output): string
    {
        /** @var string $output */
        $output = preg_replace('/(?s)(<aside.*?<\/aside>)|Exit: {2}Ctrl\+D/ms', '$2', $output);
        /** @var string $output */
        $output = preg_replace('/(?s)(<whisper.*?<\/whisper>)|INFO {2}Ctrl\+D\./ms', '$2', $output);

        return mb_trim($output);
    }
}
