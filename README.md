# מסע אל אוצר הכוכבים — Ananiah Quest

הרפתקת תפקידים אינטראקטיבית בעברית לילדים בגילאי 6–8, בהשראת מבוכים ודרקונים.

## התקנה והרצה

```bash
# 1. התקנת dependencies
npm install

# 2. הרצה בסביבת פיתוח
npm run dev

# 3. בנייה ל-production
npm run build

# 4. תצוגה מקדימה של הבנייה
npm run preview
```

## מבנה הפרויקט

```
src/
  core/               ← מנוע המשחק הגנרי (לא תלוי בסיפור)
    engine/            ← StoryEngine, DiceEngine, BadgeEngine
    types/             ← TypeScript types (StoryPack, GameState)
    audio/             ← AudioManager (Howler.js wrapper)
    storage/           ← Firebase + IndexedDB + Zustand store

  features/            ← פיצ'רים עצמאיים (כל אחד תיקייה סגורה)
    adventure/         ← מסך הרפתקה + SplashScreen
    character/         ← יצירת דמות
    dice/              ← גלגול קובייה
    map/               ← מפה אינטראקטיבית
    inventory/         ← תיק פריטים
    trophy/            ← חדר הישגים
    parent/            ← ממשק הורה

  shared/              ← רכיבים משותפים
    ui/                ← Icon, BottomNav, כפתורים
    illustrations/     ← רקעים, פורטרטים (SVG/CSS)
    hooks/             ← hooks משותפים

  stories/             ← סיפורים כ-data (JSON/TS)
    ananiah-stars/     ← "מסע אל אוצר הכוכבים" — 11 סצנות
    _template/         ← תבנית ליצירת סיפור חדש

  config/              ← Firebase config, routes
```

## חוקי תלות

```
stories/ ← לא מייבא כלום (pure data)
core/    ← מייבא רק types, לא UI
features/ ← מייבא מ-core/ ומ-shared/
shared/  ← מייבא רק מ-core/types/
```

## הגדרת Firebase (אופציונלי)

האפליקציה עובדת גם בלי Firebase (IndexedDB בלבד).
להפעלת סנכרון ענן:

1. צור פרויקט ב-[Firebase Console](https://console.firebase.google.com/)
2. הפעל Authentication → Anonymous sign-in
3. הפעל Firestore Database
4. העתק את ה-config ל-`src/config/firebase.ts`

## הוספת סיפור חדש

1. העתק `src/stories/_template/` לתיקייה חדשה
2. מלא את ה-StoryPack (סצנות, פריטים, NPCs, תגים)
3. ייבא ב-`App.tsx`
4. הרץ `npm run story:validate`

## הוספת אודיו

המשחק עובד מצוין בלי אודיו. להוספה:

1. הורד SFX מ-[Freesound.org](https://freesound.org) או [Kenney.nl](https://kenney.nl)
2. הורד מוזיקה מ-[Pixabay Music](https://pixabay.com/music/)
3. שים את הקבצים ב-`public/audio/sfx/` ו-`public/audio/music/`
4. ה-AudioManager יטען אותם אוטומטית לפי ה-audioManifest בסיפור

## טכנולוגיות

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3.4
- Zustand (state management)
- Framer Motion (אנימציות)
- Howler.js (אודיו)
- Firebase (auth + Firestore + hosting)
- IndexedDB via idb (offline cache)
- vite-plugin-pwa (PWA + Service Worker)

## סקריפטים

| פקודה | מה עושה |
|-------|---------|
| `npm run dev` | שרת פיתוח עם HMR |
| `npm run build` | בנייה ל-production |
| `npm run preview` | תצוגה מקדימה |
| `npm run lint` | בדיקת ESLint |
| `npm run type-check` | בדיקת TypeScript |
| `npm run story:validate` | בדיקת תקינות StoryPack |

## רישיון

MIT
