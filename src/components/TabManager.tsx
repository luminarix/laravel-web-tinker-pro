import type React from 'react';
import { useState } from 'react';
import {
  FaLock,
  FaLockOpen,
  FaPlus,
  FaRegClone,
  FaTimes,
} from 'react-icons/fa';
import type { Tab } from '../types';
import InputModal from './InputModal';

interface TabManagerProps {
  tabs: Tab[];
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabAdd: () => void;
  onTabRename: (tabId: string, newName: string) => void;
  onReorder: (orderedIds: string[]) => void;
  onTogglePin: (tabId: string) => void;
  onToggleLock: (tabId: string) => void;
  onDuplicate: (tabId: string) => void;
  theme: 'light' | 'dark';
}

const TabManager: React.FC<TabManagerProps> = ({
  tabs,
  onTabSelect,
  onTabClose,
  onTabAdd,
  onTabRename,
  onReorder,
  onTogglePin,
  onToggleLock,
  onDuplicate,
  theme,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleTabSelect = (tab: Tab) => {
    onTabSelect(tab.id);
  };

  const handleTabDoubleClick = (tab: Tab) => {
    setSelectedTab(tab);
    setIsModalOpen(true);
  };

  const handleModalConfirm = (newName: string) => {
    if (selectedTab && newName.trim() && newName !== selectedTab.name) {
      onTabRename(selectedTab.id, newName);
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

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/tab-id', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    setDragOverId(overId);
  };

  const handleDrop = (e: React.DragEvent, dropId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/tab-id');
    setDragOverId(null);
    if (!draggedId || draggedId === dropId) return;
    const ids = tabs.map((t) => t.id);
    const from = ids.indexOf(draggedId);
    const to = ids.indexOf(dropId);
    if (from === -1 || to === -1) return;
    const next = [...ids];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onReorder(next);
  };

  return (
    <>
      <div className={`tab-manager ${theme}`}>
        <div className="tab-list" role="tablist">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${tab.isActive ? 'active' : ''} ${dragOverId === tab.id ? 'drag-over' : ''}`}
              onClick={() => handleTabSelect(tab)}
              onDoubleClick={() => handleTabDoubleClick(tab)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onTabSelect(tab.id);
                }
              }}
              role="tab"
              tabIndex={0}
              aria-selected={tab.isActive}
              title={tab.name}
              draggable={!tab.locked}
              onDragStart={(e) => handleDragStart(e, tab.id)}
              onDragOver={(e) => handleDragOver(e, tab.id)}
              onDrop={(e) => handleDrop(e, tab.id)}
            >
              {' '}
              <span className="tab-name">{tab.name}</span>
              <div className="tab-actions">
                <button
                  type="button"
                  className="tab-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(tab.id);
                  }}
                  title="Duplicate tab"
                >
                  <FaRegClone />
                </button>
                <button
                  type="button"
                  className="tab-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLock(tab.id);
                  }}
                  title={tab.locked ? 'Unlock' : 'Lock'}
                >
                  {tab.locked ? <FaLockOpen /> : <FaLock />}
                </button>
                <button
                  type="button"
                  className={`tab-action ${tab.pinned ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(tab.id);
                  }}
                  title={tab.pinned ? 'Unpin' : 'Pin'}
                >
                  📌
                </button>
                {tabs.length > 1 && !tab.locked && !tab.pinned && (
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
