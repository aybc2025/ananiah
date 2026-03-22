import React from 'react';
import type { StoryEngine } from '@core/engine/StoryEngine';
import { useGameStore } from '@core/storage/useGameStore';
import { SceneBG } from '@shared/illustrations/Backgrounds';
import { Icon } from '@shared/ui/Icon';

interface Props { engine: StoryEngine; }

export function InventoryScreen({ engine }: Props) {
  const inventory = useGameStore((s) => s.inventory);
  const boosts = useGameStore((s) => s.boosts);

  return (
    <div className="relative min-h-screen">
      <SceneBG bg="town" />
      <div className="screen-container relative z-10 p-4">
        <h2 className="text-xl font-extrabold text-accent-gold text-center mb-2">התיק שלי</h2>
        <div className="text-[13px] text-cloud-lavender text-center mb-5">
          {inventory.length}/7 פריטים
        </div>

        {/* Item grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {engine.allItemIds.map((id) => {
            const item = engine.getItem(id);
            const has = inventory.includes(id);
            return (
              <div key={id} className={`item-slot mx-auto flex-col gap-1 ${has ? 'filled' : ''}`}>
                {has && item ? (
                  <div className="animate-bounce-in text-center">
                    <Icon name={item.icon} size={28} color={item.color} />
                    <div className="text-[10px] mt-1" style={{ color: item.color }}>{item.name}</div>
                  </div>
                ) : (
                  <span className="text-xl" style={{ color: 'rgba(255,255,255,0.1)' }}>?</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(inventory.length / 7) * 100}%`,
                background: 'linear-gradient(90deg, #ffd166, #f4a261)',
              }}
            />
          </div>
        </div>

        {/* Boosts */}
        <div className="glass-card p-4 flex items-center justify-between">
          <span className="text-sm font-semibold">בוסטים</span>
          <div className="flex gap-1.5">
            {boosts > 0 ? (
              Array.from({ length: boosts }, (_, i) => (
                <Icon key={i} name="zap" size={18} color="#f4a261" />
              ))
            ) : (
              <span className="text-xs text-cloud-lavender">אין בוסטים כרגע</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="glass-card p-4 mt-3">
          <div className="text-sm font-semibold mb-2">מה זה בוסט?</div>
          <div className="text-xs text-cloud-lavender leading-relaxed">
            כשמקבלים "אופס" בגלגול, מקבלים בוסט. אפשר להשתמש בבוסט כדי לגלגל פעמיים ולקחת את התוצאה הגבוהה יותר!
          </div>
        </div>
      </div>
    </div>
  );
}
