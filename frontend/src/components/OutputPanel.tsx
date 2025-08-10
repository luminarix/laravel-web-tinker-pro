import type React from 'react';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import type {
  ExecutionRecord,
  ExecutionState,
  ReplCell,
  ReplState,
} from '../types';
import { isMac } from '../utils/platform';

interface OutputPanelProps {
  executionState: ExecutionState;
  theme: 'light' | 'dark';
  onOpenHistory?: () => void;
  replState?: ReplState;
  history?: ExecutionRecord[];
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  executionState,
  theme,
  onOpenHistory,
  replState,
  history,
}) => {
  const { isExecuting, result, error } = executionState;
  const [copied, setCopied] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

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

  const copyOutput = async (text: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id) {
        setCopiedItems((prev) => new Set([...prev, id]));
        setTimeout(() => {
          setCopiedItems((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 1200);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }
    } catch {
      // Fallback for copy failure
      if (id) {
        setCopiedItems((prev) => new Set([...prev, id]));
        setTimeout(() => {
          setCopiedItems((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, 1200);
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }
    }
  };

  const renderReplCell = (cell: ReplCell, index: number) => {
    const { id, code, ts, historyId } = cell;
    const isCopied = copiedItems.has(id);

    // Find the corresponding execution result from history
    const executionRecord = historyId
      ? history?.find((record) => record.id === historyId)
      : null;
    const executionResult = executionRecord?.result;
    const executionError = executionRecord?.error;

    // Prepare text for copying (prefer output, then error, then code)
    const copyText =
      executionResult?.output ||
      executionResult?.error ||
      executionError ||
      code;

    return (
      <div
        key={id}
        className={`repl-cell-block ${index === 0 ? 'latest' : ''}`}
      >
        <div className="repl-cell-header">
          <div className="repl-cell-meta">
            <span className="repl-cell-index">
              #{(replState?.cells?.length || 0) - index}
            </span>
            <span className="repl-cell-time">
              {new Date(ts).toLocaleTimeString()}
            </span>
            {executionResult && (
              <>
                <span className="stat">
                  ⏱️ {formatExecutionTime(executionResult.executionTime)}
                </span>
                <span className="stat">
                  💾 {formatMemoryUsage(executionResult.memoryUsage)}
                </span>
                <span
                  className={`stat exit-code ${executionResult.exitCode === 0 ? 'success' : 'error'}`}
                >
                  Exit: {executionResult.exitCode}
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className={`btn btn-theme btn-xs btn-copy ${isCopied ? 'copied' : ''}`}
            onClick={() => copyOutput(copyText, id)}
            title={isCopied ? 'Copied' : 'Copy result'}
            aria-live="polite"
          >
            <FaRegCopy />
          </button>
        </div>

        <div className="repl-cell-code">
          <pre className="code-text">{code}</pre>
        </div>

        {/* Display execution results */}
        {(executionResult || executionError) && (
          <div className="repl-cell-result">
            {executionError ? (
              <div className="error-message">
                <div className="error-header">❌ Execution failed</div>
                <pre className="error-text">{executionError}</pre>
              </div>
            ) : executionResult ? (
              <>
                {executionResult.error ? (
                  <div className="error-output">
                    <div className="error-header">⚠️ PHP Error</div>
                    <pre className="error-text">{executionResult.error}</pre>
                  </div>
                ) : null}

                {executionResult.output ? (
                  <div className="success-output">
                    <div className="output-header-text">✅ Output</div>
                    <pre className="output-text">{executionResult.output}</pre>
                  </div>
                ) : !executionResult.error ? (
                  <div className="no-output">
                    <span>Code executed successfully (no output)</span>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  const isReplMode =
    replState?.enabled && replState?.cells && replState.cells.length > 0;

  return (
    <div className={`output-panel ${theme} ${isReplMode ? 'repl-mode' : ''}`}>
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
            {(result.output || result.error) && (
              <button
                type="button"
                className={`btn btn-theme btn-xs btn-copy ${copied ? 'copied' : ''}`}
                onClick={() => {
                  const text = result.output || result.error || '';
                  navigator.clipboard
                    ?.writeText(text)
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1200);
                    })
                    .catch(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1200);
                    });
                }}
                title={copied ? 'Copied' : 'Copy output'}
                aria-live="polite"
              >
                <FaRegCopy />
              </button>
            )}
            {onOpenHistory && (
              <button
                type="button"
                className="btn btn-theme btn-xs"
                onClick={onOpenHistory}
                title="Open History"
              >
                History
              </button>
            )}
          </div>
        )}
      </div>

      <div className="output-content">
        {isExecuting ? (
          <div className="loading">
            <div className="spinner"></div>
            <span>Executing PHP code...</span>
          </div>
        ) : isReplMode ? (
          <div className="repl-cells">
            {replState?.cells
              ?.slice()
              .reverse()
              .map((cell, index) => renderReplCell(cell, index))}
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
              Use {isMac() ? 'Cmd' : 'Ctrl'}+Enter as a keyboard shortcut
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
