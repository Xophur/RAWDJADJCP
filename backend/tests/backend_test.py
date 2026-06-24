"""
RAWDJA / The Needle Drop backend API tests
Covers: certificate issuance (chaining), verify, ledger integrity, stats,
teacher unlock + content + pdf, public downloads pdf.
"""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://dj-culture-guide.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

FOUNDER_SERIAL = "RAWDJA-2026-00001-QQ2EDR"


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
        assert data["certificates_issued"] >= 1


# ---------- Certificates: issuance + chaining ----------
class TestCertificateIssuance:
    SERIAL_RE = re.compile(r"^RAWDJA-\d{4}-\d{5}-[A-Z0-9]{6}$")

    def test_issue_chain_two_certificates(self, session):
        r1 = session.post(f"{API}/certificates", json={"name": "TEST_Chainer One"})
        assert r1.status_code == 200, r1.text
        c1 = r1.json()
        for k in ("serial", "name", "course", "issued_at", "seq", "prev_hash", "hash"):
            assert k in c1
        assert self.SERIAL_RE.match(c1["serial"]), f"bad serial format: {c1['serial']}"
        assert c1["name"] == "TEST_Chainer One"
        assert isinstance(c1["seq"], int) and c1["seq"] >= 1
        assert len(c1["hash"]) == 64
        assert "The Needle Drop" in c1["course"]

        r2 = session.post(f"{API}/certificates", json={"name": "TEST_Chainer Two"})
        assert r2.status_code == 200, r2.text
        c2 = r2.json()

        assert c2["seq"] == c1["seq"] + 1
        assert c2["prev_hash"] == c1["hash"]
        assert c2["hash"] != c1["hash"]
        assert self.SERIAL_RE.match(c2["serial"])

    def test_issue_rejects_short_name(self, session):
        r = session.post(f"{API}/certificates", json={"name": "A"})
        assert r.status_code == 422


# ---------- Verify ----------
class TestVerify:
    def test_verify_valid_serial(self, session):
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
        v = session.get(f"{API}/certificates/verify/{FOUNDER_SERIAL}")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is True
        assert data["certificate"]["seq"] == 1
        assert data["certificate"]["serial"] == FOUNDER_SERIAL
        assert data["certificate"]["name"] == "Jason Theory"

    def test_verify_invalid_serial(self, session):
        v = session.get(f"{API}/certificates/verify/RAWDJA-9999-99999-ZZZZZZ")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is False
        assert data["certificate"] is None


# ---------- Ledger integrity ----------
class TestLedgerIntegrity:
    def test_integrity_intact(self, session):
        session.post(f"{API}/certificates", json={"name": "TEST_LedgerCheck"})
        r = session.get(f"{API}/certificates/ledger/integrity")
        assert r.status_code == 200
        data = r.json()
        assert data["intact"] is True, f"Ledger broken: {data['broken_links']}"
        assert data["total_issued"] >= 1
        assert len(data["broken_links"]) == 0


# ---------- Teacher gate ----------
class TestTeacherGate:
    def test_unlock_invalid_serial_403(self, session):
        r = session.post(f"{API}/teacher/unlock", json={"serial": "RAWDJA-9999-99999-FAKEEE"})
        assert r.status_code == 403, r.text

    def test_unlock_valid_serial_returns_token(self, session):
        r = session.post(f"{API}/teacher/unlock", json={"serial": FOUNDER_SERIAL})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 20
        assert data["holder"] == "Jason Theory"
        assert data["serial"] == FOUNDER_SERIAL

    def test_content_without_token_401(self, session):
        # Use a fresh session without Authorization header
        r = requests.get(f"{API}/teacher/content")
        assert r.status_code == 401

    def test_content_with_token_returns_guide(self, session):
        u = session.post(f"{API}/teacher/unlock", json={"serial": FOUNDER_SERIAL})
        token = u.json()["token"]
        r = requests.get(f"{API}/teacher/content", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "guide" in data and "glossary" in data and "editorial" in data and "course" in data
        assert isinstance(data["guide"]["lessons"], list)
        assert len(data["guide"]["lessons"]) == 6
        assert isinstance(data["glossary"], list) and len(data["glossary"]) > 0
        # spot-check lesson shape
        l = data["guide"]["lessons"][0]
        for k in ("module", "duration", "objective", "activities"):
            assert k in l

    def test_pdf_without_token_401(self, session):
        r = requests.post(f"{API}/teacher/pdf")
        assert r.status_code == 401

    def test_pdf_with_token_returns_pdf(self, session):
        u = session.post(f"{API}/teacher/unlock", json={"serial": FOUNDER_SERIAL})
        token = u.json()["token"]
        r = requests.post(f"{API}/teacher/pdf", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200, r.text
        assert r.headers.get("content-type", "").startswith("application/pdf")
        assert r.content[:4] == b"%PDF", f"Not a PDF, starts with: {r.content[:8]!r}"
        assert len(r.content) > 1000


# ---------- Public downloads PDF ----------
class TestDownloadsPdf:
    def test_student_pdf_no_auth(self, session):
        blocks = [
            {"t": "cover", "text": "The Needle Drop", "sub": "Student Edition", "edition": "STUDENT EDITION"},
            {"t": "h1", "text": "Chapter 1"},
            {"t": "p", "text": "Sound systems in 1950s Jamaica."},
            {"t": "li", "text": "Selector"},
        ]
        r = session.post(f"{API}/downloads/pdf", json={"filename": "TEST_student.pdf", "blocks": blocks})
        assert r.status_code == 200, r.text
        assert r.headers.get("content-type", "").startswith("application/pdf")
        assert r.content[:4] == b"%PDF"
        assert len(r.content) > 500
