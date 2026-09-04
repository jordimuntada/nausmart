#!/usr/bin/env node
/**
 * Secret / confidential-data scanner for staged git changes.
 *
 * Scans exactly what is staged (`git show :<file>`), not the working tree,
 * so it can't be fooled by a file that was edited again after `git add`.
 *
 * Exit codes:
 *   0 - clean (or only informational findings)
 *   1 - blocking findings present
 *
 * Usage:
 *   node .githooks/scan-secrets.js            # scan staged files (pre-commit use)
 *   node .githooks/scan-secrets.js --all       # scan all tracked files (audit use)
 */

const { execSync } = require('child_process');

const AUDIT_MODE = process.argv.includes('--all');

// --- filenames that must never be committed, regardless of content ---
const BLOCKED_FILENAME_PATTERNS = [
  /(^|\/)\.env(\..+)?$/i,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /(^|\/)id_rsa(\.\w+)?$/i,
  /(^|\/)id_ed25519(\.\w+)?$/i,
  /service[-_]account.*\.json$/i,
  /credentials\.json$/i,
  /(^|\/)\.pgpass$/i,
];
// Explicit, known-safe exceptions to the filename rules above.
const FILENAME_ALLOWLIST = [/^\.env\.example$/i];

// Extensions we don't bother scanning content of (binary / generated).
const SKIP_CONTENT_EXT = /\.(png|jpe?g|gif|ico|webp|svg|woff2?|ttf|eot|pdf|zip|gz|mp4|mov|avif|lock)$/i;

// --- content patterns: [label, regex, severity] ---
const PATTERNS = [
  ['AWS Access Key ID', /AKIA[0-9A-Z]{16}/g, 'BLOCK'],
  ['AWS Secret Access Key', /(?:aws_secret_access_key|secret_access_key)\s*[:=]\s*['"][A-Za-z0-9/+=]{40}['"]/gi, 'BLOCK'],
  ['Google API Key', /AIza[0-9A-Za-z_-]{35}/g, 'BLOCK'],
  ['Resend API Key', /re_[A-Za-z0-9_]{20,}/g, 'BLOCK'],
  ['GitHub Token', /gh[pousr]_[A-Za-z0-9]{30,}/g, 'BLOCK'],
  ['Slack Token', /xox[baprs]-[A-Za-z0-9-]{10,}/g, 'BLOCK'],
  ['Stripe Live Secret Key', /sk_live_[A-Za-z0-9]{20,}/g, 'BLOCK'],
  ['SendGrid API Key', /SG\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/g, 'BLOCK'],
  ['OpenAI/Generic sk- Key', /\bsk-[A-Za-z0-9]{20,}\b/g, 'BLOCK'],
  ['Anthropic API Key', /sk-ant-[A-Za-z0-9_-]{20,}/g, 'BLOCK'],
  ['Supabase Access/Management Token', /sbp_[a-f0-9]{20,}/g, 'BLOCK'],
  ['Private Key Block', /-----BEGIN (RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/g, 'BLOCK'],
  ['npm registry auth token', /_authToken\s*=\s*\S+/gi, 'BLOCK'],
  ['Generic Bearer Token', /Bearer\s+[A-Za-z0-9\-._~+/]{25,}=*/g, 'WARN'],
  [
    'Generic secret-shaped assignment',
    /(api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*[:=]\s*['"][A-Za-z0-9\-_./+]{12,}['"]/gi,
    'BLOCK',
  ],
  ['JWT (context-checked below)', /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, 'JWT'],
];

// Lines that look like placeholders/templates should never trip a block.
const PLACEHOLDER_HINT = /your[_-]|<[^>]+>|xxx|example|changeme|replace[_-]?me|process\.env|dummy|fake|sample_key|test_key_here/i;

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 });
}

function listFiles() {
  if (AUDIT_MODE) {
    return sh('git ls-files').split('\n').filter(Boolean);
  }
  return sh('git diff --cached --name-only --diff-filter=ACMR').split('\n').filter(Boolean);
}

function getContent(file) {
  try {
    if (AUDIT_MODE) {
      // Audit mode reflects the working tree, so a fix is visible before staging.
      return require('fs').readFileSync(file, 'utf8');
    }
    // Pre-commit must scan exactly what's staged, not the working tree.
    return sh(`git show :"${file}"`);
  } catch {
    return null; // deleted / binary / not readable as text
  }
}

function redact(match) {
  if (match.length <= 12) return '*'.repeat(match.length);
  return match.slice(0, 6) + '…' + match.slice(-4);
}

function decodeJwtRole(token) {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    const obj = JSON.parse(json);
    return obj.role || null;
  } catch {
    return null;
  }
}

function scanFile(file) {
  const findings = [];

  for (const pat of BLOCKED_FILENAME_PATTERNS) {
    if (pat.test(file) && !FILENAME_ALLOWLIST.some((a) => a.test(file.split('/').pop()))) {
      findings.push({ file, line: null, label: 'Sensitive filename staged', severity: 'BLOCK', preview: file });
    }
  }

  if (SKIP_CONTENT_EXT.test(file)) return findings;

  const content = getContent(file);
  if (content == null) return findings;

  const lines = content.split('\n');
  lines.forEach((lineText, idx) => {
    if (PLACEHOLDER_HINT.test(lineText)) return;

    for (const [label, regex, severity] of PATTERNS) {
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(lineText))) {
        if (severity === 'JWT') {
          const role = decodeJwtRole(m[0]);
          if (role === 'service_role') {
            findings.push({
              file, line: idx + 1, label: 'Supabase SERVICE ROLE key (full admin access)',
              severity: 'BLOCK', preview: redact(m[0]),
            });
          } else if (role === 'anon') {
            findings.push({
              file, line: idx + 1, label: 'Supabase anon key (public by design, informational only)',
              severity: 'INFO', preview: redact(m[0]),
            });
          } else {
            findings.push({
              file, line: idx + 1, label: 'JWT-shaped token, unknown role',
              severity: 'WARN', preview: redact(m[0]),
            });
          }
        } else {
          findings.push({ file, line: idx + 1, label, severity, preview: redact(m[0]) });
        }
        if (!regex.global) break;
      }
    }
  });

  return findings;
}

function main() {
  const files = listFiles();
  let all = [];
  for (const f of files) {
    all = all.concat(scanFile(f));
  }

  const blocking = all.filter((f) => f.severity === 'BLOCK');
  const warnings = all.filter((f) => f.severity === 'WARN');
  const info = all.filter((f) => f.severity === 'INFO');

  if (all.length === 0) {
    console.log('scan-secrets: clean — no secret-shaped content in ' + (AUDIT_MODE ? 'tracked files' : 'staged changes') + '.');
    return 0;
  }

  const printGroup = (label, items) => {
    if (!items.length) return;
    console.log(`\n${label}:`);
    for (const it of items) {
      const loc = it.line ? `${it.file}:${it.line}` : it.file;
      console.log(`  [${it.severity}] ${loc} — ${it.label} (${it.preview})`);
    }
  };

  printGroup('BLOCKING', blocking);
  printGroup('WARNINGS (review, non-blocking)', warnings);
  printGroup('INFO', info);

  if (blocking.length) {
    console.log(
      `\n${blocking.length} blocking finding(s). Commit aborted.\n` +
      `Fix by moving the value to an env var (.env is gitignored) or removing the file from staging.\n` +
      `If this is a genuine false positive, re-run with: git commit --no-verify\n`
    );
    return 1;
  }

  console.log('\nNo blocking findings — proceeding.');
  return 0;
}

process.exit(main());
