-- Add standalone builders table for marketplace listings
-- Decouples builder profiles from auth.users for the MVP
-- Auth-linked profiles remain for authenticated features

CREATE TABLE IF NOT EXISTS builders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE builders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Builders are viewable by everyone" ON builders FOR SELECT USING (true);

CREATE TRIGGER builders_updated_at BEFORE UPDATE ON builders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Drop the old FK on agents.builder_id (references profiles which requires auth.users)
ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_builder_id_fkey;

-- Add new FK to builders table
ALTER TABLE agents ADD CONSTRAINT agents_builder_id_fkey FOREIGN KEY (builder_id) REFERENCES builders(id) ON DELETE CASCADE;
