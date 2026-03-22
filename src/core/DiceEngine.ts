import type { DiceTier } from '@core/types';

// ============================================================
// DiceEngine — d20 resolution with 5 tiers
// This module is pure logic, no UI. Swappable for d6/coin etc.
// ============================================================

export const DICE_TIERS: DiceTier[] = [
  { name: 'אופס', min: 1, max: 3, color: '#f4a261' },
  { name: 'אוי אוי', min: 4, max: 7, color: '#e9c46a' },
  { name: 'יופי', min: 8, max: 14, color: '#56c4b5' },
  { name: 'וואו', min: 15, max: 19, color: '#8b5cf6' },
  { name: 'גיבור על', min: 20, max: 20, color: '#ffd166' },
];

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export function getDiceTier(roll: number): DiceTier {
  return DICE_TIERS.find((t) => roll >= t.min && roll <= t.max) || DICE_TIERS[0];
}

export function isOops(roll: number): boolean {
  return roll >= 1 && roll <= 3;
}

export function isTriumph(roll: number): boolean {
  return roll >= 15;
}

export function isFullTriumph(roll: number): boolean {
  return roll === 20;
}

/** Roll with advantage (best of 2) */
export function rollAdvantage(): { rolls: [number, number]; best: number } {
  const r1 = rollD20();
  const r2 = rollD20();
  return { rolls: [r1, r2], best: Math.max(r1, r2) };
}
