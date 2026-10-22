import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import Quiz from '@/components/Quiz';
import StudyNotesView from '@/components/StudyNotes';
import History from '@/components/History';
import Flashcards from '@/components/Flashcards';
import Achievements from '@/components/Achievements';
import type { TopicId } from '@/data/questions';

export type View = 'dashboard' | 'quiz' | 'notes' | 'history' | 'full-exam' | 'flashcards' | 'achievements' | 'review-mistakes';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [activeTopic, setActiveTopic] = useState<TopicId | null>(null);

  const handleSelectTopic = (topic: TopicId, mode: 'quiz' | 'notes') => {
    setActiveTopic(topic);
    setView(mode);
  };

  const handleBack = () => {
    setActiveTopic(null);
    setView('dashboard');
  };

  const handleStudyNotes = (topic: TopicId) => {
    setActiveTopic(topic);
    setView('notes');
  };

  // Listen for "start quiz" from StudyNotes view
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<TopicId>).detail;
      setActiveTopic(detail);
      setView('quiz');
    };
    window.addEventListener('navigate-quiz', handler);
    return () => window.removeEventListener('navigate-quiz', handler);
  }, []);

  if (view === 'quiz') {
    return <Quiz topic={activeTopic} mode="topic" onBack={handleBack} onStudyNotes={handleStudyNotes} />;
  }

  if (view === 'full-exam') {
    return <Quiz topic={null} mode="full" onBack={handleBack} onStudyNotes={handleStudyNotes} />;
  }

  if (view === 'review-mistakes') {
    return <Quiz topic={null} mode="mistakes" onBack={handleBack} onStudyNotes={handleStudyNotes} />;
  }

  if (view === 'notes' && activeTopic) {
    return <StudyNotesView topic={activeTopic} onBack={handleBack} />;
  }

  if (view === 'history') {
    return <History onBack={handleBack} />;
  }

  if (view === 'flashcards') {
    return <Flashcards onBack={handleBack} />;
  }

  if (view === 'achievements') {
    return <Achievements onBack={handleBack} />;
  }

  return <Dashboard onSelectTopic={handleSelectTopic} onNavigate={setView} />;
}
