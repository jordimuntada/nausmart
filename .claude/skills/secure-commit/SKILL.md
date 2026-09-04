---
name: secure-commit
description: Safely stage, commit, and push git changes with a mandatory secrets/confidential-data check before anything is committed or pushed. Use whenever the user asks to commit and push (or just commit, or just push), or asks to "safely" ship changes, or explicitly invokes /secure-commit.
---

Commit and push changes only after verifying nothing secret, private, or confidential is going in. Follow these steps in order — do not skip the scan step even if the diff looks obviously safe.

## 1. Make sure the safety net is active

Check whether the repo's git hooks are wired up:

```
git config --get core.hooksPath
```

If it doesn't print `.githooks` and the repo has a `.githooks/pre-commit` file, run:

```
git config core.hooksPath .githooks
```

This makes the pre-commit/pre-push scan run automatically for this clone, not just when this skill drives the commit — but don't rely on the hook alone; do the explicit scan below too, since the hook only tells you pass/fail, not what to say to the user.

If the repo has no `.githooks/` directory at all, note that to the user — this skill still works but there is no hook-level enforcement outside of this workflow.

## 2. Decide what's actually in scope

Run `git status` and look at both modified and untracked files. Only stage what the current task actually touched — never `git add -A` / `git add .` blindly. If there are unrelated pending changes already sitting in the working tree (from earlier work, another session, etc.), leave them out of the commit unless the user asked for them specifically. Say what you're excluding and why, briefly.

## 3. Scan before staging anything further

Run the mechanical scanner if present:

```
node .githooks/scan-secrets.js --all
```

(Falls back to just `git diff` / `git status` inspection by eye if the script doesn't exist in this repo.)

Then, for anything the regex pass can't resolve on its own — a JWT-shaped string whose role you need to check, a lead list or data file whose contents you haven't read, a new file type you're unsure should be tracked — dispatch the `secret-guardian` agent (via the Agent tool) to review the actual diff/files in scope. Give it the specific files or `git diff --cached` output, not just "review the repo." Read its findings; don't just relay them unread.

## 4. Stop on anything blocking

If either the scanner or `secret-guardian` reports a real finding (a live credential, a private key, a service-role/admin-level token, PII at volume with no clear reason to be in the repo, a sensitive file about to be tracked):

- **Do not commit.**
- Report the finding to the user plainly: what it is, where, and the fix (env var, `.gitignore`, remove from staging, rotate if it's already been pushed before).
- If it's a quick, unambiguous fix (swap a hardcoded literal for `process.env.X`, matching a pattern already used elsewhere in the repo), make the fix and re-scan rather than just describing it — but only for the literal secret-removal, not unrelated cleanup.
- If the finding is about something **already committed/pushed** in history, say so explicitly and recommend credential rotation — moving it out of the current file does not undo a past push. Rewriting git history (filter-repo/BFG + force-push) is a separate, destructive decision the user must explicitly approve; never do it as part of this flow without asking first.

## 5. Commit

Once clean (or the user has explicitly overridden a warning-level finding), stage exactly the intended files by name and commit with a message describing the *why*, following this repo's existing commit style. Use a heredoc for the message. Do not use `--no-verify` yourself — if the hook blocks something you believe is a false positive, say so to the user and let them decide whether to override it.

## 6. Push

Confirm with the user before pushing unless they already asked for both commit and push in the same request. After pushing, there's no need to re-scan — the pre-push hook (if active) already covers that; just confirm the push succeeded and report the resulting commit range (e.g. `git status -sb` / the `old..new` line from `git push`).

## Notes

- This skill's job is to prevent secrets/confidential data from being committed — it is not a general commit-message linter or a full code review. Keep the scan focused on that.
- Redact any secret value you do end up quoting back to the user (`first6…last4`), even a "leaked" one — don't paste full credentials into the conversation.
