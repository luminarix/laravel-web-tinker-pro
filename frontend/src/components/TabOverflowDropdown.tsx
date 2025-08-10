import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaLock,
  FaLockOpen,
  FaRegClone,
  FaSearch,
  FaThumbtack,
  FaTimes,
} from 'react-icons/fa';
import type { Tab } from '../types';

interface TabOverflowDropdownProps {
  isOpen: boolean;
  overflowTabs: Tab[];
  onClose: () => void;
  onTabSelect: (tabId: string) => void;
  onDuplicate: (tabId: string) => void;
  onTogglePin: (tabId: string) => void;
  onToggleLock: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  anchorRef: React.RefObject<HTMLElement>;
  theme: 'light' | 'dark';
}

const TabOverflowDropdown: React.FC<TabOverflowDropdownProps> = ({
  isOpen,
  overflowTabs,
  onClose,
  onTabSelect,
  onDuplicate,
  onTogglePin,
  onToggleLock,
  onTabClose,
  anchorRef,
  theme,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTabs = useMemo(() => {
    if (!searchTerm.trim()) {
      return overflowTabs;
    }
    return overflowTabs.filter((tab) =>
      tab.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [overflowTabs, searchTerm]);

  const handleTabSelect = (tab: Tab) => {
    onTabSelect(tab.id);
    onClose();
    setSearchTerm('');
  };

  const handleAction = (action: () => void) => {
    action();
    // Don't close dropdown after actions
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Position the dropdown
  useEffect(() => {
    if (isOpen && anchorRef.current && dropdownRef.current) {
      const anchor = anchorRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;

      dropdown.style.top = `${anchor.bottom + 4}px`;
      dropdown.style.left = `${anchor.left}px`;
      dropdown.style.minWidth = `${Math.max(300, anchor.width)}px`;
    }
  }, [isOpen, anchorRef]);

  // Close on outside click and ESC key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={`tab-overflow-dropdown ${theme}`}>
      <div className="overflow-search-container">
        <div className="overflow-search-wrapper">
          <FaSearch className="overflow-search-icon" />
          <input
            type="text"
            placeholder="Search overflow tabs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="overflow-search-input"
            autoFocus
          />
          {searchTerm && (
            <button
              type="button"
              className="overflow-search-clear"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-tabs-list">
        {filteredTabs.length === 0 ? (
          <div className="overflow-no-results">
            {searchTerm ? 'No tabs match your search' : 'No overflow tabs'}
          </div>
        ) : (
          filteredTabs.map((tab) => (
            <div
              key={tab.id}
              className={`overflow-tab-item ${tab.isActive ? 'active' : ''}`}
              onClick={() => handleTabSelect(tab)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabSelect(tab);
                }
              }}
            >
              <div className="overflow-tab-info">
                <span className="overflow-tab-name">{tab.name}</span>
                <div className="overflow-tab-badges">
                  {tab.pinned && (
                    <span className="tab-badge pinned" title="Pinned">
                      <FaThumbtack />
                    </span>
                  )}
                  {tab.locked && (
                    <span className="tab-badge locked" title="Locked">
                      <FaLock />
                    </span>
                  )}
                  {tab.isActive && (
                    <span className="tab-badge active" title="Active">
                      Active
                    </span>
                  )}
                </div>
              </div>

              <div className="overflow-tab-actions">
                <button
                  type="button"
                  className="tab-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onDuplicate(tab.id));
                  }}
                  title="Duplicate tab"
                >
                  <FaRegClone />
                </button>
                <button
                  type="button"
                  className={`tab-action ${tab.pinned ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onTogglePin(tab.id));
                  }}
                  title={tab.pinned ? 'Unpin' : 'Pin'}
                >
                  <FaThumbtack />
                </button>
                <button
                  type="button"
                  className="tab-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(() => onToggleLock(tab.id));
                  }}
                  title={tab.locked ? 'Unlock' : 'Lock'}
                >
                  {tab.locked ? <FaLock /> : <FaLockOpen />}
                </button>
                {overflowTabs.length > 1 && !tab.locked && !tab.pinned && (
                  <button
                    type="button"
                    className="tab-action delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction(() => onTabClose(tab.id));
                    }}
                    title="Delete tab"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabOverflowDropdown;
