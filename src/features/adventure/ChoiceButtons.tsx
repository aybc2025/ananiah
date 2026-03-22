import React from 'react';
import { Icon } from '@shared/ui/Icon';
import type { Choice, StatType } from '@core/types';

const STATS: Record<StatType, string> = { body: 'גוף', brain: 'מוח', heart: 'לב' };
const STAT_COLORS: Record<StatType, string> = { body: '#e76f51', brain: '#5e9fe0', heart: '#e05e9f' };

interface ChoiceButtonsProps {
  choices: Choice[];
  onSelect: (choice: Choice, index: number) => void;
}

export function ChoiceButtons({ choices, onSelect }: ChoiceButtonsProps) {
  return (
    <div>
      {choices.map((choice, i) => (
        <button
          key={i}
          className="btn-choice mb-2 animate-fade-in-up"
          style={{ animationDelay: `${(i + 1) * 0.1}s`, opacity: 0 }}
          onClick={() => onSelect(choice, i)}
        >
          <span>{choice.text}</span>
          {choice.stat && (
            <span
              className="stat-badge float-left text-[11px] py-0.5 px-2 mr-2"
              style={{
                background: `${STAT_COLORS[choice.stat]}22`,
                color: STAT_COLORS[choice.stat],
              }}
            >
              {STATS[choice.stat]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
