import React from 'react';
import { Gamepad2, PencilLine, HandMetal } from 'lucide-react';
import { useStore } from '../store';
import type { GameMode } from '../types';

export function GameControls() {
  const { gameMode, setGameMode, startGame, isGameActive, timeLeft } = useStore();

  const modes: { id: GameMode; icon: React.ReactNode; label: string }[] = [
    { id: 'symbols', icon: <Gamepad2 className="w-6 h-6" />, label: 'Symbols' },
    { id: 'drawing', icon: <PencilLine className="w-6 h-6" />, label: 'Drawing' },
    { id: 'gestures', icon: <HandMetal className="w-6 h-6" />, label: 'Gestures' },
  ];

  return (
    <div className="p-4 bg-white border-b">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex gap-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setGameMode(mode.id)}
              className={`p-2 rounded-lg flex items-center gap-2 ${
                gameMode === mode.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={isGameActive}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {isGameActive ? (
            <div className="text-xl font-bold">
              Time: {timeLeft}s
            </div>
          ) : (
            <button
              onClick={startGame}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold"
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}