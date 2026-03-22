import React from 'react';
import type { DialogueBubble, NPCDefinition } from '@core/types';
import { NPCPortrait } from '@shared/illustrations/NPCPortrait';

interface DialogueBoxProps {
  bubble: DialogueBubble;
  npc?: NPCDefinition;
  npcId?: string;
  onNext?: () => void;
  showNext?: boolean;
}

export function DialogueBox({ bubble, npc, npcId, onNext, showNext }: DialogueBoxProps) {
  const isNarrator = bubble.speaker === 'narrator';
  const speakerName = isNarrator ? 'מספר/ת' : npc?.name || '';
  const portraitNpcId = isNarrator ? npcId : bubble.speaker;

  return (
    <div className="animate-fade-in">
      <div className="flex gap-3 items-start mb-3">
        {/* Portrait */}
        {npc && portraitNpcId && (
          <NPCPortrait
            npc={npc}
            npcId={portraitNpcId}
            mood={bubble.mood || 'happy'}
            size={56}
          />
        )}

        {/* Text */}
        <div className="flex-1">
          <div className="text-xs font-semibold text-cloud-lavender mb-1">
            {speakerName}
          </div>
          <div className="dialogue-box">{bubble.text}</div>
        </div>
      </div>

      {showNext && (
        <button className="btn-choice text-center mb-2" onClick={onNext}>
          הבא
        </button>
      )}
    </div>
  );
}
