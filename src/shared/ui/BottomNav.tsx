import React from 'react';
import { Icon } from './Icon';
import type { Screen } from '@core/types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  showTrophy: boolean;
}

export function BottomNav({ activeScreen, onNavigate, showTrophy }: BottomNavProps) {
  const tabs: { id: Screen; icon: string; label: string }[] = [
    { id: 'adventure', icon: 'home', label: 'הרפתקה' },
    { id: 'map', icon: 'map', label: 'מפה' },
    { id: 'inventory', icon: 'backpack', label: 'תיק' },
  ];
  if (showTrophy) tabs.push({ id: 'trophy', icon: 'trophy', label: 'הישגים' });

  return (
    <div className="nav-bar fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${activeScreen === tab.id ? 'active' : ''}`}
          onClick={() => onNavigate(tab.id)}
        >
          <Icon
            name={tab.icon}
            size={20}
            color={activeScreen === tab.id ? '#ffd166' : '#b8b0cc'}
          />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
