import React from 'react';
import type { NPCDefinition } from '@core/types';

// ============================================================
// NPCPortrait — renders a character face from NPCDefinition
// Pure SVG/CSS, no emoji.
// ============================================================

interface NPCPortraitProps {
  npc: NPCDefinition;
  npcId: string;
  mood?: string;
  size?: number;
}

export function NPCPortrait({ npc, npcId, mood = 'happy', size = 64 }: NPCPortraitProps) {
  const isGoblin = ['gichuch', 'tzchkuk', 'chikuch'].includes(npcId);
  const bgColor = isGoblin ? '#4ade80' : npc.color;
  const hasHat = npcId === 'grandma' || npcId === 'gichuch';
  const isWisp = npcId === 'ruchanit';

  return (
    <div
      className="animate-float flex-shrink-0 relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: isWisp ? '40% 60% 60% 40%' : '50%',
        background: `radial-gradient(circle at 40% 40%, ${bgColor}, ${bgColor}88)`,
        boxShadow: `0 0 20px ${bgColor}44`,
      }}
    >
      {/* Eyes */}
      <div className="flex" style={{ gap: size * 0.15, marginTop: -size * 0.05 }}>
        <div
          className="rounded-full bg-sky-deep animate-twinkle"
          style={{
            width: size * 0.15,
            height: mood === 'sad' ? size * 0.12 : size * 0.15,
          }}
        />
        <div
          className="rounded-full bg-sky-deep animate-twinkle"
          style={{
            width: size * 0.15,
            height: mood === 'sad' ? size * 0.12 : size * 0.15,
            animationDelay: '0.5s',
          }}
        />
      </div>

      {/* Mouth */}
      <div
        className="absolute"
        style={{
          bottom: size * 0.22,
          width: size * 0.2,
          height: mood === 'sad' ? size * 0.06 : size * 0.08,
          borderRadius: '0 0 50% 50%',
          background: mood === 'sad' ? 'transparent' : '#1a1a2e',
          borderBottom: mood === 'sad' ? '2px solid #1a1a2e' : 'none',
          transform: mood === 'sad' ? 'rotate(180deg)' : 'none',
        }}
      />

      {/* Hat */}
      {hasHat && (
        <div
          className="absolute"
          style={{
            top: -size * 0.2,
            width: 0,
            height: 0,
            borderLeft: `${size * 0.2}px solid transparent`,
            borderRight: `${size * 0.2}px solid transparent`,
            borderBottom: `${size * 0.3}px solid ${isGoblin ? '#e76f51' : '#8b5cf6'}`,
          }}
        >
          {!isGoblin && (
            <div
              className="absolute rounded-full bg-accent-gold animate-twinkle"
              style={{ top: -4, left: -3, width: 6, height: 6 }}
            />
          )}
        </div>
      )}
    </div>
  );
}
