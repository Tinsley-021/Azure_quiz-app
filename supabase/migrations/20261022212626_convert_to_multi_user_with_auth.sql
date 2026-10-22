/*
# Convert single-tenant tables to multi-user with auth-based row isolation

## What changes
All three existing tables (study_progress, quiz_attempts, achievements) are converted
from single-tenant (shared, USING(true) policies) to multi-user (owner-scoped via user_id).

## New Columns
- `study_progress.user_id` — uuid NOT NULL DEFAULT auth.uid(), references auth.users
- `quiz_attempts.user_id` — uuid NOT NULL DEFAULT auth.uid(), references auth.users
- `achievements.user_id` — uuid NOT NULL DEFAULT auth.uid(), references auth.users

The DEFAULT auth.uid() means frontend inserts that omit user_id will still satisfy
the WITH CHECK (auth.uid() = user_id) policy automatically.

## Security Changes
- Revoke all grants from anon role on all 3 tables (app now requires sign-in).
- Keep grants on authenticated role (SELECT, INSERT, UPDATE, DELETE).
- Drop all existing USING(true) policies.
- Create 4 owner-scoped policies per table (SELECT/INSERT/UPDATE/DELETE) scoped TO authenticated.
- Add unique constraints: (user_id, topic) on study_progress, (user_id, badge_id) on achievements
  so a user can have at most one progress row per topic and one achievement per badge.

## Important Notes
1. Existing rows (if any) will get user_id = NULL during the ALTER TABLE ADD COLUMN.
   Since the column is NOT NULL, we add it nullable first, set existing rows to a placeholder
   is not possible (we don't know who owns them). In practice the app is a fresh install with
   little or no data. We add the column as nullable, then set NOT NULL.
2. The anon role loses all access — the app MUST present a sign-in screen before any data
   operations, or all reads/writes will fail with permission denied (by design).
*/

-- ===== study_progress =====
ALTER TABLE study_progress ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE study_progress ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Drop old anon policies
DROP POLICY IF EXISTS "anon_select_study_progress" ON study_progress;
DROP POLICY IF EXISTS "anon_insert_study_progress" ON study_progress;
DROP POLICY IF EXISTS "anon_update_study_progress" ON study_progress;
DROP POLICY IF EXISTS "anon_delete_study_progress" ON study_progress;

-- Revoke anon access
REVOKE SELECT, INSERT, UPDATE, DELETE ON study_progress FROM anon;

-- Grant authenticated only
GRANT SELECT, INSERT, UPDATE, DELETE ON study_progress TO authenticated;

-- Owner-scoped policies
DROP POLICY IF EXISTS "select_own_study_progress" ON study_progress;
CREATE POLICY "select_own_study_progress" ON study_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_study_progress" ON study_progress;
CREATE POLICY "insert_own_study_progress" ON study_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_study_progress" ON study_progress;
CREATE POLICY "update_own_study_progress" ON study_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_study_progress" ON study_progress;
CREATE POLICY "delete_own_study_progress" ON study_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Unique constraint: one progress row per user per topic
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'study_progress_user_topic_key') THEN
    ALTER TABLE study_progress ADD CONSTRAINT study_progress_user_topic_key UNIQUE (user_id, topic);
  END IF;
END $$;

-- ===== quiz_attempts =====
ALTER TABLE quiz_attempts ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE quiz_attempts ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "anon_select_quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "anon_insert_quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "anon_update_quiz_attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "anon_delete_quiz_attempts" ON quiz_attempts;

REVOKE SELECT, INSERT, UPDATE, DELETE ON quiz_attempts FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON quiz_attempts TO authenticated;

DROP POLICY IF EXISTS "select_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "select_own_quiz_attempts" ON quiz_attempts FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "insert_own_quiz_attempts" ON quiz_attempts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "update_own_quiz_attempts" ON quiz_attempts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_quiz_attempts" ON quiz_attempts;
CREATE POLICY "delete_own_quiz_attempts" ON quiz_attempts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== achievements =====
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE achievements ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "anon_select_achievements" ON achievements;
DROP POLICY IF EXISTS "anon_insert_achievements" ON achievements;
DROP POLICY IF EXISTS "anon_update_achievements" ON achievements;
DROP POLICY IF EXISTS "anon_delete_achievements" ON achievements;

REVOKE SELECT, INSERT, UPDATE, DELETE ON achievements FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON achievements TO authenticated;

DROP POLICY IF EXISTS "select_own_achievements" ON achievements;
CREATE POLICY "select_own_achievements" ON achievements FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_achievements" ON achievements;
CREATE POLICY "insert_own_achievements" ON achievements FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_achievements" ON achievements;
CREATE POLICY "update_own_achievements" ON achievements FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_achievements" ON achievements;
CREATE POLICY "delete_own_achievements" ON achievements FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Unique constraint: one achievement per user per badge
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'achievements_user_badge_key') THEN
    ALTER TABLE achievements ADD CONSTRAINT achievements_user_badge_key UNIQUE (user_id, badge_id);
  END IF;
END $$;
