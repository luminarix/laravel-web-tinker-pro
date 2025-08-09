import { SplitPane } from '@rexxars/react-split-pane';
import { nanoid } from 'nanoid';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Header from './components/Header';
import OutputPanel from './components/OutputPanel';
import TabManager from './components/TabManager';

import { useCodeExecution } from './hooks/useCodeExecution';
import { useCodeSharing } from './hooks/useCodeSharing';

import type { Tab } from './types';
import './App.css';

const STORAGE_KEYS = {
  TABS: 'webTinker_tabs',
  ACTIVE_TAB: 'webTinker_activeTab',
  THEME: 'webTinker_theme',
  BG_PATTERN: 'webTinker_bgPattern',
};

const App: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [bgPattern, setBgPattern] = useState<boolean>(false);

  const { executionState, executeCode, clearOutput } = useCodeExecution();
  const { handleShare, loadSharedCode, getShareIdFromUrl } = useCodeSharing();

  // Load from localStorage on mount
  useEffect(() => {
    const savedTabs = localStorage.getItem(STORAGE_KEYS.TABS);
    const savedActiveTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    }

    const savedBg = localStorage.getItem(STORAGE_KEYS.BG_PATTERN);
    if (savedBg) {
      setBgPattern(savedBg === '1' || savedBg === 'true');
    }

    if (savedTabs && savedActiveTab) {
      try {
        const parsedTabs = JSON.parse(savedTabs);
        setTabs(parsedTabs);
        setActiveTabId(savedActiveTab);
        return;
      } catch (error) {
        console.error('Failed to load saved tabs:', error);
      }
    }

    // Create default tab
    const defaultTab: Tab = {
      id: nanoid(),
      name: 'Tab 1',
      code: '',
      isActive: true,
    };

    setTabs([defaultTab]);
    setActiveTabId(defaultTab.id);
  }, []);

  // Check for shared code on mount
  useEffect(() => {
    const shareId = getShareIdFromUrl();
    if (shareId) {
      loadSharedCode(shareId).then((sharedData) => {
        if (sharedData) {
          const sharedTab: Tab = {
            id: nanoid(),
            name: sharedData.title || 'Shared Code',
            code: sharedData.code,
            isActive: true,
          };

          setTabs([sharedTab]);
          setActiveTabId(sharedTab.id);

          // Remove share parameter from URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }
      });
    }
  }, [loadSharedCode, getShareIdFromUrl]);

  // Save to localStorage when tabs or activeTabId change
  useEffect(() => {
    if (tabs.length > 0) {
      localStorage.setItem(STORAGE_KEYS.TABS, JSON.stringify(tabs));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTabId);
    }
  }, [tabs, activeTabId]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Save bg pattern to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BG_PATTERN, bgPattern ? '1' : '0');
  }, [bgPattern]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const handleCodeChange = useCallback(
    (value: string) => {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            return {
              ...tab,
              code: value,
            };
          }
          return tab;
        }),
      );
    },
    [activeTabId],
  );

  const handleRun = useCallback(
    (code?: string) => {
      if (activeTab) {
        // Use provided code (from keyboard shortcut) or current tab code
        executeCode(code || activeTab.code);
      }
    },
    [activeTab, executeCode],
  );

  const handleCodeShare = useCallback(() => {
    if (activeTab) {
      handleShare(activeTab.code, activeTab.name);
    }
  }, [activeTab, handleShare]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleToggleBgPattern = useCallback(() => {
    setBgPattern((prev) => !prev);
  }, []);

  const handleTabSelect = useCallback((tabId: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({ ...tab, isActive: tab.id === tabId })),
    );
    setActiveTabId(tabId);
  }, []);

  const handleTabClose = useCallback(
    (tabId: string) => {
      if (tabs.length <= 1) return;

      setTabs((prevTabs) => {
        const newTabs = prevTabs.filter((tab) => tab.id !== tabId);
        if (tabId === activeTabId) {
          const newActiveTab = newTabs[0];
          setActiveTabId(newActiveTab.id);
          return newTabs.map((tab) => ({
            ...tab,
            isActive: tab.id === newActiveTab.id,
          }));
        }
        return newTabs;
      });
    },
    [tabs.length, activeTabId],
  );

  const handleTabAdd = useCallback(() => {
    const newTab: Tab = {
      id: nanoid(),
      name: `Tab ${tabs.length + 1}`,
      code: '',
      isActive: true,
    };

    setTabs((prevTabs) => [
      ...prevTabs.map((tab) => ({ ...tab, isActive: false })),
      newTab,
    ]);
    setActiveTabId(newTab.id);
  }, [tabs.length]);

  const handleTabRename = useCallback((tabId: string, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, name: newName } : tab,
      ),
    );
  }, []);

  if (tabs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`app ${theme} ${bgPattern ? 'bg-grid' : ''}`}>
      <Header
        onRun={handleRun}
        onShare={handleCodeShare}
        onClear={clearOutput}
        onToggleTheme={handleToggleTheme}
        onToggleBgPattern={handleToggleBgPattern}
        executionState={executionState}
        theme={theme}
        bgPattern={bgPattern}
      />

      <TabManager
        tabs={tabs}
        onTabSelect={handleTabSelect}
        onTabClose={handleTabClose}
        onTabAdd={handleTabAdd}
        onTabRename={handleTabRename}
        theme={theme}
      />

      <div className="main-content">
        <SplitPane
          split="vertical"
          minSize={200}
          maxSize={-200}
          defaultSize={window.innerWidth * 0.6}
          resizerStyle={{
            background: 'var(--border-color)',
            width: '2px',
            cursor: 'col-resize',
          }}
        >
          <CodeEditor
            value={activeTab?.code || ''}
            onChange={handleCodeChange}
            theme={theme}
            onRun={handleRun}
          />
          <OutputPanel executionState={executionState} theme={theme} />
        </SplitPane>
      </div>
    </div>
  );
};

export default App;
