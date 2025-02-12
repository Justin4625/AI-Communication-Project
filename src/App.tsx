import React from 'react';
import { Header } from './components/Header';
import { GameControls } from './components/GameControls';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { useStore } from './store';

function App() {
  const highContrast = useStore((state) => state.highContrast);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        highContrast ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      <Header />
      <GameControls />
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <MessageList />
        <MessageInput />
      </main>
    </div>
  );
}

export default App;