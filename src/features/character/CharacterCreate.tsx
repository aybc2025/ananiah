import React from 'react';
import type { StoryEngine } from '@core/engine/StoryEngine';
import { useGameStore } from '@core/storage/useGameStore';
import { SceneBG } from '@shared/illustrations/Backgrounds';

const SKIN_TONES = ['#fde8cd', '#f5d0a9', '#d4a574', '#a67c52', '#6b4423', '#3d2612'];
const HAIR_COLORS = ['#2c1810', '#5a3825', '#d4a55a', '#c0392b', '#8b5cf6', '#f0eef5'];
const OUTFITS = [
  { name: 'לוחם/ת', color: '#e76f51' },
  { name: 'קוסם/ת', color: '#8b5cf6' },
  { name: 'חוקר/ת', color: '#56c4b5' },
  { name: 'ריפוי', color: '#e05e9f' },
  { name: 'הרפתקן/ית', color: '#f4a261' },
  { name: 'שומר/ת', color: '#5e9fe0' },
];

interface Props { engine: StoryEngine; }

export function CharacterCreate({ engine }: Props) {
  const name = useGameStore((s) => s.characterName);
  const avatar = useGameStore((s) => s.characterAvatar);
  const setName = useGameStore((s) => s.setName);
  const setAvatar = useGameStore((s) => s.setAvatar);
  const goToScene = useGameStore((s) => s.goToScene);
  const canStart = name.length >= 2;

  return (
    <div className="relative min-h-screen">
      <SceneBG bg="town" />
      <div className="screen-container relative z-10 px-5 pt-10 pb-6">
        <h2 className="text-2xl font-extrabold text-center text-accent-gold mb-6">יצירת דמות</h2>

        {/* Avatar preview */}
        <div
          className="w-[120px] h-[120px] rounded-full mx-auto mb-6 flex items-center justify-center relative animate-float"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${SKIN_TONES[avatar.skinTone]}, ${SKIN_TONES[avatar.skinTone]}cc)`,
            border: `3px solid ${OUTFITS[avatar.outfit]?.color || '#8b5cf6'}`,
            boxShadow: `0 0 30px ${OUTFITS[avatar.outfit]?.color || '#8b5cf6'}44`,
          }}
        >
          {/* Hair */}
          <div className="absolute -top-2 w-20 rounded-t-full"
            style={{ height: 35, background: HAIR_COLORS[avatar.hairColor] }} />
          {/* Eyes */}
          <div className="flex gap-[18px]" style={{ marginTop: -5 }}>
            <div className="w-3 h-3 rounded-full bg-sky-deep" />
            <div className="w-3 h-3 rounded-full bg-sky-deep" />
          </div>
          {/* Smile */}
          <div className="absolute w-5 rounded-b-full bg-sky-deep" style={{ bottom: 30, height: 8 }} />
          {/* Outfit strip */}
          <div className="absolute -bottom-1 w-[50px] rounded-b-[25px]"
            style={{ height: 18, background: OUTFITS[avatar.outfit]?.color || '#8b5cf6' }} />
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-1.5 text-sm text-cloud-lavender">שם הגיבור/ה</label>
          <input
            type="text" value={name} maxLength={12}
            onChange={(e) => setName(e.target.value)}
            placeholder="הקלד/י שם..."
            className="w-full p-3 rounded-xl border border-white/15 bg-white/8 text-cloud-white text-center text-base font-heebo outline-none focus:border-accent-gold/50 transition-colors"
          />
        </div>

        {/* Skin tone */}
        <div className="mb-4">
          <label className="block mb-2 text-[13px] text-cloud-lavender">גוון עור</label>
          <div className="flex gap-2.5 justify-center">
            {SKIN_TONES.map((c, i) => (
              <button key={i} onClick={() => setAvatar({ skinTone: i })}
                className="w-9 h-9 rounded-full transition-all"
                style={{ background: c, border: avatar.skinTone === i ? '3px solid #ffd166' : '2px solid transparent' }} />
            ))}
          </div>
        </div>

        {/* Hair color */}
        <div className="mb-4">
          <label className="block mb-2 text-[13px] text-cloud-lavender">צבע שיער</label>
          <div className="flex gap-2.5 justify-center">
            {HAIR_COLORS.map((c, i) => (
              <button key={i} onClick={() => setAvatar({ hairColor: i })}
                className="w-9 h-9 rounded-full transition-all"
                style={{ background: c, border: avatar.hairColor === i ? '3px solid #ffd166' : '2px solid transparent' }} />
            ))}
          </div>
        </div>

        {/* Outfit */}
        <div className="mb-6">
          <label className="block mb-2 text-[13px] text-cloud-lavender">תלבושת</label>
          <div className="grid grid-cols-3 gap-2">
            {OUTFITS.map((o, i) => (
              <button key={i} onClick={() => setAvatar({ outfit: i })}
                className="py-2.5 px-2 rounded-xl text-[13px] font-semibold font-heebo transition-all cursor-pointer"
                style={{
                  border: avatar.outfit === i ? `2px solid ${o.color}` : '1px solid rgba(255,255,255,0.1)',
                  background: avatar.outfit === i ? `${o.color}22` : 'rgba(255,255,255,0.04)',
                  color: '#f0eef5',
                }}>
                {o.name}
              </button>
            ))}
          </div>
        </div>

        {/* Start */}
        <button className="btn-primary w-full" disabled={!canStart}
          onClick={() => goToScene(engine.startScene)}>
          יוצאים למסע!
        </button>
      </div>
    </div>
  );
}
