import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuizAttempt {
  id?: string;
  user_id?: string;
  topic: string;
  score: number;
  total: number;
  question_ids: number[];
  answers: { question_id: number; selected: number; correct: boolean }[];
  created_at?: string;
}

export interface StudyProgress {
  id?: string;
  user_id?: string;
  topic: string;
  attempts: number;
  best_score: number;
  last_score: number;
  notes_reviewed: boolean;
  updated_at?: string;
}

export interface Achievement {
  id?: string;
  user_id?: string;
  badge_id: string;
  unlocked_at?: string;
}
