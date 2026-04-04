-- Agora Marketplace Initial Schema
-- Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('builder', 'business', 'admin')) DEFAULT 'business',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agents (marketplace listings)
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  framework TEXT NOT NULL,
  verification_tier TEXT NOT NULL CHECK (verification_tier IN ('gold', 'silver', 'bronze', 'unverified')) DEFAULT 'unverified',
  capabilities TEXT[] DEFAULT '{}',
  pricing TEXT,
  builder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating NUMERIC(2,1) DEFAULT 0,
  hire_count INTEGER DEFAULT 0,
  listed BOOLEAN DEFAULT false,
  demo_url TEXT,
  repo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Full-text search
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(framework, '')), 'C')
  ) STORED
);

CREATE INDEX IF NOT EXISTS agents_search_idx ON agents USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS agents_category_idx ON agents (category);
CREATE INDEX IF NOT EXISTS agents_builder_id_idx ON agents (builder_id);

-- Hire requests
CREATE TABLE IF NOT EXISTS hire_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  requester_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  use_case TEXT NOT NULL,
  budget_range TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS hire_requests_agent_id_idx ON hire_requests (agent_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hire_requests ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, owners can update
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Agents: listed agents are public, builders manage their own
CREATE POLICY "Listed agents are viewable by everyone" ON agents FOR SELECT USING (listed = true);
CREATE POLICY "Builders can insert own agents" ON agents FOR INSERT WITH CHECK (auth.uid() = builder_id);
CREATE POLICY "Builders can update own agents" ON agents FOR UPDATE USING (auth.uid() = builder_id);
CREATE POLICY "Builders can delete own agents" ON agents FOR DELETE USING (auth.uid() = builder_id);
CREATE POLICY "Builders can view own unlisted agents" ON agents FOR SELECT USING (auth.uid() = builder_id);

-- Hire requests: agents builders see requests for their agents, requesters see their own
CREATE POLICY "Requesters can view own hire requests" ON hire_requests FOR SELECT USING (auth.uid() = requester_id);
CREATE POLICY "Builders can view hire requests for their agents" ON hire_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM agents WHERE agents.id = hire_requests.agent_id AND agents.builder_id = auth.uid())
);
CREATE POLICY "Anyone can create hire requests" ON hire_requests FOR INSERT WITH CHECK (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Updated-at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER hire_requests_updated_at BEFORE UPDATE ON hire_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
