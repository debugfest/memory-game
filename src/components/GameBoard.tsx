import { useState, useEffect } from 'react';
import { Card as CardType, GameStatus } from '../types/game';
import { createDeck } from '../utils/gameUtils';
import { Card } from './Card';
import { Stats } from './Stats';
import { WinModal } from './WinModal';

// TODO: Add timer to track how long each game takes
// TODO: Add difficulty selection (grid size options)
// TODO: Implement sound effects for flips, matches, and wins
// TODO: Add animations for card entrance on game start
export const GameBoard = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => setGameStatus('won'), 500);
    }
  }, [cards]);

  const initializeGame = () => {
    const newDeck = createDeck();
    setCards(newDeck);
    setFlippedCards([]);
    setMoves(0);
    setGameStatus('playing');
    setIsChecking(false);
  };

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2) return;

    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards(prev => [...prev, id]);
  };

  const checkForMatch = () => {
    setIsChecking(true);
    setMoves(prev => prev + 1);

    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
      const newCards = cards.map(card =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card
      );
      setCards(newCards);
      setFlippedCards([]);
      setIsChecking(false);
    } else {
      setTimeout(() => {
        const newCards = cards.map(card =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(newCards);
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-2 text-theme-primary theme-transition">
        Memory Match
      </h1>
      <p className="text-center text-theme-secondary mb-8 theme-transition">
        Find all matching pairs to win!
      </p>

      <Stats moves={moves} onReset={initializeGame} />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isChecking}
          />
        ))}
      </div>

      {gameStatus === 'won' && (
        <WinModal moves={moves} onPlayAgain={initializeGame} />
      )}
    </div>
  );
};
