import type React from 'react';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import type { Tab } from '../types';
import InputModal from './InputModal';

interface TabManagerProps {
  tabs: Tab[];
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd: () => void;
  onTabRename: (tabId: string, newName: string) => void;
  theme: 'light' | 'dark';
}

const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  onTabSelect,
  onTabClose,
  onTabAdd,
  onTabRename,
  theme,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  const handleTabDoubleClick = (tab: Tab) => {
    setSelectedTab(tab);
    setIsModalOpen(true);
  };

  const handleModalConfirm = (newName: string) => {
    if (selectedTab && newName.trim() && newName !== selectedTab.name) {
      const finalName = newName.endsWith('.php') ? newName : `${newName}.php`;
      onTabRename(selectedTab.id, finalName);
    }
    setIsModalOpen(false);
    setSelectedTab(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedTab(null);
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose(tabId);
  };

  const handleTabSelect = (tabId: string) => {
    onTabSelect(tabId);
  };

  return (
    <>
      <div className={`tab-manager ${theme}`}>
        <div className="tab-list" role="tablist">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${tab.isActive ? 'active' : ''}`}
              onClick={() => handleTabSelect(tab.id)}
              onDoubleClick={() => handleTabDoubleClick(tab)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabSelect(tab.id);
                }
              }}
              role="tab"
              tabIndex={0}
              aria-selected={tab.isActive}
              title={tab.name}
            >
              <span className="tab-name">{tab.name}</span>
              {tabs.length > 1 && (
                <button
                  type="button"
                  className="tab-close"
                  onClick={(e) => handleTabClose(e, tab.id)}
                  title="Close tab"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="tab-add"
            onClick={onTabAdd}
            title="Add new tab"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <InputModal
        isOpen={isModalOpen}
        title="Rename Tab"
        placeholder="Enter new tab name"
        defaultValue={selectedTab?.name || ''}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default TabManager;
