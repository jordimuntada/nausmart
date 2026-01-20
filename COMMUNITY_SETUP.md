# Community Signup Setup Instructions

This document provides step-by-step instructions to set up the secure community signup flow using Supabase Edge Functions.

## Overview

The community signup system consists of:
- Static HTML landing page (`comunitat.html`)
- CSS styling (`assets/community.css`)
- Client-side JavaScript (`assets/community.js`)
- Supabase Edge Function for secure server-side processing
- Database table for storing lead data

## Prerequisites

- Supabase project set up
- Supabase CLI installed (`npm install -g supabase`)
- Domain/hosting for the static website

## Step 1: Database Setup

### 1.1 Run the Migration

Execute the SQL migration to create the `realbrave` table:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL in Supabase Dashboard
# Copy content from: supabase/migrations/20240119113000_create_realbrave.sql
```

### 1.2 Verify Table Creation

In your Supabase Dashboard:
1. Go to Table Editor
2. Confirm the `realbrave` table exists with all columns
3. Verify RLS is enabled (should show a shield icon)
4. Confirm no public insert policies exist

## Step 2: Edge Function Deployment

### 2.1 Deploy the Edge Function

```bash
# Login to Supabase (if not already logged in)
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the Edge Function
supabase functions deploy community-signup
```

### 2.2 Set Environment Variables

In your Supabase Dashboard, go to Edge Functions > community-signup > Settings:

Set these environment variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (from API settings)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed domains (e.g., `https://yourdomain.com,https://www.yourdomain.com`)

Example:
```
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
ALLOWED_ORIGINS=https://nausmart.com,https://www.nausmart.com
```

### 2.3 Test the Edge Function

```bash
# Test with curl (replace YOUR_PROJECT_REF)
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/community-signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "intent": "Compra",
    "consent": true,
    "weekly_updates": true,
    "source": "community-landing"
  }'
```

Expected response:
```json
{
  "ok": true,
  "lead": {
    "id": "uuid-here",
    "email": "test@example.com",
    "weekly_updates": true
  }
}
```

## Step 3: Frontend Configuration

### 3.1 Update JavaScript Configuration

Edit `assets/community.js` and update the CONFIG object:

```javascript
const CONFIG = {
    EDGE_FUNCTION_URL: 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/community-signup',
    WHATSAPP_INVITE_URL: 'https://chat.whatsapp.com/YOUR_ACTUAL_INVITE_CODE',
    TELEGRAM_INVITE_URL: 'https://t.me/YOUR_ACTUAL_CHANNEL'
};
```

### 3.2 Deploy Static Files

Upload these files to your web hosting:
- `comunitat.html`
- `assets/community.css`
- `assets/community.js`
- `logo-realbrave.svg` (and other assets)

### 3.3 Update Navigation

Add a link to the community page in your main navigation:

```html
<a href="comunitat.html" class="nav-link">Comunitat</a>
```

Or update your existing "Uneix-te a la nostra comunitat" button:

```html
<a href="comunitat.html" class="cta-button">Uneix-te a la nostra comunitat</a>
```

## Step 4: Testing

### 4.1 Test Form Submission

1. Open `comunitat.html` in your browser
2. Fill out the form with test data
3. Submit and verify:
   - Success message appears
   - Data is stored in Supabase `realbrave` table
   - No errors in browser console

### 4.2 Test Validation

Test these scenarios:
- Submit without email (should show error)
- Submit with invalid email format
- Submit without selecting intent
- Submit without consent checkbox
- Submit with budget_min > budget_max

### 4.3 Test UTM Tracking

Visit the page with UTM parameters:
```
https://yourdomain.com/comunitat.html?utm_source=facebook&utm_medium=social&utm_campaign=launch
```

Verify UTM data is captured in the database.

## Step 5: Production Checklist

### 5.1 Security Verification

- [ ] RLS is enabled on `realbrave` table
- [ ] No public insert policies exist
- [ ] Service role key is only in Edge Function environment
- [ ] CORS is configured with specific allowed origins
- [ ] Rate limiting is working (test multiple rapid submissions)

### 5.2 Functionality Verification

- [ ] Form validation works client-side
- [ ] Server-side validation works
- [ ] Email uniqueness is enforced
- [ ] UTM parameters are captured
- [ ] Success state shows correct message
- [ ] WhatsApp/Telegram buttons work (if configured)
- [ ] Weekly updates default to true

### 5.3 Performance Verification

- [ ] Page loads quickly
- [ ] Form submission is responsive
- [ ] CSS is optimized and loads fast
- [ ] JavaScript is minified (optional)

## Troubleshooting

### Common Issues

**Edge Function not responding:**
- Check function deployment status in Supabase Dashboard
- Verify environment variables are set
- Check function logs for errors

**CORS errors:**
- Verify `ALLOWED_ORIGINS` includes your domain
- Check that the origin header matches exactly

**Database insert errors:**
- Verify service role key has correct permissions
- Check RLS policies aren't blocking inserts
- Ensure table schema matches the data being inserted

**Form validation not working:**
- Check browser console for JavaScript errors
- Verify all required files are loaded
- Test with different browsers

### Debug Tools

Use the browser console debug function:
```javascript
// In browser console
debugCommunityForm()
```

This will log current form data, UTM parameters, and configuration.

## Monitoring

### Database Monitoring

Monitor the `realbrave` table for:
- New signups
- Data quality issues
- Duplicate emails

### Edge Function Monitoring

In Supabase Dashboard > Edge Functions:
- Check invocation count
- Monitor error rates
- Review function logs

### Analytics

Consider adding analytics to track:
- Form completion rates
- UTM source effectiveness
- Conversion from landing to signup

## Maintenance

### Regular Tasks

1. **Weekly**: Review new signups and data quality
2. **Monthly**: Check Edge Function performance and costs
3. **Quarterly**: Review and update form fields if needed

### Updates

When updating the system:
1. Test changes in a staging environment
2. Deploy Edge Function updates first
3. Update frontend files
4. Monitor for issues after deployment

## Support

For issues with this implementation:
1. Check Supabase Dashboard logs
2. Review browser console errors
3. Test Edge Function directly with curl
4. Verify environment variables and configuration