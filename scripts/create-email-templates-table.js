const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ofqxvygsjneccemymtws.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE;

const sql = [
  'CREATE TABLE IF NOT EXISTS public.email_templates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), campaign text NOT NULL, company_name text NOT NULL, to_email text, subject text NOT NULL, body_html text NOT NULL, urgency text, status text NOT NULL DEFAULT \'draft\', sent_at timestamptz, UNIQUE (campaign, company_name))',
  'CREATE INDEX IF NOT EXISTS email_templates_campaign_idx ON public.email_templates (campaign)',
  'CREATE INDEX IF NOT EXISTS email_templates_status_idx ON public.email_templates (status)',
  'CREATE INDEX IF NOT EXISTS email_templates_company_name_idx ON public.email_templates (company_name)',
  'ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY',
];

async function run() {
  for (const statement of sql) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
      },
      body: JSON.stringify({ sql: statement }),
    });
    const body = await res.text();
    if (!res.ok && !body.includes('already exists')) {
      console.log(`Statement failed (${res.status}): ${body.slice(0, 200)}`);
    }
  }

  // Verify table now exists
  const sb = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data, error } = await sb.from('email_templates').select('id').limit(1);
  if (error) {
    console.log('Table still not found:', error.message);
    console.log('The exec_sql RPC function may not exist. Run the migration manually in Supabase SQL editor.');
    process.exit(1);
  } else {
    console.log('Table email_templates is ready.');
  }
}

run().catch(err => { console.error(err); process.exit(1); });
