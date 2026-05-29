CREATE TABLE IF NOT EXISTS public.fitness_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    company_name text NOT NULL UNIQUE,
    business_type text,
    locations_count text,
    cities_present text,
    headquarters_or_main_city text,
    website text,
    linkedin text,
    instagram text,
    decision_makers text,
    emails text,
    phone_numbers text,
    expansion_signals text,
    why_they_fit text,
    estimated_positioning text,
    lead_score integer,
    priority_level text,
    notes text
);

CREATE INDEX IF NOT EXISTS fitness_leads_created_at_idx ON public.fitness_leads (created_at);
CREATE INDEX IF NOT EXISTS fitness_leads_lead_score_idx ON public.fitness_leads (lead_score);

ALTER TABLE public.fitness_leads ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.fitness_leads IS 'Fitness/gym chain leads for commercial real estate opportunities';
