import React, { useState, useEffect } from 'react';
import { useGameStore } from '@core/storage/useGameStore';
import { SceneBG } from '@shared/illustrations/Backgrounds';

export function SplashScreen({ hasSave }: { hasSave: boolean }) {
  const setScreen = useGameStore((s) => s.setScreen);
  const loadSave = useGameStore((s) => s.loadSave);
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <SceneBG bg="town" />
      <div className="relative z-10 text-center transition-all duration-700"
        style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)' }}>
        <div className="text-sm text-cloud-lavender mb-2 tracking-widest font-medium">ממלכת ענניה מציגה</div>
        <h1 className="text-3xl font-extrabold leading-tight mb-2"
          style={{ background: 'linear-gradient(135deg, #ffd166, #f4a261, #e76f8b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          מסע אל<br/>אוצר הכוכבים</h1>
        <p className="text-sm text-cloud-lavender mb-10">הרפתקת תפקידים קסומה לילדים</p>
        <div className="flex flex-col gap-3 w-full max-w-[280px] mx-auto">
          <button className="btn-primary w-full" onClick={() => setScreen('create')}>צא להרפתקה חדשה</button>
          {hasSave && <button className="btn-choice text-center" onClick={() => loadSave()}>המשך את המסע</button>}
        </div>
      </div>
    </div>
  );
}
