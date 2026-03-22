# תבנית סיפור חדש — Story Pack Template

## איך ליצור סיפור חדש

1. העתק את כל הקבצים בתיקייה הזו לתיקייה חדשה תחת `src/stories/`
2. מלא את הקבצים לפי הסכמה (ראה `src/core/types/StoryPack.ts`)
3. ייבא את הסיפור ב-`App.tsx` במקום `ananiah-stars`
4. הרץ `npm run story:validate` לבדיקת תקינות

## קבצים נדרשים

- `index.ts` — ייצוא StoryPack מלא
- כל הסצנות, פריטים, NPCs, תגים מוגדרים בתוך ה-StoryPack

## כללים חשובים

- כל `nextScene` חייב להפנות לסצנה שקיימת
- כל `item` חייב להפנות לפריט שמוגדר ב-items
- כל `npc` חייב להפנות ל-NPC שמוגדר ב-npcs
- עץ הסצנות חייב להיות connected — אין dead ends
- כל badge condition חייב להפנות לסצנות/סטאטים שקיימים
