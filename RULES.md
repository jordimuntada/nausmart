# RULES.md — Nausmart / RealBrave

## Table Access Restriction

**Unless explicitly asked and approved by the user, only work on these 4 Supabase tables:**

1. `public.office_leads` — Office space prospects
2. `public.realbrave` — Community signups
3. `public.fitness_leads` — Fitness chain prospects
4. `public.Realbrave-contactforms` — Contact form submissions

**Do not create, modify, or query any other tables without explicit approval.**

## General Rules

1. **Read AGENTS.md first** — Always read AGENTS.md and this file at the start of each session.
2. **No tests** — Do not create or modify test infrastructure unless explicitly asked.
3. **No CI/CD changes** — Do not modify Vercel deployment config unless asked.
4. **Sensitive files** — Email scripts (`send-*.js`, `test-*.js`) contain API keys. Do not commit, display, or log their contents.
5. **Git discipline** — Only commit, push, or create PRs when explicitly requested. Inspect `git status` and `git diff` before committing. Never force-push.
6. **Environment variables** — Do not expose or commit `.env` values. Environment variables used in Supabase Edge Functions are set in the Supabase Dashboard, not in `.env`.
7. **Edge Functions are Deno** — All functions in `supabase/functions/` use Deno runtime, not Node.js. Use Deno conventions (import maps, `Deno.env`, `serve` from `std/http`).
8. **Client-side auth** — Client-side code uses `SUPABASE_ANON_KEY` with RLS. Server-side / Edge Functions use `SUPABASE_SERVICE_ROLE_KEY` for full access.
9. **No test infrastructure** — This project has no test framework. Do not add one unless asked.
10. **Code style** — Follow existing patterns: snake_case for DB columns, camelCase for JS variables, inline styles and scripts in HTML, Tailwind CSS via CDN.

## Migration Safety

11. **Existing migrations** — Migration files in `supabase/migrations/` are timestamped. Do not modify existing migration files. Create new ones for schema changes.
12. **Table names** — `Realbrave-contactforms` is case-sensitive. Use exact quoting when querying.

## Communication

13. **Be concise** — Answer questions directly without preamble or postamble unless detail is requested.
14. **Confirm before destructive actions** — Ask before deleting, removing, or force-pushing anything.
15. **Reference code** — When referencing code, include file path and line number (e.g., `src/file.ts:42`).
