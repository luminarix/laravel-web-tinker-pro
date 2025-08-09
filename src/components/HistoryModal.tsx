import type React from 'react';
import { useMemo, useState } from 'react';
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
  theme,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const sorted = useMemo(() => {
    const pinned = history.filter((h) => h.pinned);
    const rest = history.filter((h) => !h.pinned);
    return [...pinned, ...rest].slice().sort((a, b) => a.ts - b.ts);
  }, [history]);

  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${theme}`} role="dialog" aria-modal="true">
      <div className="modal history-modal">
        <div className="modal-header">
          <h3>Execution History</h3>
          <div className="modal-actions">
            <button type="button" className="btn btn-xs" onClick={onClear}>
              Clear
            </button>
            <button type="button" className="btn btn-xs" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <div className="modal-body">
          {sorted.length === 0 ? (
            <div className="empty">No history yet</div>
          ) : (
            <ul className="history-list">
              {sorted.map((rec) => (
                <li
                  key={rec.id}
                  className={`history-item ${rec.result?.exitCode === 0 ? 'ok' : 'err'} ${rec.pinned ? 'pinned' : ''}`}
                >
                  <div className="left">
                    <input
                      type="checkbox"
                      checked={selected.includes(rec.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelected((prev) => {
                          if (checked) {
                            if (prev.length >= 2) return prev; // allow max 2 selections
                            return [...prev, rec.id];
                          }
                          return prev.filter((id) => id !== rec.id);
                        });
                      }}
                      aria-label="Select for diff"
                    />
                    <span className="time">
                      {new Date(rec.ts).toLocaleTimeString()}
                    </span>
                    <span className="status">
                      {rec.result
                        ? rec.result.exitCode === 0
                          ? 'OK'
                          : `Exit ${rec.result.exitCode}`
                        : 'Error'}
                    </span>
                    <span className="preview">
                      {rec.code.split('\n')[0]?.slice(0, 60)}
                    </span>
                  </div>
                  <div className="right">
                    <button
                      type="button"
                      className="btn btn-xs"
                      onClick={() => onPinToggle(rec.id)}
                    >
                      {rec.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-xs"
                      onClick={() => onRestore(rec.id)}
                    >
                      Restore
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={selected.length !== 2}
            onClick={() => {
              if (selected.length === 2) onCompare(selected[0], selected[1]);
            }}
          >
            Compare Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
