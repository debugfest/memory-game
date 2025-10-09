import { Trophy, RotateCcw } from 'lucide-react';

// TODO: Add leaderboard integration with Supabase
// TODO: Show completion time alongside moves
// TODO: Add star rating based on performance (moves/time)
// TODO: Add share functionality to social media
interface WinModalProps {
  moves: number;
  onPlayAgain: () => void;
}

export const WinModal = ({ moves, onPlayAgain }: WinModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scale-in">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4">
            <Trophy size={40} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Congratulations!
          </h2>

          <p className="text-slate-600 mb-6">
            You completed the game in <span className="font-bold text-blue-600">{moves}</span> moves!
          </p>

          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={18} />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
