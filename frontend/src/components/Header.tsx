import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaMoon,
  FaPlay,
  FaShare,
  FaSun,
  FaTh,
  FaTimes,
} from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import type { ExecutionState } from '../types';
import { isMac } from '../utils/platform.ts';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu on window resize if desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {/* Always visible Run button */}
        <button
          type="button"
          className={`btn btn-run ${executionState.isExecuting ? 'executing' : 'pulsing'}`}
          onClick={() => onRun()}
          disabled={executionState.isExecuting}
          title={`Run PHP Code (${isMac() ? 'Cmd' : 'Ctrl'}+Enter)`}
        >
          <FaPlay />
          <span className="btn-text">
            {executionState.isExecuting ? 'Running...' : 'Run'}
          </span>
        </button>

        {/* Desktop controls */}
        <div className="desktop-controls">
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

        {/* Mobile hamburger menu button */}
        <button
          ref={buttonRef}
          type="button"
          className="btn btn-hamburger mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div ref={menuRef} className="mobile-menu">
            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => {
                onShare();
                setIsMobileMenuOpen(false);
              }}
            >
              <FaShare />
              <span>Share Code</span>
            </button>

            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => {
                onClear();
                setIsMobileMenuOpen(false);
              }}
            >
              <MdClear />
              <span>Clear Output</span>
            </button>

            <div className="mobile-menu-divider" />

            <button
              type="button"
              className={`mobile-menu-item ${bgPattern ? 'is-active' : ''}`}
              onClick={() => {
                onToggleBgPattern();
                setIsMobileMenuOpen(false);
              }}
            >
              <FaTh />
              <span>{bgPattern ? 'Disable' : 'Enable'} Grid</span>
            </button>

            <button
              type="button"
              className={`mobile-menu-item ${replEnabled ? 'is-active' : ''}`}
              onClick={() => {
                onToggleRepl();
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="icon-placeholder">REPL</span>
              <span>{replEnabled ? 'Disable' : 'Enable'} REPL</span>
            </button>

            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => {
                onResetRepl();
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="icon-placeholder">↻</span>
              <span>Reset REPL</span>
            </button>

            <div className="mobile-menu-divider" />

            <button
              type="button"
              className="mobile-menu-item"
              onClick={() => {
                onToggleTheme();
                setIsMobileMenuOpen(false);
              }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
              <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
