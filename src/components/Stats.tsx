import { RotateCcw } from 'lucide-react';

// TODO: Add timer display showing elapsed time
// TODO: Add best score display from localStorage or Supabase
// TODO: Add pause/resume functionality
interface StatsProps {
  moves: number;
  onReset: () => void;
}

export const Stats = ({ moves, onReset }: StatsProps) => {
  return (
    <div className="flex items-center justify-between gap-6 mb-8">
      <div className="bg-theme-secondary rounded-xl shadow-theme px-6 py-3 flex items-center gap-3 theme-transition">
        <span className="text-theme-secondary font-medium theme-transition">Moves:</span>
        <span className="text-2xl font-bold accent-primary theme-transition">{moves}</span>
      </div>

      <button
        onClick={onReset}
        className="bg-theme-secondary hover:bg-theme-tertiary text-theme-primary font-medium px-6 py-3 rounded-xl shadow-theme transition-all duration-200 hover:shadow-lg flex items-center gap-2 theme-transition"
      >
        <RotateCcw size={18} />
        New Game
      </button>
    </div>
  );
};
