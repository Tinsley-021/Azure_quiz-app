import { ArrowLeft, Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { badges, tierColors } from '@/data/achievements';
import { useProgress } from '@/hooks/useProgress';

type IconName = keyof typeof LucideIcons;

export default function Achievements({
  onBack,
}: {
  onBack: () => void;
}) {
  const { unlockedBadges } = useProgress();

  const unlockedCount = unlockedBadges.length;
  const totalCount = badges.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Achievements</h1>
          <p className="text-sm text-slate-500 mt-1">Unlock badges by studying, quizzing, and mastering AZ-900 topics.</p>
        </div>

        {/* Progress overview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">Badges Unlocked</span>
            <span className="text-sm font-bold text-slate-900">
              {unlockedCount} <span className="text-slate-400">/ {totalCount}</span>
            </span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">{pct}% complete</p>
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
                className={`relative bg-white rounded-2xl border-2 p-5 transition-all duration-300 ${
                  isUnlocked
                    ? `${tier.border} shadow-md ${tier.glow}`
                    : 'border-slate-200 opacity-70'
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
                    isUnlocked ? `${tier.bg} ${tier.ring} ring-2` : 'bg-slate-100'
                  }`}
                >
                  {isUnlocked ? (
                    <IconComponent className={`w-7 h-7 ${tier.text}`} />
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <h3 className={`font-bold ${isUnlocked ? 'text-slate-900' : 'text-slate-500'}`}>
                  {badge.name}
                </h3>
                <p className={`text-sm mt-1 ${isUnlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                  {badge.description}
                </p>
                {isUnlocked && (
                  <div className="mt-3 text-xs text-emerald-600 font-semibold flex items-center gap-1">
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
