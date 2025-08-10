import { SplitPane } from '@rexxars/react-split-pane';
import { nanoid } from 'nanoid';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import DiffModal from './components/DiffModal';
import Header from './components/Header';
import HistoryModal from './components/HistoryModal';
import OutputPanel from './components/OutputPanel';
import TabManager from './components/TabManager';

import { useCodeExecution } from './hooks/useCodeExecution';
import { useCodeSharing } from './hooks/useCodeSharing';

import type { ExecuteCodeResponse, Tab } from './types';
import { CONSTANTS, STORAGE_KEYS } from './constants';
import './App.css';

const App: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [bgPattern, setBgPattern] = useState<boolean>(false);
  const [splitSize, setSplitSize] = useState<number>(window.innerWidth * 0.5);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] =
    useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [diffPair, setDiffPair] = useState<{ a: string; b: string } | null>(
    null,
  );

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

    const savedSplitSize = localStorage.getItem(STORAGE_KEYS.SPLIT_SIZE);
    if (savedSplitSize) {
      setSplitSize(Number(savedSplitSize));
    }

    setHasLoadedFromStorage(true);

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
      pinned: false,
      locked: false,
      history: [],
      replState: { enabled: false, cells: [] },
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
          const savedTabs = localStorage.getItem(STORAGE_KEYS.TABS);
          const parsedTabs = JSON.parse(savedTabs ?? '[]').map((tab: Tab) => ({
            ...tab,
            isActive: false,
          }));

          const sharedTab: Tab = {
            id: nanoid(),
            name: `Shared - ${sharedData.title}` || 'Shared Code',
            code: sharedData.code,
            isActive: true,
          };

          setTabs([...parsedTabs, sharedTab]);
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

  // Save theme to localStorage (only after initial load)
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
  }, [theme, hasLoadedFromStorage]);

  // Save bg pattern to localStorage (only after initial load)
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem(STORAGE_KEYS.BG_PATTERN, bgPattern ? '1' : '0');
    }
  }, [bgPattern, hasLoadedFromStorage]);

  // Save split size to localStorage (only after initial load)
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem(STORAGE_KEYS.SPLIT_SIZE, splitSize.toString());
    }
  }, [splitSize, hasLoadedFromStorage]);

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
    async (code?: string) => {
      if (!activeTab) return;

      // Compose REPL state
      const tab = activeTab;
      const userCode = (code ?? tab.code) || '';
      const replEnabled = tab.replState?.enabled ?? true;

      const result: ExecuteCodeResponse | null = await executeCode(userCode);

      if (!result) {
        return;
      }

      // Record history (with the user's code snapshot, not the composed one)
      setTabs((prev) =>
        prev.map((t) => {
          if (t.id !== tab.id) return t;
          const history = t.history ?? [];

          const outputSizeSplit = result.outputSize.split(' ');
          const outputSize = parseFloat(outputSizeSplit[0]);
          const outputSizeUnit = outputSizeSplit[1];

          const historyResult = { ...result };
          if (
            outputSizeUnit !== 'B' &&
            (outputSize > 250 || outputSizeUnit !== 'KB')
          ) {
            historyResult.output = 'Output too large to display';
          }

          const newRecord = {
            id: nanoid(),
            code: userCode,
            result: historyResult,
            error: result ? null : 'Execution failed',
            ts: result.timestamp,
            pinned: false,
          };

          // cap history to last 25
          const nextHistory = [...history, newRecord].slice(-25);

          // If success and REPL is enabled, persist the code as a state cell
          const nextRepl = { ...(t.replState ?? { enabled: true, cells: [] }) };
          if (replEnabled && result) {
            nextRepl.cells = [
              ...(nextRepl.cells || []),
              {
                id: nanoid(),
                historyId: newRecord.id,
              },
            ];
          }

          return { ...t, history: nextHistory, replState: nextRepl };
        }),
      );
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
      pinned: false,
      locked: false,
      history: [],
      replState: { enabled: false, cells: [] },
    };

    setTabs((prevTabs) => [
      ...prevTabs.map((tab) => ({ ...tab, isActive: false })),
      newTab,
    ]);
    setActiveTabId(newTab.id);
  }, [tabs.length]);

  const handleTabRename = useCallback((tabId: string, newName: string) => {
    const truncatedName = newName.slice(0, CONSTANTS.TAB_NAME_MAX_LENGTH);
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, name: truncatedName } : tab,
      ),
    );
  }, []);

  const handleSplitSizeChange = useCallback((size: number) => {
    setSplitSize(size);
  }, []);

  if (tabs.length === 0) {
    return;
  }

  return (
    <div className={`app ${theme} ${bgPattern ? 'bg-grid' : ''}`}>
      <Header
        onRun={handleRun}
        onShare={handleCodeShare}
        onClear={clearOutput}
        onToggleTheme={handleToggleTheme}
        onToggleBgPattern={handleToggleBgPattern}
        onToggleRepl={() => {
          if (!activeTab) return;
          setTabs((prev) =>
            prev.map((t) =>
              t.id === activeTab.id
                ? {
                    ...t,
                    replState: {
                      enabled: !(t.replState?.enabled ?? true),
                      cells: t.replState?.cells || [],
                    },
                  }
                : t,
            ),
          );
        }}
        onResetRepl={() => {
          if (!activeTab) return;
          setTabs((prev) =>
            prev.map((t) =>
              t.id === activeTab.id
                ? {
                    ...t,
                    replState: {
                      enabled: t.replState?.enabled ?? true,
                      cells: [],
                    },
                  }
                : t,
            ),
          );
          clearOutput();
        }}
        onAddTab={handleTabAdd}
        replEnabled={activeTab?.replState?.enabled ?? true}
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
        onReorder={(orderedIds) => {
          setTabs((prev) => {
            const map = new Map(prev.map((t) => [t.id, t] as const));
            const next = orderedIds
              .map((id) => map.get(id))
              .filter(Boolean) as Tab[];
            // Keep active flag consistent
            return next.map((t) => ({ ...t, isActive: t.id === activeTabId }));
          });
        }}
        onTogglePin={(tabId: string) => {
          setTabs((prev) =>
            prev.map((t) => (t.id === tabId ? { ...t, pinned: !t.pinned } : t)),
          );
        }}
        onToggleLock={(tabId: string) => {
          setTabs((prev) =>
            prev.map((t) => (t.id === tabId ? { ...t, locked: !t.locked } : t)),
          );
        }}
        onDuplicate={(tabId: string) => {
          setTabs((prev) => {
            const idx = prev.findIndex((t) => t.id === tabId);
            if (idx === -1) return prev;
            const orig = prev[idx];
            const dup: Tab = {
              ...orig,
              id: nanoid(),
              name: `${orig.name} copy`,
              isActive: false,
              // Do not duplicate history by default
              history: [],
            };
            const next = [...prev];
            next.splice(idx + 1, 0, dup);
            return next;
          });
        }}
        theme={theme}
      />

      <div className="main-content">
        <SplitPane
          split="vertical"
          minSize={window.innerWidth * 0.4}
          maxSize={-window.innerWidth * 0.4}
          defaultSize={splitSize}
          onChange={handleSplitSizeChange}
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
            readOnly={!!activeTab?.locked}
          />
          <OutputPanel
            executionState={executionState}
            theme={theme}
            onOpenHistory={() => setIsHistoryOpen(true)}
            replState={activeTab?.replState}
            history={activeTab?.history}
          />
        </SplitPane>
      </div>

      {/* History Modal */}
      {activeTab && (
        <HistoryModal
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={activeTab.history || []}
          onRestore={(recordId) => {
            const rec = (activeTab.history || []).find(
              (r) => r.id === recordId,
            );
            if (!rec) return;
            setTabs((prev) =>
              prev.map((t) =>
                t.id === activeTab.id ? { ...t, code: rec.code } : t,
              ),
            );
            setIsHistoryOpen(false);
          }}
          onPinToggle={(recordId) => {
            setTabs((prev) =>
              prev.map((t) => {
                if (t.id !== activeTab.id) return t;
                const history = (t.history || []).map((r) =>
                  r.id === recordId ? { ...r, pinned: !r.pinned } : r,
                );
                return { ...t, history };
              }),
            );
          }}
          onClear={() => {
            setTabs((prev) =>
              prev.map((t) =>
                t.id === activeTab.id
                  ? {
                      ...t,
                      history: [],
                      replState: {
                        enabled: t.replState?.enabled ?? false,
                        cells: [],
                      },
                    }
                  : t,
              ),
            );
          }}
          onCompare={(aId, bId) => {
            setDiffPair({ a: aId, b: bId });
            setIsHistoryOpen(false);
          }}
          theme={theme}
        />
      )}

      {/* Diff Modal */}
      {activeTab && diffPair && (
        <DiffModal
          isOpen={!!diffPair}
          onClose={() => setDiffPair(null)}
          original={
            (activeTab.history || []).find((r) => r.id === diffPair.a)?.code ||
            ''
          }
          modified={
            (activeTab.history || []).find((r) => r.id === diffPair.b)?.code ||
            ''
          }
          theme={theme}
        />
      )}
    </div>
  );
};

export default App;
