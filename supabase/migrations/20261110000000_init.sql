-- Stackledger operating database. All tables have RLS on and NO public policies:
-- only the server (service role) and the Python engine can read/write.

create extension if not exists pgcrypto;

-- Anonymous outbound clicks (no IP, no user agent, no cookie ids).
create table outbound_clicks (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  product_id text not null,
  partner_id text not null,
  page_slug text,
  channel text not null default 'site',   -- site | pinterest | instagram | youtube | email
  affiliate boolean not null
);
create index on outbound_clicks (created_at);
create index on outbound_clicks (page_slug);

-- Newsletter: double opt-in, consent evidence, tokens stored hashed.
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null check (status in ('pending','confirmed')),
  consent_text text not null,
  consent_at timestamptz not null,
  confirmed_at timestamptz,
  confirm_token_hash text,
  unsubscribe_token_hash text not null,
  created_at timestamptz not null default now()
);

-- Commissions imported from network reports/APIs. Status mirrors the network:
-- pending = estimated (may be cancelled); confirmed = approved by merchant; paid = money received.
create table commissions (
  id bigint generated always as identity primary key,
  network text not null,
  network_transaction_id text not null,
  partner_id text not null,
  transaction_date date not null,
  status text not null check (status in ('pending','confirmed','rejected','paid')),
  amount_dkk numeric(12,2) not null,
  order_value_dkk numeric(12,2),
  page_slug text,          -- from sub-id / click reference where the network supports it
  channel text,
  imported_at timestamptz not null default now(),
  unique (network, network_transaction_id)
);

create table expenses (
  id bigint generated always as identity primary key,
  incurred_on date not null,
  category text not null check (category in ('hosting','software','ai_api','domain','content','legal','other')),
  vendor text not null,
  amount_dkk numeric(12,2) not null,
  note text
);

-- Keyword / topic opportunities found by the engine.
create table opportunities (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  keyword text not null unique,
  intent text check (intent in ('informational','commercial','transactional','navigational')),
  monthly_volume int,                 -- null when unknown; never guessed
  volume_source text,
  difficulty_note text,
  season text,
  score numeric,
  status text not null default 'new' check (status in ('new','briefed','rejected','published'))
);

-- Content pipeline. Nothing moves to 'approved' without a human (approved_by).
create table content_items (
  id bigint generated always as identity primary key,
  slug text not null unique,
  kind text not null check (kind in ('guide','comparison','review','article','pin','reel_script','short_script','carousel','newsletter')),
  title text not null,
  opportunity_id bigint references opportunities(id),
  status text not null default 'brief' check (status in ('brief','draft','qa_failed','qa_passed','approved','scheduled','published','retired')),
  qa_report jsonb,
  body_path text,                      -- path in the git repo
  approved_by text,
  approved_at timestamptz,
  scheduled_for timestamptz,
  published_at timestamptz,
  last_refreshed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Things that need a human decision (new partner, paid spend, legal-sensitive content, major site change).
create table approvals (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('partner_application','spend','legal_content','major_change','channel_autopublish')),
  subject text not null,
  details jsonb not null default '{}',
  status text not null default 'open' check (status in ('open','approved','rejected')),
  decided_by text,
  decided_at timestamptz
);

-- Every scheduled job writes a row, so failures are visible in the weekly report.
create table job_runs (
  id bigint generated always as identity primary key,
  job text not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  ok boolean,
  summary jsonb
);

-- Search Console snapshots for ranking/refresh decisions.
create table search_performance (
  day date not null,
  page text not null,
  query text not null,
  clicks int not null,
  impressions int not null,
  position numeric(6,2) not null,
  primary key (day, page, query)
);

alter table outbound_clicks enable row level security;
alter table subscribers enable row level security;
alter table commissions enable row level security;
alter table expenses enable row level security;
alter table opportunities enable row level security;
alter table content_items enable row level security;
alter table approvals enable row level security;
alter table job_runs enable row level security;
alter table search_performance enable row level security;

-- Data minimisation: unconfirmed signups older than 30 days, clicks older than 24 months.
create or replace function purge_old_data() returns void language sql set search_path = public as $$
  delete from subscribers where status = 'pending' and created_at < now() - interval '30 days';
  delete from outbound_clicks where created_at < now() - interval '24 months';
$$;
revoke execute on function purge_old_data() from public, anon, authenticated;
