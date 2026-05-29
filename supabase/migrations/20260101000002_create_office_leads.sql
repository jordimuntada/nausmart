CREATE TABLE IF NOT EXISTS public.office_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    company_name text NOT NULL UNIQUE,
    website_url text,
    address_city text,
    industry_sector text,
    employee_count text,
    signal_of_need text,
    urgency_score text,
    contact_info text
);

CREATE INDEX IF NOT EXISTS office_leads_created_at_idx ON public.office_leads (created_at);
CREATE INDEX IF NOT EXISTS office_leads_urgency_score_idx ON public.office_leads (urgency_score);

ALTER TABLE public.office_leads ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.office_leads IS 'Office space leads - companies with potential office space needs';
