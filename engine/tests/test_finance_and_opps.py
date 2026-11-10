from driftig_engine import finance
from driftig_engine.opportunities import classify_intent, score


def test_scenarios_are_ordered():
    rpms = [s.rpm for s in finance.SCENARIOS]
    assert rpms == sorted(rpms)


def test_cash_lags_earnings():
    rows = finance.run(finance.SCENARIOS[1])
    assert rows[0]["cash_in_dkk"] == 0 and rows[1]["cash_in_dkk"] == 0 and rows[2]["cash_in_dkk"] > 0


def test_sessions_needed_roundtrip():
    s = finance.SCENARIOS[1]
    assert abs(s.sessions_needed(10_000) * s.rpm / 1000 - 10_000) < 5


def test_intent():
    assert classify_intent("bedste regnskabsprogram") == "commercial"
    assert classify_intent("hvornår skal jeg bogføre digitalt") == "informational"
    assert score("commercial", None, None) > score("informational", None, None)
