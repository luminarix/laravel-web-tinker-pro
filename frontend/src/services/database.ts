import { Dexie, type EntityTable } from 'dexie';
import type { ShareCodeRequest, Tab } from '../types';

// Database entities
export interface AppSettings {
  id: string;
  value: string;
}

export interface TabData {
  id: string;
  tabs: string; // JSON stringified array of tabs
  activeTabId: string;
}

export interface SharedCode {
  shareId: string;
  data: string; // JSON stringified share request
  createdAt: Date;
}

// Database schema
export class WebTinkerDB extends Dexie {
  settings!: EntityTable<AppSettings, 'id'>;
  tabData!: EntityTable<TabData, 'id'>;
  sharedCode!: EntityTable<SharedCode, 'shareId'>;

  constructor() {
    super('WebTinkerDB');

    this.version(1).stores({
      settings: 'id, value',
      tabData: 'id, tabs, activeTabId',
      sharedCode: 'shareId, data, createdAt',
    });
  }
}

// Create database instance
export const db = new WebTinkerDB();

// Settings keys
const SETTINGS_KEYS = {
  THEME: 'webTinker_theme',
  BG_PATTERN: 'webTinker_bgPattern',
  SPLIT_SIZE: 'webTinker_splitSize',
} as const;

const TAB_DATA_KEY = 'default';

// Type for setting keys
type SettingKey = keyof typeof SETTINGS_KEYS;

// Get setting value
export async function getSetting(key: SettingKey): Promise<string | null> {
  try {
    const settingKey = SETTINGS_KEYS[key];
    const result = await db.settings.get(settingKey);
    return result?.value ?? null;
  } catch (error) {
    console.error('Error getting setting:', error);
    return null;
  }
}

// Set setting value
export async function setSetting(
  key: SettingKey,
  value: string,
): Promise<void> {
  try {
    const settingKey = SETTINGS_KEYS[key];
    await db.settings.put({ id: settingKey, value });
  } catch (error) {
    console.error('Error setting value:', error);
  }
}

// Get tabs data
export async function getTabs(): Promise<{
  tabs: Tab[] | null;
  activeTabId: string | null;
}> {
  try {
    const result = await db.tabData.get(TAB_DATA_KEY);
    if (!result) {
      return { tabs: null, activeTabId: null };
    }

    const tabs = result.tabs ? JSON.parse(result.tabs) : null;
    return { tabs, activeTabId: result.activeTabId };
  } catch (error) {
    console.error('Error getting tabs:', error);
    return { tabs: null, activeTabId: null };
  }
}

// Set tabs data
export async function setTabs(tabs: Tab[], activeTabId: string): Promise<void> {
  try {
    await db.tabData.put({
      id: TAB_DATA_KEY,
      tabs: JSON.stringify(tabs),
      activeTabId,
    });
  } catch (error) {
    console.error('Error setting tabs:', error);
  }
}

// Get shared code
export async function getSharedCode(
  shareId: string,
): Promise<ShareCodeRequest | null> {
  try {
    const result = await db.sharedCode.get(shareId);
    return result ? JSON.parse(result.data) : null;
  } catch (error) {
    console.error('Error getting shared code:', error);
    return null;
  }
}

// Set shared code
export async function setSharedCode(
  shareId: string,
  data: ShareCodeRequest,
): Promise<void> {
  try {
    await db.sharedCode.put({
      shareId,
      data: JSON.stringify(data),
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error setting shared code:', error);
  }
}

// Clean up old shared code (older than 30 days)
export async function cleanupOldSharedCode(): Promise<void> {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await db.sharedCode.where('createdAt').below(thirtyDaysAgo).delete();
  } catch (error) {
    console.error('Error cleaning up old shared code:', error);
  }
}

// Initialize and migrate on first load
db.open()
  .then(() => {
    cleanupOldSharedCode();
  })
  .catch((error) => {
    console.error('Failed to open database:', error);
  });
