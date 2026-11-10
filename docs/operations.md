# Operating Driftig

## Content lifecycle (git is the approval ledger)

1. `driftig opportunities keywords.csv --save` scores topics from a keyword export or Search Console (volumes are never guessed).
2. Write source notes for the topic: official sources, vendor pages, and our own trial-account test notes with screenshots in `web/public/screens/`.
3. `driftig draft "best ai meeting notetaker for eu teams" --category meetings --kind comparison --notes notes.md --products fireflies-pro ...` writes `content/guides/<slug>.md` with `status: draft` and runs QA.
4. Fix everything QA reports and every `open_questions` item. Set `status: review` and open a pull request. CI runs the gate again.
5. A human reads the page and sources, sets `status: published`, adds `hands_on: true` only if we really tested, and merges. Merge = deploy.
6. `driftig social <slug>` makes LinkedIn, Pinterest and video drafts for the published guide (`content/social/`). Post only through official APIs or approved schedulers.

Routine content types can be promoted to autopublish later by recording an `approvals` row of kind `channel_autopublish`; until then every page needs a human merge.

## Partners

- Research a program, fill `data/partners.json` with the source URL and `verified` flag. Never copy rates from memory.
- Applying, accepting terms and entering payment details is done by the owner. After approval set `applicationStatus: "approved"`, `approvedChannels`, and `trackingTemplate` (with `{url}` placeholder; add a sub-id `<page>~<channel>` where the network supports it so commissions map to pages).

## Money

- Export commission CSVs from PartnerStack, Rewardful or FirstPromoter and run `driftig import-commissions <network> file.csv --usd-dkk <rate>`. Pending, confirmed, rejected and paid are kept apart; the dashboard counts only confirmed + paid as earnings.
- Record costs in the `expenses` table (hosting, software, AI API, domain, legal).

## Scheduled work

- Weekly report: GitHub Actions, Mondays 05:00 UTC (`.github/workflows/scheduled.yml`), needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets.
- Data purge: enable `pg_cron` in Supabase and schedule `select purge_old_data();` daily.

## Launch checklist (needs the owner)

- [ ] Domain registered and pointed at the host
- [ ] Company name, CVR and address in env vars; legal pages reviewed
- [ ] Supabase project in an EU region; migration applied
- [ ] Plausible site, Resend domain (SPF/DKIM), sender address
- [ ] `ADMIN_PASSWORD` set; Search Console verified; sitemap submitted
- [ ] Disclosure wording checked against FTC and Forbrugerombudsmanden guidance
