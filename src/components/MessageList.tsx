import React from 'react';
import { useStore } from '../store';
import { DrawingCanvas } from './DrawingCanvas';
import { GestureRecognition } from './GestureRecognition';

export function MessageList() {
  const { messages, highContrast, currentChallenge, gameMode } = useStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {currentChallenge && (
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-100 px-4 py-2 rounded-lg">
            <p className="text-lg font-bold">
              {gameMode === 'symbols' && '🎮 Communicate using only emojis and symbols!'}
              {gameMode === 'drawing' && '✏️ Draw your clues!'}
              {gameMode === 'gestures' && '👋 Use gestures to communicate!'}
            </p>
            <p className="text-sm text-gray-600">
              Category: {currentChallenge.category} | Difficulty: {currentChallenge.difficulty} | Word: {currentChallenge.word}
            </p>
          </div>
        </div>
      )}

      {gameMode === 'drawing' && <DrawingCanvas />}
      {gameMode === 'gestures' && <GestureRecognition />}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'player' ? 'justify-end' : 'justify-start'
            }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${message.type === 'system'
                ? 'bg-yellow-100 text-center w-full'
                : message.type === 'guess'
                  ? message.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : highContrast
                    ? 'bg-white border-2 border-black text-black'
                    : 'bg-gray-200 text-gray-800'
              }`}
          >
            <p className={`text-lg ${highContrast ? 'font-bold' : ''}`}>
              {message.text}
            </p>
            <p className="text-xs opacity-75">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}