import { Card } from '../types/game';

// TODO: Allow multiple difficulty levels (easy: 3x2, medium: 4x4, hard: 6x6)
// TODO: Add different theme packs (animals, fruits, sports, etc.)
const SYMBOLS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎸', '🎺'];

export const createDeck = (): Card[] => {
  const cards: Card[] = [];

  SYMBOLS.forEach((symbol, index) => {
    cards.push(
      {
        id: index * 2,
        symbol,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: index * 2 + 1,
        symbol,
        isFlipped: false,
        isMatched: false,
      }
    );
  });

  return shuffleArray(cards);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
