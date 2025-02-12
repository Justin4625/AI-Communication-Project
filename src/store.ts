import { create } from 'zustand';
import { AppState, GameMode } from './types';

const GAME_DURATION = 20; // seconds

const challenges = [
  // Animals
  { id: '1', word: 'dog', category: 'animals', difficulty: 'easy' },
  { id: '2', word: 'cat', category: 'animals', difficulty: 'easy' },
  { id: '3', word: 'elephant', category: 'animals', difficulty: 'medium' },
  { id: '4', word: 'giraffe', category: 'animals', difficulty: 'medium' },
  { id: '5', word: 'penguin', category: 'animals', difficulty: 'hard' },
  
  // Food
  { id: '6', word: 'pizza', category: 'food', difficulty: 'easy' },
  { id: '7', word: 'burger', category: 'food', difficulty: 'easy' },
  { id: '8', word: 'sushi', category: 'food', difficulty: 'medium' },
  { id: '9', word: 'spaghetti', category: 'food', difficulty: 'medium' },
  { id: '10', word: 'croissant', category: 'food', difficulty: 'hard' },
  
  // Transportation
  { id: '11', word: 'car', category: 'transportation', difficulty: 'easy' },
  { id: '12', word: 'bike', category: 'transportation', difficulty: 'easy' },
  { id: '13', word: 'airplane', category: 'transportation', difficulty: 'medium' },
  { id: '14', word: 'helicopter', category: 'transportation', difficulty: 'hard' },
  
  // Sports
  { id: '15', word: 'soccer', category: 'sports', difficulty: 'easy' },
  { id: '16', word: 'tennis', category: 'sports', difficulty: 'medium' },
  { id: '17', word: 'basketball', category: 'sports', difficulty: 'medium' },
  { id: '18', word: 'volleyball', category: 'sports', difficulty: 'hard' },
  
  // Emotions
  { id: '19', word: 'happy', category: 'emotions', difficulty: 'easy' },
  { id: '20', word: 'sad', category: 'emotions', difficulty: 'easy' },
  { id: '21', word: 'excited', category: 'emotions', difficulty: 'medium' },
  { id: '22', word: 'surprised', category: 'emotions', difficulty: 'medium' },
  
  // Weather
  { id: '23', word: 'rain', category: 'weather', difficulty: 'easy' },
  { id: '24', word: 'snow', category: 'weather', difficulty: 'easy' },
  { id: '25', word: 'thunder', category: 'weather', difficulty: 'medium' },
  { id: '26', word: 'rainbow', category: 'weather', difficulty: 'hard' },
] as const;

export const useStore = create<AppState>((set, get) => ({
  messages: [],
  currentChallenge: null,
  gameMode: 'symbols',
  players: [],
  timeLeft: GAME_DURATION,
  isGameActive: false,
  highContrast: false,
  drawingData: null,
  gestureData: null,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        },
      ],
    })),

  startGame: () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    set({
      currentChallenge: randomChallenge,
      isGameActive: true,
      timeLeft: GAME_DURATION,
      messages: [],
      drawingData: null,
      gestureData: null,
    });

    const timer = setInterval(() => {
      set((state) => {
        if (state.timeLeft <= 1) {
          clearInterval(timer);
          get().endGame();
          return { timeLeft: 0 };
        }
        return { timeLeft: state.timeLeft - 1 };
      });
    }, 1000);
  },

  endGame: () => {
    set({
      isGameActive: false,
      currentChallenge: null,
      messages: [
        ...get().messages,
        {
          id: Math.random().toString(36).substring(7),
          text: 'Game Over!',
          timestamp: Date.now(),
          sender: 'system',
          type: 'system',
        },
      ],
    });
  },

  setGameMode: (mode: GameMode) => set({ gameMode: mode }),

  makeGuess: (guess: string) => {
    const { currentChallenge } = get();
    const isCorrect = currentChallenge && guess.toLowerCase() === currentChallenge.word.toLowerCase();

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          text: guess,
          timestamp: Date.now(),
          sender: 'player',
          type: 'guess',
          isCorrect,
        },
      ],
    }));

    if (isCorrect) {
      get().endGame();
    }
  },

  updateDrawing: (data: string) => set({ drawingData: data }),
  
  updateGesture: (data: string) => set({ gestureData: data }),

  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
}));