import { useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, Lightbulb, FileText, Moon } from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { getStudyNotesByTopic } from '@/data/studyNotes';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';

const noteColorMap: Record<string, { bg: string; border: string; text: string }> = {
  sky: { bg: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-200 dark:border-sky-800', text: 'text-sky-700 dark:text-sky-400' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-400' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-700 dark:text-rose-400' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-200 dark:border-violet-800', text: 'text-violet-700 dark:text-violet-400' },
};

export default function StudyNotesView({
  topic,
  onBack,
}: {
  topic: TopicId;
  onBack: () => void;
}) {
  const { markNotesReviewed } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const topicInfo = topics.find((t) => t.id === topic);
  const notes = getStudyNotesByTopic(topic);
  const colors = noteColorMap[topicInfo?.color || 'sky'];

  useEffect(() => {
    markNotesReviewed(topic);
  }, [topic, markNotesReviewed]);

  if (!topicInfo || !notes) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400">Notes not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Notes marked as reviewed
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
              <BookOpen className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{notes.title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">{topicInfo.description}</p>
            </div>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl p-4 transition-colors duration-300">
            <p className="text-sm text-sky-900 dark:text-sky-300 leading-relaxed">{notes.summary}</p>
          </div>
        </div>

        {/* Notes sections */}
        <div className="space-y-6">
          {notes.notes.map((note, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 text-sm font-bold">
                    {i + 1}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{note.heading}</h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{note.content}</p>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Key Points</span>
                  </div>
                  <ul className="space-y-2">
                    {note.keyPoints.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Glossary */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Glossary</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {notes.glossary.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.term}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 text-center">
          <GraduationCap className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Ready to test your knowledge?</h3>
          <p className="text-sm text-slate-400 mt-1">Take a quiz on {topicInfo.shortName} to see how much you've learned.</p>
          <button
            onClick={() => {
              const event = new CustomEvent('navigate-quiz', { detail: topic });
              window.dispatchEvent(event);
            }}
            className="mt-4 px-6 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors"
          >
            Start Quiz on {topicInfo.shortName}
          </button>
        </div>
      </div>
    </div>
  );
}
