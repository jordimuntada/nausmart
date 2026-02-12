import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { record, table, type } = await req.json();
    
    if (table !== 'realbrave' || type !== 'INSERT') {
      return new Response(
        JSON.stringify({ message: 'Not a realbrave insert event' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const newData = record;
    
    // Send both notifications
    const emailResult = await sendRealBraveEmail(newData);
    const smsResult = await sendRealBraveSMS(newData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'RealBrave notifications sent',
        email: emailResult,
        sms: smsResult
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function sendRealBraveEmail(data: any) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'notifications@yourdomain.com';
  const toEmail = Deno.env.get('TO_EMAIL') || 'admin@yourdomain.com';

  if (!resendApiKey) {
    return { sent: false, message: 'RESEND_API_KEY not set' };
  }

  try {
    const resend = new Resend(resendApiKey);
    
    const { data: emailData, error } = await resend.emails.send({
      from: `RealBrave Notifications <${fromEmail}>`,
      to: [toEmail],
      subject: `📋 New RealBrave Submission - ${data.name || 'New Entry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New RealBrave Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Submission Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${Object.entries(data)
                .filter(([key]) => key !== 'id' && key !== 'created_at')
                .map(([key, value]) => `
                  <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 30%;">${formatKey(key)}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${value || 'N/A'}</td>
                  </tr>
                `).join('')}
            </table>
          </div>
          <div style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
            <p>This is an automated notification from RealBrave System</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    return { 
      sent: !error, 
      message: error ? error.message : 'Email sent successfully',
      id: emailData?.id 
    };
  } catch (error) {
    return { sent: false, message: error.message };
  }
}

async function sendRealBraveSMS(data: any) {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');
  const toNumber = Deno.env.get('ADMIN_PHONE_NUMBER');

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    return { sent: false, message: 'Twilio credentials not set' };
  }

  try {
    // Extract key information for SMS
    const name = data.name || 'Anonymous';
    const email = data.email ? `Email: ${data.email}` : '';
    const intent = data.intent ? `Intent: ${data.intent}` : '';
    
    const smsBody = `📱 RealBrave Community Signup:\nName: ${name}\n${email}\n${intent}\nTime: ${new Date().toLocaleTimeString()}`;

    // Use Twilio REST API directly (more compatible with Deno)
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const credentials = btoa(`${accountSid}:${authToken}`);
    
    const formData = new URLSearchParams();
    formData.append('To', toNumber);
    formData.append('From', fromNumber);
    formData.append('Body', smsBody);

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (response.ok) {
      return { 
        sent: true, 
        message: 'SMS sent successfully',
        sid: result.sid 
      };
    } else {
      return { 
        sent: false, 
        message: result.message || 'SMS sending failed'
      };
    }
  } catch (error) {
    return { sent: false, message: error.message };
  }
}

function formatKey(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
