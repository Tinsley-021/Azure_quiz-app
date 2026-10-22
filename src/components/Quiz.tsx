import { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  Lightbulb,
  GraduationCap,
  AlertCircle,
  Moon,
} from 'lucide-react';
import {
  questions,
  topics,
  type Question,
  type TopicId,
} from '@/data/questions';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';
import Confetti from '@/components/Confetti';

type Mode = 'topic' | 'full' | 'mistakes';

export default function Quiz({
  topic,
  mode,
  onBack,
  onStudyNotes,
}: {
  topic: TopicId | null;
  mode: Mode;
  onBack: () => void;
  onStudyNotes: (topic: TopicId) => void;
}) {
  const { saveAttempt, unlockBadge, wrongQuestions } = useProgress();
  const { theme, toggleTheme } = useTheme();

  const quizQuestions = useMemo(() => {
    if (mode === 'full') {
      const all = topics.map((t) => questions.filter((q) => q.topic === t.id));
      const picked: Question[] = [];
      const perTopic = Math.ceil(25 / topics.length);
      for (const topicQs of all) {
        const shuffled = [...topicQs].sort(() => Math.random() - 0.5);
        picked.push(...shuffled.slice(0, perTopic));
      }
      return picked.sort(() => Math.random() - 0.5).slice(0, 25);
    }
    if (mode === 'mistakes') {
      const wrongIds = new Set(wrongQuestions());
      const wrong = questions.filter((q) => wrongIds.has(q.id));
      if (wrong.length === 0) return [];
      return wrong.sort(() => Math.random() - 0.5);
    }
    return questions.filter((q) => q.topic === topic).sort(() => Math.random() - 0.5);
  }, [topic, mode, wrongQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ question_id: number; selected: number; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const currentQ = quizQuestions[currentIndex];
  const isLastQuestion = quizQuestions.length > 0 && currentIndex === quizQuestions.length - 1;

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;
      setSelectedAnswer(index);
    },
    [showResult],
  );

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentQ.correctIndex;
    setShowResult(true);
    setAnswers((prev) => [...prev, { question_id: currentQ.id, selected: selectedAnswer, correct }]);
  }, [selectedAnswer, currentQ]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [isLastQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setFinished(false);
    setSaved(false);
    setCelebrate(false);
  }, []);

  const score = answers.filter((a) => a.correct).length;
  const pct = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 100) : 0;

  if (finished) {
    if (!saved) {
      setSaved(true);
      if (pct >= 80) {
        setCelebrate(true);
      }
      if (mode === 'topic' && topic) {
        saveAttempt({
          topic,
          score,
          total: quizQuestions.length,
          question_ids: quizQuestions.map((q) => q.id),
          answers,
        });
      } else if (mode === 'full') {
        if (pct >= 70) {
          unlockBadge('full-exam-pass');
        }
        for (const t of topics) {
          const topicQs = quizQuestions.filter((q) => q.topic === t.id);
          if (topicQs.length > 0) {
            const topicScore = topicQs.filter(
              (q) => answers.find((a) => a.question_id === q.id)?.correct,
            ).length;
            saveAttempt({
              topic: t.id,
              score: topicScore,
              total: topicQs.length,
              question_ids: topicQs.map((q) => q.id),
              answers: answers.filter((a) => topicQs.some((q) => q.id === a.question_id)),
            });
          }
        }
      }
    }

    const passed = pct >= 70;
    const grade =
      pct >= 90 ? 'Outstanding' : pct >= 80 ? 'Excellent' : pct >= 70 ? 'Good Job' : pct >= 50 ? 'Keep Going' : 'Study More';

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-8 transition-colors duration-300">
        <Confetti active={celebrate} />
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-colors duration-300">
            <div className={`h-2 ${passed ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} />
            <div className="p-8 text-center">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${passed ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'bg-amber-50 dark:bg-amber-950/40'}`}>
                <Trophy className={`w-10 h-10 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{grade}</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                You scored <span className="font-bold text-slate-900 dark:text-slate-100">{score}</span> out of{' '}
                <span className="font-bold text-slate-900 dark:text-slate-100">{quizQuestions.length}</span>
              </p>

              <div className="my-8">
                <div className="text-6xl font-bold text-slate-900 dark:text-slate-100">{pct}%</div>
                <div className="mt-4 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden max-w-xs mx-auto">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${passed ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{score}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-500 font-medium">Correct</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/40 rounded-xl p-4">
                  <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
                  <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">{quizQuestions.length - score}</div>
                  <div className="text-xs text-rose-600 dark:text-rose-500 font-medium">Incorrect</div>
                </div>
                <div className="bg-sky-50 dark:bg-sky-950/40 rounded-xl p-4">
                  <div className="text-sm font-bold text-sky-700 dark:text-sky-400 mx-auto mb-1">{quizQuestions.length}</div>
                  <div className="text-2xl font-bold text-sky-700 dark:text-sky-400">{pct}%</div>
                  <div className="text-xs text-sky-600 dark:text-sky-500 font-medium">Score</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
              </div>
            </div>
          </div>

          {/* Answer Review */}
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Answer Review</h3>
            {quizQuestions.map((q, i) => {
              const answer = answers.find((a) => a.question_id === q.id);
              const isCorrect = answer?.correct ?? false;
              const topicInfo = topics.find((t) => t.id === q.topic);
              return (
                <div
                  key={q.id}
                  className={`bg-white dark:bg-slate-900 rounded-xl border p-4 transition-colors duration-300 ${isCorrect ? 'border-emerald-200 dark:border-emerald-800' : 'border-rose-200 dark:border-rose-800'}`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">Q{i + 1}</span>
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {topicInfo?.shortName}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-rose-600 dark:text-rose-400 mt-2">
                          Correct answer: <span className="font-semibold">{q.options[q.correctIndex]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0 || !currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">No mistakes to review!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
            {mode === 'mistakes'
              ? "You haven't gotten any questions wrong yet. Take some quizzes first, then come back to review your missed questions."
              : 'No questions available for this topic.'}
          </p>
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const topicInfo = topics.find((t) => t.id === currentQ.topic);
  const isCorrect = selectedAnswer === currentQ.correctIndex;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
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
              {mode === 'mistakes' && <AlertCircle className="w-4 h-4 text-rose-500" />}
              Question {currentIndex + 1} of {quizQuestions.length}
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
        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              mode === 'mistakes'
                ? 'bg-gradient-to-r from-rose-500 to-orange-500'
                : 'bg-gradient-to-r from-sky-500 to-blue-600'
            }`}
            style={{ width: `${((currentIndex + (showResult ? 1 : 0)) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {(mode === 'full' || mode === 'mistakes') && (
          <div className="mb-4">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              mode === 'mistakes' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}>
              {mode === 'mistakes' ? 'Review Mode' : topicInfo?.shortName}
            </span>
          </div>
        )}

        {/* Question */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors duration-300">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {currentQ.options.map((option, i) => {
              let stateClass = 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800';
              if (showResult) {
                if (i === currentQ.correctIndex) {
                  stateClass = 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40';
                } else if (i === selectedAnswer && i !== currentQ.correctIndex) {
                  stateClass = 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40';
                } else {
                  stateClass = 'border-slate-200 dark:border-slate-700 opacity-60';
                }
              } else if (selectedAnswer === i) {
                stateClass = 'border-sky-400 dark:border-sky-500 bg-sky-50 dark:bg-sky-950/40 ring-2 ring-sky-500/20';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${stateClass} ${
                    !showResult ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                        showResult
                          ? i === currentQ.correctIndex
                            ? 'bg-emerald-500 text-white'
                            : i === selectedAnswer
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                          : selectedAnswer === i
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${
                      showResult && i === currentQ.correctIndex
                        ? 'text-emerald-900 dark:text-emerald-300'
                        : showResult && i === selectedAnswer && i !== currentQ.correctIndex
                          ? 'text-rose-900 dark:text-rose-300'
                          : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {option}
                    </span>
                    {showResult && i === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-auto" />
                    )}
                    {showResult && i === selectedAnswer && i !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div className={`mt-6 rounded-xl border p-5 ${isCorrect ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30' : 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${isCorrect ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-900 dark:text-rose-300'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </p>
                  <div className="mt-2 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'}`}>
                      {currentQ.explanation}
                    </p>
                  </div>
                  {/* Deep study notes */}
                  <div className="mt-4 p-4 rounded-lg bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Study Notes</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{currentQ.studyNotes}</p>
                  </div>
                  {/* Study full notes link */}
                  <button
                    onClick={() => onStudyNotes(currentQ.topic)}
                    className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read full topic notes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
                setSelectedAnswer(null);
                setShowResult(false);
              }
            }}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 border border-transparent transition-all disabled:opacity-0 disabled:cursor-default"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
