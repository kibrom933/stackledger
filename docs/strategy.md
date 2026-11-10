# Driftig: strategy and first execution report

*Prepared 10 November 2026. Every commission figure below is marked **verified** (read on the vendor's or network's own page that day) or **unverified** (third-party or not found). Search volumes were NOT measured: no keyword tool is connected yet. Scores are qualitative judgements, not data.*

## 0. Environment audit

| Area | Finding |
|---|---|
| Build machine (cloud) | Linux, 4 CPU, 15 GB RAM. Node 22, npm/pnpm/yarn/bun, Python 3.13, git, Docker, psql, headless Chromium. Everything needed to build and test is present. |
| Your computer | Windows PC linked. No folder is shared with this project. I saw folder names (`pawsport`, `zoonex2.0`) but did not open them, and nothing on your computer was changed. |
| Connected services | Supabase, Netlify, Resend, Sentry, Stripe, Gmail and Claude Docs connectors are available. None was used to create anything. |
| Missing | No GitHub repository attached, no domain, no affiliate accounts, no keyword-volume tool, no Claude API key for the engine, no Search Console. |
| Network | Outbound HTTPS works through a proxy; DNS lookups are blocked, so **domain availability could not be checked**. |

## 1. Fifteen niche opportunities

Scores 1-5 (5 = best). Competition: 5 = easiest. Weighted total = commercial 30%, competition 25%, monetisation 30%, automation feasibility 15%.

| # | Niche | Commercial | Competition | Monetisation | Automation | Total | Note |
|---|---|---|---|---|---|---|---|
| 1 | Software for Danish freelancers and small businesses (Danish language) | 4 | 4 | 5 | 4 | **4.30** | Recurring/flat SaaS payouts, regulatory demand driver (digital bookkeeping), hands-on testing via free trials |
| 2 | AI tools for freelancers and SMBs (English, global) | 5 | 1 | 5 | 4 | 3.85 | Best payouts, brutal competition, Google updates hit this hardest |
| 3 | Web hosting and website/webshop builders | 4 | 1 | 5 | 4 | 3.55 | Folded into #1 as a category |
| 4 | Personal finance: loans, cards, insurance (DK) | 5 | 1 | 5 | 1 | 3.40 | **Excluded**: heavily regulated credit marketing, YMYL, big incumbents |
| 5 | Productivity and business software (English, global) | 4 | 1 | 4 | 4 | 3.25 | Same issue as #2 |
| 6 | Home energy: heat pumps, solar, electricity deals (DK) | 4 | 2 | 4 | 2 | 3.20 | Lead fees likely high (unverified); technical and price-volatile |
| 7 | Responsible pet ownership (Nordics) | 4 | 3 | 2 | 4 | 3.15 | Great for social; retail commissions are low (zooplus "up to 3%", unverified for DK) |
| 8 | Personal organisation and online learning | 3 | 3 | 3 | 4 | 3.15 | Fragmented programs |
| 9 | E-bikes and urban mobility (DK) | 3 | 3 | 3 | 2 | 2.85 | High order value, needs physical testing |
| 10 | Consumer electronics (DK) | 5 | 1 | 2 | 3 | 2.80 | Price-comparison giants dominate |
| 11 | Travel equipment (Nordics) | 3 | 3 | 2 | 3 | 2.70 | Seasonal, low commissions |
| 12 | Outdoor and hiking gear (Nordics) | 3 | 3 | 2 | 3 | 2.70 | Needs real field testing |
| 13 | Family and baby products (DK) | 4 | 2 | 2 | 2 | 2.60 | Safety-sensitive claims |
| 14 | Home and lifestyle (DK) | 3 | 2 | 2 | 3 | 2.45 | Image-heavy, licensing issues |
| 15 | Home fitness and sports nutrition | 3 | 2 | 2 | 3 | 2.45 | Supplement claims are a legal minefield |

## 2. Ranked comparison and the three finalists

**The decisive number is revenue per 1,000 visitors (RPM).** A pet-food guide earning "up to 3%" of a ~400 kr. basket makes roughly 10-15 kr. per sale. A software referral pays 50 kr. for a free sign-up (Dinero, verified) or 20% of a customer's first-year spend (Pipedrive, verified). Under the same traffic assumptions the software site earns several times more per visitor (see section 8).

1. **Danish small-business software (primary).** Danish-language search results are far less crowded than English ones, the audience has a real deadline (digital bookkeeping for sole proprietors over 300,000 kr. turnover, from financial years starting 1 January 2026, per PwC), and we can genuinely test software with our own trial accounts and screenshots, which is exactly what Google rewards and what fake-review sites cannot do.
2. **AI tools for small businesses, in English.** Natural phase-two expansion of the same audience and content engine once Danish pages prove what converts. Not first, because new English affiliate sites in this space are being hit hardest by core updates (a third-party report claims 71% of affiliate sites dropped in the March 2026 update; unverified).
3. **Responsible pet ownership in the Nordics.** The best consumer option: big emotional demand, excellent for Pinterest/Instagram/YouTube, Nordic programs exist (zooplus DK on Awin, VetZoo and FirstVet on Adtraction, Petpower DK on Daisycon). Loses on commission size.

## 3. Three affiliate business models

| Model | How it earns | Strength | Weakness |
|---|---|---|---|
| A. Comparison authority site | SEO guides, hands-on reviews, comparisons with labelled reklamelinks | Compounding organic traffic, high purchase intent | 4-9 months before search traffic is meaningful |
| B. Newsletter and LinkedIn first | Monthly newsletter ("deadlines + price changes") and LinkedIn posts, affiliate links in context | Owned audience, independent of Google | Slower list growth, needs consistency |
| C. Free tools and calculators | "Am I covered by digital bookkeeping?" checker, VAT and price calculators, plan comparers | Earns links and repeat visits, easy to automate | Needs development time per tool |

**Recommendation: A + C, with B as the distribution channel.** The site is built for A now; tools (C) are the first feature to add in month 2.

## 4. Final niche recommendation

**Software for freelancers and small businesses in Denmark**, starting with accounting/bookkeeping, invoicing, CRM, webshop platforms and AI tools. Expand to Sweden and Norway later (same SMB software programs are often Nordic; the brand name works in all three languages).

Why it wins: highest verified payouts per referral, a regulatory demand driver with a date on it, lower competition in Danish, genuine hands-on testing is cheap (free trials), and B2B buyers reward careful, trustworthy comparisons over hype.

Main risks: some key Danish vendors (Billy, e-conomic) have no affiliate program we could find; we will cover them fairly anyway, which is good for trust but means some recommended options earn nothing. Partner-ads bans PPC, Facebook ads and coupon sites for Dinero, so growth must be organic.

## 5. Brand concept

- **Name: Driftig.** Danish, Swedish and Norwegian for "enterprising, hard-working". Says who the reader is, not what we sell, and travels across the Nordics.
- **Promise:** "Vælg software, der passer til din virksomhed. Ikke til vores provision."
- **Positioning:** the calm, independent second opinion for people who run a business alone or with a few colleagues. We test with our own accounts, show dated prices, and say plainly when we earn commission.
- **Voice:** practical, friendly, no buzzwords, no urgency tricks. Rules explained with sources; "ask your accountant" when it matters.
- **Visual identity:** warm paper background, deep forest green, ochre accent; Fraunces serif headings with Inter body text; a simple "D" monogram. Light and dark mode.
- **Domain strategy:** driftig.dk first (availability **not checked**: DNS is blocked here), with driftig.se / driftig.no reserved later only if Nordic expansion is justified. Fallbacks if taken: driftigt.dk, driftig-guide.dk. Registering costs money, so it needs your approval.

## 6. Technical architecture

| Layer | Choice | Why |
|---|---|---|
| Website | Next.js 15 (App Router), TypeScript, Tailwind CSS 4 | Static pages for speed and SEO, server routes for clicks/newsletter |
| Content | Markdown files in git with validated frontmatter | Every change is reviewable; git history is the approval record |
| Partners and products | `data/partners.json`, `data/products.json` in git | Tracking links can only exist after a partner approves us |
| Database | Supabase Postgres (EU region), RLS on, server-only access | Clicks, newsletter, commissions, expenses, content queue, approvals, job logs |
| Outbound links | `/go/<product>` redirect, anonymous click log, `rel="sponsored"`, visible "Reklamelink" label | Attribution without personal data |
| Analytics | Plausible (cookieless) | No cookie banner needed; GDPR-friendly |
| Email | Resend, double opt-in, one-click unsubscribe that deletes the address | Consent evidence stored; data minimisation |
| Engine | Python 3.11+: opportunity scoring, Claude drafting, QA gate, social drafts, commission import, weekly report, finance model | Runs locally or on a schedule |
| AI | Claude API (`claude-opus-5-5`), structured outputs, prompt caching | Drafts only; humans approve |
| Hosting | Vercel (Pro plan for commercial use, to be confirmed) or Netlify | Git-based deploys and preview URLs |
| Scheduling | GitHub Actions cron | Free for this volume, logs every run |
| Monitoring | Sentry (connector available) + `job_runs` table | Errors and failed jobs show up in the weekly report |

## 7. Automation map

| Job | Schedule | What Claude does alone | Needs your approval |
|---|---|---|---|
| Opportunity research | Weekly | Score keyword exports and Search Console queries, propose topics | Buying a keyword tool |
| Product/price refresh | Weekly | Re-check plans and prices on vendor pages (no scraping against terms), flag changes | None for factual updates |
| Drafting | On demand / weekly | Write drafts from sources and our own test notes | Publishing new types of content |
| Quality gate | Every draft and every PR | Block invented experience, risky claims, missing sources, raw affiliate links, thin pages | None |
| Publishing | On merge | Deploy approved pages | Each new page until a content type is approved for autopublish |
| Social drafts | After publish | LinkedIn, Pinterest, Reels/Shorts scripts, newsletter blurb | Each channel before autopublish |
| Commission import | Weekly | Import network CSVs/APIs; separate pending, confirmed, paid | None |
| Weekly report | Mondays | Money by page/partner/channel, refresh candidates, open approvals, failed jobs | None |
| Optimisation | Monthly | Recommend refreshes, removals, new comparisons based on earnings | Major site/brand changes, paid ads |
| Data hygiene | Daily | Delete unconfirmed sign-ups after 30 days, clicks after 24 months | None |
| Partnerships | When a gap appears | Research programs and prepare applications | Every application and contract |

## 8. Financial model

All inputs are **assumptions** until the dashboard has real data. Revenue = sessions x click-through to vendor x conversion per click x average payout x approval rate. Cash arrives two months after it is earned. Your own time is not costed.

| Scenario | Sessions at month 12 | Click-through | Conversion per click | Avg payout | Approval |
|---|---|---|---|---|---|
| Conservative | 2,000 | 6% | 4% | 150 kr | 80% |
| Expected | 8,000 | 10% | 5% | 200 kr | 85% |
| Ambitious | 25,000 | 12% | 6% | 250 kr | 90% |

| Scenario | RPM (kr per 1,000 sessions) | Earned month 12 | Earned month 24 | Monthly costs | Operating break-even | Cash payback |
|---|---|---|---|---|---|---|
| Conservative | 288 | 576 kr | 1,440 kr | 390 kr | month 12 | month 22 |
| Expected | 850 | 6,800 kr | 17,000 kr | 863 kr | month 7 | month 12 |
| Ambitious | 1,620 | 40,500 kr | 97,200 kr | 1,508 kr | month 5 | month 8 |

Monthly sessions needed for a revenue target:

| Target per month | Conservative | Expected | Ambitious |
|---|---|---|---|
| 5,000 kr | 17,361 | 5,882 | 3,086 |
| 10,000 kr | 34,722 | 11,765 | 6,173 |
| 25,000 kr | 86,806 | 29,412 | 15,432 |
| 50,000 kr | 173,611 | 58,824 | 30,864 |

Costs used: hosting ~150 kr/month, analytics ~70 kr, Claude API 170-690 kr depending on volume, paid plans for hands-on tests 0-600 kr, domain ~10 kr/month; one-off setup 500-10,000 kr (domain, optional legal review of the policy pages). Prices are approximate and unverified. The model is in `engine/driftig_engine/finance.py`; run `driftig finance`. **No paid advertising** until real conversion data exists (Dinero's program forbids PPC anyway).

## 9. 30-day launch plan

| Days | Work | Owner |
|---|---|---|
| 1-3 | Approve niche, brand and domain; register domain; decide business form/CVR for payouts | You |
| 1-3 | Create GitHub repo and connect it; set up Supabase (EU), Vercel, Plausible, Resend | You create accounts, Claude configures |
| 4-7 | Fill company details, review legal pages, deploy to a preview URL | Claude, you review |
| 4-10 | Research Billy/e-conomic/other Danish vendors' programs; prepare Partner-ads and PartnerStack applications | Claude prepares, you submit |
| 5-14 | Create trial accounts in 5-6 accounting programs; record tests with screenshots | Claude drafts the test plan, you (or Claude via your computer) run the trials |
| 8-21 | Publish 8-12 pages: digital bookkeeping guide, "best accounting software for sole proprietors", 3-4 head-to-head comparisons, invoicing guide, VAT basics, CRM for small teams | Claude drafts, QA gate, you approve |
| 15-21 | Build the first free tool: "Skal jeg bogføre digitalt?" checker | Claude |
| 15-30 | Launch newsletter and LinkedIn page; first monthly newsletter | Claude drafts, you approve |
| 22-30 | Submit sitemap to Search Console; start weekly reports; first optimisation pass | Claude |

Targets for day 30 are inputs, not revenue: site live, 10 approved pages, 2+ approved affiliate programs, tracking verified end-to-end, first weekly report. Expect little or no revenue in month 1.

## 10. Compliance built in

- Danish marketing law: hidden advertising is prohibited; affiliate links count as advertising. Per Make Influence (third-party summary of Forbrugerombudsmanden guidance), disclose before the reader engages and label links "reklamelink". The site shows a disclosure box above the content and a "Reklamelink" label next to every commissioned button. Verify against Forbrugerombudsmanden's own guidance before launch.
- GDPR: no cookies, cookieless analytics, anonymous click logs, double opt-in with stored consent, unsubscribe deletes the address, automatic purge of stale data, EU database region.
- Affiliate terms: tracking links can only be set after approval; partner restrictions stored per partner (e.g. Dinero: no PPC, no Facebook ads, no coupon sites).
- Content integrity: QA gate rejects invented experience, unsupported claims and missing sources; images must be our own screenshots or licensed.
- Secrets: only in environment variables; never `NEXT_PUBLIC_`; service key server-side only.

## Sources

- Adtraction payments: https://help.adtraction.com/en/articles/3274005-adtraction-s-payment-process-for-partners
- Awin thresholds: https://success.awin.com/articles/en_US/Knowledge/What-are-the-payment-thresholds and joining deposit: https://www.awin.com/gb/compliance-and-regulations/application-process-and-joining-fee
- Partner-ads vs Adtraction (third-party): https://www.makeinfluence.com/en/academy/partner-ads-vs-adtraction-denmarks-homegrown-affiliate-network-compared
- Dinero affiliate program: https://dinero.dk/affiliate/
- Pipedrive affiliate program: https://www.pipedrive.com/en/affiliate-partnership
- monday.com / collaboration tools (PartnerStack blog): https://partnerstack.com/articles/top-paying-collaboration-software-affiliate-programs
- SaaS program list (third-party): https://supademo.com/blog/saas-affiliate-programs
- Notion/Canva (third-party): https://www.makeinfluence.com/en/academy/notion-canva-and-the-template-economy-how-saas-tools-turn-creators-into-affiliates
- zooplus programme: https://www.zooplus.com/content/affiliate_programme ; zooplus DK on Awin: https://www.affilitizer.com/programs/zooplus.dk
- Amazon.se rates at launch (third-party): https://geniuslink.com/blog/amazon-associates-sweden/
- Digital bookkeeping 2026: https://www.pwc.dk/da/artikler/2025/04/pligten-til-digital-bogfoering-efter-bogfoeringsloven-gennemfoeres-med-virkning-fra-den-1-januar-2026.html
- Danish disclosure rules (third-party): https://www.makeinfluence.com/en/academy/influencer-marketing-disclosure-rules-denmark-and-eu
- Core update impact (third-party): https://www.pulse.bot/marketing/news/googles-march-2026-core-update-hit-affiliate-sites-harder-than-any-other-category-97b2f86f-68a0-4268-82d2-138396e7fb55/ ; recoveries: https://www.searchenginejournal.com/4-sites-that-recovered-from-googles-december-2025-core-update/
