import React from 'react';
import type { StoryEngine } from '@core/engine/StoryEngine';
import { useGameStore } from '@core/storage/useGameStore';
import { SceneBG } from '@shared/illustrations/Backgrounds';
import { Icon } from '@shared/ui/Icon';

interface Props { engine: StoryEngine; }

export function MapScreen({ engine }: Props) {
  const visitedScenes = useGameStore((s) => s.visitedScenes);
  const currentScene = useGameStore((s) => s.currentScene);
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <div className="relative min-h-screen">
      <SceneBG bg="town" />
      <div className="screen-container relative z-10 p-4">
        <h2 className="text-xl font-extrabold text-accent-gold text-center mb-4">מפת ענניה</h2>

        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: '70vh' }}>
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {engine.mapEdges.map(([from, to], i) => {
              const f = engine.mapLayout.find((n) => n.id === from);
              const t = engine.mapLayout.find((n) => n.id === to);
              if (!f || !t) return null;
              const visited = visitedScenes.includes(from) && visitedScenes.includes(to);
              return (
                <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                  stroke={visited ? 'rgba(255,209,102,0.4)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="0.5"
                  strokeDasharray={visited ? 'none' : '2,2'} />
              );
            })}
          </svg>

          {/* Nodes */}
          {engine.mapLayout.map((node) => {
            const visited = visitedScenes.includes(node.id);
            const current = currentScene === node.id;
            const revealed = visited || visitedScenes.some((vs) =>
              engine.mapEdges.some(([a, b]) => (a === vs && b === node.id) || (b === vs && a === node.id))
            );

            if (!revealed && !visited) {
              return (
                <div key={node.id} className="absolute flex items-center justify-center text-[10px]"
                  style={{
                    left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)',
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.2)',
                  }}>?</div>
              );
            }

            return (
              <div key={node.id} className="absolute text-center"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)', cursor: current ? 'pointer' : 'default' }}
                onClick={() => current && setScreen('adventure')}>
                <div className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: current ? 36 : 28, height: current ? 36 : 28, borderRadius: '50%',
                    background: current ? '#ffd166' : visited ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                    border: current ? '2px solid #f4a261' : visited ? '1px solid rgba(255,255,255,0.2)' : '1px dashed rgba(255,255,255,0.1)',
                    animation: current ? 'pulse 2s infinite' : 'none',
                    boxShadow: current ? '0 0 20px rgba(255,209,102,0.4)' : 'none',
                  }}>
                  {visited && <Icon name="star" size={12} color={current ? '#0d0d2b' : '#ffd166'} />}
                </div>
                <div className="text-[9px] mt-0.5 whitespace-nowrap"
                  style={{
                    color: visited ? '#b8b0cc' : 'rgba(255,255,255,0.2)',
                    fontWeight: current ? 700 : 400,
                  }}>
                  {revealed || visited ? node.label : '?'}
                </div>
                {current && (
                  <div className="text-[8px] mt-0.5 whitespace-nowrap" style={{ color: '#ffd166' }}>← אתה פה</div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setScreen('adventure')}
          className="w-full mt-4 py-3 rounded-2xl font-bold text-base"
          style={{ background: '#ffd166', color: '#0d0d2b' }}>
          ← חזור להרפתקה
        </button>
      </div>
    </div>
  );
}
