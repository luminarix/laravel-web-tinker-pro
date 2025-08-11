import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type React from 'react';
import { useEffect, useRef } from 'react';
import {
  phpCompletionProvider,
  phpHoverProvider,
  phpInlineLanguageConfig,
  phpInlineTokenizer,
  phpSignatureHelpProvider,
} from '../monaco/php-inline';

// Define custom themes globally to ensure they're available before Editor renders
const defineCustomThemes = (monaco: typeof import('monaco-editor')) => {
  // Define custom themes for better PHP highlighting
  monaco.editor.defineTheme('php-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'support.function', foreground: 'DCDCAA' }, // Yellow for methods
      { token: 'entity.name.function', foreground: 'DCDCAA' }, // Yellow for methods
      { token: 'type.identifier', foreground: '4EC9B0' }, // Cyan for classes
      { token: 'variable.other.property', foreground: '98D8F8' }, // Bright blue for properties
      { token: 'variable', foreground: '98D8F8' }, // Bright blue for variables
      { token: 'variable.language', foreground: '569CD6' }, // Blue for $this
      { token: 'keyword', foreground: '569CD6' }, // Blue for keywords (function, fn, etc.)
      { token: 'type', foreground: '569CD6' }, // Blue for type keywords (string, bool, int, etc.)
      { token: 'constant', foreground: 'D4D4D4' }, // Light gray for constants
    ],
    colors: {},
  });

  monaco.editor.defineTheme('php-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'support.function', foreground: '795E26' }, // Dark yellow/brown for methods
      { token: 'entity.name.function', foreground: '795E26' }, // Dark yellow/brown for methods
      { token: 'type.identifier', foreground: '267F99' }, // Blue for classes
      { token: 'variable.other.property', foreground: '0451A5' }, // Dark blue for properties (light theme)
      { token: 'variable', foreground: '0451A5' }, // Dark blue for variables (light theme)
      { token: 'variable.language', foreground: '0000FF' }, // Blue for $this (light theme)
      { token: 'keyword', foreground: '569CD6' }, // Blue for keywords (function, fn, etc.)
      { token: 'type', foreground: '569CD6' }, // Blue for type keywords (string, bool, int, etc.)
      { token: 'constant', foreground: '000000' }, // Black for constants (light theme)
    ],
    colors: {},
  });
};

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: 'light' | 'dark';
  onRun?: (code?: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  theme,
  onRun,
  readOnly = false,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  // Ensure the keyboard shortcut uses the latest onRun reference to avoid stale closures
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  const handleEditorWillMount = (monaco: typeof import('monaco-editor')) => {
    // Define custom themes before editor initializes
    defineCustomThemes(monaco);

    // Register custom PHP inline language
    monaco.languages.register({ id: 'php-inline' });
    monaco.languages.registerCompletionItemProvider(
      'php-inline',
      phpCompletionProvider,
    );
    monaco.languages.registerHoverProvider('php-inline', phpHoverProvider);
    monaco.languages.registerSignatureHelpProvider(
      'php-inline',
      phpSignatureHelpProvider,
    );

    // Set language configuration for PHP inline
    monaco.languages.setLanguageConfiguration(
      'php-inline',
      phpInlineLanguageConfig,
    );

    // Set tokenization rules for PHP inline
    monaco.languages.setMonarchTokensProvider('php-inline', phpInlineTokenizer);
  };

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor'),
  ) => {
    editorRef.current = editor;

    // Set the model language to PHP inline
    const model = editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, 'php-inline');
    }

    // Add keyboard shortcut for running code (Cmd/Ctrl+Enter)
    if (onRun) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        // Use a ref to call the latest onRun with the current editor value (fixes stale closure)
        const currentOnRun = onRunRef.current;
        if (currentOnRun) {
          currentOnRun(editor.getValue());
        }
      });
    }

    // Focus the editor
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="code-editor">
      <Editor
        height="100%"
        defaultLanguage={'php-inline'}
        theme={theme === 'dark' ? 'php-dark' : 'php-light'}
        value={value || ''}
        onChange={handleEditorChange}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        loading={
          <div className="editor-skeleton" aria-busy="true" aria-live="polite">
            <div className="editor-skeleton-lines">
              <div className="line w-95" />
              <div className="line w-90" />
              <div className="line w-80" />
              <div className="line w-60" />
              <div className="line w-70" />
              <div className="line w-50" />
            </div>
          </div>
        }
        options={{
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly,
          minimap: { enabled: true },
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'bounded',
          wordWrapColumn: 120,
          folding: true,
          foldingStrategy: 'indentation',
          renderLineHighlight: 'all',
          selectOnLineNumbers: true,
          matchBrackets: 'always',
          autoIndent: 'full',
          formatOnPaste: true,
          formatOnType: true,
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showFunctions: true,
          },
          parameterHints: {
            enabled: true,
            cycle: true,
          },
          hover: {
            enabled: true,
            delay: 300,
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
