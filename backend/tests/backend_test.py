"""
RAWDJA backend API tests — program-aware (DJ + Promoter).
Covers: per-program certificate issuance + chaining, verify, ledger integrity,
stats {dj, promoter}, teacher unlock + content + pdf with cross-program 403,
public downloads pdf.
"""
import os
import re
import pytest
import requests

from dotenv import load_dotenv
load_dotenv("/app/frontend/.env")
BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Reusable serials shared across the test session
@pytest.fixture(scope="module")
def dj_serial(session):
    r = session.post(f"{API}/certificates", json={"name": "TEST_DJ Holder", "program": "dj"})
    assert r.status_code == 200, r.text
    return r.json()["serial"]


@pytest.fixture(scope="module")
def promoter_serial(session):
    r = session.post(f"{API}/certificates", json={"name": "TEST_Promoter Holder", "program": "promoter"})
    assert r.status_code == 200, r.text
    return r.json()["serial"]


# ---------- Root ----------
class TestRoot:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "RAWDJA" in data.get("message", "")
        assert data.get("association") == "Rave And Warehouse DJ Association"


# ---------- Stats ----------
class TestStats:
    def test_stats_includes_program_counts(self, session, dj_serial, promoter_serial):
        r = session.get(f"{API}/stats")
        assert r.status_code == 200
        data = r.json()
        for k in ("certificates_issued", "dj", "promoter"):
            assert k in data and isinstance(data[k], int)
        assert data["certificates_issued"] >= 2
        assert data["dj"] >= 1
        assert data["promoter"] >= 1
        assert data["certificates_issued"] == data["dj"] + data["promoter"]


# ---------- Certificates: program-aware issuance + chaining ----------
class TestCertificateIssuance:
    DJ_SERIAL_RE = re.compile(r"^RAWDJA-DJ-\d{4}-\d{5}-[A-Z0-9]{6}$")
    PRMO_SERIAL_RE = re.compile(r"^RAWDJA-PRMO-\d{4}-\d{5}-[A-Z0-9]{6}$")

    def test_dj_serial_prefix_and_chain(self, session):
        r1 = session.post(f"{API}/certificates", json={"name": "TEST_DJ Chain One", "program": "dj"})
        assert r1.status_code == 200
        c1 = r1.json()
        assert self.DJ_SERIAL_RE.match(c1["serial"]), f"bad DJ serial: {c1['serial']}"
        assert c1["program"] == "dj"
        assert "Needle Drop" in c1["course"]

        r2 = session.post(f"{API}/certificates", json={"name": "TEST_DJ Chain Two", "program": "dj"})
        c2 = r2.json()
        assert c2["seq"] == c1["seq"] + 1
        assert c2["prev_hash"] == c1["hash"]

    def test_promoter_serial_prefix_and_chain(self, session):
        r1 = session.post(f"{API}/certificates", json={"name": "TEST_Promo Chain One", "program": "promoter"})
        assert r1.status_code == 200
        c1 = r1.json()
        assert self.PRMO_SERIAL_RE.match(c1["serial"]), f"bad PRMO serial: {c1['serial']}"
        assert c1["program"] == "promoter"
        assert "Promoter" in c1["course"]

        r2 = session.post(f"{API}/certificates", json={"name": "TEST_Promo Chain Two", "program": "promoter"})
        c2 = r2.json()
        assert c2["seq"] == c1["seq"] + 1
        assert c2["prev_hash"] == c1["hash"]

    def test_programs_have_independent_sequences(self, session):
        # The DJ and Promoter chains do not share seq numbers.
        dj = session.post(f"{API}/certificates", json={"name": "TEST_DJ Independence", "program": "dj"}).json()
        pr = session.post(f"{API}/certificates", json={"name": "TEST_PR Independence", "program": "promoter"}).json()
        # They are independent chains, so the hashes must differ and serials carry their codes
        assert "DJ" in dj["serial"] and "PRMO" in pr["serial"]
        assert dj["hash"] != pr["hash"]

    def test_invalid_program_falls_back_to_dj(self, session):
        r = session.post(f"{API}/certificates", json={"name": "TEST_Bogus Program", "program": "bogus"})
        assert r.status_code == 200
        c = r.json()
        assert c["program"] == "dj"
        assert self.DJ_SERIAL_RE.match(c["serial"])

    def test_rejects_short_name(self, session):
        r = session.post(f"{API}/certificates", json={"name": "A", "program": "dj"})
        assert r.status_code == 422


# ---------- Verify ----------
class TestVerify:
    def test_verify_dj(self, session, dj_serial):
        v = session.get(f"{API}/certificates/verify/{dj_serial}")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is True
        assert data["certificate"]["serial"] == dj_serial
        assert data["certificate"]["program"] == "dj"

    def test_verify_promoter(self, session, promoter_serial):
        v = session.get(f"{API}/certificates/verify/{promoter_serial}")
        assert v.status_code == 200
        data = v.json()
        assert data["valid"] is True
        assert data["certificate"]["serial"] == promoter_serial
        assert data["certificate"]["program"] == "promoter"

    def test_verify_invalid(self, session):
        v = session.get(f"{API}/certificates/verify/RAWDJA-DJ-9999-99999-ZZZZZZ")
        assert v.status_code == 200
        assert v.json()["valid"] is False


# ---------- Ledger integrity ----------
class TestLedgerIntegrity:
    def test_integrity_intact_with_per_program_heads(self, session, dj_serial, promoter_serial):
        r = session.get(f"{API}/certificates/ledger/integrity")
        assert r.status_code == 200
        data = r.json()
        assert data["intact"] is True, f"Ledger broken: {data['broken_links']}"
        assert "head_hashes" in data
        assert "dj" in data["head_hashes"] and "promoter" in data["head_hashes"]
        # Both heads should be 64-char sha256 hex since chains are non-empty
        assert len(data["head_hashes"]["dj"]) == 64
        assert len(data["head_hashes"]["promoter"]) == 64
        assert data["head_hashes"]["dj"] != data["head_hashes"]["promoter"]


# ---------- Teacher gate (per-program + cross-program lock) ----------
class TestTeacherGate:
    def test_unlock_invalid_serial_403(self, session):
        r = session.post(f"{API}/teacher/unlock", json={"serial": "RAWDJA-DJ-9999-99999-FAKEEE"})
        assert r.status_code == 403

    def test_unlock_dj_returns_program_dj(self, session, dj_serial):
        r = session.post(f"{API}/teacher/unlock", json={"serial": dj_serial})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["program"] == "dj"
        assert isinstance(data["token"], str) and len(data["token"]) > 20

    def test_unlock_promoter_returns_program_promoter(self, session, promoter_serial):
        r = session.post(f"{API}/teacher/unlock", json={"serial": promoter_serial})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["program"] == "promoter"

    def test_content_no_token_401(self):
        assert requests.get(f"{API}/teacher/content?program=dj").status_code == 401
        assert requests.get(f"{API}/teacher/content?program=promoter").status_code == 401

    def test_dj_token_unlocks_dj_content(self, session, dj_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": dj_serial}).json()["token"]
        r = requests.get(f"{API}/teacher/content?program=dj", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        data = r.json()
        assert data["program"] == "dj"
        assert "Needle Drop" in data["course"]["title"]
        assert len(data["guide"]["lessons"]) == 6

    def test_promoter_token_unlocks_promoter_content(self, session, promoter_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": promoter_serial}).json()["token"]
        r = requests.get(f"{API}/teacher/content?program=promoter", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        data = r.json()
        assert data["program"] == "promoter"
        assert "Promoter" in data["course"]["title"]
        assert len(data["guide"]["lessons"]) == 6

    def test_cross_program_lock_dj_cannot_unlock_promoter(self, session, dj_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": dj_serial}).json()["token"]
        r = requests.get(f"{API}/teacher/content?program=promoter", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 403, f"DJ token should NOT unlock promoter content, got {r.status_code}"
        r2 = requests.post(f"{API}/teacher/pdf?program=promoter", headers={"Authorization": f"Bearer {token}"})
        assert r2.status_code == 403

    def test_cross_program_lock_promoter_cannot_unlock_dj(self, session, promoter_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": promoter_serial}).json()["token"]
        r = requests.get(f"{API}/teacher/content?program=dj", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 403, f"Promoter token should NOT unlock DJ content, got {r.status_code}"
        r2 = requests.post(f"{API}/teacher/pdf?program=dj", headers={"Authorization": f"Bearer {token}"})
        assert r2.status_code == 403

    def test_dj_teacher_pdf(self, session, dj_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": dj_serial}).json()["token"]
        r = requests.post(f"{API}/teacher/pdf?program=dj", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        assert r.content[:4] == b"%PDF"
        assert "Needle-Drop" in r.headers.get("content-disposition", "")

    def test_promoter_teacher_pdf(self, session, promoter_serial):
        token = session.post(f"{API}/teacher/unlock", json={"serial": promoter_serial}).json()["token"]
        r = requests.post(f"{API}/teacher/pdf?program=promoter", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        assert r.content[:4] == b"%PDF"
        assert "Promoter" in r.headers.get("content-disposition", "")


# ---------- Public downloads PDF ----------
class TestDownloadsPdf:
    def test_student_pdf_no_auth(self, session):
        blocks = [
            {"t": "cover", "text": "The Promoter", "sub": "Student Edition", "edition": "STUDENT EDITION"},
            {"t": "h1", "text": "Module 1"},
            {"t": "p", "text": "Mancuso's Loft."},
        ]
        r = session.post(f"{API}/downloads/pdf", json={"filename": "TEST_student.pdf", "blocks": blocks})
        assert r.status_code == 200
        assert r.content[:4] == b"%PDF"
