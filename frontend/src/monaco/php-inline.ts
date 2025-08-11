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
    'parent',
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

    // JSON constants
    'JSON_HEX_TAG',
    'JSON_HEX_AMP',
    'JSON_HEX_APOS',
    'JSON_HEX_QUOT',
    'JSON_FORCE_OBJECT',
    'JSON_NUMERIC_CHECK',
    'JSON_BIGINT_AS_STRING',
    'JSON_PRETTY_PRINT',
    'JSON_UNESCAPED_SLASHES',
    'JSON_UNESCAPED_UNICODE',
    'JSON_PARTIAL_OUTPUT_ON_ERROR',
    'JSON_PRESERVE_ZERO_FRACTION',
    'JSON_UNESCAPED_LINE_TERMINATORS',
    'JSON_THROW_ON_ERROR',
    'JSON_INVALID_UTF8_IGNORE',
    'JSON_INVALID_UTF8_SUBSTITUTE',
    'JSON_ERROR_NONE',
    'JSON_ERROR_DEPTH',
    'JSON_ERROR_STATE_MISMATCH',
    'JSON_ERROR_CTRL_CHAR',
    'JSON_ERROR_SYNTAX',
    'JSON_ERROR_UTF8',
    'JSON_ERROR_RECURSION',
    'JSON_ERROR_INF_OR_NAN',
    'JSON_ERROR_UNSUPPORTED_TYPE',
    'JSON_ERROR_INVALID_PROPERTY_NAME',
    'JSON_ERROR_UTF16',
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
      // Special PHP pseudo-variables
      [/\$this\b/, 'variable.language'],
      
      // Variables
      [/\$[a-zA-Z_]\w*/, 'variable'],

      // Class names after keywords (with proper capture groups)
      [/(new\s+)([A-Z]\w*)/, ['keyword', 'type.identifier']],
      [/(class\s+)([A-Z]\w*)/, ['keyword', 'type.identifier']],
      [/(extends\s+)([A-Z]\w*)/, ['keyword', 'type.identifier']],
      [/(implements\s+)([A-Z]\w*)/, ['keyword', 'type.identifier']],

      // Use statements - highlight namespaced class names (with alias support)
      [
        /(use\s+)((?:[A-Z]\w*\\)*[A-Z]\w*)(\s+as\s+)([A-Za-z]\w*)/,
        ['keyword', 'type.identifier', 'keyword', 'type.identifier'],
      ],
      [/(use\s+)((?:[A-Z]\w*\\)*[A-Z]\w*)/, ['keyword', 'type.identifier']],

      // Namespace declarations
      [
        /(namespace\s+)((?:[A-Z]\w*\\)*[A-Z]\w*)/,
        ['keyword', 'type.identifier'],
      ],

      // Static method calls
      [/([A-Z]\w*)(::)/, ['type.identifier', 'operator']],

      // Object method calls (->method())
      [/(->)([a-zA-Z_]\w*)(\s*)(\()/, ['operator', 'entity.name.function', 'white', '@brackets']],
      
      // Object property access (->property without parentheses)
      [/(->)([a-zA-Z_]\w*)/, ['operator', 'variable.other.property']],

      // Method calls (identifier followed by parentheses)
      [
        /([a-zA-Z_]\w*)(\s*)(\()/,
        {
          cases: {
            '$1@keywords': ['keyword', 'white', '@brackets'],
            '$1@builtinFunctions': ['support.function', 'white', '@brackets'],
            '@default': ['entity.name.function', 'white', '@brackets'],
          },
        },
      ],

      // Class names in type hints (standalone PascalCase before variables, not constants)
      [/[A-Z]\w*(?=\s+\$)/, 'type.identifier'],

      // PHP constants (ALL_CAPS identifiers)
      [/[A-Z][A-Z0-9_]*/, 'constant'],

      // Namespace references
      [/\\[A-Z]\w*(?:\\[A-Z]\w*)*/, 'type.identifier'],

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
  // String functions - comprehensive list with accurate signatures
  {
    name: 'addcslashes',
    signature: 'addcslashes(string $str, string $charlist): string',
    description: 'Quote string with slashes in a C style',
  },
  {
    name: 'addslashes',
    signature: 'addslashes(string $string): string',
    description: 'Quote string with slashes',
  },
  {
    name: 'bin2hex',
    signature: 'bin2hex(string $string): string',
    description: 'Convert binary data into hexadecimal representation',
  },
  {
    name: 'chr',
    signature: 'chr(int $codepoint): string',
    description: 'Generate a single-byte string from a number',
  },
  {
    name: 'chunk_split',
    signature:
      'chunk_split(string $string, int $length = 76, string $separator = "\r\n"): string',
    description: 'Split a string into smaller chunks',
  },
  {
    name: 'crc32',
    signature: 'crc32(string $string): int',
    description: 'Calculates the crc32 polynomial of a string',
  },
  {
    name: 'crypt',
    signature: 'crypt(string $string, string $salt): string',
    description: 'One-way string hashing',
  },
  {
    name: 'echo',
    signature: 'echo(string ...$expressions): void',
    description: 'Output one or more strings',
  },
  {
    name: 'explode',
    signature:
      'explode(string $separator, string $string, int $limit = PHP_INT_MAX): array',
    description: 'Split a string by a string',
  },
  {
    name: 'hex2bin',
    signature: 'hex2bin(string $string): string|false',
    description: 'Decodes a hexadecimally encoded binary string',
  },
  {
    name: 'html_entity_decode',
    signature:
      'html_entity_decode(string $string, int $flags = ENT_HTML401 | ENT_COMPAT, ?string $encoding = null): string',
    description: 'Convert HTML entities to their corresponding characters',
  },
  {
    name: 'htmlentities',
    signature:
      'htmlentities(string $string, int $flags = ENT_HTML401 | ENT_COMPAT, ?string $encoding = null, bool $double_encode = true): string',
    description: 'Convert all applicable characters to HTML entities',
  },
  {
    name: 'htmlspecialchars',
    signature:
      'htmlspecialchars(string $string, int $flags = ENT_HTML401 | ENT_COMPAT, ?string $encoding = null, bool $double_encode = true): string',
    description: 'Convert special characters to HTML entities',
  },
  {
    name: 'htmlspecialchars_decode',
    signature:
      'htmlspecialchars_decode(string $string, int $flags = ENT_HTML401 | ENT_COMPAT): string',
    description: 'Convert special HTML entities back to characters',
  },
  {
    name: 'implode',
    signature: 'implode(string $separator, array $array): string',
    description: 'Join array elements with a string',
  },
  {
    name: 'lcfirst',
    signature: 'lcfirst(string $string): string',
    description: "Make a string's first character lowercase",
  },
  {
    name: 'levenshtein',
    signature:
      'levenshtein(string $string1, string $string2, int $insertion_cost = 1, int $replacement_cost = 1, int $deletion_cost = 1): int',
    description: 'Calculate Levenshtein distance between two strings',
  },
  {
    name: 'ltrim',
    signature:
      'ltrim(string $string, string $characters = " \\f\\n\\r\\t\\v\\x00"): string',
    description:
      'Strip whitespace (or other characters) from the beginning of a string',
  },
  {
    name: 'md5',
    signature: 'md5(string $string, bool $binary = false): string',
    description: 'Calculate the md5 hash of a string',
  },
  {
    name: 'md5_file',
    signature: 'md5_file(string $filename, bool $binary = false): string|false',
    description: 'Calculates the md5 hash of a given file',
  },
  {
    name: 'nl2br',
    signature: 'nl2br(string $string, bool $use_xhtml = true): string',
    description: 'Inserts HTML line breaks before all newlines in a string',
  },
  {
    name: 'number_format',
    signature:
      'number_format(float $num, int $decimals = 0, ?string $decimal_separator = ".", ?string $thousands_separator = ","): string',
    description: 'Format a number with grouped thousands',
  },
  {
    name: 'ord',
    signature: 'ord(string $character): int',
    description:
      'Convert the first byte of a string to a value between 0 and 255',
  },
  {
    name: 'parse_str',
    signature: 'parse_str(string $string, array &$result): void',
    description: 'Parse a string as a URL query string',
  },
  {
    name: 'print',
    signature: 'print(string $expression): int',
    description: 'Output a string',
  },
  {
    name: 'printf',
    signature: 'printf(string $format, mixed ...$values): int',
    description: 'Output a formatted string',
  },
  {
    name: 'rtrim',
    signature:
      'rtrim(string $string, string $characters = " \\f\\n\\r\\t\\v\\x00"): string',
    description:
      'Strip whitespace (or other characters) from the end of a string',
  },
  {
    name: 'sha1',
    signature: 'sha1(string $string, bool $binary = false): string',
    description: 'Calculate the sha1 hash of a string',
  },
  {
    name: 'sha1_file',
    signature:
      'sha1_file(string $filename, bool $binary = false): string|false',
    description: 'Calculate the sha1 hash of a file',
  },
  {
    name: 'similar_text',
    signature:
      'similar_text(string $string1, string $string2, float &$percent = null): int',
    description: 'Calculate the similarity between two strings',
  },
  {
    name: 'soundex',
    signature: 'soundex(string $string): string',
    description: 'Calculate the soundex key of a string',
  },
  {
    name: 'sprintf',
    signature: 'sprintf(string $format, mixed ...$values): string',
    description: 'Return a formatted string',
  },
  {
    name: 'str_contains',
    signature: 'str_contains(string $haystack, string $needle): bool',
    description: 'Determine if a string contains a given substring',
  },
  {
    name: 'str_ends_with',
    signature: 'str_ends_with(string $haystack, string $needle): bool',
    description: 'Checks if a string ends with a given substring',
  },
  {
    name: 'str_pad',
    signature:
      'str_pad(string $string, int $length, string $pad_string = " ", int $pad_type = STR_PAD_RIGHT): string',
    description: 'Pad a string to a certain length with another string',
  },
  {
    name: 'str_repeat',
    signature: 'str_repeat(string $string, int $times): string',
    description: 'Repeat a string',
  },
  {
    name: 'str_replace',
    signature:
      'str_replace(array|string $search, array|string $replace, string|array $subject, int &$count = null): string|array',
    description:
      'Replace all occurrences of the search string with the replacement string',
  },
  {
    name: 'str_shuffle',
    signature: 'str_shuffle(string $string): string',
    description: 'Randomly shuffles a string',
  },
  {
    name: 'str_split',
    signature: 'str_split(string $string, int $length = 1): array',
    description: 'Convert a string to an array',
  },
  {
    name: 'str_starts_with',
    signature: 'str_starts_with(string $haystack, string $needle): bool',
    description: 'Checks if a string starts with a given substring',
  },
  {
    name: 'str_word_count',
    signature:
      'str_word_count(string $string, int $format = 0, ?string $characters = null): array|int',
    description: 'Return information about words used in a string',
  },
  {
    name: 'strcasecmp',
    signature: 'strcasecmp(string $string1, string $string2): int',
    description: 'Binary safe case-insensitive string comparison',
  },
  {
    name: 'strcmp',
    signature: 'strcmp(string $string1, string $string2): int',
    description: 'Binary safe string comparison',
  },
  {
    name: 'strcspn',
    signature:
      'strcspn(string $string, string $characters, int $offset = 0, ?int $length = null): int',
    description: 'Find length of initial segment not matching mask',
  },
  {
    name: 'strip_tags',
    signature:
      'strip_tags(string $string, array|string|null $allowed_tags = null): string',
    description: 'Strip HTML and PHP tags from a string',
  },
  {
    name: 'stripos',
    signature:
      'stripos(string $haystack, string $needle, int $offset = 0): int|false',
    description:
      'Find the position of the first occurrence of a case-insensitive substring in a string',
  },
  {
    name: 'stripslashes',
    signature: 'stripslashes(string $string): string',
    description: 'Un-quotes a quoted string',
  },
  {
    name: 'stristr',
    signature:
      'stristr(string $haystack, string $needle, bool $before_needle = false): string|false',
    description: 'Case-insensitive strstr',
  },
  {
    name: 'strlen',
    signature: 'strlen(string $string): int',
    description: 'Get string length',
  },
  {
    name: 'strnatcasecmp',
    signature: 'strnatcasecmp(string $string1, string $string2): int',
    description:
      'Case insensitive string comparisons using a "natural order" algorithm',
  },
  {
    name: 'strnatcmp',
    signature: 'strnatcmp(string $string1, string $string2): int',
    description: 'String comparisons using a "natural order" algorithm',
  },
  {
    name: 'strpos',
    signature:
      'strpos(string $haystack, string $needle, int $offset = 0): int|false',
    description:
      'Find the position of the first occurrence of a substring in a string',
  },
  {
    name: 'strrchr',
    signature:
      'strrchr(string $haystack, string $needle, bool $before_needle = false): string|false',
    description: 'Find the last occurrence of a character in a string',
  },
  {
    name: 'strrev',
    signature: 'strrev(string $string): string',
    description: 'Reverse a string',
  },
  {
    name: 'strripos',
    signature:
      'strripos(string $haystack, string $needle, int $offset = 0): int|false',
    description:
      'Find the position of the last occurrence of a case-insensitive substring in a string',
  },
  {
    name: 'strrpos',
    signature:
      'strrpos(string $haystack, string $needle, int $offset = 0): int|false',
    description:
      'Find the position of the last occurrence of a substring in a string',
  },
  {
    name: 'strspn',
    signature:
      'strspn(string $string, string $characters, int $offset = 0, ?int $length = null): int',
    description:
      'Finds the length of the initial segment of a string consisting entirely of characters contained within a given mask',
  },
  {
    name: 'strstr',
    signature:
      'strstr(string $haystack, string $needle, bool $before_needle = false): string|false',
    description: 'Find the first occurrence of a string',
  },
  {
    name: 'strtok',
    signature: 'strtok(string $string, string $token): string|false',
    description: 'Tokenize string',
  },
  {
    name: 'strtolower',
    signature: 'strtolower(string $string): string',
    description: 'Make a string lowercase',
  },
  {
    name: 'strtoupper',
    signature: 'strtoupper(string $string): string',
    description: 'Make a string uppercase',
  },
  {
    name: 'strtr',
    signature: 'strtr(string $string, string $from, string $to): string',
    description: 'Translate characters or replace substrings',
  },
  {
    name: 'substr',
    signature:
      'substr(string $string, int $offset, ?int $length = null): string',
    description: 'Return part of a string',
  },
  {
    name: 'substr_compare',
    signature:
      'substr_compare(string $haystack, string $needle, int $offset, ?int $length = null, bool $case_insensitive = false): int',
    description:
      'Binary safe comparison of two strings from an offset, up to length characters',
  },
  {
    name: 'substr_count',
    signature:
      'substr_count(string $haystack, string $needle, int $offset = 0, ?int $length = null): int',
    description: 'Count the number of substring occurrences',
  },
  {
    name: 'substr_replace',
    signature:
      'substr_replace(array|string $string, array|string $replacement, array|int $offset, array|int|null $length = null): string|array',
    description: 'Replace text within a portion of a string',
  },
  {
    name: 'trim',
    signature:
      'trim(string $string, string $characters = " \\f\\n\\r\\t\\v\\x00"): string',
    description:
      'Strip whitespace (or other characters) from the beginning and end of a string',
  },
  {
    name: 'ucfirst',
    signature: 'ucfirst(string $string): string',
    description: "Make a string's first character uppercase",
  },
  {
    name: 'ucwords',
    signature:
      'ucwords(string $string, string $separators = " \\f\\n\\r\\t\\v"): string',
    description: 'Uppercase the first character of each word in a string',
  },
  {
    name: 'wordwrap',
    signature:
      'wordwrap(string $string, int $width = 75, string $break = "\\n", bool $cut_long_words = false): string',
    description: 'Wraps a string to a given number of characters',
  },

  // Array functions - comprehensive list with accurate signatures
  {
    name: 'array',
    signature: 'array(mixed ...$values): array',
    description: 'Create an array',
  },
  {
    name: 'array_all',
    signature: 'array_all(array $array, callable $callback): bool',
    description: 'Checks if all array elements satisfy a callback function',
  },
  {
    name: 'array_any',
    signature: 'array_any(array $array, callable $callback): bool',
    description:
      'Checks if at least one array element satisfies a callback function',
  },
  {
    name: 'array_change_key_case',
    signature:
      'array_change_key_case(array $array, int $case = CASE_LOWER): array',
    description: 'Changes the case of all keys in an array',
  },
  {
    name: 'array_chunk',
    signature:
      'array_chunk(array $array, int $length, bool $preserve_keys = false): array',
    description: 'Split an array into chunks',
  },
  {
    name: 'array_column',
    signature:
      'array_column(array $array, int|string|null $column_key, int|string|null $index_key = null): array',
    description: 'Return the values from a single column in the input array',
  },
  {
    name: 'array_combine',
    signature: 'array_combine(array $keys, array $values): array',
    description:
      'Creates an array by using one array for keys and another for its values',
  },
  {
    name: 'array_count_values',
    signature: 'array_count_values(array $array): array',
    description: 'Counts the occurrences of each distinct value in an array',
  },
  {
    name: 'array_diff',
    signature: 'array_diff(array $array, array ...$arrays): array',
    description: 'Computes the difference of arrays',
  },
  {
    name: 'array_diff_assoc',
    signature: 'array_diff_assoc(array $array, array ...$arrays): array',
    description:
      'Computes the difference of arrays with additional index check',
  },
  {
    name: 'array_diff_key',
    signature: 'array_diff_key(array $array, array ...$arrays): array',
    description: 'Computes the difference of arrays using keys for comparison',
  },
  {
    name: 'array_fill',
    signature: 'array_fill(int $start_index, int $count, mixed $value): array',
    description: 'Fill an array with values',
  },
  {
    name: 'array_fill_keys',
    signature: 'array_fill_keys(array $keys, mixed $value): array',
    description: 'Fill an array with values, specifying keys',
  },
  {
    name: 'array_filter',
    signature:
      'array_filter(array $array, ?callable $callback = null, int $mode = 0): array',
    description: 'Filters elements of an array using a callback function',
  },
  {
    name: 'array_find',
    signature: 'array_find(array $array, callable $callback): mixed',
    description: 'Returns the first element satisfying a callback function',
  },
  {
    name: 'array_find_key',
    signature: 'array_find_key(array $array, callable $callback): mixed',
    description:
      'Returns the key of the first element satisfying a callback function',
  },
  {
    name: 'array_flip',
    signature: 'array_flip(array $array): array',
    description: 'Exchanges all keys with their associated values in an array',
  },
  {
    name: 'array_intersect',
    signature: 'array_intersect(array $array, array ...$arrays): array',
    description: 'Computes the intersection of arrays',
  },
  {
    name: 'array_intersect_assoc',
    signature: 'array_intersect_assoc(array $array, array ...$arrays): array',
    description:
      'Computes the intersection of arrays with additional index check',
  },
  {
    name: 'array_intersect_key',
    signature: 'array_intersect_key(array $array, array ...$arrays): array',
    description:
      'Computes the intersection of arrays using keys for comparison',
  },
  {
    name: 'array_is_list',
    signature: 'array_is_list(array $array): bool',
    description: 'Checks whether a given array is a list',
  },
  {
    name: 'array_key_exists',
    signature: 'array_key_exists(string|int $key, array $array): bool',
    description: 'Checks if the given key or index exists in the array',
  },
  {
    name: 'array_key_first',
    signature: 'array_key_first(array $array): int|string|null',
    description: 'Gets the first key of an array',
  },
  {
    name: 'array_key_last',
    signature: 'array_key_last(array $array): int|string|null',
    description: 'Gets the last key of an array',
  },
  {
    name: 'array_keys',
    signature:
      'array_keys(array $array, mixed $search_value = null, bool $strict = false): array',
    description: 'Return all the keys or a subset of the keys of an array',
  },
  {
    name: 'array_map',
    signature:
      'array_map(?callable $callback, array $array, array ...$arrays): array',
    description: 'Applies the callback to the elements of the given arrays',
  },
  {
    name: 'array_merge',
    signature: 'array_merge(array ...$arrays): array',
    description: 'Merge one or more arrays',
  },
  {
    name: 'array_merge_recursive',
    signature: 'array_merge_recursive(array ...$arrays): array',
    description: 'Merge one or more arrays recursively',
  },
  {
    name: 'array_pad',
    signature: 'array_pad(array $array, int $length, mixed $value): array',
    description: 'Pad array to the specified length with a value',
  },
  {
    name: 'array_pop',
    signature: 'array_pop(array &$array): mixed',
    description: 'Pop the element off the end of array',
  },
  {
    name: 'array_product',
    signature: 'array_product(array $array): int|float',
    description: 'Calculate the product of values in an array',
  },
  {
    name: 'array_push',
    signature: 'array_push(array &$array, mixed ...$values): int',
    description: 'Push one or more elements onto the end of array',
  },
  {
    name: 'array_rand',
    signature: 'array_rand(array $array, int $num = 1): int|string|array',
    description: 'Pick one or more random keys out of an array',
  },
  {
    name: 'array_reduce',
    signature:
      'array_reduce(array $array, callable $callback, mixed $initial = null): mixed',
    description:
      'Iteratively reduce the array to a single value using a callback function',
  },
  {
    name: 'array_replace',
    signature: 'array_replace(array $array, array ...$replacements): array',
    description: 'Replaces elements from passed arrays into the first array',
  },
  {
    name: 'array_replace_recursive',
    signature:
      'array_replace_recursive(array $array, array ...$replacements): array',
    description:
      'Replaces elements from passed arrays into the first array recursively',
  },
  {
    name: 'array_reverse',
    signature:
      'array_reverse(array $array, bool $preserve_keys = false): array',
    description: 'Return an array with elements in reverse order',
  },
  {
    name: 'array_search',
    signature:
      'array_search(mixed $needle, array $haystack, bool $strict = false): int|string|false',
    description:
      'Searches the array for a given value and returns the first corresponding key if successful',
  },
  {
    name: 'array_shift',
    signature: 'array_shift(array &$array): mixed',
    description: 'Shift an element off the beginning of array',
  },
  {
    name: 'array_slice',
    signature:
      'array_slice(array $array, int $offset, ?int $length = null, bool $preserve_keys = false): array',
    description: 'Extract a slice of the array',
  },
  {
    name: 'array_splice',
    signature:
      'array_splice(array &$array, int $offset, ?int $length = null, mixed $replacement = []): array',
    description:
      'Remove a portion of the array and replace it with something else',
  },
  {
    name: 'array_sum',
    signature: 'array_sum(array $array): int|float',
    description: 'Calculate the sum of values in an array',
  },
  {
    name: 'array_unique',
    signature: 'array_unique(array $array, int $flags = SORT_STRING): array',
    description: 'Removes duplicate values from an array',
  },
  {
    name: 'array_unshift',
    signature: 'array_unshift(array &$array, mixed ...$values): int',
    description: 'Prepend one or more elements to the beginning of an array',
  },
  {
    name: 'array_values',
    signature: 'array_values(array $array): array',
    description: 'Return all the values of an array',
  },
  {
    name: 'array_walk',
    signature:
      'array_walk(array|object &$array, callable $callback, mixed $arg = null): bool',
    description: 'Apply a user supplied function to every member of an array',
  },
  {
    name: 'array_walk_recursive',
    signature:
      'array_walk_recursive(array|object &$array, callable $callback, mixed $arg = null): bool',
    description:
      'Apply a user function recursively to every member of an array',
  },
  {
    name: 'arsort',
    signature: 'arsort(array &$array, int $flags = SORT_REGULAR): bool',
    description:
      'Sort an array in descending order and maintain index association',
  },
  {
    name: 'asort',
    signature: 'asort(array &$array, int $flags = SORT_REGULAR): bool',
    description:
      'Sort an array in ascending order and maintain index association',
  },
  {
    name: 'compact',
    signature:
      'compact(array|string $var_name, array|string ...$var_names): array',
    description: 'Create array containing variables and their values',
  },
  {
    name: 'count',
    signature: 'count(Countable|array $value, int $mode = COUNT_NORMAL): int',
    description: 'Counts all elements in an array or in a Countable object',
  },
  {
    name: 'current',
    signature: 'current(array|object $array): mixed',
    description: 'Return the current element in an array',
  },
  {
    name: 'end',
    signature: 'end(array|object &$array): mixed',
    description: 'Set the internal pointer of an array to its last element',
  },
  {
    name: 'extract',
    signature:
      'extract(array &$array, int $flags = EXTR_OVERWRITE, string $prefix = ""): int',
    description: 'Import variables into the current symbol table from an array',
  },
  {
    name: 'in_array',
    signature:
      'in_array(mixed $needle, array $haystack, bool $strict = false): bool',
    description: 'Checks if a value exists in an array',
  },
  {
    name: 'key',
    signature: 'key(array|object $array): int|string|null',
    description: 'Fetch a key from an array',
  },
  {
    name: 'krsort',
    signature: 'krsort(array &$array, int $flags = SORT_REGULAR): bool',
    description: 'Sort an array by key in descending order',
  },
  {
    name: 'ksort',
    signature: 'ksort(array &$array, int $flags = SORT_REGULAR): bool',
    description: 'Sort an array by key in ascending order',
  },
  {
    name: 'natcasesort',
    signature: 'natcasesort(array &$array): bool',
    description:
      'Sort an array using a case insensitive "natural order" algorithm',
  },
  {
    name: 'natsort',
    signature: 'natsort(array &$array): bool',
    description: 'Sort an array using a "natural order" algorithm',
  },
  {
    name: 'next',
    signature: 'next(array|object &$array): mixed',
    description: 'Advance the internal pointer of an array',
  },
  {
    name: 'prev',
    signature: 'prev(array|object &$array): mixed',
    description: 'Rewind the internal array pointer',
  },
  {
    name: 'range',
    signature:
      'range(string|int|float $start, string|int|float $end, int|float $step = 1): array',
    description: 'Create an array containing a range of elements',
  },
  {
    name: 'reset',
    signature: 'reset(array|object &$array): mixed',
    description: 'Set the internal pointer of an array to its first element',
  },
  {
    name: 'rsort',
    signature: 'rsort(array &$array, int $flags = SORT_REGULAR): bool',
    description: 'Sort an array in descending order',
  },
  {
    name: 'shuffle',
    signature: 'shuffle(array &$array): bool',
    description: 'Shuffle an array',
  },
  {
    name: 'sizeof',
    signature: 'sizeof(Countable|array $value, int $mode = COUNT_NORMAL): int',
    description: 'Alias of count',
  },
  {
    name: 'sort',
    signature: 'sort(array &$array, int $flags = SORT_REGULAR): bool',
    description: 'Sort an array in ascending order',
  },
  {
    name: 'uasort',
    signature: 'uasort(array &$array, callable $callback): bool',
    description:
      'Sort an array with a user-defined comparison function and maintain index association',
  },
  {
    name: 'uksort',
    signature: 'uksort(array &$array, callable $callback): bool',
    description:
      'Sort an array by keys using a user-defined comparison function',
  },
  {
    name: 'usort',
    signature: 'usort(array &$array, callable $callback): bool',
    description:
      'Sort an array by values using a user-defined comparison function',
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
  {
    name: 'is_resource',
    signature: 'is_resource(mixed $value): bool',
    description: 'Check if variable is resource',
  },

  // File functions
  {
    name: 'file_exists',
    signature: 'file_exists(string $filename): bool',
    description: 'Check if file or directory exists',
  },
  {
    name: 'file_get_contents',
    signature:
      'file_get_contents(string $filename, bool $use_include_path = false, ?resource $context = null, int $offset = 0, ?int $length = null): string|false',
    description: 'Reads entire file into a string',
  },
  {
    name: 'file_put_contents',
    signature:
      'file_put_contents(string $filename, mixed $data, int $flags = 0, ?resource $context = null): int|false',
    description: 'Write data to a file',
  },

  // Date/time functions
  {
    name: 'date',
    signature: 'date(string $format, ?int $timestamp = null): string',
    description: 'Format a Unix timestamp',
  },
  {
    name: 'time',
    signature: 'time(): int',
    description: 'Return current Unix timestamp',
  },
  {
    name: 'strtotime',
    signature:
      'strtotime(string $datetime, ?int $baseTimestamp = null): int|false',
    description:
      'Parse about any English textual datetime description into a Unix timestamp',
  },
  {
    name: 'microtime',
    signature: 'microtime(bool $as_float = false): string|float',
    description: 'Return current Unix timestamp with microseconds',
  },
  {
    name: 'sleep',
    signature: 'sleep(int $seconds): int',
    description: 'Delay execution',
  },
  {
    name: 'usleep',
    signature: 'usleep(int $microseconds): void',
    description: 'Delay execution in microseconds',
  },

  // Variable functions
  {
    name: 'var_dump',
    signature: 'var_dump(mixed ...$values): void',
    description: 'Dumps information about a variable',
  },
  {
    name: 'var_export',
    signature: 'var_export(mixed $value, bool $return = false): ?string',
    description:
      'Outputs or returns a parsable string representation of a variable',
  },
  {
    name: 'print_r',
    signature: 'print_r(mixed $value, bool $return = false): string|bool',
    description: 'Prints human-readable information about a variable',
  },
  {
    name: 'serialize',
    signature: 'serialize(mixed $value): string',
    description: 'Generates a storable representation of a value',
  },
  {
    name: 'unserialize',
    signature: 'unserialize(string $data, array $options = []): mixed',
    description: 'Creates a PHP value from a stored representation',
  },

  // Regular expressions
  {
    name: 'preg_match',
    signature:
      'preg_match(string $pattern, string $subject, array &$matches = null, int $flags = 0, int $offset = 0): int|false',
    description: 'Perform a regular expression match',
  },
  {
    name: 'preg_replace',
    signature:
      'preg_replace(string|array $pattern, string|array $replacement, string|array $subject, int $limit = -1, int &$count = null): string|array|null',
    description: 'Perform a regular expression search and replace',
  },
  {
    name: 'preg_split',
    signature:
      'preg_split(string $pattern, string $subject, int $limit = -1, int $flags = 0): array|false',
    description: 'Split string by a regular expression',
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
        insertText: `${func.name}($1)$0`,
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

// PHP Signature Help Provider
export const phpSignatureHelpProvider: languages.SignatureHelpProvider = {
  signatureHelpTriggerCharacters: ['(', ','],
  signatureHelpRetriggerCharacters: [','],
  provideSignatureHelp: (model, position) => {
    const lineContent = model.getLineContent(position.lineNumber);
    const lineUpToPosition = lineContent.substring(0, position.column - 1);

    // Find the function call we're currently in
    let openParenCount = 0;
    let currentFunctionStart = -1;

    for (let i = lineUpToPosition.length - 1; i >= 0; i--) {
      const char = lineUpToPosition[i];

      if (char === ')') {
        openParenCount++;
      } else if (char === '(') {
        if (openParenCount === 0) {
          // Found the opening parenthesis of our function call
          currentFunctionStart = i;
          break;
        }
        openParenCount--;
      }
    }

    if (currentFunctionStart === -1) {
      return null;
    }

    // Extract function name before the opening parenthesis
    const beforeParen = lineUpToPosition
      .substring(0, currentFunctionStart)
      .trim();
    const functionNameMatch = beforeParen.match(/([a-zA-Z_][a-zA-Z0-9_]*)$/);

    if (!functionNameMatch) {
      return null;
    }

    const functionName = functionNameMatch[1];

    // Find the function signature
    const functionInfo = phpFunctionSignatures.find(
      (func) => func.name === functionName,
    );

    if (!functionInfo) {
      return null;
    }

    // Count current parameter position by counting commas
    const parametersSection = lineUpToPosition.substring(
      currentFunctionStart + 1,
    );
    let parameterIndex = 0;
    let parenDepth = 0;

    for (const char of parametersSection) {
      if (char === '(') {
        parenDepth++;
      } else if (char === ')') {
        parenDepth--;
      } else if (char === ',' && parenDepth === 0) {
        parameterIndex++;
      }
    }

    // Parse parameters from signature
    const signatureMatch = functionInfo.signature.match(/\((.*?)\)/);
    const parametersText = signatureMatch ? signatureMatch[1] : '';

    let parameters: languages.ParameterInformation[] = [];
    if (parametersText.trim()) {
      const paramParts = parametersText.split(',').map((p) => p.trim());
      parameters = paramParts.map((param) => ({
        label: param,
        documentation: undefined,
      }));
    }

    const signature: languages.SignatureInformation = {
      label: functionInfo.signature,
      documentation: functionInfo.description,
      parameters: parameters,
    };

    return {
      value: {
        signatures: [signature],
        activeSignature: 0,
        activeParameter: Math.min(parameterIndex, parameters.length - 1),
      },
      dispose: () => {},
    };
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
      let description: string;
      let signature: string;

      // Add specific descriptions for well-known constants
      if (wordText.startsWith('__') && wordText.endsWith('__')) {
        const constantDescriptions: Record<
          string,
          { description: string; signature: string }
        > = {
          __CLASS__: {
            description:
              'The name of the current class. Returns an empty string when used outside of a class.',
            signature: 'string __CLASS__',
          },
          __DIR__: {
            description:
              'The directory of the current file. This is equivalent to dirname(__FILE__). Directory names do not have a trailing slash unless they are the root directory.',
            signature: 'string __DIR__',
          },
          __FILE__: {
            description:
              'The full path and filename of the current file with symlinks resolved. When used inside an include, the name of the included file is returned.',
            signature: 'string __FILE__',
          },
          __FUNCTION__: {
            description:
              'The name of the current function, or {closure} for anonymous functions. Returns an empty string when used outside of a function.',
            signature: 'string __FUNCTION__',
          },
          __LINE__: {
            description: 'The current line number of the file.',
            signature: 'int __LINE__',
          },
          __METHOD__: {
            description:
              'The class method name (added in PHP 5.0.0). The method name is returned as it was declared (case-sensitive).',
            signature: 'string __METHOD__',
          },
          __NAMESPACE__: {
            description:
              'The name of the current namespace (added in PHP 5.3.0). Returns an empty string when used outside of a namespace.',
            signature: 'string __NAMESPACE__',
          },
          __TRAIT__: {
            description:
              'The trait name (added in PHP 5.4.0). The trait name includes the namespace it was declared in.',
            signature: 'string __TRAIT__',
          },
          __PROPERTY__: {
            description:
              'The name of the current property (PHP 8.4+). Only works within property hooks.',
            signature: 'string __PROPERTY__',
          },
          __COMPILER_HALT_OFFSET__: {
            description:
              'Data offset after __halt_compiler(). Only defined in a file that uses __halt_compiler().',
            signature: 'int __COMPILER_HALT_OFFSET__',
          },
        };
        const constantInfo = constantDescriptions[wordText];
        if (constantInfo) {
          description = constantInfo.description;
          signature = constantInfo.signature;
        } else {
          description = 'PHP magic constant';
          signature = `mixed ${wordText}`;
        }
      } else if (wordText.startsWith('E_')) {
        const errorDescriptions: Record<string, string> = {
          E_ERROR:
            'Fatal run-time errors. These indicate errors that can not be recovered from, such as a memory allocation problem.',
          E_WARNING:
            'Run-time warnings (non-fatal errors). Execution of the script is not halted.',
          E_PARSE:
            'Compile-time parse errors. Parse errors should only be generated by the parser.',
          E_NOTICE:
            'Run-time notices. These are warnings which can indicate that your code may have a bug.',
          E_CORE_ERROR:
            "Fatal errors that occur during PHP's initial startup. This is like an E_ERROR, except it is generated by the core of PHP.",
          E_CORE_WARNING:
            "Warnings (non-fatal errors) that occur during PHP's initial startup.",
          E_COMPILE_ERROR:
            'Fatal compile-time errors. This is like an E_ERROR, except it is generated by the Zend Scripting Engine.',
          E_COMPILE_WARNING:
            'Compile-time warnings (non-fatal errors). This is like an E_WARNING, except it is generated by the Zend Scripting Engine.',
          E_USER_ERROR:
            'User-generated error message. This is like an E_ERROR, except it is generated in PHP code by using the PHP function trigger_error().',
          E_USER_WARNING:
            'User-generated warning message. This is like an E_WARNING, except it is generated in PHP code by using the PHP function trigger_error().',
          E_USER_NOTICE:
            'User-generated notice message. This is like an E_NOTICE, except it is generated in PHP code by using the PHP function trigger_error().',
          E_STRICT:
            'Enable to have PHP suggest changes to your code which will ensure the best interoperability and forward compatibility of your code.',
          E_RECOVERABLE_ERROR:
            'Catchable fatal error. It indicates that a probably dangerous error occurred, but did not leave the Engine in an unstable state.',
          E_DEPRECATED:
            'Run-time notices. Enable this to receive warnings about code that will not work in future versions.',
          E_USER_DEPRECATED:
            'User-generated warning message. This is like an E_DEPRECATED, except it is generated in PHP code by using the PHP function trigger_error().',
          E_ALL: 'All errors, warnings, and notices.',
        };
        description =
          errorDescriptions[wordText] || 'PHP error reporting constant';
        signature = `int ${wordText}`;
      } else if (wordText.startsWith('PHP_')) {
        const phpConstantDescriptions: Record<string, string> = {
          PHP_VERSION:
            'Contains the current version of PHP as a string in "major.minor.release[extra]" notation.',
          PHP_MAJOR_VERSION:
            'Contains the current PHP "major" version as an integer (e.g., int(5) from version "5.2.7-extra").',
          PHP_MINOR_VERSION:
            'Contains the current PHP "minor" version as an integer (e.g., int(2) from version "5.2.7-extra").',
          PHP_RELEASE_VERSION:
            'Contains the current PHP "release" version as an integer (e.g., int(7) from version "5.2.7-extra").',
          PHP_VERSION_ID:
            'Contains the current version of PHP as an integer, useful for version comparisons.',
          PHP_EXTRA_VERSION:
            'Contains the current PHP "extra" version as a string (e.g., "-extra" from version "5.2.7-extra").',
          PHP_OS:
            'Contains the name of the operating system PHP was built for.',
          PHP_OS_FAMILY:
            'Contains the name of the operating system family PHP was built for.',
          PHP_SAPI:
            'Contains the name of the Server API for this build of PHP.',
          PHP_EOL: "The correct 'End Of Line' symbol for this platform.",
          PHP_INT_MAX: 'The largest integer supported.',
          PHP_INT_MIN: 'The smallest integer supported.',
          PHP_INT_SIZE: 'The size of an integer in bytes.',
          PHP_FLOAT_MAX: 'Largest representable floating point number.',
          PHP_FLOAT_MIN:
            'Smallest representable positive normalized floating point number.',
          PHP_FLOAT_DIG:
            'Number of decimal digits that can be rounded into a float back without precision loss.',
          PHP_FLOAT_EPSILON:
            'Difference between 1 and the smallest floating point number greater than 1.',
          PHP_MAXPATHLEN:
            'Maximum length of filenames (including path) supported by this build of PHP.',
        };
        description = phpConstantDescriptions[wordText] || 'PHP core constant';
        signature =
          wordText.includes('VERSION') ||
          wordText.includes('SIZE') ||
          wordText.includes('MAX') ||
          wordText.includes('MIN')
            ? `int ${wordText}`
            : `string ${wordText}`;
      } else {
        // Handle other constants
        const otherConstants: Record<
          string,
          { description: string; signature: string }
        > = {
          true: {
            description: 'The boolean value TRUE',
            signature: 'bool true',
          },
          false: {
            description: 'The boolean value FALSE',
            signature: 'bool false',
          },
          null: { description: 'The NULL value', signature: 'null null' },
          TRUE: {
            description: 'The boolean value TRUE (case-insensitive)',
            signature: 'bool TRUE',
          },
          FALSE: {
            description: 'The boolean value FALSE (case-insensitive)',
            signature: 'bool FALSE',
          },
          NULL: {
            description: 'The NULL value (case-insensitive)',
            signature: 'null NULL',
          },
          STDERR: {
            description:
              "An already opened stream to stderr. This saves opening it with fopen('php://stderr', 'w')",
            signature: 'resource STDERR',
          },
          STDIN: {
            description:
              "An already opened stream to stdin. This saves opening it with fopen('php://stdin', 'r')",
            signature: 'resource STDIN',
          },
          STDOUT: {
            description:
              "An already opened stream to stdout. This saves opening it with fopen('php://stdout', 'w')",
            signature: 'resource STDOUT',
          },
        };
        const constantInfo = otherConstants[wordText];
        if (constantInfo) {
          description = constantInfo.description;
          signature = constantInfo.signature;
        } else {
          description = 'PHP constant';
          signature = `mixed ${wordText}`;
        }
      }

      const contents = [
        {
          value: `**${wordText}**`,
        },
      ];

      if (signature) {
        contents.push({
          value: `\`\`\`php\n${signature}\n\`\`\``,
        });
      }

      contents.push({
        value: description,
      });

      return {
        range: new Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents,
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
