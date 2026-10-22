import { useState } from 'react';
import {
  Cloud,
  Server,
  ShieldCheck,
  DollarSign,
  Scale,
  BookOpen,
  TrendingUp,
  Award,
  ChevronRight,
  Target,
  CheckCircle2,
  Circle,
  Trophy,
  Clock,
  Layers,
  Brain,
  AlertCircle,
  Medal,
  type LucideIcon,
} from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { useProgress } from '@/hooks/useProgress';
import type { View } from '@/App';

const iconMap: Record<string, LucideIcon> = {
  Cloud,
  Server,
  ShieldCheck,
  DollarSign,
  Scale,
};

const colorClasses: Record<string, { bg: string; text: string; border: string; ring: string; gradient: string }> = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', ring: 'ring-sky-500/20', gradient: 'from-sky-500 to-blue-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', ring: 'ring-emerald-500/20', gradient: 'from-emerald-500 to-teal-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-orange-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', ring: 'ring-rose-500/20', gradient: 'from-rose-500 to-pink-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', ring: 'ring-violet-500/20', gradient: 'from-violet-500 to-purple-600' },
};

export default function Dashboard({
  onSelectTopic,
  onNavigate,
}: {
  onSelectTopic: (topic: TopicId, mode: 'quiz' | 'notes') => void;
  onNavigate: (view: View) => void;
}) {
  const { progress, attempts, loading, readinessScore, unlockedBadges, wrongQuestions } = useProgress();
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'notes'>('quiz');

  const score = readinessScore();
  const readinessLabel =
    score >= 80 ? 'Exam Ready' : score >= 60 ? 'Almost There' : score >= 40 ? 'Keep Studying' : 'Just Starting';
  const readinessColor =
    score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-sky-600' : score >= 40 ? 'text-amber-600' : 'text-slate-500';

  const totalAttempts = attempts.length;
  const avgScore =
    attempts.length > 0
      ? Math.round(attempts.reduce((acc, a) => acc + (a.score / a.total) * 100, 0) / attempts.length)
      : 0;

  const wrongCount = wrongQuestions().length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">AZ-900 Prep</h1>
              <p className="text-xs text-slate-500">Microsoft Azure Fundamentals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('achievements')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Medal className="w-4 h-4" />
              <span className="text-sm font-semibold">{unlockedBadges.length}</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">{score}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Readiness Score */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Readiness Score</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${readinessColor}`}>{score}</span>
                <span className={`text-2xl font-semibold ${readinessColor}`}>%</span>
              </div>
              <p className={`mt-1 text-sm font-semibold ${readinessColor}`}>{readinessLabel}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-emerald-600 transition-all duration-700"
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">Weighted by exam topic distribution</p>
            </div>

            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Quizzes Taken</span>
              </div>
              <div className="text-5xl font-bold text-slate-900">{totalAttempts}</div>
              <p className="mt-1 text-sm text-slate-500">total attempts</p>
              <div className="mt-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-slate-600">
                  Avg score: <span className="font-semibold">{avgScore}%</span>
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Topics Covered</span>
              </div>
              <div className="text-5xl font-bold text-slate-900">
                {Object.keys(progress).length}
                <span className="text-2xl text-slate-400">/5</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">topics started</p>
              <button
                onClick={() => onNavigate('history')}
                className="mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
              >
                View history <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Special Feature Cards */}
        <section className="grid sm:grid-cols-3 gap-4">
          {/* Flashcards */}
          <button
            onClick={() => onNavigate('flashcards')}
            className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-700" />
              </div>
              <h3 className="font-bold text-slate-900">Flashcards</h3>
            </div>
            <p className="text-sm text-slate-500">32 interactive cards with flip animation. Test your recall speed.</p>
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-violet-700 group-hover:text-violet-800 transition-colors">
              Start Studying <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Achievements */}
          <button
            onClick={() => onNavigate('achievements')}
            className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Medal className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-slate-900">Achievements</h3>
            </div>
            <p className="text-sm text-slate-500">
              {unlockedBadges.length} of 10 badges unlocked. Keep studying to earn more!
            </p>
            <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-amber-700 group-hover:text-amber-800 transition-colors">
              View Badges <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Review Mistakes */}
          <button
            onClick={() => onNavigate('review-mistakes')}
            className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                wrongCount > 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <AlertCircle className={`w-5 h-5 ${wrongCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`} />
              </div>
              <h3 className="font-bold text-slate-900">Review Mistakes</h3>
            </div>
            <p className="text-sm text-slate-500">
              {wrongCount > 0
                ? `${wrongCount} question${wrongCount === 1 ? '' : 's'} you missed. Retake them now.`
                : 'No mistakes yet. Take a quiz first!'}
            </p>
            <div className={`mt-3 flex items-center gap-1 text-sm font-semibold transition-colors ${
              wrongCount > 0 ? 'text-rose-700 group-hover:text-rose-800' : 'text-slate-400'
            }`}>
              {wrongCount > 0 ? 'Review Now' : 'All Clear'} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </section>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 w-fit shadow-sm">
          <button
            onClick={() => setSelectedMode('quiz')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedMode === 'quiz' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Take Quiz
          </button>
          <button
            onClick={() => setSelectedMode('notes')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedMode === 'notes' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Study Notes
          </button>
        </div>

        {/* Topic Cards */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const Icon = iconMap[topic.icon] || Cloud;
            const colors = colorClasses[topic.color];
            const p = progress[topic.id];
            const bestPct = p?.best_score ?? 0;
            const lastPct = p?.last_score ?? 0;

            return (
              <button
                key={topic.id}
                onClick={() => onSelectTopic(topic.id, selectedMode)}
                className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    {p?.notes_reviewed && (
                      <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Notes read
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {topic.shortName}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{topic.description}</p>

                  {loading ? (
                    <div className="mt-4 h-2 rounded-full bg-slate-100 animate-pulse" />
                  ) : p ? (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Best score</span>
                        <span className={`font-semibold ${bestPct >= 70 ? 'text-emerald-600' : bestPct >= 50 ? 'text-amber-600' : 'text-slate-500'}`}>
                          {bestPct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                          style={{ width: `${bestPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Last: {lastPct}%
                        </span>
                        <span className="text-xs text-slate-400">{p.attempts} {p.attempts === 1 ? 'attempt' : 'attempts'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                      <Circle className="w-4 h-4" />
                      <span>Not started — {selectedMode === 'quiz' ? 'take quiz' : 'read notes'}</span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {selectedMode === 'quiz' ? 'Start Quiz' : 'Read Notes'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}

          {/* Full Practice Exam Card */}
          <button
            onClick={() => onNavigate('full-exam')}
            className="group text-left bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-sm hover:shadow-xl hover:border-slate-600 transition-all duration-200 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="font-bold text-white group-hover:text-slate-200 transition-colors">
                Full Practice Exam
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                25 questions across all 5 topics. Simulate the real exam.
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                Start Full Exam
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}
