CREATE TABLE IF NOT EXISTS public.email_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    campaign text NOT NULL,
    company_name text NOT NULL,
    to_email text,
    subject text NOT NULL,
    body_html text NOT NULL,
    urgency text,
    status text NOT NULL DEFAULT 'draft',
    sent_at timestamptz,
    UNIQUE (campaign, company_name)
);

CREATE INDEX IF NOT EXISTS email_templates_campaign_idx ON public.email_templates (campaign);
CREATE INDEX IF NOT EXISTS email_templates_status_idx ON public.email_templates (status);
CREATE INDEX IF NOT EXISTS email_templates_company_name_idx ON public.email_templates (company_name);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.email_templates IS 'Cold email templates per campaign and company';
