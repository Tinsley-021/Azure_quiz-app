import { useState, useEffect, useCallback } from 'react';
import { supabase, type QuizAttempt, type StudyProgress } from '@/lib/supabase';
import type { TopicId } from '@/data/questions';

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, StudyProgress>>({});
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    setLoading(true);
    const [progRes, attemptRes, badgeRes] = await Promise.all([
      supabase.from('study_progress').select('*'),
      supabase.from('quiz_attempts').select('*').order('created_at', { ascending: false }),
      supabase.from('achievements').select('*'),
    ]);

    if (progRes.data) {
      const map: Record<string, StudyProgress> = {};
      for (const p of progRes.data as StudyProgress[]) {
        map[p.topic] = p;
      }
      setProgress(map);
    }
    if (attemptRes.data) {
      setAttempts(attemptRes.data as QuizAttempt[]);
    }
    if (badgeRes.data) {
      setUnlockedBadges((badgeRes.data as { badge_id: string }[]).map((b) => b.badge_id));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const unlockBadge = useCallback(
    async (badgeId: string) => {
      if (unlockedBadges.includes(badgeId)) return;
      await supabase.from('achievements').insert([{ badge_id: badgeId }]);
      setUnlockedBadges((prev) => [...prev, badgeId]);
    },
    [unlockedBadges],
  );

  const saveAttempt = useCallback(
    async (attempt: Omit<QuizAttempt, 'id' | 'created_at'>) => {
      await supabase.from('quiz_attempts').insert([attempt]);

      const existing = progress[attempt.topic];
      const pct = Math.round((attempt.score / attempt.total) * 100);

      if (existing) {
        const updated: Partial<StudyProgress> = {
          attempts: existing.attempts + 1,
          best_score: Math.max(existing.best_score, pct),
          last_score: pct,
          updated_at: new Date().toISOString(),
        };
        await supabase.from('study_progress').update(updated).eq('id', existing.id);
      } else {
        const newProgress: Omit<StudyProgress, 'id' | 'updated_at'> = {
          topic: attempt.topic,
          attempts: 1,
          best_score: pct,
          last_score: pct,
          notes_reviewed: false,
        };
        await supabase.from('study_progress').insert([newProgress]);
      }

      await fetchProgress();

      // Check achievements
      const allAttempts = [...attempts, attempt];
      // first-quiz
      if (allAttempts.length === 1) {
        await unlockBadge('first-quiz');
      }
      // first-perfect
      if (pct === 100) {
        await unlockBadge('first-perfect');
      }
      // comeback: improved by 30%+ on retake
      if (existing && pct - existing.last_score >= 30) {
        await unlockBadge('comeback');
      }
      // streak checks
      const recent = allAttempts.slice(-5);
      const consecutivePass = recent.filter((a) => a.score / a.total >= 0.7);
      if (consecutivePass.length >= 3) {
        await unlockBadge('streak-3');
      }
      if (consecutivePass.length >= 5 && recent.length >= 5) {
        await unlockBadge('streak-5');
      }
      // all-topics
      const topicsAttempted = new Set(allAttempts.map((a) => a.topic));
      if (topicsAttempted.size >= 5) {
        await unlockBadge('all-topics');
      }
      // exam-ready (80% readiness)
      const refreshedProg = await supabase.from('study_progress').select('*');
      if (refreshedProg.data) {
        const weights: Record<string, number> = {
          'cloud-concepts': 25, 'azure-services': 35, security: 20,
          'cost-management': 10, 'governance-compliance': 10,
        };
        let totalW = 0, totalWeighted = 0;
        for (const p of refreshedProg.data as StudyProgress[]) {
          const w = weights[p.topic] || 10;
          totalW += w;
          totalWeighted += Math.min(100, p.best_score + (p.notes_reviewed ? 5 : 0)) * w;
        }
        if (totalW > 0 && Math.round(totalWeighted / totalW) >= 80) {
          await unlockBadge('exam-ready');
        }
        // notes-master
        const notesReviewed = (refreshedProg.data as StudyProgress[]).filter((p) => p.notes_reviewed);
        if (notesReviewed.length >= 5) {
          await unlockBadge('notes-master');
        }
      }
    },
    [progress, attempts, fetchProgress, unlockBadge],
  );

  const markNotesReviewed = useCallback(
    async (topic: TopicId) => {
      const existing = progress[topic];
      if (existing) {
        if (existing.notes_reviewed) return;
        await supabase
          .from('study_progress')
          .update({ notes_reviewed: true, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        await supabase.from('study_progress').insert([
          {
            topic,
            attempts: 0,
            best_score: 0,
            last_score: 0,
            notes_reviewed: true,
          },
        ]);
      }
      await fetchProgress();

      // Check notes-master
      const refreshedProg = await supabase.from('study_progress').select('*');
      if (refreshedProg.data) {
        const notesReviewed = (refreshedProg.data as StudyProgress[]).filter((p) => p.notes_reviewed);
        if (notesReviewed.length >= 5) {
          await unlockBadge('notes-master');
        }
      }
    },
    [progress, fetchProgress, unlockBadge],
  );

  const wrongQuestions = useCallback((): number[] => {
    const wrong = new Set<number>();
    for (const attempt of attempts) {
      if (attempt.answers) {
        for (const a of attempt.answers) {
          if (!a.correct) {
            wrong.add(a.question_id);
          }
        }
      }
    }
    return Array.from(wrong);
  }, [attempts]);

  const readinessScore = useCallback((): number => {
    const topicIds = Object.keys(progress) as TopicId[];
    if (topicIds.length === 0) return 0;
    let totalWeighted = 0;
    let totalWeight = 0;
    const weights: Record<TopicId, number> = {
      'cloud-concepts': 25,
      'azure-services': 35,
      security: 20,
      'cost-management': 10,
      'governance-compliance': 10,
    };
    for (const topic of topicIds) {
      const p = progress[topic];
      const weight = weights[topic] || 10;
      totalWeight += weight;
      const notesBonus = p.notes_reviewed ? 5 : 0;
      totalWeighted += Math.min(100, p.best_score + notesBonus) * weight;
    }
    return Math.round(totalWeighted / totalWeight);
  }, [progress]);

  return {
    progress,
    attempts,
    unlockedBadges,
    loading,
    saveAttempt,
    markNotesReviewed,
    unlockBadge,
    wrongQuestions,
    readinessScore,
    refetch: fetchProgress,
  };
}
