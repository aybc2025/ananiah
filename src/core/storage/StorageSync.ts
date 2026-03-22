import { FirebaseService } from './FirebaseService';
import { LocalCacheService } from './LocalCacheService';
import type { GameSave } from '@core/types';

// ============================================================
// StorageSync — write local first, sync to cloud async
// Conflict resolution: last-write-wins by timestamp.
// ============================================================

export class StorageSync {
  private syncTimeout: ReturnType<typeof setTimeout> | null = null;

  async init() {
    await LocalCacheService.init();
    await FirebaseService.init();
  }

  /** Save game state — writes local immediately, cloud async */
  async save(storyId: string, save: GameSave): Promise<void> {
    const saveWithTimestamp = { ...save, updatedAt: Date.now() };

    // Local first — instant
    await LocalCacheService.saveSave(storyId, saveWithTimestamp);

    // Cloud async — debounced to avoid excessive writes
    if (this.syncTimeout) clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => {
      FirebaseService.saveSave(storyId, saveWithTimestamp).catch((err) =>
        console.warn('[Sync] Cloud save failed:', err)
      );
    }, 2000);
  }

  /** Load game state — local first, cloud fallback */
  async load(storyId: string): Promise<GameSave | null> {
    // Try local first
    const local = await LocalCacheService.loadSave(storyId);

    // Try cloud
    const cloud = await FirebaseService.loadSave(storyId);

    if (!local && !cloud) return null;
    if (!local) return cloud;
    if (!cloud) return local;

    // Both exist — return most recent (last-write-wins)
    return (cloud.updatedAt || 0) > (local.updatedAt || 0) ? cloud : local;
  }

  async delete(storyId: string): Promise<void> {
    await LocalCacheService.deleteSave(storyId);
    // Cloud deletion would require Firestore deleteDoc
  }

  async listSaves(): Promise<GameSave[]> {
    // Merge local and cloud saves
    const local = await LocalCacheService.listSaves();
    const cloud = await FirebaseService.listSaves();

    const merged = new Map<string, GameSave>();
    for (const save of [...local, ...cloud]) {
      const existing = merged.get(save.storyId);
      if (!existing || (save.updatedAt || 0) > (existing.updatedAt || 0)) {
        merged.set(save.storyId, save);
      }
    }

    return Array.from(merged.values());
  }
}

export const storageSync = new StorageSync();
