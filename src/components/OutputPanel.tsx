import type React from 'react';
import type { ExecutionState } from '../types';

interface OutputPanelProps {
  executionState: ExecutionState;
  theme: 'light' | 'dark';
}

const OutputPanel: React.FC<OutputPanelProps> = ({ executionState, theme }) => {
  const { isExecuting, result, error } = executionState;

  const formatExecutionTime = (time: number): string => {
    if (time < 0.001) return '<0.001s';
    return `${time.toFixed(3)}s`;
  };

  const formatMemoryUsage = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className={`output-panel ${theme}`}>
      <div className="output-header">
        <h3>Output</h3>
        {result && (
          <div className="execution-stats">
            <span className="stat">
              ⏱️ {formatExecutionTime(result.executionTime)}
            </span>
            <span className="stat">
              💾 {formatMemoryUsage(result.memoryUsage)}
            </span>
            <span
              className={`stat exit-code ${result.exitCode === 0 ? 'success' : 'error'}`}
            >
              Exit: {result.exitCode}
            </span>
          </div>
        )}
      </div>

      <div className="output-content">
        {isExecuting ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Executing PHP code...</span>
          </div>
        ) : error ? (
          <div className="error-message">
            <div className="error-header">❌ Execution failed</div>
            <pre className="error-text">{error}</pre>
          </div>
        ) : result ? (
          <>
            {result.error ? (
              <div className="error-output">
                <div className="error-header">⚠️ PHP Error</div>
                <pre className="error-text">{result.error}</pre>
              </div>
            ) : null}

            {result.output ? (
              <div className="success-output">
                <div className="output-header-text">✅ Output</div>
                <pre className="output-text">{result.output}</pre>
              </div>
            ) : !result.error ? (
              <div className="no-output">
                <span>Code executed successfully (no output)</span>
              </div>
            ) : null}
          </>
        ) : (
          <div className="placeholder">
            <div className="placeholder-icon">🚀</div>
            <p>Click "Run" to execute your PHP code</p>
            <p className="placeholder-hint">
              Use Ctrl+Enter as a keyboard shortcut
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
