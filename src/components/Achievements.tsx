import { ArrowLeft, Lock, Moon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { badges, tierColors } from '@/data/achievements';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';

type IconName = keyof typeof LucideIcons;

export default function Achievements({
  onBack,
}: {
  onBack: () => void;
}) {
  const { unlockedBadges } = useProgress();
  const { theme, toggleTheme } = useTheme();

  const unlockedCount = unlockedBadges.length;
  const totalCount = badges.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Achievements</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Unlock badges by studying, quizzing, and mastering AZ-900 topics.</p>
        </div>

        {/* Progress overview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Badges Unlocked</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {unlockedCount} <span className="text-slate-400 dark:text-slate-500">/ {totalCount}</span>
            </span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{pct}% complete</p>
        </div>

        {/* Badge grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            const tier = tierColors[badge.tier];
            const IconComponent = (LucideIcons[badge.icon as IconName] || LucideIcons.Award) as React.ComponentType<{ className?: string }>;

            return (
              <div
                key={badge.id}
                className={`relative bg-white dark:bg-slate-900 rounded-2xl border-2 p-5 transition-all duration-300 ${
                  isUnlocked
                    ? `${tier.border} shadow-md ${tier.glow}`
                    : 'border-slate-200 dark:border-slate-800 opacity-70'
                }`}
              >
                {isUnlocked && (
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold ${tier.text} ${tier.bg} px-2 py-0.5 rounded-full uppercase`}>
                      {badge.tier}
                    </span>
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    isUnlocked ? `${tier.bg} ${tier.ring} ring-2` : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {isUnlocked ? (
                    <IconComponent className={`w-7 h-7 ${tier.text}`} />
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400 dark:text-slate-600" />
                  )}
                </div>
                <h3 className={`font-bold ${isUnlocked ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm mt-1 ${isUnlocked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {badge.description}
                </p>
                {isUnlocked && (
                  <div className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Unlocked
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
