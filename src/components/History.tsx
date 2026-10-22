import { ArrowLeft, Clock, TrendingUp, Award, Moon } from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';

export default function History({ onBack }: { onBack: () => void }) {
  const { attempts, progress, loading } = useProgress();
  const { theme, toggleTheme } = useTheme();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Study History</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track your quiz attempts and progress over time.</p>
        </div>

        {/* Per-topic summary */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Topic Progress</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {topics.map((t) => {
              const p = progress[t.id];
              return (
                <div key={t.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.shortName}</h3>
                    {p ? (
                      <span className={`text-sm font-bold ${p.best_score >= 70 ? 'text-emerald-600 dark:text-emerald-400' : p.best_score >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                        {p.best_score}%
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">No attempts</span>
                    )}
                  </div>
                  {p ? (
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${p.best_score >= 70 ? 'bg-emerald-500' : p.best_score >= 50 ? 'bg-amber-500' : 'bg-slate-400'}`}
                          style={{ width: `${p.best_score}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Last: {p.last_score}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" /> {p.attempts} {p.attempts === 1 ? 'attempt' : 'attempts'}
                        </span>
                        {p.notes_reviewed && <span className="text-emerald-500 dark:text-emerald-400">Notes read</span>}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 dark:text-slate-500">Start studying to see progress here.</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Attempt history */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Recent Attempts</h2>
          {loading ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 dark:text-slate-500 transition-colors duration-300">
              Loading...
            </div>
          ) : attempts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center transition-colors duration-300">
              <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No quiz attempts yet. Take your first quiz to start tracking!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {attempts.slice(0, 30).map((attempt) => {
                const topicInfo = topics.find((t) => t.id === (attempt.topic as TopicId));
                const pct = Math.round((attempt.score / attempt.total) * 100);
                return (
                  <div
                    key={attempt.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          pct >= 70 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' : pct >= 50 ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                        }`}
                      >
                        <span className="text-sm font-bold">{pct}%</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">
                          {topicInfo?.shortName || attempt.topic}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatDate(attempt.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{attempt.score}</span>/{attempt.total}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
