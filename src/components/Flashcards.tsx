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
} from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { flashcards, type Flashcard } from '@/data/achievements';
import { useProgress } from '@/hooks/useProgress';

const topicColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', gradient: 'from-sky-500 to-blue-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', gradient: 'from-amber-500 to-orange-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', gradient: 'from-rose-500 to-pink-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', gradient: 'from-violet-500 to-purple-600' },
};

export default function Flashcards({
  onBack,
}: {
  onBack: () => void;
}) {
  const { unlockBadge } = useProgress();
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-sky-500 to-violet-600" />
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-sky-50 mx-auto flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Deck Complete!</h2>
              <p className="text-slate-500 mt-2">You reviewed {reviewed.size} flashcards</p>

              <div className="my-8">
                <div className="text-5xl font-bold text-slate-900">{pct}%</div>
                <p className="text-sm text-slate-400 mt-1">recall rate</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-emerald-700">{knownCount}</div>
                  <div className="text-xs text-emerald-600 font-medium">Known</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <X className="w-6 h-6 text-rose-600 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-rose-700">{unknownCount}</div>
                  <div className="text-xs text-rose-600 font-medium">Need Review</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Study Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">No flashcards available.</p>
      </div>
    );
  }

  const topicInfo = topics.find((t) => t.id === currentCard.topic);
  const colors = topicColors[topicInfo?.color || 'sky'];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Card {currentIndex + 1} of {deck.length}
          </div>
        </div>
        <div className="h-1 bg-slate-100">
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
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
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
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
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
              className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${colors.border} border mb-4`}>
                {topicInfo?.shortName}
              </div>
              <p className="text-xl font-bold text-slate-900 text-center leading-snug">
                {currentCard.front}
              </p>
              <p className="mt-6 text-xs text-slate-400 flex items-center gap-1">
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
              <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-white ${colors.text} border ${colors.border} mb-4`}>
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
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
            >
              <X className="w-5 h-5" /> Need Review
            </button>
            <button
              onClick={() => handleRate(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-emerald-200 text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors"
            >
              <Check className="w-5 h-5" /> Got It
            </button>
          </div>
        ) : (
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={handleFlip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              Reveal Answer <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Progress indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <Check className="w-4 h-4" /> {known.size} known
          </span>
          <span className="flex items-center gap-1.5 text-rose-500">
            <X className="w-4 h-4" /> {unknown.size} review
          </span>
          <span className="text-slate-400">{reviewed.size}/{deck.length} reviewed</span>
        </div>
      </div>
    </div>
  );
}
