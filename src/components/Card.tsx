import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
  disabled: boolean;
}

export const Card = ({ card, onClick, disabled }: CardProps) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative w-full aspect-square cursor-pointer
        transition-transform duration-200 hover:scale-105 theme-transition
        ${disabled || card.isMatched ? 'cursor-default' : 'cursor-pointer'}
      `}
    >
      <div
        className={`
          absolute w-full h-full transition-transform duration-500 preserve-3d
          ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute w-full h-full backface-hidden card-back rounded-xl shadow-theme flex items-center justify-center theme-transition"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
        </div>

        <div
          className={`
            absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-theme
            flex items-center justify-center text-5xl theme-transition
            ${card.isMatched ? 'card-matched' : 'card-front'}
          `}
          style={{ transform: 'rotateY(180deg)' }}
        >
          {card.symbol}
        </div>
      </div>
    </div>
  );
};
