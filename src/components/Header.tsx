import React from 'react';
import { Gamepad2, Eye } from 'lucide-react';
import { useStore } from '../store';

export function Header() {
  const toggleHighContrast = useStore((state) => state.toggleHighContrast);
  const highContrast = useStore((state) => state.highContrast);

  return (
    <header className="bg-white border-b p-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-blue-500" />
          <h1 className="text-xl font-bold">Communication Challenge</h1>
        </div>
        <button
          onClick={toggleHighContrast}
          className={`p-2 rounded-full ${
            highContrast ? 'bg-yellow-300' : 'hover:bg-gray-100'
          }`}
          aria-label="Toggle high contrast mode"
        >
          <Eye className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}