import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store';

export function MessageInput() {
  const [input, setInput] = useState('');
  const { makeGuess, isGameActive } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && isGameActive) {
      makeGuess(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={isGameActive ? "Type your guess..." : "Wait for the game to start..."}
          disabled={!isGameActive}
        />
        <button
          type="submit"
          className={`p-2 rounded-lg ${
            isGameActive
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!isGameActive}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}