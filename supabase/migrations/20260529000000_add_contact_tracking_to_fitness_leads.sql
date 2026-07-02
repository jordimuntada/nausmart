-- Add contact tracking columns to fitness_leads

ALTER TABLE public.fitness_leads
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'contacted', 'responded', 'uninterested'));
