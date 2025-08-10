import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ExecutionRecord } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ExecutionRecord[];
  onRestore: (recordId: string) => void;
  onPinToggle: (recordId: string) => void;
  onClear: () => void;
  onCompare: (aId: string, bId: string) => void;
  theme: 'light' | 'dark';
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onRestore,
  onPinToggle,
  onClear,
  onCompare,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  // Reset selection whenever the modal opens/closes or history changes
  useEffect(() => {
    if (!isOpen) {
      setSelected([]);
    } else {
      // Ensure selection is still valid if history changed
      setSelected((prev) =>
        prev.filter((id) => history.some((h) => h.id === id)).slice(0, 2),
      );
    }
  }, [isOpen, history]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const sorted = useMemo(() => {
    const pinned = history.filter((h) => h.pinned);
    const rest = history.filter((h) => !h.pinned);
    // Keep pinned first, then sort each group by timestamp descending (newest first)
    const byTs = (a: ExecutionRecord, b: ExecutionRecord) =>
      new Date(b.ts).getTime() - new Date(a.ts).getTime();
    return [...pinned.sort(byTs), ...rest.sort(byTs)];
  }, [history]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
      tabIndex={-1}
    >
      <div
        className="modal-content modal-history"
        role="document"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">Execution History</h3>

        <div className="modal-actions modal-actions-top">
          <button
            type="button"
            className="modal-button cancel"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="modal-button cancel"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="modal-history-list">
          {sorted.length === 0 ? (
            <div className="modal-history-empty">No history yet</div>
          ) : (
            <ul className="modal-history-items">
              {sorted.map((rec) => (
                <li
                  key={rec.id}
                  className={`modal-history-item ${rec.pinned ? 'pinned' : ''}`}
                >
                  <div className="modal-history-item-info">
                    <input
                      type="checkbox"
                      checked={selected.includes(rec.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelected((prev) => {
                          if (checked) {
                            if (prev.length >= 2) return prev;
                            return [...prev, rec.id];
                          }
                          return prev.filter((id) => id !== rec.id);
                        });
                      }}
                      aria-label="Select for diff"
                    />
                    <span className="modal-history-time">
                      {new Date(rec.ts).toLocaleTimeString()}
                    </span>
                    <span title={rec.code} className="modal-history-code">
                      {rec.code.split('\n')[0]?.slice(0, 120)}
                    </span>
                  </div>

                  <div className="modal-history-actions">
                    <button
                      type="button"
                      className="modal-button cancel"
                      onClick={() => onPinToggle(rec.id)}
                      title={rec.pinned ? 'Unpin' : 'Pin'}
                    >
                      {rec.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button
                      type="button"
                      className="modal-button confirm"
                      onClick={() => onRestore(rec.id)}
                      title="Restore code"
                    >
                      Restore
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal-actions modal-actions-bottom">
          <button
            type="button"
            className="modal-button confirm"
            disabled={selected.length !== 2}
            onClick={() => {
              if (selected.length === 2) onCompare(selected[0], selected[1]);
            }}
            title={
              selected.length === 2
                ? 'Compare selected'
                : 'Select two items to compare'
            }
          >
            Compare Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
