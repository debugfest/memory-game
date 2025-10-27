export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameStatus = 'playing' | 'won';

export interface GameTimer {
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
}

export interface BestTime {
  time: number;
  moves: number;
  date: string;
  difficulty: string;
}

export interface SpeedRunAchievement {
  id: string;
  name: string;
  description: string;
  timeThreshold: number; // in milliseconds
  unlocked: boolean;
  unlockedAt?: string;
}