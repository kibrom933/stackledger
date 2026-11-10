"""Scenario model. Every input is an ASSUMPTION until replaced by measured data from the dashboard.

Revenue per month = sessions x outbound CTR x commissionable conversion per click x average payout x approval rate.
Cash arrives `payout_lag_months` after the commission is earned (networks confirm, then pay).
"""
from __future__ import annotations

from dataclasses import dataclass, field

DKK_PER_USD = 6.9  # assumption; update monthly


@dataclass
class Scenario:
    name: str
    sessions_m12: int            # monthly sessions reached at month 12
    sessions_m24: int
    outbound_ctr: float          # share of sessions that click a reklamelink
    conversion_per_click: float  # share of clicks that become a commissionable signup/sale
    avg_payout_dkk: float        # average commission per conversion
    approval_rate: float = 0.85  # share not reversed/rejected
    payout_lag_months: int = 2
    setup_cost_dkk: float = 0
    monthly_costs_dkk: dict[str, float] = field(default_factory=dict)

    def sessions(self, m: int) -> float:
        # Slow start (new domains rarely rank in months 1-4), then growth towards m12 and m24 levels.
        if m <= 12:
            return self.sessions_m12 * (m / 12) ** 2
        return self.sessions_m12 + (self.sessions_m24 - self.sessions_m12) * (m - 12) / 12

    def revenue(self, m: int) -> float:
        return self.sessions(m) * self.outbound_ctr * self.conversion_per_click * self.avg_payout_dkk * self.approval_rate

    @property
    def rpm(self) -> float:
        """Revenue per 1,000 sessions."""
        return 1000 * self.outbound_ctr * self.conversion_per_click * self.avg_payout_dkk * self.approval_rate

    def sessions_needed(self, monthly_target_dkk: float) -> int:
        return round(monthly_target_dkk / (self.rpm / 1000))


def default_costs(ai_usd: float, tools_dkk: float) -> dict[str, float]:
    return {
        "hosting (Vercel Pro, ~$20)": 20 * DKK_PER_USD,
        "database (Supabase free tier)": 0,
        "analytics (Plausible, ~EUR 9)": 70,
        "email (Resend free tier)": 0,
        "Claude API": ai_usd * DKK_PER_USD,
        "paid plans for hands-on tests": tools_dkk,
        "domain (~100 kr/yr)": 10,
    }


SCENARIOS = [
    Scenario("Conservative", 2_000, 5_000, 0.06, 0.04, 150, 0.80, setup_cost_dkk=500,
             monthly_costs_dkk=default_costs(25, 0)),
    Scenario("Expected", 8_000, 20_000, 0.10, 0.05, 200, 0.85, setup_cost_dkk=5_000,
             monthly_costs_dkk=default_costs(50, 300)),
    Scenario("Ambitious", 25_000, 60_000, 0.12, 0.06, 250, 0.90, setup_cost_dkk=10_000,
             monthly_costs_dkk=default_costs(100, 600)),
]


def run(s: Scenario, months: int = 24) -> list[dict]:
    rows, cash = [], -s.setup_cost_dkk
    cost = sum(s.monthly_costs_dkk.values())
    for m in range(1, months + 1):
        earned = s.revenue(m)
        received = s.revenue(m - s.payout_lag_months) if m > s.payout_lag_months else 0.0
        cash += received - cost
        rows.append({"month": m, "sessions": round(s.sessions(m)), "earned_dkk": round(earned), "cash_in_dkk": round(received),
                     "costs_dkk": round(cost), "cumulative_cash_dkk": round(cash)})
    return rows


def break_even_month(rows: list[dict]) -> int | None:
    for r in rows:
        if r["cash_in_dkk"] >= r["costs_dkk"]:
            return r["month"]
    return None


def payback_month(rows: list[dict]) -> int | None:
    return next((r["month"] for r in rows if r["cumulative_cash_dkk"] >= 0 and r["month"] > 1), None)


def markdown() -> str:
    out = ["| Scenario | Sessions m12 | RPM (kr/1000 sessions) | Earned m12 | Earned m24 | Monthly costs | Operating break-even | Cash payback |",
           "|---|---|---|---|---|---|---|---|"]
    for s in SCENARIOS:
        rows = run(s)
        out.append(f"| {s.name} | {s.sessions_m12:,} | {s.rpm:,.0f} | {rows[11]['earned_dkk']:,} kr | {rows[23]['earned_dkk']:,} kr | "
                   f"{rows[0]['costs_dkk']:,} kr | {('month ' + str(break_even_month(rows))) if break_even_month(rows) else 'not within 24 months'} | "
                   f"{('month ' + str(payback_month(rows))) if payback_month(rows) else 'not within 24 months'} |")
    out += ["", "Monthly sessions needed for a revenue target (at each scenario's RPM):", "",
            "| Target per month | " + " | ".join(s.name for s in SCENARIOS) + " |", "|---|" + "---|" * len(SCENARIOS)]
    for t in (5_000, 10_000, 25_000, 50_000):
        out.append(f"| {t:,} kr | " + " | ".join(f"{s.sessions_needed(t):,}" for s in SCENARIOS) + " |")
    return "\n".join(out).replace(",", ".")
