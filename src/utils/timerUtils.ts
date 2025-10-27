import { GameTimer, BestTime, SpeedRunAchievement } from '../types/game';

// Speed run achievement definitions
export const SPEED_RUN_ACHIEVEMENTS: SpeedRunAchievement[] = [
  {
    id: 'lightning-fast',
    name: 'Lightning Fast',
    description: 'Complete a game in under 30 seconds',
    timeThreshold: 30000, // 30 seconds
    unlocked: false,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a game in under 60 seconds',
    timeThreshold: 60000, // 1 minute
    unlocked: false,
  },
  {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    description: 'Complete a game in under 2 minutes',
    timeThreshold: 120000, // 2 minutes
    unlocked: false,
  },
  {
    id: 'memory-master',
    name: 'Memory Master',
    description: 'Complete a game in under 5 minutes',
    timeThreshold: 300000, // 5 minutes
    unlocked: false,
  },
];

// Timer utility functions
export const createTimer = (): GameTimer => ({
  startTime: Date.now(),
  elapsedTime: 0,
  isRunning: true,
});

export const updateTimer = (timer: GameTimer): GameTimer => {
  if (!timer.isRunning) return timer;
  
  return {
    ...timer,
    elapsedTime: Date.now() - timer.startTime,
  };
};

export const stopTimer = (timer: GameTimer): GameTimer => ({
  ...timer,
  isRunning: false,
});

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}.${Math.floor((milliseconds % 1000) / 100)}s`;
};

// Best time management
const BEST_TIME_KEY = 'memory-game-best-times';
const ACHIEVEMENTS_KEY = 'memory-game-achievements';

export const getBestTimes = (): BestTime[] => {
  try {
    const stored = localStorage.getItem(BEST_TIME_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveBestTime = (time: number, moves: number, difficulty: string = 'medium'): boolean => {
  try {
    const bestTimes = getBestTimes();
    const newBestTime: BestTime = {
      time,
      moves,
      date: new Date().toISOString(),
      difficulty,
    };

    // Check if this is a new best time for this difficulty
    const existingBest = bestTimes.find(bt => bt.difficulty === difficulty);
    
    if (!existingBest || time < existingBest.time) {
      // Remove old best time for this difficulty
      const filteredTimes = bestTimes.filter(bt => bt.difficulty !== difficulty);
      const updatedTimes = [...filteredTimes, newBestTime];
      
      localStorage.setItem(BEST_TIME_KEY, JSON.stringify(updatedTimes));
      return true; // New best time!
    }
    
    return false;
  } catch {
    return false;
  }
};

export const getBestTimeForDifficulty = (difficulty: string = 'medium'): BestTime | null => {
  const bestTimes = getBestTimes();
  return bestTimes.find(bt => bt.difficulty === difficulty) || null;
};

// Achievement management
export const getAchievements = (): SpeedRunAchievement[] => {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // If parsing fails, return default achievements
  }
  
  return SPEED_RUN_ACHIEVEMENTS.map(achievement => ({ ...achievement }));
};

export const checkAndUnlockAchievements = (time: number): SpeedRunAchievement[] => {
  const achievements = getAchievements();
  const newlyUnlocked: SpeedRunAchievement[] = [];
  
  achievements.forEach(achievement => {
    if (!achievement.unlocked && time <= achievement.timeThreshold) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      newlyUnlocked.push(achievement);
    }
  });
  
  if (newlyUnlocked.length > 0) {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  }
  
  return newlyUnlocked;
};

export const getUnlockedAchievements = (): SpeedRunAchievement[] => {
  return getAchievements().filter(achievement => achievement.unlocked);
};

export const resetAchievements = (): void => {
  localStorage.removeItem(ACHIEVEMENTS_KEY);
  localStorage.removeItem(BEST_TIME_KEY);
};
