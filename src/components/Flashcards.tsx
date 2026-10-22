import { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  Layers,
  Check,
  X,
  Brain,
  Shuffle,
  Moon,
} from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { flashcards } from '@/data/achievements';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';

const topicColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  sky: { bg: 'bg-sky-50 dark:bg-sky-950/40', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-800', gradient: 'from-sky-500 to-blue-600' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', gradient: 'from-emerald-500 to-teal-600' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', gradient: 'from-amber-500 to-orange-600' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-800', gradient: 'from-rose-500 to-pink-600' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950/40', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800', gradient: 'from-violet-500 to-purple-600' },
};

export default function Flashcards({
  onBack,
}: {
  onBack: () => void;
}) {
  const { unlockBadge } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());

  const deck = useMemo(() => {
    const filtered = selectedTopic === 'all'
      ? flashcards
      : flashcards.filter((c) => c.topic === selectedTopic);
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [selectedTopic]);

  const currentCard = deck[currentIndex];
  const isLast = currentIndex === deck.length - 1;

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleRate = useCallback(
    (gotIt: boolean) => {
      if (!currentCard) return;
      const id = currentCard.id;
      setReviewed((prev) => {
        const next = new Set(prev);
        next.add(id);
        if (next.size >= 50) {
          unlockBadge('flashcard-master');
        }
        return next;
      });
      if (gotIt) {
        setKnown((prev) => new Set(prev).add(id));
      } else {
        setUnknown((prev) => new Set(prev).add(id));
      }
      setFlipped(false);
      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentCard, isLast, unlockBadge],
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setFlipped(false);
    setReviewed(new Set());
    setKnown(new Set());
    setUnknown(new Set());
  }, []);

  const handleTopicChange = useCallback((topic: TopicId | 'all') => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setFlipped(false);
    setReviewed(new Set());
    setKnown(new Set());
    setUnknown(new Set());
  }, []);

  if (isLast && reviewed.has(currentCard?.id)) {
    const knownCount = known.size;
    const unknownCount = unknown.size;
    const pct = reviewed.size > 0 ? Math.round((knownCount / reviewed.size) * 100) : 0;

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-8 transition-colors duration-300">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-colors duration-300">
            <div className="h-2 bg-gradient-to-r from-sky-500 to-violet-600" />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/40 mx-auto flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-sky-600 dark:text-sky-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Deck Complete!</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">You reviewed {reviewed.size} flashcards</p>

              <div className="my-8">
                <div className="text-5xl font-bold text-slate-900 dark:text-slate-100">{pct}%</div>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">recall rate</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-4">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{knownCount}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">Known</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/40 rounded-xl p-4">
                  <X className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">{unknownCount}</div>
                  <div className="text-xs text-rose-600 dark:text-rose-500 font-medium">Need Review</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Study Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400">No flashcards available.</p>
      </div>
    );
  }

  const topicInfo = topics.find((t) => t.id === currentCard.topic);
  const colors = topicColors[topicInfo?.color || 'sky'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Card {currentIndex + 1} of {deck.length}
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-violet-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Topic filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => handleTopicChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === 'all'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            All Topics
          </button>
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTopicChange(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopic === t.id
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {t.shortName}
            </button>
          ))}
        </div>

        {/* Flashcard */}
        <div
          onClick={handleFlip}
          className="relative cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              minHeight: '320px',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center p-8 transition-colors duration-300"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border mb-4`}>
                {topicInfo?.shortName}
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 text-center leading-snug">
                {currentCard.front}
              </p>
              <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Shuffle className="w-3 h-3" /> Click to flip
              </p>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 ${colors.bg} rounded-2xl border-2 ${colors.border} shadow-sm flex flex-col items-center justify-center p-8`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 ${colors.text} border ${colors.border} mb-4`}>
                Answer
              </div>
              <p className={`text-base ${colors.text} text-center leading-relaxed font-medium`}>
                {currentCard.back}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {flipped ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => handleRate(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <X className="w-5 h-5" /> Need Review
            </button>
            <button
              onClick={() => handleRate(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
            >
              <Check className="w-5 h-5" /> Got It
            </button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={handleFlip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Reveal Answer <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Progress indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Check className="w-4 h-4" /> {known.size} known
          </span>
          <span className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
            <X className="w-4 h-4" /> {unknown.size} review
          </span>
          <span className="text-slate-400 dark:text-slate-500">{reviewed.size}/{deck.length} reviewed</span>
        </div>
      </div>
    </div>
  );
}
