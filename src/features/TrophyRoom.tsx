import React, { useMemo, useState, useEffect } from 'react';
import type { StoryEngine } from '@core/engine/StoryEngine';
import { useGameStore } from '@core/storage/useGameStore';
import { calculateBadges } from '@core/engine/BadgeEngine';
import { SceneBG } from '@shared/illustrations/Backgrounds';
import { Icon } from '@shared/ui/Icon';

interface Props { engine: StoryEngine; }

export function TrophyRoom({ engine }: Props) {
  const state = useGameStore();
  const restart = useGameStore((s) => s.restart);

  const earnedBadges = useMemo(
    () => calculateBadges(state, engine.badges),
    [state.inventory, state.statRolls, state.totalBoostsEarned, state.goblinFriend]
  );

  const [revealIndex, setRevealIndex] = useState(-1);
  const earnedCount = earnedBadges.length;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < engine.badges.length) {
        setRevealIndex(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [engine.badges.length]);

  return (
    <div className="relative min-h-screen">
      <SceneBG bg="celebration" />
      <div className="screen-container relative z-10 px-4 pt-6 pb-6">
        {/* Title */}
        <h2
          className="text-[28px] font-extrabold text-center mb-2"
          style={{
            background: 'linear-gradient(135deg, #ffd166, #f4a261)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          הישגים
        </h2>
        <p className="text-sm text-cloud-lavender text-center mb-2">
          {state.characterName} — גיבור/ת ענניה
        </p>
        <p className="text-xs text-cloud-lavender text-center mb-6">
          {earnedCount} מתוך {engine.badges.length} תגים
        </p>

        {/* Badges grid */}
        <div className="grid grid-cols-2 gap-3">
          {engine.badges.map((badge, i) => {
            const earned = earnedBadges.includes(badge.id);
            const revealed = i <= revealIndex;

            return (
              <div
                key={badge.id}
                className={`glass-card p-4 text-center transition-opacity duration-300 ${
                  revealed && earned ? 'animate-stamp-in' : ''
                }`}
                style={{
                  opacity: !revealed ? 0 : earned ? 1 : 0.3,
                  border: earned
                    ? `1px solid ${badge.color}44`
                    : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {/* Badge icon */}
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{
                    background: earned ? `${badge.color}22` : 'rgba(255,255,255,0.05)',
                    boxShadow: earned ? `0 0 20px ${badge.color}33` : 'none',
                  }}
                >
                  <Icon
                    name={badge.icon}
                    size={22}
                    color={earned ? badge.color : 'rgba(255,255,255,0.2)'}
                  />
                </div>

                {/* Badge name */}
                <div
                  className="text-[13px] font-bold"
                  style={{ color: earned ? badge.color : '#b8b0cc' }}
                >
                  {badge.name}
                </div>

                {/* Badge description */}
                <div className="text-[11px] text-cloud-lavender mt-0.5">
                  {badge.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="glass-card p-4 mt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-accent-gold">{state.inventory.length}</div>
              <div className="text-[11px] text-cloud-lavender">פריטים</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent-gold">{state.visitedScenes.length}</div>
              <div className="text-[11px] text-cloud-lavender">סצנות</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent-gold">{state.statRolls.length}</div>
              <div className="text-[11px] text-cloud-lavender">גלגולים</div>
            </div>
          </div>
        </div>

        {/* Play again */}
        <button className="btn-primary w-full mt-6" onClick={restart}>
          שחק שוב
        </button>
      </div>
    </div>
  );
}
