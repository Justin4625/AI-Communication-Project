export type GameMode = 'symbols' | 'drawing' | 'gestures';

export type Challenge = {
  id: string;
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type Player = {
  id: string;
  score: number;
  isGuesser: boolean;
};

export type Message = {
  id: string;
  text: string;
  timestamp: number;
  sender: string;
  type: 'guess' | 'hint' | 'system';
  isCorrect?: boolean;
};

export type AppState = {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  currentChallenge: Challenge | null;
  gameMode: GameMode;
  players: Player[];
  timeLeft: number;
  isGameActive: boolean;
  startGame: () => void;
  endGame: () => void;
  setGameMode: (mode: GameMode) => void;
  makeGuess: (guess: string) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  drawingData: string | null;
  gestureData: string | null;
  updateDrawing: (data: string) => void;
  updateGesture: (data: string) => void;
};