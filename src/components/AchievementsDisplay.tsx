import { Trophy, Zap, Brain, Target } from 'lucide-react';
import { SpeedRunAchievement } from '../types/game';
import { getUnlockedAchievements } from '../utils/timerUtils';

interface AchievementsDisplayProps {
  onClose: () => void;
}

const getAchievementIcon = (achievementId: string) => {
  switch (achievementId) {
    case 'lightning-fast':
      return <Zap size={24} className="text-yellow-500" />;
    case 'speed-demon':
      return <Zap size={24} className="text-orange-500" />;
    case 'quick-thinker':
      return <Brain size={24} className="text-blue-500" />;
    case 'memory-master':
      return <Target size={24} className="text-green-500" />;
    default:
      return <Trophy size={24} className="text-purple-500" />;
  }
};

export const AchievementsDisplay = ({ onClose }: AchievementsDisplayProps) => {
  const achievements = getUnlockedAchievements();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-theme-secondary rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 animate-scale-in theme-transition">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full mb-4">
            <Trophy size={32} className="text-white" />
          </div>

          <h2 className="text-3xl font-bold text-theme-primary mb-2 theme-transition">
            Achievements
          </h2>

          <p className="text-theme-secondary mb-6 theme-transition">
            Your unlocked achievements and progress
          </p>

          {achievements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-theme-secondary theme-transition">
                No achievements unlocked yet. Complete games faster to unlock achievements!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4 achievement-notification"
                >
                  <div className="flex items-center gap-3">
                    {getAchievementIcon(achievement.id)}
                    <div className="text-left">
                      <h3 className="font-bold text-yellow-700 dark:text-yellow-300">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        {achievement.description}
                      </p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-yellow-500 dark:text-yellow-500 mt-1">
                          Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
