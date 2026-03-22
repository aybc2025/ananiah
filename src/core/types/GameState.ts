import type { SceneId, ItemId, BonusItemId, BadgeId, StatType } from './StoryPack';

export interface AvatarConfig {
  skinTone: number;
  hairStyle: number;
  hairColor: number;
  outfit: number;
  accessory: number;
}

export interface ChoiceRecord {
  sceneId: SceneId;
  choiceIndex: number;
  stat?: StatType;
  diceResult?: number;
  timestamp: number;
}

export interface StatRollRecord {
  stat: StatType;
  result: number;
  sceneId: SceneId;
}

export interface GameSave {
  id: string;
  storyId: string;
  characterName: string;
  characterAvatar: AvatarConfig;
  currentScene: SceneId;
  visitedScenes: SceneId[];
  inventory: ItemId[];
  bonusItems: BonusItemId[];
  boosts: number;
  totalBoostsEarned: number;
  choices: ChoiceRecord[];
  statRolls: StatRollRecord[];
  badges: BadgeId[];
  updatedAt: number;
  playTime: number;
  completed: boolean;
  goblinFriend: boolean;
}

export type Screen =
  | 'splash'
  | 'create'
  | 'adventure'
  | 'map'
  | 'inventory'
  | 'trophy';

export interface GameState extends GameSave {
  screen: Screen;
  dialogueIndex: number;
  diceState: DiceState | null;
  challengeCompleted: boolean;
}

export interface DiceState {
  rolling: boolean;
  result: number | null;
  tier: DiceTier | null;
}

export interface DiceTier {
  name: string;
  min: number;
  max: number;
  color: string;
}
