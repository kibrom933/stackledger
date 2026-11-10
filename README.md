# Stackledger

Independent, Europe-based reviews of AI tools for freelancers and small teams, run as an
affiliate business with Claude as the operating engine and a human approving what matters.

Read [docs/strategy.md](docs/strategy.md) for the niche research, brand, finances and launch plan,
and [docs/operations.md](docs/operations.md) for how the system runs day to day.

## Layout

| Path | What |
|---|---|
| `web/` | Next.js 15 site (TypeScript, Tailwind 4): guides, search, categories, newsletter, legal pages, `/go/` click redirect, `/admin` dashboard |
| `content/guides/` | Articles as Markdown with validated frontmatter (`status: draft / review / published`) |
| `data/partners.json` | Affiliate partner database (status, commission with source, cookie, restrictions, tracking template) |
| `data/products.json` | Products/plans with sourced facts and dated prices |
| `supabase/migrations/` | Database schema (clicks, subscribers, commissions, expenses, opportunities, content queue, approvals, job runs, search performance) |
| `engine/` | Python CLI `stackledger`: qa, opportunities, draft, social, import-commissions, weekly-report, finance, partners |
| `.github/workflows/` | CI (lint, build, tests, content QA) and scheduled weekly report |

## Run it

```bash
# website
cd web && cp .env.example .env.local && npm install && npm run dev   # http://localhost:3000

# engine
cd engine && python3 -m venv .venv && .venv/bin/pip install -e '.[dev]'
.venv/bin/pytest -q
.venv/bin/stackledger qa          # content quality gate
.venv/bin/stackledger finance     # scenario model
.venv/bin/stackledger partners    # partner status, flags unverified figures
```

Drafts and pages in `review` are visible in development and hidden in production unless `SHOW_DRAFTS=1`.
`/admin` is disabled until `ADMIN_PASSWORD` is set. Supabase, Resend and Plausible are optional: without
them the site still builds and runs, and the newsletter answers "opens soon".

## Rules the code enforces

- An affiliate link exists only when the partner is `approved` and has a `trackingTemplate`. Otherwise links go to the plain vendor page with no label.
- Every commissioned button carries a visible "Reklamelink" label and `rel="sponsored"`; pages with such links show a disclosure box first.
- The QA gate blocks invented first-hand experience, risky claims, `[KILDE MANGLER]` markers, missing sources, thin pages and raw affiliate links.
- No cookies are set by the site. Click logs hold no personal data.
