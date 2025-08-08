import Editor, { loader } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import type React from 'react';
import { useRef } from 'react';

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
  onRun?: () => void;
  readOnly?: boolean;
}

const defaultPhpCode = `<?php
// Welcome to Laravel Web Tinker
// Write your PHP code here and click Run

echo "Hello, World!";

// Example of using variables
$name = "Laravel";
echo "\\nWelcome to $name Web Tinker!";

// Example function
function greet($name) {
    return "Hello, $name!";
}

echo "\\n" . greet("Developer");
?>`;

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  theme,
  onRun,
  readOnly = false,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;

    // Add keyboard shortcut for running code (Ctrl+Enter)
    if (onRun) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun();
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
        defaultLanguage="php"
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        value={value || defaultPhpCode}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
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
