# AGENTS.md — Nausmart / RealBrave

## Project Overview

RealBrave (brand) / Can Mir Gestions (company) is a real estate development project for premium office spaces in Terrassa (Barcelona, Spain). The project includes a marketing website, lead generation system, community signup, and email/SMS notification workflows.

## Tech Stack

- **Frontend**: Static HTML + Tailwind CSS v3 (CDN), Next.js 14 (minimal shell)
- **Language**: TypeScript, JavaScript (client-side)
- **Database**: Supabase (PostgreSQL 15.8) — project ref `ofqxvygsjneccemymtws`
- **Email**: Resend (Node.js SDK + Edge Functions)
- **SMS**: Twilio (called from Supabase Edge Functions)
- **Booking**: Cal.com (embedded), Typeform (pre-qualification)
- **Analytics**: Google Analytics (G-YDM8TFYBP4), Google Ads (AW-16640594479), GTM (GTM-WBML7DR9)
- **Deployment**: Vercel (static site hosting)

## Key Environment Variables

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | `https://ofqxvygsjneccemymtws.supabase.co` |
| `SUPABASE_ANON_KEY` | Client-side access (limited by RLS) |
| `SUPABASE_SERVICE_ROLE` / `SUPABASE_SERVICE_ROLE_KEY` | Server-side, full access |
| `RESEND_API_KEY` | Resend email service |
| `WHATSAPP_PHONE` (+ locale variants) | WhatsApp business numbers |

## Database — Allowed Tables

**IMPORTANT: Unless explicitly asked and approved, only work on the following 4 tables:**

### 1. `public.office_leads`
Lead data for office space prospects.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid PK` | `gen_random_uuid()` |
| `created_at` | `timestamptz` | `now()` |
| `updated_at` | `timestamptz` | `now()` |
| `company_name` | `text NOT NULL UNIQUE` | Company identifier |
| `website_url` | `text` | Company website |
| `address_city` | `text` | Current address/city |
| `industry_sector` | `text` | Industry classification |
| `employee_count` | `text` | Approx employee count |
| `signal_of_need` | `text` | Signal of office space need |
| `urgency_score` | `text` | Urgency assessment |
| `contact_info` | `text` | Contact details |

### 2. `public.realbrave`
User signups for real estate opportunities.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid PK` | `gen_random_uuid()` |
| `created_at` | `timestamptz` | `now()` |
| `email` | `text NOT NULL UNIQUE` | User email |
| `name` | `text` | User name |
| `intent` | `text NOT NULL` | CHECK: `Compra|Lloguer|Inversió` |
| `zones` | `text[] NOT NULL` | Array of zones |
| `budget_min` | `integer` | Minimum budget |
| `budget_max` | `integer` | Max budget, CHECK `min <= max` |
| `property_types` | `text[] NOT NULL` | Property types |
| `consent` | `boolean NOT NULL` | GDPR consent |
| `weekly_updates` | `boolean NOT NULL DEFAULT true` | |
| `joined_whatsapp` | `boolean NOT NULL DEFAULT false` | |
| `joined_telegram` | `boolean NOT NULL DEFAULT false` | |
| `status` | `text NOT NULL DEFAULT 'active'` | CHECK: `active|inactive|unsubscribed` |
| `source` | `text` | Traffic source |
| `utm_source/medium/campaign/term/content` | `text` | UTM tracking |
| `internal_notes` | `text` | Admin notes |

### 3. `public.fitness_leads`
Lead data for fitness chain prospects.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid PK` | `gen_random_uuid()` |
| `created_at` | `timestamptz` | `now()` |
| `updated_at` | `timestamptz` | `now()` |
| `company_name` | `text NOT NULL UNIQUE` | |
| `business_type` | `text` | |
| `locations_count` | `text` | |
| `cities_present` | `text` | |
| `headquarters_or_main_city` | `text` | |
| `website` | `text` | |
| `linkedin` | `text` | |
| `instagram` | `text` | |
| `decision_makers` | `text` | |
| `emails` | `text` | |
| `phone_numbers` | `text` | |
| `expansion_signals` | `text` | |
| `why_they_fit` | `text` | |
| `estimated_positioning` | `text` | |
| `lead_score` | `integer` | (0-100) |
| `priority_level` | `text` | |
| `notes` | `text` | |

### 4. `public.Realbrave-contactforms` (case-sensitive name)
Contact form submissions from the website.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid PK` | `gen_random_uuid()` |
| `created_at` | `timestamptz` | `now()` |
| `full_name` | `text` | |
| `email` | `text` | |
| `phone` | `text` | |
| `company` | `text` | |
| `space_type` | `text` | |
| `budget` | `text` | |
| `message` | `text` | |
| `privacy_consent` | `boolean` | |
| `newsletter_subscription` | `boolean` | |
| `source` | `text` | `'contact_form'` |

## Supabase Edge Functions

| Function | Trigger / Route | Purpose |
|---|---|---|
| `notify-realbrave` | DB trigger on `realbrave` INSERT | Email + SMS notification |
| `notify-contactforms` | DB trigger on `Realbrave-contactforms` INSERT | Email + SMS notification |
| `community-signup` | HTTP endpoint | Secure community signup with rate limiting |

## Project Structure

```
├── app/                     # Next.js app router (minimal)
├── assets/                  # Community signup CSS/JS
├── leads/                   # CSV files + email templates
│   └── emails/              # 24 outreach email templates
├── scripts/                 # DB upsert scripts
├── supabase/
│   ├── config.toml
│   ├── functions/           # Edge Functions (Deno)
│   └── migrations/          # SQL migrations
├── *.html                   # Static website pages
├── *.js                     # Email sending scripts (gitignored)
├── config.js                # WhatsApp configuration
├── opencode.jsonc           # OpenCode MCP config
└── .env                     # Environment variables (gitignored)
```

## Code Conventions

- snake_case for DB columns, camelCase for JS variables
- Static HTML with inline `<style>` and `<script>` tags
- Error handling: try-catch with user-facing messages in CAT, ES, EN
- Tailwind CSS via CDN for styling
- Feather Icons via CDN
- Supabase JS SDK for client DB access (anon key)
- Edge Functions for secure operations (service role key)

## Agent Instructions

1. **Always read AGENTS.md and RULES.md at the start of each session.**
2. No tests exist in this project — do not create test infrastructure unless asked.
3. No CI/CD config beyond Vercel — do not modify deployment unless asked.
4. Email scripts contain API keys and are gitignored — treat them as sensitive.
5. Supabase MCP tools (opencode.jsonc) are available for DB queries.
6. Resend MCP tools are available for email operations.
7. Migration files are in `supabase/migrations/`.
8. Edge Functions are Deno-based, not Node.js — use Deno conventions.
