/*
# AZ-900 Quiz Prep — Progress Tracking Tables (single-tenant, no auth)

1. New Tables
- `quiz_attempts` — Records each quiz session: topic, score, total questions, timestamp.
  - id (uuid, primary key)
  - topic (text, not null) — the AZ-900 domain name
  - score (int, not null) — number correct
  - total (int, not null) — total questions in the attempt
  - question_ids (jsonb) — array of question IDs covered
  - answers (jsonb) — detailed answer breakdown
  - created_at (timestamptz, default now())

- `study_progress` — Tracks per-topic readiness and review status.
  - id (uuid, primary key)
  - topic (text, not null, unique) — the AZ-900 domain name
  - attempts (int, default 0) — number of quiz attempts for this topic
  - best_score (int, default 0) — best percentage achieved
  - last_score (int, default 0) — most recent percentage
  - notes_reviewed (boolean, default false) — whether study notes were read
  - updated_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Grant CRUD to anon + authenticated (single-tenant, no sign-in).
- All policies use USING (true) / WITH CHECK (true) because data is intentionally shared/public.
*/

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  score int NOT NULL,
  total int NOT NULL,
  question_ids jsonb DEFAULT '[]'::jsonb,
  answers jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON quiz_attempts TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_select_quiz_attempts" ON quiz_attempts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_insert_quiz_attempts" ON quiz_attempts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_update_quiz_attempts" ON quiz_attempts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_quiz_attempts" ON quiz_attempts;
CREATE POLICY "anon_delete_quiz_attempts" ON quiz_attempts FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS study_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL UNIQUE,
  attempts int NOT NULL DEFAULT 0,
  best_score int NOT NULL DEFAULT 0,
  last_score int NOT NULL DEFAULT 0,
  notes_reviewed boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON study_progress TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_study_progress" ON study_progress;
CREATE POLICY "anon_select_study_progress" ON study_progress FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_study_progress" ON study_progress;
CREATE POLICY "anon_insert_study_progress" ON study_progress FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_study_progress" ON study_progress;
CREATE POLICY "anon_update_study_progress" ON study_progress FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_study_progress" ON study_progress;
CREATE POLICY "anon_delete_study_progress" ON study_progress FOR DELETE
  TO anon, authenticated USING (true);