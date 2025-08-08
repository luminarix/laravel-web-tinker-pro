import type React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import type { Tab } from '../types';

interface TabManagerProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd: () => void;
  onTabRename: (tabId: string, newName: string) => void;
  theme: 'light' | 'dark';
}

const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  onTabClose,
  onTabAdd,
  onTabRename,
  theme,
}) => {
  const handleTabDoubleClick = (tab: Tab) => {
    const newName = prompt('Enter new tab name:', tab.name);
    if (newName && newName.trim() && newName !== tab.name) {
      const finalName = newName.endsWith('.php') ? newName : `${newName}.php`;
      onTabRename(tab.id, finalName);
    }
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  const handleTabSelect = (tabId: string) => {
    onTabSelect(tabId);
  };

  return (
    <div className={`tab-manager ${theme}`}>
      <div className="tab-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${tab.isActive ? 'active' : ''} ${tab.isUnsaved ? 'unsaved' : ''}`}
            onClick={() => handleTabSelect(tab.id)}
            onDoubleClick={() => handleTabDoubleClick(tab)}
            title={tab.isUnsaved ? `${tab.name} (unsaved changes)` : tab.name}
          >
            <span className="tab-name">
              {tab.name}
              {tab.isUnsaved && <span className="unsaved-indicator">•</span>}
            </span>
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => handleTabClose(e, tab.id)}
                title="Close tab"
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}

        <button className="tab-add" onClick={onTabAdd} title="Add new tab">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TabManager;
