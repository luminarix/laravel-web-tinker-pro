import type React from 'react';
import { useEffect, useState } from 'react';

interface InputModalProps {
  isOpen: boolean;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  title,
  placeholder = '',
  defaultValue = '',
  maxLength,
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onConfirm(inputValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      onKeyDown={(e) => e.key === 'Escape' && onCancel()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        <h3 className="modal-title">{title}</h3>
        <form onSubmit={handleSubmit}>
          <input
            // biome-ignore lint/a11y/noAutofocus: QoL for tab renaming
            autoFocus
            type="text"
            className="modal-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          <div className="modal-actions">
            <button
              type="button"
              className="modal-button cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="modal-button confirm">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
