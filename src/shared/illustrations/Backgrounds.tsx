import React, { useMemo } from 'react';

// ============================================================
// Background scene components — StarField, CloudLayer, SceneBG
// ============================================================

export function StarField({ count = 40 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 60,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 1.5,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: 0.3,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function CloudLayer({ count = 5, speed = 40 }: { count?: number; speed?: number }) {
  const clouds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        y: 50 + Math.random() * 40,
        size: Math.random() * 120 + 60,
        opacity: Math.random() * 0.15 + 0.05,
        delay: Math.random() * speed,
        dur: speed + Math.random() * 20,
      })),
    [count, speed]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${c.y}%`,
            width: c.size,
            height: c.size * 0.4,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(240,238,245,0.3), transparent)',
            opacity: c.opacity,
            animation: `cloudDrift ${c.dur}s linear ${c.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const BG_GRADIENTS: Record<string, string> = {
  town: 'linear-gradient(180deg, #0d0d2b 0%, #1a1a3e 40%, #2d2b55 70%, #4a3f6b 100%)',
  market: 'linear-gradient(180deg, #1a1a3e 0%, #2d2b55 40%, #4a3f6b 70%, #6b5b8a 100%)',
  bridge: 'linear-gradient(180deg, #1a1a3e 0%, #3b2d6b 40%, #6b4a8a 60%, #f5d5e0 100%)',
  tower: 'linear-gradient(180deg, #0d0d2b 0%, #1a1a3e 50%, #2d4a5b 100%)',
  garden: 'linear-gradient(180deg, #1a1a3e 0%, #3b2d55 30%, #6b4a6b 60%, #f5d5e0 100%)',
  crossroads: 'linear-gradient(180deg, #0d0d2b 0%, #1a1a2e 40%, #2a2a3a 100%)',
  cave: 'linear-gradient(180deg, #070714 0%, #0d0d1e 40%, #1a1a2e 100%)',
  storm: 'linear-gradient(180deg, #0d0d2b 0%, #2a2a4a 30%, #4a4a6a 60%, #6a6a8a 100%)',
  goblin_lair: 'linear-gradient(180deg, #1a2e1a 0%, #2d4a2d 40%, #4a6b4a 70%, #6b8a6b 100%)',
  mountain: 'linear-gradient(180deg, #0d0d2b 0%, #1a1a3e 30%, #2d2b55 60%, #ffd166 100%)',
  treasure: 'linear-gradient(180deg, #1a1a3e 0%, #4a3f6b 30%, #ffd166 70%, #fff5d6 100%)',
  celebration: 'linear-gradient(180deg, #1a1a3e 0%, #2d2b55 30%, #6b4a8a 60%, #ffd166 100%)',
};

interface SceneBGProps {
  bg: string;
  children?: React.ReactNode;
}

export function SceneBG({ bg, children }: SceneBGProps) {
  return (
    <div
      className="absolute inset-0 transition-all duration-700"
      style={{ background: BG_GRADIENTS[bg] || BG_GRADIENTS.town }}
    >
      <StarField count={bg === 'cave' ? 10 : bg === 'celebration' ? 60 : 30} />
      <CloudLayer count={bg === 'storm' ? 8 : bg === 'cave' ? 2 : 4} speed={bg === 'storm' ? 15 : 40} />
      {children}
    </div>
  );
}
