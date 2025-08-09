import type React from 'react';
import { FaMoon, FaPlay, FaShare, FaSun, FaTh } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import type { ExecutionState } from '../types';

interface HeaderProps {
  onRun: (code?: string) => void;
  onShare: () => void;
  onClear: () => void;
  onToggleTheme: () => void;
  onToggleBgPattern: () => void;
  onToggleRepl: () => void;
  onResetRepl: () => void;
  replEnabled: boolean;
  executionState: ExecutionState;
  theme: 'light' | 'dark';
  bgPattern: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  onRun,
  onShare,
  onClear,
  onToggleTheme,
  onToggleBgPattern,
  onToggleRepl,
  onResetRepl,
  replEnabled,
  executionState,
  theme,
  bgPattern,
  title = 'Laravel Web Tinker',
}) => {
  return (
    <div className={`header ${theme}`}>
      <div className="header-left">
        <span className="logo" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M8 7l-4 5 4 5M16 7l4 5-4 5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="brand">
          <h1 className="title">{title}</h1>
          <div className="subtitle">Minimal PHP tinker, redesigned</div>
        </div>
        {__PROD__ && <div className="production-warning">PRODUCTION</div>}
      </div>

      <div className="header-right">
        <button
          type="button"
          className={`btn btn-run ${executionState.isExecuting ? 'executing' : 'pulsing'}`}
          onClick={() => onRun()}
          disabled={executionState.isExecuting}
          title="Run PHP Code (Ctrl+Enter)"
        >
          <FaPlay />
          {executionState.isExecuting ? 'Running...' : 'Run'}
        </button>

        <button
          type="button"
          className="btn btn-share"
          onClick={onShare}
          title="Share Code"
        >
          <FaShare />
          Share
        </button>

        <button
          type="button"
          className="btn btn-clear"
          onClick={onClear}
          title="Clear Output"
        >
          <MdClear />
          Clear
        </button>

        <button
          type="button"
          className={`btn btn-theme ${bgPattern ? 'is-active' : ''}`}
          onClick={onToggleBgPattern}
          aria-pressed={bgPattern}
          title={`${bgPattern ? 'Disable' : 'Enable'} background grid`}
        >
          <FaTh />
        </button>

        <div className="btn-group">
          <button
            type="button"
            className={`btn btn-theme ${replEnabled ? 'is-active' : ''}`}
            onClick={onToggleRepl}
            title={`REPL state ${replEnabled ? 'On' : 'Off'}`}
          >
            REPL
          </button>
          <button
            type="button"
            className="btn btn-theme"
            onClick={onResetRepl}
            title="Reset REPL state"
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          className="btn btn-theme"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Header;
