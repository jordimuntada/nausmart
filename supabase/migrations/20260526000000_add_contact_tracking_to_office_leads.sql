-- Add contact tracking columns to office_leads
ALTER TABLE office_leads
  ADD COLUMN IF NOT EXISTS contacted_at timestamptz,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'contacted', 'responded', 'uninterested'));
