import type React from 'react';
import { useState, useMemo } from 'react';
import {
  FaSearch,
  FaTimes,
  FaRegClone,
  FaThumbtack,
  FaLock,
  FaLockOpen,
  FaTrash,
  FaEye,
} from 'react-icons/fa';
import type { Tab } from '../types';

interface TabListModalProps {
  isOpen: boolean;
  tabs: Tab[];
  onClose: () => void;
  onTabSelect: (tabId: string) => void;
  onDuplicate: (tabId: string) => void;
  onTogglePin: (tabId: string) => void;
  onToggleLock: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  theme: 'light' | 'dark';
}

const TabListModal: React.FC<TabListModalProps> = ({
  isOpen,
  tabs,
  onClose,
  onTabSelect,
  onDuplicate,
  onTogglePin,
  onToggleLock,
  onTabClose,
  theme,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTabs = useMemo(() => {
    if (!searchTerm.trim()) {
      return tabs;
    }
    return tabs.filter((tab) =>
      tab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tab.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tabs, searchTerm]);

  const handleTabSelect = (tab: Tab) => {
    onTabSelect(tab.id);
    onClose();
  };

  const handleAction = (action: () => void) => {
    action();
    // Don't close modal after actions so user can continue managing tabs
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content tab-list-modal ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>All Tabs ({tabs.length})</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            title="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tabs by name or code content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="tab-list-content">
          {filteredTabs.length === 0 ? (
            <div className="no-results">
              {searchTerm ? 'No tabs match your search' : 'No tabs available'}
            </div>
          ) : (
            <div className="tab-items">
              {filteredTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-item ${tab.isActive ? 'active' : ''}`}
                >
                  <div className="tab-item-info">
                    <div className="tab-item-header">
                      <span className="tab-item-name">{tab.name}</span>
                      <div className="tab-item-badges">
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
                    <div className="tab-item-preview">
                      {tab.code.slice(0, 100)}
                      {tab.code.length > 100 && '...'}
                    </div>
                  </div>
                  
                  <div className="tab-item-actions">
                    <button
                      type="button"
                      className="tab-action"
                      onClick={() => handleTabSelect(tab)}
                      title="Select tab"
                    >
                      <FaEye />
                    </button>
                    <button
                      type="button"
                      className="tab-action"
                      onClick={() => handleAction(() => onDuplicate(tab.id))}
                      title="Duplicate tab"
                    >
                      <FaRegClone />
                    </button>
                    <button
                      type="button"
                      className={`tab-action ${tab.pinned ? 'active' : ''}`}
                      onClick={() => handleAction(() => onTogglePin(tab.id))}
                      title={tab.pinned ? 'Unpin' : 'Pin'}
                    >
                      <FaThumbtack />
                    </button>
                    <button
                      type="button"
                      className="tab-action"
                      onClick={() => handleAction(() => onToggleLock(tab.id))}
                      title={tab.locked ? 'Unlock' : 'Lock'}
                    >
                      {tab.locked ? <FaLock /> : <FaLockOpen />}
                    </button>
                    {tabs.length > 1 && !tab.locked && !tab.pinned && (
                      <button
                        type="button"
                        className="tab-action delete"
                        onClick={() => handleAction(() => onTabClose(tab.id))}
                        title="Delete tab"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabListModal;