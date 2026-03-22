import type { StoryPack } from '@core/types';

const storyPack: StoryPack = {
  id: 'your-story-id',
  version: '1.0.0',
  metadata: {
    title: 'שם הסיפור',
    description: 'תיאור קצר',
    ageRange: [6, 8],
    estimatedMinutes: 30,
    difficulty: 'easy',
    tags: [],
  },
  startScene: 'scene_1',
  items: {},
  bonusItems: {},
  npcs: {},
  badges: [],
  theme: { colors: {} },
  mapLayout: [],
  mapEdges: [],
  audioManifest: { sfx: {}, music: {} },
  scenes: {
    scene_1: {
      id: 'scene_1',
      title: 'התחלה',
      bg: 'town',
      dialogue: [{ speaker: 'narrator', text: 'הסיפור מתחיל כאן...' }],
      choices: [],
    },
  },
};

export default storyPack;
