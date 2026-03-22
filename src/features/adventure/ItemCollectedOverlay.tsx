import React, { useEffect } from 'react';
import { Icon } from '@shared/ui/Icon';
import type { ItemDefinition } from '@core/types';

interface ItemCollectedOverlayProps {
  item: ItemDefinition;
  onDone: () => void;
}

export function ItemCollectedOverlay({ item, onDone }: ItemCollectedOverlayProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onDone}
    >
      <div className="text-center animate-bounce-in">
        <div
          className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${item.color}44, ${item.color}11)`,
            border: `2px solid ${item.color}`,
            boxShadow: `0 0 40px ${item.color}66`,
          }}
        >
          <Icon name={item.icon} size={36} color={item.color} />
        </div>
        <div className="text-lg font-bold" style={{ color: item.color }}>
          {item.name}
        </div>
        <div className="text-sm text-cloud-lavender mt-1">נוסף לתיק!</div>
      </div>
    </div>
  );
}
