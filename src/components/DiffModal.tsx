import { DiffEditor } from '@monaco-editor/react';
import type React from 'react';
import { useEffect, useCallback } from 'react';

interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  original: string;
  modified: string;
  theme: 'light' | 'dark';
}

const DiffModal: React.FC<DiffModalProps> = ({
  isOpen,
  onClose,
  original,
  modified,
  theme,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="modal-content modal-diff"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">Compare Versions</h3>

        <div className="modal-diff-editor">
          <DiffEditor
            height="60vh"
            original={original}
            modified={modified}
            language="php-inline"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{ readOnly: true, renderOverviewRuler: true }}
          />
        </div>

        <div className="modal-actions modal-actions-bottom">
          <button type="button" className="modal-button cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiffModal;
