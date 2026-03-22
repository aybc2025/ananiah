import React, { useState, useEffect } from 'react';
import type { StoryEngine } from '@core/engine/StoryEngine';
import { isOops, isTriumph } from '@core/engine/DiceEngine';
import { useGameStore } from '@core/storage/useGameStore';
import { SceneBG } from '@shared/illustrations/Backgrounds';
import { Icon } from '@shared/ui/Icon';
import { DialogueBox } from './DialogueBox';
import { ChoiceButtons } from './ChoiceButtons';
import { ItemCollectedOverlay } from './ItemCollectedOverlay';
import { DiceRoller } from '@features/dice/DiceRoller';
import type { Choice, StatType } from '@core/types';

interface Props {
  engine: StoryEngine;
}

export function AdventureScreen({ engine }: Props) {
  const currentScene = useGameStore((s) => s.currentScene);
  const dialogueIndex = useGameStore((s) => s.dialogueIndex);
  const inventory = useGameStore((s) => s.inventory);
  const boosts = useGameStore((s) => s.boosts);
  const challengeCompleted = useGameStore((s) => s.challengeCompleted);
  const completed = useGameStore((s) => s.completed);
  const nextDialogue = useGameStore((s) => s.nextDialogue);
  const goToScene = useGameStore((s) => s.goToScene);
  const collectItem = useGameStore((s) => s.collectItem);
  const addBoost = useGameStore((s) => s.addBoost);
  const useBoostAction = useGameStore((s) => s.useBoost);
  const challengeDoneAction = useGameStore((s) => s.challengeDone);
  const recordChoice = useGameStore((s) => s.recordChoice);
  const recordStatRoll = useGameStore((s) => s.recordStatRoll);
  const setGoblinFriend = useGameStore((s) => s.setGoblinFriend);
  const completeAction = useGameStore((s) => s.complete);
  const setScreen = useGameStore((s) => s.setScreen);

  const [showDice, setShowDice] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<{ choice: Choice; index: number } | null>(null);
  const [pendingStat, setPendingStat] = useState<StatType | null>(null);
  const [showItemCollect, setShowItemCollect] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [showChoices, setShowChoices] = useState(false);

  const scene = engine.getScene(currentScene);

  useEffect(() => {
    setShowChoices(false);
    setResultText(null);
    setShowDice(false);
    setPendingChoice(null);
    setPendingStat(null);
    setShowItemCollect(null);
    const t = setTimeout(() => setShowChoices(true), 600);
    return () => clearTimeout(t);
  }, [currentScene]);

  if (!scene) return <div className="p-8 text-center">סצנה לא נמצאה</div>;

  const dialogueDone = dialogueIndex >= (scene.dialogue?.length || 0);

  // Build choices
  let choices: Choice[] = [];
  if (scene.challenge && !challengeCompleted) {
    // wait for challenge
  } else if (scene.afterChallenge && challengeCompleted) {
    choices = scene.afterChallenge;
  } else {
    choices = [...(scene.choices || [])];
    if (scene.useItem) {
      const itemChoices: Choice[] = scene.useItem
        .filter((ui) => inventory.includes(ui.itemId))
        .map((ui) => ({ text: ui.text, next: ui.next, item: ui.item, auto: ui.auto }));
      choices = [...itemChoices, ...choices];
    }
  }

  const currentBubble = scene.dialogue?.[dialogueIndex];
  const npcId = currentBubble
    ? currentBubble.speaker !== 'narrator' ? currentBubble.speaker : scene.npc
    : scene.npc;
  const npc = npcId ? engine.npcs[npcId] : undefined;

  function handleChoice(choice: Choice, index: number) {
    recordChoice({ sceneId: scene!.id, choiceIndex: index, stat: choice.stat });
    if (choice.goblinFriend) setGoblinFriend();

    if (choice.stat && !choice.auto) {
      setPendingChoice({ choice, index });
      setPendingStat(choice.stat);
      setShowDice(true);
    } else {
      if (choice.item) {
        collectItem(choice.item);
        const item = engine.getItem(choice.item);
        if (item) {
          setShowItemCollect(choice.item);
          setTimeout(() => { setShowItemCollect(null); goToScene(choice.next); }, 2000);
          return;
        }
      }
      goToScene(choice.next);
    }
  }

  function handleChallengeRoll() {
    if (!scene?.challenge) return;
    setPendingStat(scene.challenge.stat);
    setPendingChoice(null);
    setShowDice(true);
  }

  function handleDiceResult(result: number) {
    setShowDice(false);
    const stat = pendingStat!;
    recordStatRoll({ stat, result, sceneId: scene!.id });

    if (isOops(result)) {
      setResultText(scene!.oopsText || 'אופס! אבל הכל בסדר...');
      addBoost();
    } else if (isTriumph(result) && scene!.triumphText) {
      setResultText(scene!.triumphText);
    } else {
      setResultText(scene!.successText || 'הצלחת!');
    }

    const itemId = pendingChoice?.choice?.item || scene!.item;
    if (itemId) {
      collectItem(itemId);
      setTimeout(() => setShowItemCollect(itemId), 800);
      setTimeout(() => setShowItemCollect(null), 2800);
    }

    if (scene!.challenge && !pendingChoice) {
      challengeDoneAction();
    }

    if (pendingChoice?.choice?.next) {
      const next = pendingChoice.choice.next;
      setTimeout(() => { setResultText(null); goToScene(next); }, 3000);
    }

    setPendingChoice(null);
    setPendingStat(null);
  }

  useEffect(() => {
    if (scene?.finale && !completed) {
      const t = setTimeout(() => completeAction(), 3000);
      return () => clearTimeout(t);
    }
  }, [scene?.finale, completed]);

  const statColor = (s: StatType) => s === 'body' ? '#e76f51' : s === 'brain' ? '#5e9fe0' : '#e05e9f';
  const statName = (s: StatType) => s === 'body' ? 'גוף' : s === 'brain' ? 'מוח' : 'לב';
  const statIcon = (s: StatType) => s === 'body' ? 'zap' : s === 'brain' ? 'cloud' : 'heart';

  return (
    <>
      <SceneBG bg={scene.bg || 'town'} />
      <div className="screen-container relative z-10">
        <div className="flex justify-between items-center px-4 pt-3 pb-2">
          <span className="text-[15px] font-bold text-accent-gold">{scene.title}</span>
          <span className="text-xs text-cloud-lavender">{inventory.length}/7</span>
        </div>

        {boosts > 0 && (
          <div className="absolute top-3 left-4 z-10">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold"
              style={{ background: 'rgba(244,162,97,0.15)', color: '#f4a261' }}>
              <Icon name="zap" size={12} color="#f4a261" />{boosts}
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-end px-4 pb-3">
          {currentBubble && dialogueIndex < (scene.dialogue?.length || 0) && (
            <DialogueBox
              key={`${scene.id}-${dialogueIndex}`}
              bubble={currentBubble}
              npc={npc}
              npcId={npcId || undefined}
              onNext={nextDialogue}
              showNext={dialogueIndex <= (scene.dialogue?.length || 0) - 1}
            />
          )}

          {resultText && dialogueDone && (
            <div className="dialogue-box animate-fade-in mb-3">{resultText}</div>
          )}

          {dialogueDone && scene.challenge && !challengeCompleted && !resultText && (
            <div className="animate-fade-in-up mb-3">
              <div className="text-sm text-cloud-lavender mb-2 text-center">
                {scene.challenge.description}
              </div>
              <div className="stat-badge mx-auto mb-3 justify-center"
                style={{ background: `${statColor(scene.challenge.stat)}22`, color: statColor(scene.challenge.stat) }}>
                <Icon name={statIcon(scene.challenge.stat)} size={14} color={statColor(scene.challenge.stat)} />
                גלגול {statName(scene.challenge.stat)}
              </div>
              <button className="btn-primary w-full" onClick={handleChallengeRoll}>גלגל!</button>
            </div>
          )}

          {dialogueDone && showChoices && choices.length > 0 && !resultText &&
            (!scene.challenge || challengeCompleted) && (
              <ChoiceButtons choices={choices} onSelect={handleChoice} />
          )}

          {scene.finale && completed && (
            <div className="animate-fade-in-up text-center mt-5">
              <button className="btn-primary w-full" onClick={() => setScreen('trophy')}>
                לחדר הגביעים!
              </button>
            </div>
          )}
        </div>
      </div>

      {showDice && pendingStat && (
        <DiceRoller stat={pendingStat} boosts={boosts} onUseBoost={useBoostAction} onResult={handleDiceResult} />
      )}

      {showItemCollect && (() => {
        const item = engine.getItem(showItemCollect);
        return item ? <ItemCollectedOverlay item={item} onDone={() => setShowItemCollect(null)} /> : null;
      })()}
    </>
  );
}
