import type { GameSave, BadgeDefinition, BadgeId } from '@core/types';

// ============================================================
// BadgeEngine — evaluates badge conditions against game state
// Conditions are defined in the StoryPack, not hardcoded here.
// ============================================================

export function calculateBadges(
  state: GameSave,
  badgeDefinitions: BadgeDefinition[]
): BadgeId[] {
  const earned: BadgeId[] = [];

  for (const badge of badgeDefinitions) {
    if (evaluateCondition(badge.condition, state)) {
      earned.push(badge.id);
    }
  }

  return earned;
}

function evaluateCondition(
  condition: BadgeDefinition['condition'],
  state: GameSave
): boolean {
  switch (condition.type) {
    case 'always':
      return true;

    case 'all_items_collected':
      // Check against the story's total item count
      // For now, 7 is the magic number for ananiah-stars
      return state.inventory.length >= 7;

    case 'all_stats_same': {
      const rolls = state.statRolls.filter((r) => r.stat);
      return rolls.length > 0 && rolls.every((r) => r.stat === condition.stat);
    }

    case 'min_boosts':
      return state.totalBoostsEarned >= condition.count;

    case 'specific_choice': {
      return state.choices.some(
        (c) =>
          c.sceneId === condition.sceneId &&
          c.choiceIndex === condition.choiceIndex
      );
    }

    default:
      return false;
  }
}
