import { openDB, type IDBPDatabase } from 'idb';
import type { GameSave } from '@core/types';

// ============================================================
// LocalCacheService — IndexedDB for offline-first saves
// Always writes here first, then syncs to Firebase.
// ============================================================

const DB_NAME = 'ananiah-quest';
const DB_VERSION = 1;
const SAVES_STORE = 'saves';
const SETTINGS_STORE = 'settings';

class LocalCacheServiceClass {
  private db: IDBPDatabase | null = null;

  async init() {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(SAVES_STORE)) {
          db.createObjectStore(SAVES_STORE, { keyPath: 'storyId' });
        }
        if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
        }
      },
    });
  }

  async saveSave(storyId: string, save: GameSave): Promise<void> {
    if (!this.db) return;
    await this.db.put(SAVES_STORE, { ...save, storyId });
  }

  async loadSave(storyId: string): Promise<GameSave | null> {
    if (!this.db) return null;
    const result = await this.db.get(SAVES_STORE, storyId);
    return result || null;
  }

  async deleteSave(storyId: string): Promise<void> {
    if (!this.db) return;
    await this.db.delete(SAVES_STORE, storyId);
  }

  async listSaves(): Promise<GameSave[]> {
    if (!this.db) return [];
    return (await this.db.getAll(SAVES_STORE)) as GameSave[];
  }

  async setSetting(key: string, value: unknown): Promise<void> {
    if (!this.db) return;
    await this.db.put(SETTINGS_STORE, { key, value });
  }

  async getSetting<T = unknown>(key: string): Promise<T | null> {
    if (!this.db) return null;
    const result = await this.db.get(SETTINGS_STORE, key);
    return result?.value ?? null;
  }
}

export const LocalCacheService = new LocalCacheServiceClass();
