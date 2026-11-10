# Driftig: strategy and first execution report

> **Decision, 10 Nov 2026:** the owner chose **English AI tools for a global audience** (finalist #2 below) over my recommendation of Danish small-business software. Sections 3-10 reflect that choice.

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
| A. Hands-on review and comparison site | Reviews, head-to-heads and "best X for Y" pages with labelled affiliate links | High purchase intent; recurring 12-month commissions | English SERPs are crowded; 6-12 months to meaningful search traffic |
| B. Newsletter + LinkedIn + YouTube first | Monthly "price changes and what's worth paying for" email; short tool demos | Owned audience, less dependent on Google, which hit affiliate sites hard in 2026 | Needs consistent publishing |
| C. Free tools | AI tool price calculator (per seat, annual vs monthly), "Is this tool GDPR-ready?" checker, AI Act deadline checker | Earns links, repeat visits, easy to automate | Development time per tool |

**Recommendation: A + C, with B as distribution.** Video matters more here than in the Danish plan: AI voice/video tools convert best when shown working.

## 4. Final niche (owner's decision)

**AI tools for freelancers and small teams, in English, reviewed from Europe.** Start with categories where verified programs pay recurring commissions: meetings and notes (Fireflies: up to 30% recurring for 12 months, 90 days), voice and video (ElevenLabs: 22% for 12 months; Synthesia: 25%, 60-day cookie), automation (Make: 35% for 12 months), sales/CRM (Pipedrive: 20% for 12 months, 90 days). All five read on the vendors' own pages on 10 Nov 2026.

**How we avoid being one more AI-tools listicle:** the European angle. Every review states the real price (per seat, annual vs monthly, currency), data retention, whether customer data trains models, and where data is processed, plus what the EU AI Act and GDPR mean for using the tool at work. US-based competitors rarely cover that, and EU/UK buyers search for it.

Main risks: brutal competition (a third-party report claims 71% of affiliate sites lost rankings in the March 2026 core update; unverified); fast-changing prices and programs; several programs forbid bidding on brand keywords (ElevenLabs) or Google Ads entirely (Descript), so growth must be organic.

## 5. Brand concept

- **Name: Driftig** (kept, as on the decision card). Scandinavian for "enterprising"; to English ears it is short, unusual and ownable, and hints at the European origin. If you would prefer an English-language name, now is the cheapest time to change it.
- **Promise:** "AI tools that earn their subscription. Tested, priced, privacy-checked."
- **Positioning:** the calm European second opinion on AI tools: own accounts, dated prices, data and GDPR facts, plain disclosure.
- **Voice:** practical, friendly, no hype or fake urgency; "not stated" when a vendor does not say.
- **Look:** unchanged (forest green, warm paper, ochre; Fraunces + Inter; "D" monogram; light and dark).
- **Domain:** driftig.com is the natural choice for a global site; availability **not checked** (DNS blocked here). Fallbacks: driftig.ai, getdriftig.com, driftig.io. Registering needs your approval.

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
| Language | English (en-US spelling), prices shown in the vendor's currency; books kept in DKK | Global audience, Danish company |
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

All inputs are **assumptions** until the dashboard has real data. Revenue = sessions x click-through to vendor x paid conversion per click x average payout x approval rate; cash arrives two months later; your time is not costed. Payout assumptions are based on the verified 20-35% of 12 months of a typical $10-30/month plan.

| Scenario | Sessions at month 12 | Click-through | Paid conversion per click | Avg payout | Approval |
|---|---|---|---|---|---|
| Conservative | 3,000 | 8% | 1.5% | 200 DKK | 80% |
| Expected | 10,000 | 12% | 2.5% | 450 DKK | 85% |
| Ambitious | 40,000 | 15% | 3% | 600 DKK | 90% |

| Scenario | RPM (DKK per 1,000 sessions) | Earned month 12 | Earned month 24 | Monthly costs | Covers running costs | Setup paid back |
|---|---|---|---|---|---|---|
| Conservative | 192 | 576 DKK | 1,536 DKK | 725 DKK | month 16 | not within 24 months |
| Expected | 1,148 | 11,475 DKK | 34,425 DKK | 1,432 DKK | month 7 | month 11 |
| Ambitious | 2,430 | 97,200 DKK | 291,600 DKK | 2,546 DKK | month 4 | month 7 |

Monthly sessions needed for a revenue target:

| Target per month | Conservative | Expected | Ambitious |
|---|---|---|---|
| 5,000 DKK | 26,042 | 4,357 | 2,058 |
| 10,000 DKK | 52,083 | 8,715 | 4,115 |
| 25,000 DKK | 130,208 | 21,786 | 10,288 |
| 50,000 DKK | 260,417 | 43,573 | 20,576 |

Costs used: hosting ~140 DKK, analytics ~70 DKK, Claude API 210-830 DKK, paid AI-tool plans for honest testing 300-1,500 DKK, domain ~10 DKK per month; setup 1,000-10,000 DKK. The spread between scenarios is the honest message: the business only works if pages convert readers into paying customers, which we will know within 3-4 months of launch. No paid ads until then.

## 9. 30-day launch plan

| Days | Work | Owner |
|---|---|---|
| 1-3 | Approve domain; decide business form/CVR (needed for payouts and legal pages) | You |
| 1-3 | Create GitHub repo, Supabase (EU), Vercel, Plausible, Resend accounts | You create, Claude configures |
| 4-7 | Company details, legal pages review, preview deploy | Claude, you review |
| 4-10 | Prepare applications: Fireflies, ElevenLabs, Synthesia, Make, Pipedrive (+ check Descript, Notion, Canva) | Claude prepares, you submit |
| 5-14 | Paid/free accounts in 3 meeting notetakers and 3 AI voice tools; recorded tests, screenshots | Claude plans, you run them (or Claude via your computer) |
| 8-21 | Publish 8-12 pages: AI Act guide, best AI notetakers for EU teams, Fireflies review, 2 head-to-heads, best AI voice tools, ElevenLabs review, Make vs Zapier for small teams | Claude drafts, QA gate, you approve |
| 15-21 | First free tool: AI tool cost calculator (per seat, monthly vs annual) | Claude |
| 15-30 | Newsletter, LinkedIn page, first 4 short demo videos | Claude drafts, you approve and record |
| 22-30 | Search Console, sitemap, weekly reports, first optimisation pass | Claude |

## 10. Compliance built in

- Disclosure before content and an "Affiliate link (ad)" label on every commissioned button: meets the spirit of the US FTC endorsement guides and Danish marketing law (the company is Danish, so Danish law applies; verify wording against official guidance).
- GDPR: no cookies, cookieless analytics, anonymous click logs, double opt-in, deletion on unsubscribe, automatic purge, EU database region.
- Partner terms stored per partner (e.g. no brand bidding for ElevenLabs, no Google Ads for Descript); tracking links only after approval.
- QA gate blocks invented experience ("we tested" without hands_on), claims like "fully GDPR-compliant" or "never hallucinates", missing sources and raw affiliate links.

## Sources

- ElevenLabs affiliate terms: https://elevenlabs.io/affiliates-terms
- Synthesia affiliates: https://synthesia.io/partners/affiliates
- Fireflies affiliate program: https://fireflies.ai/affiliate
- Make affiliate program: https://help.make.com/affiliate-program.md
- Descript affiliates: https://help.descript.com/connect-with-us/affiliates.md
- EU AI Act timeline after the Omnibus (FPF): https://fpf.org/blog/the-ai-act-implementation-timeline-what-changes-under-the-ai-omnibus

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
