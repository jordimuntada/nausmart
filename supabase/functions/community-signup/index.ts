import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Rate limiting storage (in-memory for simplicity)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per minute per IP

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigins = Deno.env.get('ALLOWED_ORIGINS')?.split(',') || [];
  
  if (origin && allowedOrigins.includes(origin)) {
    return {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin,
    };
  }
  
  return corsHeaders;
}

function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Clean old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePayload(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email és obligatori');
  } else if (!validateEmail(data.email)) {
    errors.push('Format d\'email no vàlid');
  }
  
  if (!data.intent || typeof data.intent !== 'string') {
    errors.push('Què busques és obligatori');
  } else if (!['Compra', 'Lloguer', 'Inversió'].includes(data.intent)) {
    errors.push('Opció no vàlida per a què busques');
  }
  
  if (typeof data.consent !== 'boolean' || !data.consent) {
    errors.push('Has d\'acceptar rebre comunicacions');
  }
  
  // Optional field validations
  if (data.name && typeof data.name !== 'string') {
    errors.push('Nom ha de ser text');
  }
  
  if (data.zones && !Array.isArray(data.zones)) {
    errors.push('Zones han de ser una llista');
  }
  
  if (data.property_types && !Array.isArray(data.property_types)) {
    errors.push('Tipus d\'immoble han de ser una llista');
  }
  
  if (data.budget_min && (typeof data.budget_min !== 'number' || data.budget_min < 0)) {
    errors.push('Pressupost mínim ha de ser un número positiu');
  }
  
  if (data.budget_max && (typeof data.budget_max !== 'number' || data.budget_max < 0)) {
    errors.push('Pressupost màxim ha de ser un número positiu');
  }
  
  if (data.budget_min && data.budget_max && data.budget_min > data.budget_max) {
    errors.push('Pressupost mínim no pot ser superior al màxim');
  }
  
  return { isValid: errors.length === 0, errors };
}

async function enqueueWeeklyWelcomeEmail(lead: any): Promise<void> {
  // Stub function for weekly welcome email
  console.log(`[EMAIL STUB] Enqueuing weekly welcome email for ${lead.email}`);
  console.log(`[EMAIL STUB] Weekly updates enabled: ${lead.weekly_updates}`);
  // In a real implementation, this would integrate with an email service
}

serve(async (req) => {
  const origin = req.headers.get('Origin');
  const corsResponseHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsResponseHeaders,
    });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ ok: false, message: 'Mètode no permès' }),
      {
        status: 405,
        headers: { ...corsResponseHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
  
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ ok: false, message: 'Massa peticions. Prova-ho més tard.' }),
        {
          status: 429,
          headers: { ...corsResponseHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Parse request body
    const data = await req.json();
    
    // Validate payload
    const validation = validatePayload(data);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ ok: false, message: validation.errors.join(', ') }),
        {
          status: 400,
          headers: { ...corsResponseHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Prepare data for insertion
    const leadData = {
      email: data.email.toLowerCase().trim(),
      name: data.name || null,
      intent: data.intent,
      zones: data.zones || [],
      budget_min: data.budget_min || null,
      budget_max: data.budget_max || null,
      property_types: data.property_types || [],
      consent: data.consent,
      weekly_updates: data.weekly_updates !== undefined ? data.weekly_updates : true,
      source: 'community-landing',
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
    };
    
    // Try to insert or update (upsert)
    const { data: existingLead, error: selectError } = await supabase
      .from('realbrave')
      .select('id, internal_notes')
      .eq('email', leadData.email)
      .single();
    
    let result;
    
    if (existingLead) {
      // Update existing lead, preserving internal_notes
      const updateData = {
        ...leadData,
        internal_notes: existingLead.internal_notes, // Preserve existing notes
      };
      
      const { data: updatedLead, error: updateError } = await supabase
        .from('realbrave')
        .update(updateData)
        .eq('id', existingLead.id)
        .select('id, email, weekly_updates')
        .single();
      
      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error('Error actualitzant les preferències');
      }
      
      result = updatedLead;
    } else {
      // Insert new lead
      const { data: newLead, error: insertError } = await supabase
        .from('realbrave')
        .insert(leadData)
        .select('id, email, weekly_updates')
        .single();
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error('Error creant el registre');
      }
      
      result = newLead;
    }
    
    // Send welcome email if weekly updates are enabled
    if (result.weekly_updates) {
      await enqueueWeeklyWelcomeEmail(result);
    }
    
    return new Response(
      JSON.stringify({
        ok: true,
        lead: {
          id: result.id,
          email: result.email,
          weekly_updates: result.weekly_updates,
        },
      }),
      {
        status: 200,
        headers: { ...corsResponseHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({
        ok: false,
        message: error.message || 'Error intern del servidor',
      }),
      {
        status: 500,
        headers: { ...corsResponseHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});