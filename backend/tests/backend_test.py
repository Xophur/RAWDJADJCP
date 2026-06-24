"""
RAWDJA / The Needle Drop backend API tests
Covers: certificate issuance (chaining), verify, ledger integrity, stats
"""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://dj-culture-guide.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health / root ----------
class TestRoot:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "RAWDJA" in data.get("message", "")
        assert data.get("association") == "Rave And Warehouse DJ Association"


# ---------- Stats ----------
class TestStats:
    def test_stats_returns_count(self, session):
        r = session.get(f"{API}/stats")
        assert r.status_code == 200
        data = r.json()
        assert "certificates_issued" in data
        assert isinstance(data["certificates_issued"], int)
        assert data["certificates_issued"] >= 0


# ---------- Certificates: issuance + chaining ----------
class TestCertificateIssuance:
    SERIAL_RE = re.compile(r"^RAWDJA-\d{4}-\d{5}-[A-Z0-9]{6}$")

    def test_issue_chain_two_certificates(self, session):
        # Issue cert 1
        r1 = session.post(f"{API}/certificates", json={"name": "TEST_Chainer One"})
        assert r1.status_code == 200, r1.text
        c1 = r1.json()
        # Validate structure
        for k in ("serial", "name", "course", "issued_at", "seq", "prev_hash", "hash"):
            assert k in c1
        assert self.SERIAL_RE.match(c1["serial"]), f"bad serial format: {c1['serial']}"
        assert c1["name"] == "TEST_Chainer One"
        assert isinstance(c1["seq"], int) and c1["seq"] >= 1
        assert len(c1["hash"]) == 64  # SHA-256 hex
        assert "The Needle Drop" in c1["course"]

        # Issue cert 2
        r2 = session.post(f"{API}/certificates", json={"name": "TEST_Chainer Two"})
        assert r2.status_code == 200, r2.text
        c2 = r2.json()

        # Chain check
        assert c2["seq"] == c1["seq"] + 1, "seq must increment"
        assert c2["prev_hash"] == c1["hash"], "prev_hash of cert2 must equal hash of cert1"
        assert c2["hash"] != c1["hash"]
        assert self.SERIAL_RE.match(c2["serial"])

    def test_issue_rejects_short_name(self, session):
        r = session.post(f"{API}/certificates", json={"name": "A"})
        assert r.status_code == 422  # pydantic min_length=2


# ---------- Verify ----------
class TestVerify:
    def test_verify_valid_serial(self, session):
        # First issue a fresh cert so we have a known valid serial
        r = session.post(f"{API}/certificates", json={"name": "TEST_VerifyMe"})
        assert r.status_code == 200
        cert = r.json()
        serial = cert["serial"]

        v = session.get(f"{API}/certificates/verify/{serial}")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is True
        assert data["certificate"] is not None
        assert data["certificate"]["serial"] == serial
        assert data["certificate"]["name"] == "TEST_VerifyMe"
        assert "Authentic" in data["message"]

    def test_verify_founder_serial(self, session):
        # Provided by agent context — existed at time of run
        serial = "RAWDJA-2026-00001-9MD5E4"
        v = session.get(f"{API}/certificates/verify/{serial}")
        assert v.status_code == 200
        data = v.json()
        # If the database has been reset between runs this could be invalid;
        # then we just assert structural validity.
        assert isinstance(data["valid"], bool)
        if data["valid"]:
            assert data["certificate"]["seq"] == 1
            assert data["certificate"]["serial"] == serial

    def test_verify_invalid_serial(self, session):
        v = session.get(f"{API}/certificates/verify/RAWDJA-9999-99999-ZZZZZZ")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is False
        assert data["certificate"] is None
        assert "No certificate" in data["message"] or "not" in data["message"].lower()


# ---------- Ledger integrity ----------
class TestLedgerIntegrity:
    def test_integrity_intact(self, session):
        # Ensure there's at least one cert
        session.post(f"{API}/certificates", json={"name": "TEST_LedgerCheck"})

        r = session.get(f"{API}/certificates/ledger/integrity")
        assert r.status_code == 200
        data = r.json()
        assert "total_issued" in data
        assert "intact" in data
        assert "broken_links" in data
        assert "head_hash" in data
        assert data["intact"] is True, f"Ledger broken: {data['broken_links']}"
        assert data["total_issued"] >= 1
        assert isinstance(data["broken_links"], list)
        assert len(data["broken_links"]) == 0

    def test_stats_matches_integrity_total(self, session):
        s = session.get(f"{API}/stats").json()
        i = session.get(f"{API}/certificates/ledger/integrity").json()
        assert s["certificates_issued"] == i["total_issued"]
