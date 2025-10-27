import { RotateCcw, Lightbulb, Clock, Trophy } from 'lucide-react';
import { formatTime } from '../utils/timerUtils';

// TODO: Add best score display from localStorage or Supabase
// TODO: Add pause/resume functionality
interface StatsProps {
  moves: number;
  onReset: () => void;
  hintsLeft?: number;
  onHintClick?: () => void;
  isHintOnCooldown?: boolean;
  hintCooldownMs?: number;
  penaltyText?: string;
  elapsedTime?: number;
  bestTime?: number;
  onShowAchievements?: () => void;
}

export const Stats = ({ moves, onReset, hintsLeft, onHintClick, isHintOnCooldown, hintCooldownMs, penaltyText, elapsedTime, bestTime, onShowAchievements }: StatsProps) => {
  return (
    <div className="flex items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-theme-secondary rounded-xl shadow-theme px-6 py-3 flex items-center gap-3 theme-transition">
          <span className="text-theme-secondary font-medium theme-transition">Moves:</span>
          <span className="text-2xl font-bold accent-primary theme-transition">{moves}</span>
        </div>
        
        <div className="bg-theme-secondary rounded-xl shadow-theme px-6 py-3 flex items-center gap-3 theme-transition">
          <Clock size={20} className="text-theme-secondary theme-transition" />
          <span className="text-theme-secondary font-medium theme-transition">Time:</span>
          <span className="text-2xl font-bold accent-primary theme-transition">
            {elapsedTime !== undefined ? formatTime(elapsedTime) : '0s'}
          </span>
        </div>
        
        {bestTime && (
          <div className="bg-theme-secondary rounded-xl shadow-theme px-6 py-3 flex items-center gap-3 theme-transition">
            <span className="text-theme-secondary font-medium theme-transition">Best:</span>
            <span className="text-xl font-bold text-green-500 theme-transition">
              {formatTime(bestTime)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {typeof hintsLeft === 'number' && onHintClick && (
          <button
            onClick={onHintClick}
            disabled={isHintOnCooldown || hintsLeft <= 0}
            className={`bg-theme-secondary hover:bg-theme-tertiary text-theme-primary font-medium px-4 py-3 rounded-xl shadow-theme transition-all duration-200 hover:shadow-lg flex items-center gap-2 theme-transition ${
              isHintOnCooldown || hintsLeft <= 0 ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            title={penaltyText}
          >
            <Lightbulb size={18} />
            Hint ({hintsLeft})
            {isHintOnCooldown && (
              <span className="text-theme-secondary text-sm">{Math.ceil((hintCooldownMs ?? 0) / 1000)}s</span>
            )}
          </button>
        )}

        {onShowAchievements && (
          <button
            onClick={onShowAchievements}
            className="bg-theme-secondary hover:bg-theme-tertiary text-theme-primary font-medium px-4 py-3 rounded-xl shadow-theme transition-all duration-200 hover:shadow-lg flex items-center gap-2 theme-transition"
            title="View Achievements"
          >
            <Trophy size={18} />
            Achievements
          </button>
        )}

        <button
          onClick={onReset}
          className="bg-theme-secondary hover:bg-theme-tertiary text-theme-primary font-medium px-6 py-3 rounded-xl shadow-theme transition-all duration-200 hover:shadow-lg flex items-center gap-2 theme-transition"
        >
          <RotateCcw size={18} />
          New Game
        </button>
      </div>
    </div>
  );
};
