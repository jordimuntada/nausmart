-- Create the realbrave table for community signups
CREATE TABLE IF NOT EXISTS public.realbrave (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    email text NOT NULL UNIQUE,
    name text,
    intent text NOT NULL,
    zones text[] NOT NULL DEFAULT '{}',
    budget_min integer,
    budget_max integer,
    property_types text[] NOT NULL DEFAULT '{}',
    consent boolean NOT NULL,
    weekly_updates boolean NOT NULL DEFAULT true,
    joined_whatsapp boolean NOT NULL DEFAULT false,
    joined_telegram boolean NOT NULL DEFAULT false,
    status text NOT NULL DEFAULT 'active',
    source text,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_term text,
    utm_content text,
    internal_notes text
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS realbrave_created_at_idx ON public.realbrave (created_at);
CREATE INDEX IF NOT EXISTS realbrave_status_idx ON public.realbrave (status);
CREATE INDEX IF NOT EXISTS realbrave_intent_idx ON public.realbrave (intent);

-- Enable Row Level Security
ALTER TABLE public.realbrave ENABLE ROW LEVEL SECURITY;

-- No public insert policy - all inserts must go through Edge Function with service role key
-- This ensures security by preventing direct client-side inserts

-- Add constraints for data integrity
ALTER TABLE public.realbrave ADD CONSTRAINT realbrave_intent_check 
    CHECK (intent IN ('Compra', 'Lloguer', 'Inversió'));

ALTER TABLE public.realbrave ADD CONSTRAINT realbrave_status_check 
    CHECK (status IN ('active', 'inactive', 'unsubscribed'));

ALTER TABLE public.realbrave ADD CONSTRAINT realbrave_budget_check 
    CHECK (budget_min IS NULL OR budget_max IS NULL OR budget_min <= budget_max);

-- Add comment for documentation
COMMENT ON TABLE public.realbrave IS 'Community signup leads with preferences and tracking data';