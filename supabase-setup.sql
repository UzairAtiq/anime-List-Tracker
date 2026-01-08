-- Create the animes table
CREATE TABLE IF NOT EXISTS animes (
  id BIGSERIAL PRIMARY KEY,
  device_id TEXT NOT NULL,
  name TEXT NOT NULL,
  total_episodes INTEGER DEFAULT 0,
  watched_episodes INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on device_id for faster queries
CREATE INDEX IF NOT EXISTS idx_animes_device_id ON animes(device_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_animes_updated_at ON animes;
CREATE TRIGGER update_animes_updated_at BEFORE UPDATE ON animes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE animes ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DROP POLICY IF EXISTS "Allow all operations for animes" ON animes;
CREATE POLICY "Allow all operations for animes" ON animes
FOR ALL USING (true) WITH CHECK (true);
