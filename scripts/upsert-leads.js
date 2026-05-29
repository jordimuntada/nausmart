const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || 'https://ofqxvygsjneccemymtws.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function parseCSV(text) {
  const lines = [];
  let current = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        current.push(field.trim());
        field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && i + 1 < text.length && text[i + 1] === '\n') i++;
        if (field.length > 0 || current.length > 0) {
          current.push(field.trim());
          field = '';
          if (current.some(f => f.length > 0)) {
            lines.push(current);
          }
        }
        current = [];
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field.trim());
    if (current.some(f => f.length > 0)) {
      lines.push(current);
    }
  }
  return lines;
}

async function upsertFitnessLeads() {
  const filePath = path.join(__dirname, '..', 'leads', 'fitness_leads_terrassa_valles_canmir_realbrave.csv');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(raw);
  const header = rows[0].map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  const fieldMap = {
    company_name: 'company_name',
    business_type: 'business_type',
    locations_count: 'locations_count',
    cities_present: 'cities_present',
    headquarters_or_main_city: 'headquarters_or_main_city',
    website: 'website',
    linkedin: 'linkedin',
    instagram: 'instagram',
    decision_makers: 'decision_makers',
    emails: 'emails',
    phone_numbers: 'phone_numbers',
    expansion_signals: 'expansion_signals',
    why_they_fit: 'why_they_fit',
    estimated_positioning: 'estimated_positioning',
    lead_score: 'lead_score',
    priority_level: 'priority_level',
    notes: 'notes'
  };

  let inserted = 0, updated = 0;

  for (let i = 1; i < rows.length; i++) {
    const record = {};
    for (let j = 0; j < header.length && j < rows[i].length; j++) {
      const colName = fieldMap[header[j]];
      if (colName) {
        let val = rows[i][j];
        if (colName === 'lead_score') {
          val = val ? parseInt(val, 10) || null : null;
        }
        record[colName] = val || null;
      }
    }
    if (!record.company_name) continue;

    record.updated_at = new Date().toISOString();

    const { data: existing } = await supabase
      .from('fitness_leads')
      .select('id')
      .eq('company_name', record.company_name)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('fitness_leads')
        .update(record)
        .eq('id', existing.id);
      if (!error) updated++;
      else console.error(`Update error for ${record.company_name}:`, error.message);
    } else {
      delete record.updated_at;
      const { error } = await supabase
        .from('fitness_leads')
        .insert(record);
      if (!error) inserted++;
      else console.error(`Insert error for ${record.company_name}:`, error.message);
    }
  }

  console.log(`Fitness leads: ${inserted} inserted, ${updated} updated`);
}

async function upsertOfficeLeads() {
  const files = ['leads-realbrave-oficines.csv', 'leads_final_realbrave_canmir.csv'];
  const fieldMap = {
    company_name: 'company_name',
    website_url: 'website_url',
    current_known_address_city: 'address_city',
    industry_sector: 'industry_sector',
    approx_employee_count: 'employee_count',
    signal_of_potential_office_space_need: 'signal_of_need',
    estimated_urgency_score: 'urgency_score',
    contact_information: 'contact_info'
  };

  let inserted = 0, updated = 0;

  for (const file of files) {
    const filePath = path.join(__dirname, '..', 'leads', file);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const rows = parseCSV(raw);
    const header = rows[0].map(h => h.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/_+$/, ''));

    for (let i = 1; i < rows.length; i++) {
      const record = {};
      for (let j = 0; j < header.length && j < rows[i].length; j++) {
        const colName = fieldMap[header[j]];
        if (colName) {
          record[colName] = rows[i][j].trim() || null;
        }
      }
      if (!record.company_name) continue;

      record.updated_at = new Date().toISOString();

      const { data: existing } = await supabase
        .from('office_leads')
        .select('id')
        .eq('company_name', record.company_name)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('office_leads')
          .update(record)
          .eq('id', existing.id);
        if (!error) updated++;
        else console.error(`Update error for ${record.company_name}:`, error.message);
      } else {
        delete record.updated_at;
        const { error } = await supabase
          .from('office_leads')
          .insert(record);
        if (!error) inserted++;
        else console.error(`Insert error for ${record.company_name}:`, error.message);
      }
    }
  }

  console.log(`Office leads: ${inserted} inserted, ${updated} updated`);
}

async function main() {
  console.log('Starting upsert...\n');
  await upsertFitnessLeads();
  await upsertOfficeLeads();
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
