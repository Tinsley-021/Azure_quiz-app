import { useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, GraduationCap, Lightbulb, FileText } from 'lucide-react';
import { topics, type TopicId } from '@/data/questions';
import { getStudyNotesByTopic } from '@/data/studyNotes';
import { useProgress } from '@/hooks/useProgress';

const noteColorMap: Record<string, { bg: string; border: string; text: string }> = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' },
};

export default function StudyNotesView({
  topic,
  onBack,
}: {
  topic: TopicId;
  onBack: () => void;
}) {
  const { markNotesReviewed } = useProgress();
  const topicInfo = topics.find((t) => t.id === topic);
  const notes = getStudyNotesByTopic(topic);
  const colors = noteColorMap[topicInfo?.color || 'sky'];

  useEffect(() => {
    markNotesReviewed(topic);
  }, [topic, markNotesReviewed]);

  if (!topicInfo || !notes) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Notes not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> Notes marked as reviewed
          </span>
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
              <h1 className="text-2xl font-bold text-slate-900">{notes.title}</h1>
              <p className="text-sm text-slate-500">{topicInfo.description}</p>
            </div>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <p className="text-sm text-sky-900 leading-relaxed">{notes.summary}</p>
          </div>
        </div>

        {/* Notes sections */}
        <div className="space-y-6">
          {notes.notes.map((note, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
                    {i + 1}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{note.heading}</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{note.content}</p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Key Points</span>
                  </div>
                  <ul className="space-y-2">
                    {note.keyPoints.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
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
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900">Glossary</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {notes.glossary.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-sm font-bold text-slate-800">{item.term}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-center">
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
