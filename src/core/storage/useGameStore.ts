import { create } from 'zustand';
import type { GameState, Screen, AvatarConfig, SceneId, ItemId, StatType } from '@core/types';
import { storageSync } from '@core/storage/StorageSync';

// ============================================================
// Game Store — Zustand with auto-save to IndexedDB + Firebase
// ============================================================

const INITIAL_STATE: GameState = {
  // GameSave fields
  id: '',
  storyId: 'ananiah-stars',
  characterName: '',
  characterAvatar: { skinTone: 2, hairStyle: 0, hairColor: 0, outfit: 0, accessory: 0 },
  currentScene: 'scene_1',
  visitedScenes: [],
  inventory: [],
  bonusItems: [],
  boosts: 0,
  totalBoostsEarned: 0,
  choices: [],
  statRolls: [],
  badges: [],
  updatedAt: 0,
  playTime: 0,
  completed: false,
  goblinFriend: false,
  // UI state (not persisted)
  screen: 'splash',
  dialogueIndex: 0,
  diceState: null,
  challengeCompleted: false,
};

interface GameActions {
  setScreen: (screen: Screen) => void;
  setName: (name: string) => void;
  setAvatar: (avatar: Partial<AvatarConfig>) => void;
  goToScene: (sceneId: SceneId) => void;
  nextDialogue: () => void;
  collectItem: (itemId: ItemId) => void;
  addBoost: () => void;
  useBoost: () => void;
  setDiceRolling: () => void;
  setDiceResult: (result: number, tier: any) => void;
  clearDice: () => void;
  challengeDone: () => void;
  recordChoice: (choice: any) => void;
  recordStatRoll: (roll: any) => void;
  setGoblinFriend: () => void;
  complete: () => void;
  restart: () => void;
  loadSave: () => Promise<void>;
  autoSave: () => Promise<void>;
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...INITIAL_STATE,

  setScreen: (screen) => set({ screen }),

  setName: (name) => set({ characterName: name }),

  setAvatar: (avatar) =>
    set((s) => ({ characterAvatar: { ...s.characterAvatar, ...avatar } })),

  goToScene: (sceneId) => {
    set((s) => ({
      currentScene: sceneId,
      visitedScenes: s.visitedScenes.includes(sceneId)
        ? s.visitedScenes
        : [...s.visitedScenes, sceneId],
      dialogueIndex: 0,
      diceState: null,
      challengeCompleted: false,
      screen: 'adventure',
    }));
    // Auto-save on scene change
    get().autoSave();
  },

  nextDialogue: () => set((s) => ({ dialogueIndex: s.dialogueIndex + 1 })),

  collectItem: (itemId) => {
    set((s) =>
      s.inventory.includes(itemId) ? {} : { inventory: [...s.inventory, itemId] }
    );
    get().autoSave();
  },

  addBoost: () => {
    set((s) => ({
      boosts: s.boosts + 1,
      totalBoostsEarned: s.totalBoostsEarned + 1,
    }));
  },

  useBoost: () => set((s) => ({ boosts: Math.max(0, s.boosts - 1) })),

  setDiceRolling: () => set({ diceState: { rolling: true, result: null, tier: null } }),

  setDiceResult: (result, tier) => set({ diceState: { rolling: false, result, tier } }),

  clearDice: () => set({ diceState: null }),

  challengeDone: () => set({ challengeCompleted: true }),

  recordChoice: (choice) =>
    set((s) => ({ choices: [...s.choices, { ...choice, timestamp: Date.now() }] })),

  recordStatRoll: (roll) =>
    set((s) => ({ statRolls: [...s.statRolls, roll] })),

  setGoblinFriend: () => set({ goblinFriend: true }),

  complete: () => {
    set({ completed: true });
    get().autoSave();
  },

  restart: () => set({ ...INITIAL_STATE }),

  loadSave: async () => {
    try {
      const save = await storageSync.load('ananiah-stars');
      if (save) {
        set({
          ...save,
          screen: 'adventure',
          dialogueIndex: 0,
          diceState: null,
          challengeCompleted: false,
        });
      }
    } catch (err) {
      console.warn('[Store] Failed to load save:', err);
    }
  },

  autoSave: async () => {
    const state = get();
    try {
      await storageSync.save(state.storyId, {
        id: state.id || `save-${Date.now()}`,
        storyId: state.storyId,
        characterName: state.characterName,
        characterAvatar: state.characterAvatar,
        currentScene: state.currentScene,
        visitedScenes: state.visitedScenes,
        inventory: state.inventory,
        bonusItems: state.bonusItems,
        boosts: state.boosts,
        totalBoostsEarned: state.totalBoostsEarned,
        choices: state.choices,
        statRolls: state.statRolls,
        badges: state.badges,
        updatedAt: Date.now(),
        playTime: state.playTime,
        completed: state.completed,
        goblinFriend: state.goblinFriend,
      });
    } catch (err) {
      console.warn('[Store] Auto-save failed:', err);
    }
  },
}));
