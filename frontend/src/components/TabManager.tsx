import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  FaChevronDown,
  FaList,
  FaLock,
  FaLockOpen,
  FaPlus,
  FaRegClone,
  FaThumbtack,
  FaTimes,
} from 'react-icons/fa';
import { CONSTANTS } from '../constants';
import type { Tab } from '../types';
import InputModal from './InputModal';
import TabListModal from './TabListModal';
import TabOverflowDropdown from './TabOverflowDropdown';

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
  const [isTabListModalOpen, setIsTabListModalOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);

  const tabListRef = useRef<HTMLDivElement>(null);
  const overflowButtonRef = useRef<HTMLButtonElement>(null);

  // Calculate which tabs should be visible vs overflow
  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!tabListRef.current) return;

      const container = tabListRef.current;
      const containerWidth = container.clientWidth;

      // Account for the list and add buttons - get actual widths
      const listButton = container.querySelector(
        '.tab-list-button',
      ) as HTMLElement;
      const addButton = container.querySelector('.tab-add') as HTMLElement;
      const buttonSpace =
        (listButton?.offsetWidth || 36) + (addButton?.offsetWidth || 36) + 8; // Reduced gap

      // Account for overflow button space (reduced)
      const overflowButtonSpace = 50;

      const availableWidth = containerWidth - buttonSpace - overflowButtonSpace;

      if (availableWidth <= 0) {
        // Not enough space, show minimum
        setVisibleTabs(tabs.length > 0 ? [tabs[0]] : []);
        setOverflowTabs(tabs.slice(1));
        return;
      }

      // Calculate actual tab widths by measuring
      let totalTabWidth = 0;
      let visibleCount = 0;

      // Create a temporary element to measure tab widths
      const tempDiv = document.createElement('div');
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.position = 'absolute';
      tempDiv.style.top = '-1000px';
      tempDiv.className = 'tab';
      tempDiv.style.padding = '10px 14px';
      tempDiv.style.fontSize = getComputedStyle(document.body).fontSize;
      document.body.appendChild(tempDiv);

      for (let i = 0; i < tabs.length; i++) {
        // Account for tab content (name + action buttons + padding)
        tempDiv.textContent = tabs[i].name;
        const baseTabWidth = tempDiv.offsetWidth;

        // Add space for action buttons (clone, lock/unlock, pin, close if applicable)
        const actionButtonsWidth =
          tabs[i].locked || tabs[i].pinned
            ? 90 // 3 buttons (clone, lock, pin)
            : 120; // 4 buttons (clone, lock, pin, close)

        const tabWidth = baseTabWidth + actionButtonsWidth + 6; // 6px for gaps

        if (totalTabWidth + tabWidth <= availableWidth) {
          totalTabWidth += tabWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      document.body.removeChild(tempDiv);

      if (visibleCount >= tabs.length) {
        setVisibleTabs(tabs);
        setOverflowTabs([]);
      } else {
        // Ensure at least one tab is visible and prioritize active tab
        visibleCount = Math.max(1, visibleCount);
        const activeTab = tabs.find((tab) => tab.isActive);
        const visible = tabs.slice(0, visibleCount);

        // If active tab is not visible, replace the last visible tab with it
        if (activeTab && !visible.includes(activeTab)) {
          visible[visible.length - 1] = activeTab;
        }

        setVisibleTabs(visible);
        setOverflowTabs(tabs.filter((tab) => !visible.includes(tab)));
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(calculateVisibleTabs, 50);

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(calculateVisibleTabs, 50);
    });
    if (tabListRef.current) {
      resizeObserver.observe(tabListRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [tabs]);

  const handleTabSelect = (tab: Tab) => {
    onTabSelect(tab.id);
  };

  const handleTabDoubleClick = (tab: Tab) => {
    setSelectedTab(tab);
    setIsModalOpen(true);
  };

  const handleModalConfirm = (newName: string) => {
    if (selectedTab && newName.trim() && newName !== selectedTab.name) {
      const truncatedName = newName
        .trim()
        .slice(0, CONSTANTS.TAB_NAME_MAX_LENGTH);
      onTabRename(selectedTab.id, truncatedName);
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
        <div className="tab-list" role="tablist" ref={tabListRef}>
          <button
            type="button"
            className="tab-list-button"
            onClick={() => setIsTabListModalOpen(true)}
            title="List all tabs"
          >
            <FaList />
          </button>

          <button
            type="button"
            className="tab-add"
            onClick={onTabAdd}
            title="Add new tab"
          >
            <FaPlus />
          </button>

          {visibleTabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${tab.isActive ? 'active' : ''} ${dragOverId === tab.id ? 'drag-over' : ''}`}
              onClick={() => handleTabSelect(tab)}
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
              <span
                className="tab-name"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleTabDoubleClick(tab);
                }}
              >
                {tab.name}
              </span>
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
                  {tab.locked ? <FaLock /> : <FaLockOpen />}
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
                  <FaThumbtack />
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

          {overflowTabs.length > 0 && (
            <button
              ref={overflowButtonRef}
              type="button"
              className={`tab-overflow-button ${isOverflowOpen ? 'open' : ''}`}
              onClick={() => setIsOverflowOpen(!isOverflowOpen)}
              title={`${overflowTabs.length} more tabs`}
            >
              <FaChevronDown />
              <span className="overflow-count">{overflowTabs.length}</span>
            </button>
          )}
        </div>
      </div>

      <InputModal
        isOpen={isModalOpen}
        title="Rename Tab"
        placeholder="Enter new tab name"
        defaultValue={selectedTab?.name || ''}
        maxLength={CONSTANTS.TAB_NAME_MAX_LENGTH}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />

      <TabListModal
        isOpen={isTabListModalOpen}
        tabs={tabs}
        onClose={() => setIsTabListModalOpen(false)}
        onTabSelect={onTabSelect}
        onDuplicate={onDuplicate}
        onTogglePin={onTogglePin}
        onToggleLock={onToggleLock}
        onTabClose={onTabClose}
        theme={theme}
      />

      <TabOverflowDropdown
        isOpen={isOverflowOpen}
        overflowTabs={overflowTabs}
        onClose={() => setIsOverflowOpen(false)}
        onTabSelect={onTabSelect}
        onDuplicate={onDuplicate}
        onTogglePin={onTogglePin}
        onToggleLock={onToggleLock}
        onTabClose={onTabClose}
        anchorRef={overflowButtonRef}
        theme={theme}
      />
    </>
  );
};

export default TabManager;
