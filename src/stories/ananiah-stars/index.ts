import type { StoryPack } from '@core/types';

// ============================================================
// "מסע אל אוצר הכוכבים" — StoryPack
// This is PURE DATA. No logic, no imports from engine.
// The engine reads this generically.
// ============================================================

const storyPack: StoryPack = {
  id: 'ananiah-stars',
  version: '1.0.0',
  metadata: {
    title: 'מסע אל אוצר הכוכבים',
    description: 'אוצר הכוכבים של ממלכת ענניה התפזר! צאו להרפתקה קסומה, אספו שבעה פריטים, והחזירו את האור לממלכה.',
    ageRange: [6, 8],
    estimatedMinutes: 35,
    difficulty: 'easy',
    tags: ['פנטזיה', 'עננים', 'אוצרות', 'גובלינים'],
  },

  startScene: 'scene_1',

  items: {
    cloud_feather: { id: 'cloud_feather', name: 'נוצת ענן', icon: 'feather', color: '#d8cfe8' },
    rainbow_drop: { id: 'rainbow_drop', name: 'טיפת קשת', icon: 'droplet', color: '#f472b6' },
    wind_bell: { id: 'wind_bell', name: 'פעמון רוח', icon: 'bell', color: '#56c4b5' },
    sun_seed: { id: 'sun_seed', name: 'זרע שמש', icon: 'sun', color: '#ffd166' },
    moon_tear: { id: 'moon_tear', name: 'דמעת ירח', icon: 'moon', color: '#a5b4fc' },
    star_dust: { id: 'star_dust', name: 'אבק כוכבים', icon: 'sparkles', color: '#c084fc' },
    sky_key: { id: 'sky_key', name: 'מפתח השמיים', icon: 'key', color: '#fbbf24' },
  },

  bonusItems: {
    cloud_chocolate: { id: 'cloud_chocolate', name: 'שוקולד ענן', icon: 'heart', color: '#f5d5e0' },
    leaf_shield: { id: 'leaf_shield', name: 'עלה מגן', icon: 'shield', color: '#86efac' },
    lightning_boot: { id: 'lightning_boot', name: 'מגף ברק', icon: 'zap', color: '#fbbf24' },
    goblin_tag: { id: 'goblin_tag', name: 'תג חברות גחכני', icon: 'users', color: '#4ade80' },
  },

  npcs: {
    grandma: { name: 'סבתא ערפל', color: '#d8cfe8', role: 'מדריכה' },
    zafzif: { name: 'זפזיף הסוחר', color: '#f4a261', role: 'סוחר' },
    ruchanit: { name: 'רוחנית', color: '#56c4b5', role: 'שומרת' },
    nivton: { name: 'נבטון', color: '#86efac', role: 'צמח' },
    panas: { name: 'פנס', color: '#fbbf24', role: 'מדריך' },
    gichuch: { name: 'גיחוך', color: '#4ade80', role: 'גובלין' },
    tzchkuk: { name: 'צחקוק', color: '#34d399', role: 'גובלין' },
    chikuch: { name: 'חיכוך', color: '#2dd4bf', role: 'גובלין' },
  },

  badges: [
    { id: 'hero', name: 'גיבור/ת ענניה', desc: 'סיימת את ההרפתקה', icon: 'shield', color: '#ffd166', condition: { type: 'always' } },
    { id: 'collector', name: 'אספן/ית הכוכבים', desc: 'אספת את כל 7 הפריטים', icon: 'star', color: '#c084fc', condition: { type: 'all_items_collected' } },
    { id: 'golden_heart', name: 'לב זהב', desc: 'בחרת תמיד באפשרות לב', icon: 'heart', color: '#e05e9f', condition: { type: 'all_stats_same', stat: 'heart' } },
    { id: 'thunder', name: 'חזק/ה כרעם', desc: 'בחרת תמיד באפשרות גוף', icon: 'zap', color: '#e76f51', condition: { type: 'all_stats_same', stat: 'body' } },
    { id: 'wise_cloud', name: 'חכם/ה כענן', desc: 'בחרת תמיד באפשרות מוח', icon: 'cloud', color: '#5e9fe0', condition: { type: 'all_stats_same', stat: 'brain' } },
    { id: 'boost_king', name: 'מלך/ת הבוסטים', desc: 'צברת 3 בוסטים או יותר', icon: 'bolt', color: '#f4a261', condition: { type: 'min_boosts', count: 3 } },
    { id: 'goblin_friend', name: 'חבר/ת הגחכנים', desc: 'הזמנת את הגובלינים לכפר', icon: 'users', color: '#56c4b5', condition: { type: 'specific_choice', sceneId: 'scene_8', choiceIndex: 2 } },
  ],

  theme: {
    colors: {},
  },

  mapLayout: [
    { id: 'scene_1', x: 50, y: 90, label: 'כיכר ענניה' },
    { id: 'scene_2', x: 50, y: 78, label: 'שוק הרוחות' },
    { id: 'scene_3', x: 50, y: 66, label: 'גשר הקשת' },
    { id: 'scene_4', x: 25, y: 54, label: 'מגדל הרוח' },
    { id: 'scene_5', x: 75, y: 54, label: 'הגן הצף' },
    { id: 'scene_6', x: 50, y: 42, label: 'הבחירה הגדולה' },
    { id: 'scene_7a', x: 25, y: 30, label: 'מערת הענן' },
    { id: 'scene_7b', x: 75, y: 30, label: 'דרך הסערה' },
    { id: 'scene_8', x: 50, y: 20, label: 'מאורת הגחכנים' },
    { id: 'scene_9', x: 50, y: 12, label: 'ההר הגבוה' },
    { id: 'scene_10', x: 50, y: 5, label: 'אוצר הכוכבים' },
  ],

  mapEdges: [
    ['scene_1', 'scene_2'], ['scene_2', 'scene_3'],
    ['scene_3', 'scene_4'], ['scene_3', 'scene_5'],
    ['scene_4', 'scene_6'], ['scene_5', 'scene_6'],
    ['scene_6', 'scene_7a'], ['scene_6', 'scene_7b'],
    ['scene_7a', 'scene_8'], ['scene_7b', 'scene_8'],
    ['scene_8', 'scene_9'], ['scene_9', 'scene_10'],
  ],

  audioManifest: {
    sfx: {
      button_tap: { sprite: 'ui-sprite', start: 0, duration: 100 },
      choice_select: { sprite: 'ui-sprite', start: 150, duration: 200 },
      dice_roll: { sprite: 'dice-sprite', start: 0, duration: 1200 },
      dice_land_oops: { sprite: 'dice-sprite', start: 1300, duration: 300 },
      dice_land_success: { sprite: 'dice-sprite', start: 1700, duration: 300 },
      dice_land_triumph: { sprite: 'dice-sprite', start: 2100, duration: 500 },
      item_collect: { sprite: 'magic-sprite', start: 0, duration: 800 },
      boost_earned: { sprite: 'magic-sprite', start: 900, duration: 400 },
      npc_grandma: { sprite: 'npc-jingles-sprite', start: 0, duration: 500 },
      npc_zafzif: { sprite: 'npc-jingles-sprite', start: 600, duration: 500 },
      npc_ruchanit: { sprite: 'npc-jingles-sprite', start: 1200, duration: 500 },
      npc_nivton: { sprite: 'npc-jingles-sprite', start: 1800, duration: 500 },
      npc_panas: { sprite: 'npc-jingles-sprite', start: 2400, duration: 500 },
      npc_gichuch: { sprite: 'npc-jingles-sprite', start: 3000, duration: 500 },
      scene_transition: { sprite: 'ui-sprite', start: 400, duration: 600 },
      badge_stamp: { sprite: 'magic-sprite', start: 1400, duration: 800 },
    },
    music: {
      scene_1: 'town-loop',
      scene_1_nudge: 'town-loop',
      scene_2: 'town-loop',
      scene_3: 'nature-loop',
      scene_4: 'nature-loop',
      scene_4_hint: 'nature-loop',
      scene_4_retry: 'nature-loop',
      scene_4_failforward: 'nature-loop',
      scene_5: 'nature-loop',
      scene_6: 'mystery-loop',
      scene_7a: 'mystery-loop',
      scene_7b: 'storm-loop',
      scene_8: 'goblin-loop',
      scene_9: 'climax-loop',
      scene_10: 'climax-loop',
      scene_11: 'celebration-loop',
    },
  },

  // ── SCENES ──────────────────────────────────────────

  scenes: {
    scene_1: {
      id: 'scene_1', title: 'כיכר ענניה', bg: 'town', npc: 'grandma',
      dialogue: [
        { speaker: 'grandma', text: 'אוי ואבוי, גיבור צעיר! האוצר הגדול של ענניה — אוצר הכוכבים — התפזר לכל הרוחות!', mood: 'worried' },
        { speaker: 'grandma', text: 'בלי אוצר הכוכבים, הממלכה תפסיק לצוף ותישאר חשוכה! אני צריכה מישהו אמיץ שיאסוף את שבעת הרכיבים.', mood: 'pleading' },
      ],
      choices: [
        { text: 'אני אעזור!', next: 'scene_2' },
        { text: 'אולי אחר כך...', next: 'scene_1_nudge' },
      ],
    },

    scene_1_nudge: {
      id: 'scene_1_nudge', title: 'כיכר ענניה', bg: 'town', npc: 'grandma',
      dialogue: [
        { speaker: 'grandma', text: 'אני מבינה... אבל תראה מה קורה!', mood: 'sad' },
        { speaker: 'narrator', text: 'העננים מתחילים להתכהות. הכוכבים נעלמים אחד-אחד...' },
      ],
      choices: [
        { text: 'חכי! אני בא לעזור!', next: 'scene_2' },
        { text: 'טוב טוב, אני יוצא לדרך!', next: 'scene_2' },
      ],
    },

    scene_2: {
      id: 'scene_2', title: 'שוק הרוחות', bg: 'market', npc: 'zafzif',
      dialogue: [
        { speaker: 'zafzif', text: 'שלום שלום, מי בא לכאן? יש לי סחורה מעולה, זה ברור וגלוי לעין!', mood: 'happy' },
        { speaker: 'zafzif', text: 'יש לי נוצת ענן — בדיוק מה שצריך. אבל אני לא לוקח מטבעות... אני לוקח סיפורים!', mood: 'sly' },
      ],
      choices: [
        { text: 'אספר לך על הפעם שניצחתי דרקון!', stat: 'heart', next: 'scene_3', item: 'cloud_feather' },
        { text: 'אשיר לך שיר!', stat: 'heart', next: 'scene_3', item: 'cloud_feather' },
        { text: 'מה אם אעזור לך לסדר את הדוכן?', next: 'scene_3', item: 'cloud_feather', auto: true },
      ],
      oopsText: 'זפזיף צוחק: "הסיפור שלך מצחיק! קח את הנוצה!"',
      successText: '"סיפור נפלא! הנה הנוצה!"',
    },

    scene_3: {
      id: 'scene_3', title: 'גשר הקשת', bg: 'bridge',
      dialogue: [
        { speaker: 'narrator', text: 'גשר ענק עשוי מקשת מתנשא לפניך. אבל באמצע — חור גדול!' },
        { speaker: 'narrator', text: 'צריך לקפוץ מעל הסדק כדי להמשיך.' },
      ],
      challenge: { stat: 'body', description: 'לקפוץ מעל הסדק בגשר' },
      item: 'rainbow_drop',
      oopsText: 'נפלת על ענן רך למטה! ענן טרמפולינה הקפיץ אותך בחזרה למעלה. מצחיק!',
      successText: 'קפצת בחינניות מעל הסדק!',
      triumphText: 'קפיצה מדהימה! מצאת טיפת קשת בדרך!',
      afterChallenge: [
        { text: 'מגדל הרוח נשמע מעניין!', next: 'scene_4' },
        { text: 'הגן הצף נראה יפה!', next: 'scene_5' },
      ],
      choices: [],
    },

    scene_4: {
      id: 'scene_4', title: 'מגדל הרוח', bg: 'tower', npc: 'ruchanit',
      dialogue: [
        { speaker: 'ruchanit', text: 'שששש... אני שומרת על פעמון הרוח כבר מאה שנה. אם תפתור את החידה שלי, הוא שלך!', mood: 'mysterious' },
        { speaker: 'ruchanit', text: 'הקשיבו טוב: אני נוסעת בלי רגליים, שורקת בלי פה, ומעיפה כובעים בלי ידיים. מי אני?', mood: 'curious' },
      ],
      choices: [
        { text: 'הרוח!', next: 'scene_6', item: 'wind_bell', auto: true, correct: true },
        { text: 'הים?', next: 'scene_4_retry' },
        { text: 'אני לא יודע/ת...', next: 'scene_4_hint' },
      ],
    },

    scene_4_hint: {
      id: 'scene_4_hint', title: 'מגדל הרוח', bg: 'tower', npc: 'ruchanit',
      dialogue: [
        { speaker: 'ruchanit', text: 'רמז: אני מרגישים אותי בחוץ ביום סוער...', mood: 'helpful' },
      ],
      choices: [
        { text: 'הרוח!', next: 'scene_6', item: 'wind_bell', auto: true },
        { text: 'בלון?', next: 'scene_4_failforward' },
      ],
    },

    scene_4_retry: {
      id: 'scene_4_retry', title: 'מגדל הרוח', bg: 'tower', npc: 'ruchanit',
      dialogue: [
        { speaker: 'ruchanit', text: 'כמעט! תנסו שוב... רמז: אני מרגישים אותי בחוץ ביום סוער.', mood: 'encouraging' },
      ],
      choices: [
        { text: 'הרוח!', next: 'scene_6', item: 'wind_bell', auto: true },
        { text: 'בלון?', next: 'scene_4_failforward' },
      ],
    },

    scene_4_failforward: {
      id: 'scene_4_failforward', title: 'מגדל הרוח', bg: 'tower', npc: 'ruchanit',
      dialogue: [
        { speaker: 'ruchanit', text: 'קרוב מספיק! את/ה חמוד/ה! הנה הפעמון בכל מקרה.', mood: 'amused' },
      ],
      choices: [
        { text: 'תודה רבה!', next: 'scene_6', item: 'wind_bell', auto: true },
      ],
    },

    scene_5: {
      id: 'scene_5', title: 'הגן הצף', bg: 'garden', npc: 'nivton',
      dialogue: [
        { speaker: 'nivton', text: '...אף אחד לא בא לבקר אותי. כל הפרחים האחרים גדלו ועפו, ואני נשארתי קטן.', mood: 'sad' },
      ],
      choices: [
        { text: 'אתה לא קטן, אתה מיוחד!', stat: 'heart', next: 'scene_6', item: 'sun_seed' },
        { text: 'בוא אשקה אותך!', next: 'scene_6', item: 'sun_seed', auto: true },
        { text: 'בוא נשיר שיר ביחד!', stat: 'heart', next: 'scene_6', item: 'sun_seed' },
      ],
      oopsText: 'נבטון עדיין עצוב, אבל אומר: "...תודה שניסית. קח את הזרע הזה, אולי הוא יצמח אצלך."',
      successText: 'נבטון פורח! פרח קטן צומח על ראשו. "תודה! הנה זרע שמש!"',
    },

    scene_6: {
      id: 'scene_6', title: 'הבחירה הגדולה', bg: 'crossroads', npc: 'panas',
      dialogue: [
        { speaker: 'panas', text: 'שני נתיבים מובילים למאורת הגחכנים. דרך המערה — חשוכה אבל בטוחה. דרך הסערה — מהירה אבל רועמת.', mood: 'alert' },
      ],
      choices: [
        { text: 'דרך מערת הענן — אני לא מפחד/ת מהחושך!', next: 'scene_7a' },
        { text: 'דרך הסערה — אני אוהב/ת הרפתקאות!', next: 'scene_7b' },
      ],
    },

    scene_7a: {
      id: 'scene_7a', title: 'מערת הענן', bg: 'cave',
      dialogue: [
        { speaker: 'narrator', text: 'מערה חצובה בתוך ענן סמיך. קירות נוצצים מגבישי טל. חשוך, אבל יפה.' },
        { speaker: 'narrator', text: 'צריך למצוא את הדרך בחושך...' },
      ],
      useItem: [
        { itemId: 'sun_seed', text: 'להשתמש בזרע השמש — אור!', next: 'scene_8', item: 'moon_tear', auto: true },
        { itemId: 'wind_bell', text: 'לצלצל בפעמון הרוח — הד!', next: 'scene_8', item: 'moon_tear', auto: true },
      ],
      choices: [
        { text: 'לגשש בחושך', stat: 'brain', next: 'scene_8', item: 'moon_tear' },
      ],
      oopsText: 'נתקלת בקיר רך ונפלת על ערימת כריות ענן. בתוך הכריות — דמעת ירח!',
      successText: 'מצאת שביל נוצץ שמוביל לחדר הגבישים. שם — דמעת ירח!',
    },

    scene_7b: {
      id: 'scene_7b', title: 'דרך הסערה', bg: 'storm', npc: 'panas',
      dialogue: [
        { speaker: 'panas', text: 'הברקים לא מסוכנים — הם פשוט שובבים! תרוצ/י כשהם לא מסתכלים!', mood: 'excited' },
      ],
      challenge: { stat: 'body', description: 'לרוץ בין הברקים' },
      item: 'moon_tear',
      oopsText: 'ברק שובב דגדג אותך! צחקת ונפלת על ענן. ברק אחר הביא לך דמעת ירח כפיצוי.',
      successText: 'רצת בזריזות! מצאת דמעת ירח בסוף השביל.',
      triumphText: 'רצת כמו הרוח! הברקים מוחאים כפיים!',
      afterChallenge: [
        { text: 'קדימה למאורת הגחכנים!', next: 'scene_8' },
      ],
      choices: [],
    },

    scene_8: {
      id: 'scene_8', title: 'מאורת הגחכנים', bg: 'goblin_lair', npc: 'gichuch',
      dialogue: [
        { speaker: 'gichuch', text: 'הי הי הי! מישהו בא לבקר! רוצה אבק כוכבים? תצטרך לשחק איתנו!', mood: 'excited' },
        { speaker: 'tzchkuk', text: 'כן כן! אנחנו לא רעים! סתם משעמם לנו פה למעלה!', mood: 'bouncy' },
        { speaker: 'chikuch', text: '!ןכ ןכ', mood: 'backwards' },
      ],
      choices: [
        { text: 'בואו נעשה תחרות ריקוד!', stat: 'body', next: 'scene_9', item: 'star_dust' },
        { text: 'בואו נשחק חידות!', stat: 'brain', next: 'scene_9', item: 'star_dust' },
        { text: 'למה לא באים איתי לכפר? יש שם חברים!', stat: 'heart', next: 'scene_9', item: 'star_dust', goblinFriend: true },
      ],
      oopsText: 'הגובלינים צוחקים: "הההה! זה היה ממש מצחיק! אנחנו אוהבים אותך! קח אבק כוכבים!"',
      successText: '"וואו, טוב טוב! ניצחת אותנו הוגן! הנה אבק כוכבים!"',
    },

    scene_9: {
      id: 'scene_9', title: 'ההר הגבוה', bg: 'mountain', npc: 'grandma',
      statChoice: true,
      dialogue: [
        { speaker: 'grandma', text: 'כמעט שם, גיבור/ה! שים/י את כל הרכיבים במנעול!', mood: 'proud' },
        { speaker: 'narrator', text: 'הפריטים מתחברים אחד-אחד... צריך עוד אחד — מפתח השמיים!' },
      ],
      choices: [
        { text: 'לטפס לכוכב הקרוב!', stat: 'body', next: 'scene_10', item: 'sky_key' },
        { text: 'לפתור את צורת המנעול!', stat: 'brain', next: 'scene_10', item: 'sky_key' },
        { text: 'כוכבים, בבקשה עזרו!', stat: 'heart', next: 'scene_10', item: 'sky_key' },
      ],
      oopsText: 'הכוכב נפל ישר לידיך — "אופס! טוב, לפחות הוא פה!"',
      successText: 'מפתח השמיים מופיע!',
      triumphText: 'כל הכוכבים מוחאים כפיים ומאירים! סצנה מיוחדת!',
    },

    scene_10: {
      id: 'scene_10', title: 'אוצר הכוכבים', bg: 'treasure',
      dialogue: [
        { speaker: 'narrator', text: 'הארון נפתח. בפנים — כדור אור זוהר ומסתובב. זה אוצר הכוכבים!' },
        { speaker: 'narrator', text: 'האור חוזר לענניה! העננים זוהרים, הכוכבים רוקדים, וכל התושבים יוצאים לראות!' },
        { speaker: 'grandma', text: 'ידעתי שאת/ה יכול/ה! את/ה הגיבור/ה של ענניה!', mood: 'joyful' },
      ],
      choices: [
        { text: 'לחגיגה!', next: 'scene_11', auto: true },
      ],
    },

    scene_11: {
      id: 'scene_11', title: 'חגיגה בענניה', bg: 'celebration', finale: true,
      dialogue: [
        { speaker: 'narrator', text: 'כל ענניה חוגגת! כל החברים שפגשת לאורך הדרך באו — זפזיף, נבטון, רוחנית, פנס ואפילו הגחכנים!' },
        { speaker: 'narrator', text: 'הפעם הגחכנים עושים שטויות מצחיקות לכולם, וכל העננים רוקדים!' },
      ],
      choices: [],
    },
  },
};

export default storyPack;
