import React, { useState } from 'react';
import { rollD20, rollAdvantage, getDiceTier } from '@core/engine/DiceEngine';
import { Icon } from '@shared/ui/Icon';
import type { StatType } from '@core/types';

const STATS: Record<StatType, string> = { body: 'גוף', brain: 'מוח', heart: 'לב' };
const STAT_COLORS: Record<StatType, string> = { body: '#e76f51', brain: '#5e9fe0', heart: '#e05e9f' };
const STAT_ICONS: Record<StatType, string> = { body: 'zap', brain: 'cloud', heart: 'heart' };

interface DiceRollerProps {
  stat: StatType;
  boosts: number;
  onResult: (result: number) => void;
  onUseBoost: () => void;
}

export function DiceRoller({ stat, boosts, onResult, onUseBoost }: DiceRollerProps) {
  const [phase, setPhase] = useState<'ready' | 'rolling' | 'result'>('ready');
  const [result, setResult] = useState<number | null>(null);
  const [rolls, setRolls] = useState<number[]>([]);
  const [usedBoost, setUsedBoost] = useState(false);

  function doRoll(withBoost: boolean) {
    setPhase('rolling');
    if (withBoost) {
      setUsedBoost(true);
      onUseBoost();
      const adv = rollAdvantage();
      setRolls(adv.rolls);
      setTimeout(() => {
        setResult(adv.best);
        setPhase('result');
      }, 1500);
    } else {
      const r = rollD20();
      setRolls([r]);
      setTimeout(() => {
        setResult(r);
        setPhase('result');
      }, 1500);
    }
  }

  const tier = result ? getDiceTier(result) : null;
  const color = STAT_COLORS[stat];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div className="text-center px-6 max-w-[320px] w-full animate-fade-in">
        {/* Stat badge */}
        <div
          className="stat-badge mx-auto mb-5 inline-flex"
          style={{ background: `${color}33`, color }}
        >
          <Icon name={STAT_ICONS[stat]} size={16} color={color} />
          <span>גלגול {STATS[stat]}</span>
        </div>

        {/* Dice display */}
        <div
          className="w-[100px] h-[100px] mx-auto mb-5 rounded-2xl flex items-center justify-center text-[40px] font-extrabold transition-all duration-300"
          style={{
            background: phase === 'result' ? `${tier?.color}33` : 'rgba(255,255,255,0.08)',
            border: `3px solid ${phase === 'result' ? tier?.color : 'rgba(255,255,255,0.2)'}`,
            color: phase === 'result' ? tier?.color : '#f0eef5',
            animation:
              phase === 'rolling'
                ? 'spin3d 1.5s ease-out'
                : phase === 'result'
                  ? 'bounceIn 0.5s ease-out'
                  : 'pulse 2s ease-in-out infinite',
          }}
        >
          {phase === 'ready' && 'd20'}
          {phase === 'rolling' && '?'}
          {phase === 'result' && result}
        </div>

        {/* Result */}
        {phase === 'result' && tier && (
          <div className="mb-5 animate-fade-in-up">
            <div className="text-[22px] font-extrabold mb-1" style={{ color: tier.color }}>
              {tier.name}!
            </div>
            {usedBoost && rolls.length === 2 && (
              <div className="text-sm text-cloud-lavender">
                גלגלת {rolls[0]} ו-{rolls[1]} — לקחת את {result}!
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {phase === 'ready' && (
          <div className="flex flex-col gap-2">
            {boosts > 0 && (
              <button
                className="btn-choice text-center"
                onClick={() => doRoll(true)}
              >
                <Icon name="zap" size={14} color="#f4a261" className="inline-block ml-1" />
                שימוש בבוסט — גלגול כפול! ({boosts} נותרו)
              </button>
            )}
            <button className="btn-primary w-full" onClick={() => doRoll(false)}>
              גלגל!
            </button>
          </div>
        )}

        {phase === 'result' && (
          <button className="btn-primary w-full" onClick={() => onResult(result!)}>
            המשך
          </button>
        )}
      </div>
    </div>
  );
}
