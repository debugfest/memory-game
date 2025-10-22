import { useState, useEffect } from 'react';
import { Card as CardType, GameStatus } from '../types/game';
import { createDeck } from '../utils/gameUtils';
import { Card } from './Card';
import { Stats } from './Stats';
import { WinModal } from './WinModal';
import { ConfettiBurst } from './ConfettiBurst';
import { Fireworks } from './FireWork';

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
  // Hint state
  const [hintsLeft, setHintsLeft] = useState(3);
  const [isHintOnCooldown, setIsHintOnCooldown] = useState(false);
  const [hintCooldownMs, setHintCooldownMs] = useState(0);
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  const [shakingIds, setShakingIds] = useState<number[]>([]);

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
    setHintsLeft(3);
    setIsHintOnCooldown(false);
    setHintCooldownMs(0);
    setHighlightedIds([]);
    setShakingIds([]);
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

  // Utility: find a random unmatched pair's ids
  const findRandomUnmatchedPair = (): [number, number] | null => {
    const unmatchedBySymbol: Record<string, number[]> = {};
    for (const c of cards) {
      if (c.isMatched) continue;
      if (!unmatchedBySymbol[c.symbol]) unmatchedBySymbol[c.symbol] = [];
      unmatchedBySymbol[c.symbol].push(c.id);
    }
    const candidatePairs: [number, number][] = [];
    Object.values(unmatchedBySymbol).forEach(ids => {
      if (ids.length >= 2) {
        // collect all combinations in pairs
        for (let i = 0; i < ids.length; i++) {
          for (let j = i + 1; j < ids.length; j++) {
            candidatePairs.push([ids[i], ids[j]]);
          }
        }
      }
    });
    if (candidatePairs.length === 0) return null;
    return candidatePairs[Math.floor(Math.random() * candidatePairs.length)];
  };

  // Hint actions
  const runHintPeek = () => {
    const pair = findRandomUnmatchedPair();
    if (!pair) return;
    const [a, b] = pair;
    // temporarily flip them for 2s
    const newCards = cards.map(card =>
      card.id === a || card.id === b ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setIsChecking(true);
    setTimeout(() => {
      setCards(prev => prev.map(card =>
        card.id === a || card.id === b ? { ...card, isFlipped: card.isMatched ? true : false } : card
      ));
      setIsChecking(false);
    }, 2000);
  };

  const runHintHighlight = () => {
    const pair = findRandomUnmatchedPair();
    if (!pair) return;
    const [a, b] = pair;
    setHighlightedIds([a, b]);
    setTimeout(() => setHighlightedIds([]), 2000);
  };

  const runHintShake = () => {
    const pair = findRandomUnmatchedPair();
    if (!pair) return;
    const [a, b] = pair;
    setShakingIds([a, b]);
    setTimeout(() => setShakingIds([]), 1200);
  };

  const startHintCooldown = (ms: number) => {
    setIsHintOnCooldown(true);
    setHintCooldownMs(ms);
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(ms - elapsed, 0);
      setHintCooldownMs(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        setIsHintOnCooldown(false);
      }
    }, 250);
  };

  const handleUseHint = () => {
    if (isChecking || isHintOnCooldown || hintsLeft <= 0) return;

    // rotate through hint types for variety: peek -> highlight -> shake
    const hintIndex = (3 - hintsLeft) % 3;
    if (hintIndex === 0) runHintPeek();
    else if (hintIndex === 1) runHintHighlight();
    else runHintShake();

    // penalty: +1 move
    setMoves(prev => prev + 1);

    setHintsLeft(prev => Math.max(prev - 1, 0));
    startHintCooldown(5000); // 5s cooldown
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h1 className="text-5xl font-bold text-center mb-2 text-theme-primary theme-transition">
        Memory Match
      </h1>
      <p className="text-center text-theme-secondary mb-8 theme-transition">
        Find all matching pairs to win!
      </p>

      <Stats
        moves={moves}
        onReset={initializeGame}
        hintsLeft={hintsLeft}
        onHintClick={handleUseHint}
        isHintOnCooldown={isHintOnCooldown}
        hintCooldownMs={hintCooldownMs}
        penaltyText={"Using hint adds +1 move"}
      />

      {/* <div className="grid grid-cols-4 gap-4 mb-8"> */}
      <div className={`grid grid-cols-4 gap-4 mb-8 ${
            gameStatus === 'won' ? 'celebrate-grid' : ''
            }`}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isChecking}
            isHighlighted={highlightedIds.includes(card.id)}
            isShaking={shakingIds.includes(card.id)}
            celebrate={gameStatus === 'won'}
            index={index}
          />
        ))}
      </div>

      {gameStatus === 'won' && (
        <>
          <ConfettiBurst active={true}/>
          <Fireworks active={true}/>
          <WinModal moves={moves} onPlayAgain={initializeGame} />
        </>
      )}
    </div>
  );
};
