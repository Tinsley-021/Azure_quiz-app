/*
# Add achievements table for badge tracking (single-tenant, no auth)

1. New Tables
- `achievements` — Records unlocked achievements/badges.
  - id (uuid, primary key)
  - badge_id (text, not null, unique) — identifier for the badge type
  - unlocked_at (timestamptz, default now())

2. Security
- Enable RLS on achievements.
- Grant CRUD to anon + authenticated (single-tenant, no sign-in).
- All policies use USING (true) / WITH CHECK (true) because data is intentionally shared/public.
*/

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_id text NOT NULL UNIQUE,
  unlocked_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON achievements TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_achievements" ON achievements;
CREATE POLICY "anon_select_achievements" ON achievements FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_achievements" ON achievements;
CREATE POLICY "anon_insert_achievements" ON achievements FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_achievements" ON achievements;
CREATE POLICY "anon_update_achievements" ON achievements FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_achievements" ON achievements;
CREATE POLICY "anon_delete_achievements" ON achievements FOR DELETE
  TO anon, authenticated USING (true);