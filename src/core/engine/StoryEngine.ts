import type { StoryPack, Scene, SceneId } from '@core/types';

// ============================================================
// StoryEngine — loads a StoryPack and provides navigation
// Pure logic, no state management. Used by Zustand store.
// ============================================================

export class StoryEngine {
  private pack: StoryPack;

  constructor(pack: StoryPack) {
    this.pack = pack;
  }

  get storyId(): string {
    return this.pack.id;
  }

  get metadata() {
    return this.pack.metadata;
  }

  get startScene(): SceneId {
    return this.pack.startScene;
  }

  get items() {
    return this.pack.items;
  }

  get allItemIds(): string[] {
    return Object.keys(this.pack.items);
  }

  get npcs() {
    return this.pack.npcs;
  }

  get badges() {
    return this.pack.badges;
  }

  get mapLayout() {
    return this.pack.mapLayout;
  }

  get mapEdges() {
    return this.pack.mapEdges;
  }

  get theme() {
    return this.pack.theme;
  }

  getScene(id: SceneId): Scene | undefined {
    return this.pack.scenes[id];
  }

  /** Get all scene IDs in the story */
  getAllSceneIds(): SceneId[] {
    return Object.keys(this.pack.scenes);
  }

  /** Check if a scene exists */
  hasScene(id: SceneId): boolean {
    return id in this.pack.scenes;
  }

  /** Get NPC name by id */
  getNPCName(id: string): string {
    return this.pack.npcs[id]?.name || '';
  }

  /** Get item definition */
  getItem(id: string) {
    return this.pack.items[id] || this.pack.bonusItems[id];
  }

  /** Validate the story pack structure */
  validate(): string[] {
    const errors: string[] = [];

    // Check start scene exists
    if (!this.pack.scenes[this.pack.startScene]) {
      errors.push(`Start scene "${this.pack.startScene}" not found`);
    }

    // Check all next references
    for (const [id, scene] of Object.entries(this.pack.scenes)) {
      for (const choice of scene.choices || []) {
        if (choice.next && !this.pack.scenes[choice.next]) {
          errors.push(`Scene "${id}" choice references non-existent scene "${choice.next}"`);
        }
        if (choice.item && !this.pack.items[choice.item] && !this.pack.bonusItems[choice.item]) {
          errors.push(`Scene "${id}" choice references non-existent item "${choice.item}"`);
        }
      }
      if (scene.npc && !this.pack.npcs[scene.npc]) {
        errors.push(`Scene "${id}" references non-existent NPC "${scene.npc}"`);
      }
    }

    return errors;
  }
}
