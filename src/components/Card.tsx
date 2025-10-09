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
        transition-transform duration-200 hover:scale-105
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
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg"></div>
        </div>

        <div
          className={`
            absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg
            flex items-center justify-center text-5xl
            ${card.isMatched
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-500'
              : 'bg-gradient-to-br from-slate-50 to-slate-100'
            }
          `}
          style={{ transform: 'rotateY(180deg)' }}
        >
          {card.symbol}
        </div>
      </div>
    </div>
  );
};
