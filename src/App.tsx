import { nanoid } from 'nanoid';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SplitPane } from '@rexxars/react-split-pane';
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
};

const defaultPhpCode = `<?php
// Welcome to Laravel Web Tinker
// Write your PHP code here and click Run

echo "Hello, World!";

// Example of using variables
$name = "Laravel";
echo "\\nWelcome to $name Web Tinker!";

// Example function
function greet($name) {
    return "Hello, $name!";
}

echo "\\n" . greet("Developer");
?>`;

const App: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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
      name: 'index.php',
      code: defaultPhpCode,
      originalCode: defaultPhpCode,
      isActive: true,
      isUnsaved: false,
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
            name: sharedData.title || 'shared.php',
            code: sharedData.code,
            originalCode: sharedData.code,
            isActive: true,
            isUnsaved: false,
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

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const handleCodeChange = useCallback(
    (value: string) => {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            // Get the original code when tab was first created/loaded
            const originalCode = tab.isUnsaved ? tab.code : (tab.originalCode || tab.code);
            return {
              ...tab,
              code: value,
              originalCode: originalCode,
              isUnsaved: value !== originalCode
            };
          }
          return tab;
        }),
      );
    },
    [activeTabId],
  );

  const handleRun = useCallback(() => {
    if (activeTab) {
      executeCode(activeTab.code);
    }
  }, [activeTab, executeCode]);

  const handleCodeShare = useCallback(() => {
    if (activeTab) {
      handleShare(activeTab.code, activeTab.name);
    }
  }, [activeTab, handleShare]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
      name: `script${tabs.length + 1}.php`,
      code: defaultPhpCode,
      originalCode: defaultPhpCode,
      isActive: true,
      isUnsaved: false,
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
    <div className={`app ${theme}`}>
      <Header
        onRun={handleRun}
        onShare={handleCodeShare}
        onClear={clearOutput}
        onToggleTheme={handleToggleTheme}
        executionState={executionState}
        theme={theme}
      />

      <TabManager
        tabs={tabs}
        activeTabId={activeTabId}
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
          defaultSize="60%"
          resizerStyle={{
            background: 'var(--border-color)',
            width: '2px',
            cursor: 'col-resize'
          }}
        >
          <CodeEditor
            value={activeTab?.code || ''}
            onChange={handleCodeChange}
            theme={theme}
            onRun={handleRun}
          />
          <OutputPanel
            executionState={executionState}
            theme={theme}
          />
        </SplitPane>
      </div>
    </div>
  );
};

export default App;