import { Trophy, RotateCcw, Clock, Star } from 'lucide-react';
import { formatTime } from '../utils/timerUtils';
import { SpeedRunAchievement } from '../types/game';

// TODO: Add leaderboard integration with Supabase
// TODO: Show completion time alongside moves
// TODO: Add star rating based on performance (moves/time)
// TODO: Add share functionality to social media
interface WinModalProps {
  moves: number;
  onPlayAgain: () => void;
  completionTime?: number;
  isNewBestTime?: boolean;
  unlockedAchievements?: SpeedRunAchievement[];
}

export const WinModal = ({ moves, onPlayAgain, completionTime, isNewBestTime, unlockedAchievements }: WinModalProps) => {
  const getStarRating = (): number => {
    if (!completionTime) return 0;
    
    // Star rating based on time and moves
    if (completionTime <= 30000 && moves <= 16) return 5; // Perfect game
    if (completionTime <= 60000 && moves <= 20) return 4; // Excellent
    if (completionTime <= 120000 && moves <= 24) return 3; // Good
    if (completionTime <= 300000 && moves <= 32) return 2; // Fair
    return 1; // Basic completion
  };

  const stars = getStarRating();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-theme-secondary rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 animate-scale-in theme-transition">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mb-4">
            <Trophy size={40} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold text-theme-primary mb-2 theme-transition">
            Congratulations!
          </h2>

          <div className="mb-6 space-y-2">
            <p className="text-theme-secondary theme-transition">
              You completed the game in <span className="font-bold accent-primary theme-transition">{moves}</span> moves!
            </p>
            
            {completionTime && (
              <p className="text-theme-secondary theme-transition">
                <Clock size={16} className="inline mr-1" />
                Time: <span className="font-bold accent-primary theme-transition">{formatTime(completionTime)}</span>
                {isNewBestTime && (
                  <span className="ml-2 text-green-500 font-bold new-best-time">🏆 New Best Time!</span>
                )}
              </p>
            )}

            {/* Star Rating */}
            <div className="flex justify-center items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
              <span className="ml-2 text-sm text-theme-secondary theme-transition">
                {stars}/5 stars
              </span>
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements && unlockedAchievements.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 achievement-notification">
              <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-2">
                🎉 New Achievements Unlocked!
              </h3>
              <div className="space-y-1">
                {unlockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="text-sm text-yellow-600 dark:text-yellow-400">
                    <span className="font-semibold">{achievement.name}</span>
                    <span className="ml-1">- {achievement.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
