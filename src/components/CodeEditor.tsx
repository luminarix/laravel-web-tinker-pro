import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type React from 'react';
import { useRef } from 'react';
import {
  phpCompletionProvider,
  phpHoverProvider,
  phpInlineLanguageConfig,
  phpInlineTokenizer,
  phpSignatureHelpProvider,
} from '../monaco/php-inline';

// Configure Monaco to load from CDN (optional - removes bundling warnings)
// loader.config({
//   paths: {
//     vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
//   }
// });

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

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor'),
  ) => {
    editorRef.current = editor;

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

    // Set the model language to PHP inline
    const model = editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, 'php-inline');
    }

    // Add keyboard shortcut for running code (Ctrl+Enter)
    if (onRun) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        // Get current editor value to avoid stale closure issues
        onRun(editor.getValue());
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
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        value={value || ''}
        onChange={handleEditorChange}
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
