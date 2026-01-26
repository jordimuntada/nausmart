import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import twilio from "https://esm.sh/twilio@4.19.0";

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
    
    if (table !== 'Realbrave-contactforms' || type !== 'INSERT') {
      return new Response(
        JSON.stringify({ message: 'Not a Realbrave-contactforms insert event' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const newData = record;
    
    // Send both notifications
    const emailResult = await sendContactFormEmail(newData);
    const smsResult = await sendContactFormSMS(newData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form notifications sent',
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

async function sendContactFormEmail(data: any) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('FROM_EMAIL') || 'contact@yourdomain.com';
  const toEmail = Deno.env.get('TO_EMAIL') || 'admin@yourdomain.com';

  if (!resendApiKey) {
    return { sent: false, message: 'RESEND_API_KEY not set' };
  }

  try {
    const resend = new Resend(resendApiKey);
    
    const subject = data.subject 
      ? `📬 Contact Form: ${data.subject}`
      : `📬 New Contact Form Submission`;

    const { data: emailData, error } = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: data.email || fromEmail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10B981;">New Contact Form Submission</h2>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0; font-weight: bold;">From:</td>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0;">${data.name || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0;">${data.email || 'Not provided'}</td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0;">${data.phone}</td>
              </tr>
              ` : ''}
              ${data.subject ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0; font-weight: bold;">Subject:</td>
                <td style="padding: 10px; border-bottom: 1px solid #bbf7d0;">${data.subject}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #10B981;">
              <p style="margin: 0; line-height: 1.6;">${data.message || 'No message provided'}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${data.email || toEmail}" 
               style="background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reply to ${data.name || 'Sender'}
            </a>
          </div>
          
          <div style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
            <p>This message was submitted through your RealBrave contact form</p>
            <p>Received at: ${new Date().toLocaleString()}</p>
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

async function sendContactFormSMS(data: any) {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');
  const toNumber = Deno.env.get('ADMIN_PHONE_NUMBER');

  if (!accountSid || !authToken || !fromNumber || !toNumber) {
    return { sent: false, message: 'Twilio credentials not set' };
  }

  try {
    const client = twilio(accountSid, authToken);
    
    // Truncate message for SMS
    const messageText = data.message 
      ? (data.message.length > 100 ? data.message.substring(0, 100) + '...' : data.message)
      : 'No message';
    
    const smsBody = `📞 Contact Form:\nFrom: ${data.name || 'Unknown'}\nEmail: ${data.email || 'N/A'}\nMessage: ${messageText}`;

    const result = await client.messages.create({
      body: smsBody,
      from: fromNumber,
      to: toNumber,
    });

    return { 
      sent: true, 
      message: 'SMS sent successfully',
      sid: result.sid 
    };
  } catch (error) {
    return { sent: false, message: error.message };
  }
}
