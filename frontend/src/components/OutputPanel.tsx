import type React from 'react';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import type {
  ExecutionRecord,
  ExecutionState,
  ReplCell,
  ReplState,
} from '../types';
import { isBetween } from '../utils/number.ts';
import { isMac } from '../utils/platform';
import OutputRenderer from './OutputRenderer';

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
    const { id, historyId } = cell;
    const isCopied = copiedItems.has(id);

    // Find the corresponding execution result from history
    const executionRecord = history?.find((record) => record.id === historyId);
    if (!executionRecord) return null;

    const {
      code,
      result: executionResult,
      error: executionError,
    } = executionRecord;

    // Prepare text for copying (prefer output, then error, then code)
    const copyText = executionResult?.output || executionError || code;

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
            {executionResult && (
              <>
                <span className="stat">🕑 {executionResult.timestamp} | </span>
                <span className="stat">⌛️ {executionResult.runtime}</span>
                <span className="stat">💾 {executionResult.memoryUsage}</span>
                <span className="stat">🤏🏻 {executionResult.outputSize}</span>
                <span className="stat">
                  {isBetween(executionResult.status, 200, 299) ? '✅' : '❌'}
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
              executionResult.output ? (
                <div className="success-output">
                  <OutputRenderer content={executionResult.output} />
                </div>
              ) : null
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
            {!isReplMode && (
              <>
                <span className="stat">🕑 {result.timestamp}</span>
                <span className="stat">⌛️ {result.runtime}</span>
                <span className="stat">💾 {result.memoryUsage}</span>
                <span className="stat">🤏🏻 {result.outputSize}</span>
                <span className="stat">
                  {isBetween(result.status, 200, 299) ? '✅' : '❌'}
                </span>
                {(result.output || error) && (
                  <button
                    type="button"
                    className={`btn btn-theme btn-xs btn-copy ${copied ? 'copied' : ''}`}
                    onClick={() => {
                      const text = result.output || error || '';
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
              </>
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
          result.output ? (
            <div className="success-output">
              <OutputRenderer content={result.output} />
            </div>
          ) : null
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
