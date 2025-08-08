import { languages, Range } from 'monaco-editor';

/**
 * PHP Inline Language Configuration for Monaco Editor
 * Enables PHP syntax highlighting without requiring <?php opening tag
 */

// PHP Language Configuration
export const phpInlineLanguageConfig: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"', notIn: ['string'] },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  folding: {
    markers: {
      start: /^\s*\/\*\*(?!\/)|\{\s*$/,
      end: /^\s*\*\/|\}\s*$/,
    },
  },
  wordPattern: /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+[{\]}\\|;:'",.<>/?\s]+)/g,
  indentationRules: {
    increaseIndentPattern: /^.*\{[^}]*$/,
    decreaseIndentPattern: /^\s*\}/,
  },
};

// PHP Monarch Tokenizer for inline mode (no <?php required)
export const phpInlineTokenizer: languages.IMonarchLanguage = {
  tokenPostfix: '.php',
  defaultToken: '',

  keywords: [
    // PHP core keywords
    '__halt_compiler',
    'abstract',
    'and',
    'array',
    'as',
    'break',
    'callable',
    'case',
    'catch',
    'class',
    'clone',
    'const',
    'continue',
    'declare',
    'default',
    'die',
    'do',
    'echo',
    'else',
    'elseif',
    'empty',
    'enddeclare',
    'endfor',
    'endforeach',
    'endif',
    'endswitch',
    'endwhile',
    'eval',
    'exit',
    'extends',
    'final',
    'finally',
    'for',
    'foreach',
    'function',
    'global',
    'goto',
    'if',
    'implements',
    'include',
    'include_once',
    'instanceof',
    'insteadof',
    'interface',
    'isset',
    'list',
    'namespace',
    'new',
    'or',
    'print',
    'private',
    'protected',
    'public',
    'require',
    'require_once',
    'return',
    'static',
    'switch',
    'throw',
    'trait',
    'try',
    'unset',
    'use',
    'var',
    'while',
    'xor',
    'yield',
    'yield from',

    // PHP 7+ keywords
    'fn',
    'match',
    'readonly',
  ],

  typeKeywords: [
    'int',
    'integer',
    'bool',
    'boolean',
    'float',
    'double',
    'real',
    'string',
    'array',
    'object',
    'resource',
    'mixed',
    'numeric',
    'null',
    'void',
    'callable',
    'iterable',
    'self',
    'parent',
    'static',
  ],

  builtinFunctions: [
    // String functions
    'addcslashes',
    'addslashes',
    'bin2hex',
    'chop',
    'chr',
    'chunk_split',
    'convert_cyr_string',
    'convert_uudecode',
    'convert_uuencode',
    'count_chars',
    'crc32',
    'crypt',
    'explode',
    'fprintf',
    'get_html_translation_table',
    'hebrev',
    'hebrevc',
    'hex2bin',
    'html_entity_decode',
    'htmlentities',
    'htmlspecialchars',
    'htmlspecialchars_decode',
    'implode',
    'join',
    'lcfirst',
    'levenshtein',
    'localeconv',
    'ltrim',
    'md5',
    'md5_file',
    'metaphone',
    'money_format',
    'nl_langinfo',
    'nl2br',
    'number_format',
    'ord',
    'parse_str',
    'printf',
    'quoted_printable_decode',
    'quoted_printable_encode',
    'quotemeta',
    'rtrim',
    'setlocale',
    'sha1',
    'sha1_file',
    'similar_text',
    'soundex',
    'sprintf',
    'sscanf',
    'str_contains',
    'str_decrement',
    'str_ends_with',
    'str_getcsv',
    'str_increment',
    'str_ireplace',
    'str_pad',
    'str_repeat',
    'str_replace',
    'str_rot13',
    'str_shuffle',
    'str_split',
    'str_starts_with',
    'str_word_count',
    'strcasecmp',
    'strchr',
    'strcmp',
    'strcoll',
    'strcspn',
    'strip_tags',
    'stripcslashes',
    'stripos',
    'stripslashes',
    'stristr',
    'strlen',
    'strnatcasecmp',
    'strnatcmp',
    'strncasecmp',
    'strncmp',
    'strpbrk',
    'strpos',
    'strrchr',
    'strrev',
    'strripos',
    'strrpos',
    'strspn',
    'strstr',
    'strtok',
    'strtolower',
    'strtoupper',
    'strtr',
    'substr',
    'substr_compare',
    'substr_count',
    'substr_replace',
    'trim',
    'ucfirst',
    'ucwords',
    'utf8_decode',
    'utf8_encode',
    'vfprintf',
    'vprintf',
    'vsprintf',
    'wordwrap',

    // Array functions
    'array_all',
    'array_any',
    'array_change_key_case',
    'array_chunk',
    'array_column',
    'array_combine',
    'array_count_values',
    'array_diff',
    'array_diff_assoc',
    'array_diff_key',
    'array_diff_uassoc',
    'array_diff_ukey',
    'array_fill',
    'array_fill_keys',
    'array_filter',
    'array_find',
    'array_find_key',
    'array_flip',
    'array_intersect',
    'array_intersect_assoc',
    'array_intersect_key',
    'array_intersect_uassoc',
    'array_intersect_ukey',
    'array_is_list',
    'array_key_exists',
    'array_key_first',
    'array_key_last',
    'array_keys',
    'array_map',
    'array_merge',
    'array_merge_recursive',
    'array_multisort',
    'array_pad',
    'array_pop',
    'array_product',
    'array_push',
    'array_rand',
    'array_reduce',
    'array_replace',
    'array_replace_recursive',
    'array_reverse',
    'array_search',
    'array_shift',
    'array_slice',
    'array_splice',
    'array_sum',
    'array_udiff',
    'array_udiff_assoc',
    'array_udiff_uassoc',
    'array_uintersect',
    'array_uintersect_assoc',
    'array_uintersect_uassoc',
    'array_unique',
    'array_unshift',
    'array_values',
    'array_walk',
    'array_walk_recursive',
    'arsort',
    'asort',
    'compact',
    'count',
    'current',
    'each',
    'end',
    'extract',
    'in_array',
    'is_array',
    'key',
    'key_exists',
    'krsort',
    'ksort',
    'natcasesort',
    'natsort',
    'next',
    'pos',
    'prev',
    'range',
    'reset',
    'rsort',
    'shuffle',
    'sizeof',
    'sort',
    'uasort',
    'uksort',
    'usort',

    // Common PHP functions
    'file_exists',
    'file_get_contents',
    'file_put_contents',
    'is_null',
    'is_string',
    'is_int',
    'is_float',
    'is_bool',
    'is_object',
    'is_resource',
    'is_callable',
    'is_numeric',
    'var_dump',
    'var_export',
    'serialize',
    'unserialize',
    'json_encode',
    'json_decode',
    'preg_match',
    'preg_replace',
    'preg_split',
    'date',
    'time',
    'strtotime',
    'microtime',
    'sleep',
    'usleep',
  ],

  constants: [
    // Boolean and null constants
    'true',
    'false',
    'null',
    'TRUE',
    'FALSE',
    'NULL',

    // Magic constants
    '__CLASS__',
    '__DIR__',
    '__FILE__',
    '__FUNCTION__',
    '__LINE__',
    '__METHOD__',
    '__NAMESPACE__',
    '__TRAIT__',
    '__PROPERTY__',
    '__COMPILER_HALT_OFFSET__',

    // PHP Version constants
    'PHP_VERSION',
    'PHP_MAJOR_VERSION',
    'PHP_MINOR_VERSION',
    'PHP_RELEASE_VERSION',
    'PHP_VERSION_ID',
    'PHP_EXTRA_VERSION',

    // Build information
    'ZEND_THREAD_SAFE',
    'ZEND_DEBUG_BUILD',
    'PHP_ZTS',
    'PHP_DEBUG',

    // System information
    'PHP_OS',
    'PHP_OS_FAMILY',
    'PHP_SAPI',
    'PHP_EOL',
    'PHP_MAXPATHLEN',

    // Numeric limits
    'PHP_INT_MAX',
    'PHP_INT_MIN',
    'PHP_INT_SIZE',
    'PHP_FLOAT_DIG',
    'PHP_FLOAT_EPSILON',
    'PHP_FLOAT_MIN',
    'PHP_FLOAT_MAX',

    // Error constants
    'E_ERROR',
    'E_WARNING',
    'E_PARSE',
    'E_NOTICE',
    'E_CORE_ERROR',
    'E_CORE_WARNING',
    'E_COMPILE_ERROR',
    'E_COMPILE_WARNING',
    'E_USER_ERROR',
    'E_USER_WARNING',
    'E_USER_NOTICE',
    'E_RECOVERABLE_ERROR',
    'E_DEPRECATED',
    'E_USER_DEPRECATED',
    'E_ALL',
    'E_STRICT',

    // CLI constants
    'STDERR',
    'STDIN',
    'STDOUT',

    // Debug constants
    'DEBUG_BACKTRACE_PROVIDE_OBJECT',
    'DEBUG_BACKTRACE_IGNORE_ARGS',

    // Path constants
    'DEFAULT_INCLUDE_PATH',
    'PEAR_INSTALL_DIR',
    'PEAR_EXTENSION_DIR',
  ],

  operators: [
    // Assignment operators
    '=',
    '+=',
    '-=',
    '*=',
    '/=',
    '%=',
    '**=',
    '.=',
    '&=',
    '|=',
    '^=',
    '<<=',
    '>>=',
    '??=',

    // Arithmetic operators
    '+',
    '-',
    '*',
    '/',
    '%',
    '**',

    // Comparison operators
    '==',
    '===',
    '!=',
    '<>',
    '!==',
    '<',
    '<=',
    '>',
    '>=',
    '<=>',

    // Logical operators
    '&&',
    '||',
    '!',

    // Bitwise operators
    '&',
    '|',
    '^',
    '~',
    '<<',
    '>>',

    // Increment/Decrement
    '++',
    '--',

    // Other operators
    '?',
    ':',
    '??',
    '=>',
    '.',
    '@',
    '...',
  ],

  symbols: /[=><!~?:&|+\-*/^%@.]+/,
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      // Variables
      [/\$[a-zA-Z_]\w*/, 'variable'],

      // Keywords and identifiers
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            '@keywords': 'keyword',
            '@typeKeywords': 'type',
            '@constants': 'constant',
            '@builtinFunctions': 'predefined',
            '@default': 'identifier',
          },
        },
      ],

      // Whitespace
      { include: '@whitespace' },

      // Numbers
      [/[0-9_]*\.[0-9_]+([eE][-+]?\d+)?[fFdD]?/, 'number.float'],
      [/0[xX][0-9a-fA-F_]+[Ll]?/, 'number.hex'],
      [/0[0-7_]+[Ll]?/, 'number.octal'],
      [/0[bB][0-1_]+[Ll]?/, 'number.binary'],
      [/[0-9_]+[Ll]?/, 'number'],

      // Delimiters and operators
      [/[{}()[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [
        /@symbols/,
        {
          cases: {
            '@operators': 'operator',
            '@default': '',
          },
        },
      ],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-terminated string
      [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-terminated string
      [
        /"/,
        { token: 'string.quote', bracket: '@open', next: '@string_double' },
      ],
      [
        /'/,
        { token: 'string.quote', bracket: '@open', next: '@string_single' },
      ],
      [
        /`/,
        { token: 'string.quote', bracket: '@open', next: '@string_backtick' },
      ],

      // Characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid'],
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
      [/#.*$/, 'comment'],
    ],

    comment: [
      [/[^/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'], // nested comment
      ['\\*/', 'comment', '@pop'],
      [/[/*]/, 'comment'],
    ],

    string_double: [
      [/[^\\"$]+/, 'string'],
      [/\$[a-zA-Z_]\w*/, 'variable'],
      [/{\\$[a-zA-Z_]\\w*}/, 'variable'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    string_single: [
      [/[^\\']+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],

    string_backtick: [
      [/[^\\`$]+/, 'string'],
      [/\$[a-zA-Z_]\w*/, 'variable'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/`/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
    ],
  },
};

// PHP Function Signatures for autocompletion
interface FunctionSignature {
  name: string;
  signature: string;
  description: string;
  parameters?: string[];
}

const phpFunctionSignatures: FunctionSignature[] = [
  // String functions
  {
    name: 'strlen',
    signature: 'strlen(string $string): int',
    description: 'Get string length',
  },
  {
    name: 'substr',
    signature:
      'substr(string $string, int $offset, ?int $length = null): string',
    description: 'Return part of a string',
  },
  {
    name: 'strpos',
    signature:
      'strpos(string $haystack, string $needle, int $offset = 0): int|false',
    description: 'Find position of first occurrence of string',
  },
  {
    name: 'str_replace',
    signature:
      'str_replace(array|string $search, array|string $replace, string|array $subject, int &$count = null): string|array',
    description: 'Replace all occurrences of search string with replacement',
  },
  {
    name: 'explode',
    signature:
      'explode(string $delimiter, string $string, int $limit = PHP_INT_MAX): array',
    description: 'Split string by delimiter',
  },
  {
    name: 'implode',
    signature: 'implode(string $separator, array $array): string',
    description: 'Join array elements with string',
  },
  {
    name: 'trim',
    signature:
      'trim(string $string, string $characters = " \\n\\r\\t\\v\\0"): string',
    description: 'Strip whitespace from beginning and end',
  },
  {
    name: 'strtolower',
    signature: 'strtolower(string $string): string',
    description: 'Make string lowercase',
  },
  {
    name: 'strtoupper',
    signature: 'strtoupper(string $string): string',
    description: 'Make string uppercase',
  },
  {
    name: 'ucfirst',
    signature: 'ucfirst(string $string): string',
    description: 'Make first character uppercase',
  },
  {
    name: 'str_contains',
    signature: 'str_contains(string $haystack, string $needle): bool',
    description: 'Determine if string contains substring',
  },
  {
    name: 'str_starts_with',
    signature: 'str_starts_with(string $haystack, string $needle): bool',
    description: 'Check if string starts with substring',
  },
  {
    name: 'str_ends_with',
    signature: 'str_ends_with(string $haystack, string $needle): bool',
    description: 'Check if string ends with substring',
  },

  // Array functions
  {
    name: 'count',
    signature: 'count(Countable|array $value, int $mode = COUNT_NORMAL): int',
    description: 'Count elements in array',
  },
  {
    name: 'array_push',
    signature: 'array_push(array &$array, mixed ...$values): int',
    description: 'Push elements onto end of array',
  },
  {
    name: 'array_pop',
    signature: 'array_pop(array &$array): mixed',
    description: 'Pop element off end of array',
  },
  {
    name: 'array_shift',
    signature: 'array_shift(array &$array): mixed',
    description: 'Shift element off beginning of array',
  },
  {
    name: 'array_unshift',
    signature: 'array_unshift(array &$array, mixed ...$values): int',
    description: 'Prepend elements to beginning of array',
  },
  {
    name: 'array_merge',
    signature: 'array_merge(array ...$arrays): array',
    description: 'Merge arrays',
  },
  {
    name: 'array_keys',
    signature:
      'array_keys(array $array, mixed $search_value = null, bool $strict = false): array',
    description: 'Return array keys',
  },
  {
    name: 'array_values',
    signature: 'array_values(array $array): array',
    description: 'Return array values',
  },
  {
    name: 'array_filter',
    signature:
      'array_filter(array $array, ?callable $callback = null, int $mode = 0): array',
    description: 'Filter array elements',
  },
  {
    name: 'array_map',
    signature:
      'array_map(?callable $callback, array $array, array ...$arrays): array',
    description: 'Apply callback to array elements',
  },
  {
    name: 'in_array',
    signature:
      'in_array(mixed $needle, array $haystack, bool $strict = false): bool',
    description: 'Check if value exists in array',
  },
  {
    name: 'array_search',
    signature:
      'array_search(mixed $needle, array $haystack, bool $strict = false): int|string|false',
    description: 'Search array for value',
  },
  {
    name: 'array_key_exists',
    signature: 'array_key_exists(string|int $key, array $array): bool',
    description: 'Check if key exists in array',
  },

  // JSON functions
  {
    name: 'json_encode',
    signature:
      'json_encode(mixed $value, int $flags = 0, int $depth = 512): string|false',
    description: 'Encode value as JSON',
  },
  {
    name: 'json_decode',
    signature:
      'json_decode(string $json, ?bool $associative = null, int $depth = 512, int $flags = 0): mixed',
    description: 'Decode JSON string',
  },

  // Type checking functions
  {
    name: 'is_array',
    signature: 'is_array(mixed $value): bool',
    description: 'Check if variable is array',
  },
  {
    name: 'is_string',
    signature: 'is_string(mixed $value): bool',
    description: 'Check if variable is string',
  },
  {
    name: 'is_int',
    signature: 'is_int(mixed $value): bool',
    description: 'Check if variable is integer',
  },
  {
    name: 'is_float',
    signature: 'is_float(mixed $value): bool',
    description: 'Check if variable is float',
  },
  {
    name: 'is_bool',
    signature: 'is_bool(mixed $value): bool',
    description: 'Check if variable is boolean',
  },
  {
    name: 'is_null',
    signature: 'is_null(mixed $value): bool',
    description: 'Check if variable is null',
  },
  {
    name: 'is_object',
    signature: 'is_object(mixed $value): bool',
    description: 'Check if variable is object',
  },
  {
    name: 'is_callable',
    signature:
      'is_callable(mixed $value, bool $syntax_only = false, string &$callable_name = null): bool',
    description: 'Check if variable is callable',
  },
  {
    name: 'is_numeric',
    signature: 'is_numeric(mixed $value): bool',
    description: 'Check if variable is numeric',
  },

  // File functions
  {
    name: 'file_exists',
    signature: 'file_exists(string $filename): bool',
    description: 'Check if file exists',
  },
  {
    name: 'file_get_contents',
    signature:
      'file_get_contents(string $filename, bool $use_include_path = false, ?resource $context = null, int $offset = 0, ?int $length = null): string|false',
    description: 'Read file contents into string',
  },
  {
    name: 'file_put_contents',
    signature:
      'file_put_contents(string $filename, mixed $data, int $flags = 0, ?resource $context = null): int|false',
    description: 'Write data to file',
  },

  // Date/time functions
  {
    name: 'date',
    signature: 'date(string $format, ?int $timestamp = null): string',
    description: 'Format timestamp as date string',
  },
  {
    name: 'time',
    signature: 'time(): int',
    description: 'Get current Unix timestamp',
  },
  {
    name: 'strtotime',
    signature:
      'strtotime(string $datetime, ?int $baseTimestamp = null): int|false',
    description: 'Parse datetime string to timestamp',
  },

  // Variable functions
  {
    name: 'var_dump',
    signature: 'var_dump(mixed ...$values): void',
    description: 'Dump variable information',
  },
  {
    name: 'var_export',
    signature: 'var_export(mixed $value, bool $return = false): ?string',
    description: 'Export variable as string',
  },
  {
    name: 'print_r',
    signature: 'print_r(mixed $value, bool $return = false): string|bool',
    description: 'Print human-readable variable information',
  },

  // Regular expressions
  {
    name: 'preg_match',
    signature:
      'preg_match(string $pattern, string $subject, array &$matches = null, int $flags = 0, int $offset = 0): int|false',
    description: 'Perform regular expression match',
  },
  {
    name: 'preg_replace',
    signature:
      'preg_replace(string|array $pattern, string|array $replacement, string|array $subject, int $limit = -1, int &$count = null): string|array|null',
    description: 'Perform regular expression replacement',
  },
  {
    name: 'preg_split',
    signature:
      'preg_split(string $pattern, string $subject, int $limit = -1, int $flags = 0): array|false',
    description: 'Split string by regular expression',
  },
];

// PHP Completion Provider
export const phpCompletionProvider: languages.CompletionItemProvider = {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const suggestions: languages.CompletionItem[] = [];

    // Add function completions
    phpFunctionSignatures.forEach((func) => {
      suggestions.push({
        label: func.name,
        kind: languages.CompletionItemKind.Function,
        insertText: `${func.name}()`,
        insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        detail: func.signature,
        documentation: func.description,
      });
    });

    // Add constants completions
    phpInlineTokenizer.constants?.forEach((constant: string) => {
      suggestions.push({
        label: constant,
        kind: languages.CompletionItemKind.Constant,
        insertText: constant,
        range,
        detail: `PHP constant: ${constant}`,
      });
    });

    // Add keyword completions
    phpInlineTokenizer.keywords?.forEach((keyword: string) => {
      suggestions.push({
        label: keyword,
        kind: languages.CompletionItemKind.Keyword,
        insertText: keyword,
        range,
        detail: `PHP keyword: ${keyword}`,
      });
    });

    return { suggestions };
  },
};

// PHP Hover Provider
export const phpHoverProvider: languages.HoverProvider = {
  provideHover: (model, position) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;

    const wordText = word.word;

    // Find function signature
    const functionInfo = phpFunctionSignatures.find(
      (func) => func.name === wordText,
    );

    if (functionInfo) {
      return {
        range: new Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents: [
          {
            value: `**${functionInfo.name}**`,
          },
          {
            value: `\`\`\`php\n${functionInfo.signature}\n\`\`\``,
          },
          {
            value: functionInfo.description,
          },
        ],
      };
    }

    // Check if it's a PHP constant
    if (phpInlineTokenizer.constants?.includes(wordText)) {
      let description = 'PHP constant';

      // Add specific descriptions for well-known constants
      if (wordText.startsWith('__') && wordText.endsWith('__')) {
        const constantDescriptions: Record<string, string> = {
          __CLASS__: 'The name of the current class',
          __DIR__: 'The directory of the current file',
          __FILE__: 'The full path and filename of the current file',
          __FUNCTION__: 'The name of the current function',
          __LINE__: 'The current line number',
          __METHOD__: 'The name of the current class method',
          __NAMESPACE__: 'The name of the current namespace',
          __TRAIT__: 'The name of the current trait',
          __PROPERTY__: 'The name of the current property (PHP 8.4+)',
        };
        description = constantDescriptions[wordText] || 'PHP magic constant';
      } else if (wordText.startsWith('E_')) {
        description = 'PHP error constant';
      } else if (wordText.startsWith('PHP_')) {
        description = 'PHP core constant';
      }

      return {
        range: new Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents: [
          {
            value: `**${wordText}**`,
          },
          {
            value: description,
          },
        ],
      };
    }

    // Check if it's a PHP keyword
    if (phpInlineTokenizer.keywords?.includes(wordText)) {
      const keywordDescriptions: Record<string, string> = {
        abstract: 'Declares a class or method as abstract',
        array: 'Creates an array',
        as: 'Used in foreach loops and imports',
        break: 'Breaks out of loops',
        case: 'Case clause in switch statements',
        catch: 'Catches exceptions',
        class: 'Declares a class',
        clone: 'Clones an object',
        const: 'Declares a constant',
        continue: 'Continues to next iteration',
        declare: 'Sets execution directives',
        default: 'Default case in switch',
        do: 'Do-while loop',
        echo: 'Outputs strings',
        else: 'Else clause',
        elseif: 'Else if clause',
        empty: 'Checks if variable is empty',
        extends: 'Extends a class',
        final: 'Final class or method',
        finally: 'Finally block in try-catch',
        fn: 'Arrow function (PHP 7.4+)',
        for: 'For loop',
        foreach: 'Foreach loop',
        function: 'Declares a function',
        global: 'Declares global variables',
        goto: 'Jump to another point',
        if: 'Conditional statement',
        implements: 'Implements an interface',
        include: 'Includes a file',
        include_once: 'Includes a file once',
        instanceof: 'Tests object instance',
        interface: 'Declares an interface',
        isset: 'Checks if variable is set',
        list: 'Assigns variables from array',
        match: 'Match expression (PHP 8.0+)',
        namespace: 'Declares a namespace',
        new: 'Creates object instance',
        print: 'Outputs a string',
        private: 'Private visibility',
        protected: 'Protected visibility',
        public: 'Public visibility',
        readonly: 'Readonly property (PHP 8.1+)',
        require: 'Requires a file',
        require_once: 'Requires a file once',
        return: 'Returns from function',
        static: 'Static property/method',
        switch: 'Switch statement',
        throw: 'Throws an exception',
        trait: 'Declares a trait',
        try: 'Try block',
        unset: 'Unsets variables',
        use: 'Imports namespaces/traits',
        var: 'Declares property',
        while: 'While loop',
        yield: 'Yields value from generator',
        'yield from': 'Yields from another generator',
      };

      const description = keywordDescriptions[wordText] || 'PHP keyword';

      return {
        range: new Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents: [
          {
            value: `**${wordText}**`,
          },
          {
            value: description,
          },
        ],
      };
    }

    return null;
  },
};
