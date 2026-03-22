import React, { useEffect, useMemo } from 'react';
import { useGameStore } from '@core/storage/useGameStore';
import { StoryEngine } from '@core/engine/StoryEngine';
import storyPack from '@stories/ananiah-stars';
import { BottomNav } from '@shared/ui/BottomNav';
import type { Screen } from '@core/types';

// Feature screens — lazy loaded in production, direct import for now
// Each feature is a self-contained folder under src/features/
import { SplashScreen } from '@features/adventure/SplashScreen';
import { CharacterCreate } from '@features/character/CharacterCreate';
import { AdventureScreen } from '@features/adventure/AdventureScreen';
import { MapScreen } from '@features/map/MapScreen';
import { InventoryScreen } from '@features/inventory/InventoryScreen';
import { TrophyRoom } from '@features/trophy/TrophyRoom';

// ============================================================
// App — root component. Connects the StoryEngine to screens.
// ============================================================

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const completed = useGameStore((s) => s.completed);
  const visitedScenes = useGameStore((s) => s.visitedScenes);
  const setScreen = useGameStore((s) => s.setScreen);

  // Initialize story engine (could swap to a different StoryPack)
  const engine = useMemo(() => new StoryEngine(storyPack), []);

  // Validate story on mount (dev only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      const errors = engine.validate();
      if (errors.length > 0) {
        console.error('[StoryEngine] Validation errors:', errors);
      } else {
        console.log('[StoryEngine] Story validated OK');
      }
    }
  }, [engine]);

  const showNav = ['adventure', 'map', 'inventory', 'trophy'].includes(screen);
  const hasSave = visitedScenes.length > 0;

  function handleNavigate(s: Screen) {
    setScreen(s);
  }

  return (
    <div style={{ paddingBottom: showNav ? 60 : 0 }}>
      {screen === 'splash' && <SplashScreen hasSave={hasSave} />}
      {screen === 'create' && <CharacterCreate engine={engine} />}
      {screen === 'adventure' && <AdventureScreen engine={engine} />}
      {screen === 'map' && <MapScreen engine={engine} />}
      {screen === 'inventory' && <InventoryScreen engine={engine} />}
      {screen === 'trophy' && <TrophyRoom engine={engine} />}
      {showNav && (
        <BottomNav
          activeScreen={screen}
          onNavigate={handleNavigate}
          showTrophy={completed}
        />
      )}
    </div>
  );
}
