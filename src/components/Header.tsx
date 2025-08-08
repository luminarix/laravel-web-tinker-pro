import type React from 'react';
import { FaMoon, FaPlay, FaShare, FaSun } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import type { ExecutionState } from '../types';

interface HeaderProps {
  onRun: () => void;
  onShare: () => void;
  onClear: () => void;
  onToggleTheme: () => void;
  executionState: ExecutionState;
  theme: 'light' | 'dark';
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  onRun,
  onShare,
  onClear,
  onToggleTheme,
  executionState,
  theme,
  title = 'Laravel Web Tinker',
}) => {
  return (
    <div className={`header ${theme}`}>
      <div className="header-left">
        <h1 className="title">{title}</h1>
      </div>

      <div className="header-right">
        <button
          className={`btn btn-run ${executionState.isExecuting ? 'executing' : ''}`}
          onClick={onRun}
          disabled={executionState.isExecuting}
          title="Run PHP Code (Ctrl+Enter)"
        >
          <FaPlay />
          {executionState.isExecuting ? 'Running...' : 'Run'}
        </button>

        <button className="btn btn-share" onClick={onShare} title="Share Code">
          <FaShare />
          Share
        </button>

        <button
          className="btn btn-clear"
          onClick={onClear}
          title="Clear Output"
        >
          <MdClear />
          Clear
        </button>

        <button
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
