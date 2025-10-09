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
      <div className="bg-white rounded-xl shadow-md px-6 py-3 flex items-center gap-3">
        <span className="text-slate-600 font-medium">Moves:</span>
        <span className="text-2xl font-bold text-blue-600">{moves}</span>
      </div>

      <button
        onClick={onReset}
        className="bg-white hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
      >
        <RotateCcw size={18} />
        New Game
      </button>
    </div>
  );
};
