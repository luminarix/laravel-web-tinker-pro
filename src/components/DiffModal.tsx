import { DiffEditor } from '@monaco-editor/react';
import type React from 'react';

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
  if (!isOpen) return null;

  return (
    <div className={`modal-backdrop ${theme}`} role="dialog" aria-modal="true">
      <div className="modal diff-modal">
        <div className="modal-header">
          <h3>Compare Versions</h3>
          <button type="button" className="btn btn-xs" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body" style={{ height: '60vh' }}>
          <DiffEditor
            height="100%"
            original={original}
            modified={modified}
            language="php-inline"
            theme={theme === 'dark' ? 'vs-dark' : 'light'}
            options={{ readOnly: true, renderOverviewRuler: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiffModal;
