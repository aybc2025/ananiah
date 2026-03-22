// ============================================================
// StoryPack — the complete schema for a single story
// A StoryPack is pure data (JSON). The engine reads it generically.
// ============================================================

export type SceneId = string;
export type ItemId = string;
export type BonusItemId = string;
export type NPCId = string;
export type BadgeId = string;
export type StatType = 'body' | 'brain' | 'heart';
export type MusicTrackId = string;
export type BackgroundId = string;

export interface StoryPack {
  id: string;
  version: string;
  metadata: StoryMetadata;
  scenes: Record<SceneId, Scene>;
  startScene: SceneId;
  items: Record<ItemId, ItemDefinition>;
  bonusItems: Record<BonusItemId, ItemDefinition>;
  npcs: Record<NPCId, NPCDefinition>;
  badges: BadgeDefinition[];
  theme: StoryTheme;
  mapLayout: MapNode[];
  mapEdges: [SceneId, SceneId][];
  audioManifest: AudioManifest;
}

export interface StoryMetadata {
  title: string;
  description: string;
  coverImage?: string;
  ageRange: [number, number];
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Scene {
  id: SceneId;
  title: string;
  function?: 'hook' | 'challenge' | 'pivot' | 'climax' | 'reward';
  bg: BackgroundId;
  npc?: NPCId;
  dialogue: DialogueBubble[];
  choices: Choice[];
  challenge?: ChallengeConfig;
  afterChallenge?: Choice[];
  useItem?: UseItemOption[];
  item?: ItemId;
  oopsText?: string;
  successText?: string;
  triumphText?: string;
  triumphItem?: ItemId;
  statChoice?: boolean;
  finale?: boolean;
}

export interface DialogueBubble {
  speaker: 'narrator' | NPCId;
  text: string;
  mood?: string;
  voiceoverFile?: string;
}

export interface Choice {
  text: string;
  next: SceneId;
  stat?: StatType;
  auto?: boolean;
  item?: ItemId;
  correct?: boolean;
  goblinFriend?: boolean;
}

export interface UseItemOption {
  itemId: ItemId;
  text: string;
  next: SceneId;
  item?: ItemId;
  auto?: boolean;
}

export interface ChallengeConfig {
  stat: StatType;
  description: string;
}

export interface ItemDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface NPCDefinition {
  name: string;
  color: string;
  role: string;
  portraitType?: string;
}

export interface BadgeDefinition {
  id: BadgeId;
  name: string;
  desc: string;
  icon: string;
  color: string;
  condition: BadgeCondition;
}

export type BadgeCondition =
  | { type: 'always' }
  | { type: 'all_items_collected' }
  | { type: 'all_stats_same'; stat: StatType }
  | { type: 'min_boosts'; count: number }
  | { type: 'specific_choice'; sceneId: SceneId; choiceIndex: number };

export interface StoryTheme {
  colors?: Record<string, string>;
  font?: string;
}

export interface MapNode {
  id: SceneId;
  x: number;
  y: number;
  label: string;
}

export interface AudioManifest {
  sfx: Record<string, AudioSpriteRef>;
  music: Record<SceneId, MusicTrackId>;
}

export interface AudioSpriteRef {
  sprite: string;
  start: number;
  duration: number;
}
