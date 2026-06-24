from fastapi import FastAPI, APIRouter, HTTPException, Response, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
import os
import io
import jwt
import html as html_lib
import logging
import hashlib
import random
import string
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, HRFlowable

from teacher_content import TEACHER_GUIDE, EDITORIAL, GLOSSARY, COURSE_META

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGO = "HS256"

app = FastAPI(title="RAWDJA / The Needle Drop API")
api_router = APIRouter(prefix="/api")

GENESIS_HASH = "RAWDJA-GENESIS-0000000000000000000000000000000000000000000000000000000000000000"


# ----------------------------- Models -----------------------------
class CertificateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)


class Certificate(BaseModel):
    serial: str
    name: str
    course: str
    issued_at: str
    seq: int
    prev_hash: str
    hash: str


class VerifyResponse(BaseModel):
    valid: bool
    certificate: Optional[Certificate] = None
    message: str


def _make_serial(seq: int) -> str:
    year = datetime.now(timezone.utc).year
    rand = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"RAWDJA-{year}-{seq:05d}-{rand}"


def _compute_hash(serial: str, name: str, issued_at: str, seq: int, prev_hash: str) -> str:
    payload = f"{serial}|{name.strip().upper()}|{issued_at}|{seq}|{prev_hash}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


# ----------------------------- Routes -----------------------------
@api_router.get("/")
async def root():
    return {"message": "RAWDJA ledger online", "association": "Rave And Warehouse DJ Association"}


@api_router.post("/certificates", response_model=Certificate)
async def issue_certificate(req: CertificateRequest):
    name = req.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    # Append to the hash-linked ledger. A unique index on `seq` makes this
    # safe under concurrency: if two requests grab the same `seq`, the loser
    # gets a DuplicateKeyError and simply retries against the new head.
    for _ in range(8):
        last = await db.certificates.find_one(sort=[("seq", -1)])
        seq = (last["seq"] + 1) if last else 1
        prev_hash = last["hash"] if last else GENESIS_HASH

        issued_at = datetime.now(timezone.utc).isoformat()
        serial = _make_serial(seq)
        cert_hash = _compute_hash(serial, name, issued_at, seq, prev_hash)

        cert = Certificate(
            serial=serial,
            name=name,
            course="The Needle Drop — History of DJ & Rave Culture",
            issued_at=issued_at,
            seq=seq,
            prev_hash=prev_hash,
            hash=cert_hash,
        )
        try:
            await db.certificates.insert_one(cert.model_dump())
            return cert
        except DuplicateKeyError:
            continue

    raise HTTPException(status_code=503, detail="Ledger is busy, please retry.")


@api_router.get("/certificates/verify/{serial}", response_model=VerifyResponse)
async def verify_certificate(serial: str):
    doc = await db.certificates.find_one({"serial": serial.strip()}, {"_id": 0})
    if not doc:
        return VerifyResponse(valid=False, message="No certificate found for that serial number.")

    expected = _compute_hash(doc["serial"], doc["name"], doc["issued_at"], doc["seq"], doc["prev_hash"])
    if expected != doc["hash"]:
        return VerifyResponse(valid=False, message="Certificate hash mismatch — record may be tampered with.")

    return VerifyResponse(
        valid=True,
        certificate=Certificate(**doc),
        message="Authentic. This certificate is recorded in the RAWDJA hash-linked ledger.",
    )


@api_router.get("/certificates/ledger/integrity")
async def ledger_integrity():
    """Re-walk the whole chain and confirm every link is intact."""
    certs = await db.certificates.find({}, {"_id": 0}).sort("seq", 1).to_list(100000)
    prev = GENESIS_HASH
    broken = []
    for c in certs:
        expected = _compute_hash(c["serial"], c["name"], c["issued_at"], c["seq"], c["prev_hash"])
        if c["prev_hash"] != prev or expected != c["hash"]:
            broken.append(c["serial"])
        prev = c["hash"]
    return {
        "total_issued": len(certs),
        "intact": len(broken) == 0,
        "broken_links": broken,
        "head_hash": prev,
    }


@api_router.get("/stats")
async def stats():
    total = await db.certificates.count_documents({})
    return {"certificates_issued": total}


# ----------------------------- PDF export -----------------------------
class PdfBlock(BaseModel):
    t: str                       # cover | kicker | h1 | h2 | p | quote | terms | li | note | pagebreak | rule
    text: Optional[str] = None
    sub: Optional[str] = None    # for cover subtitle
    edition: Optional[str] = None


class PdfRequest(BaseModel):
    filename: str = "the-needle-drop.pdf"
    blocks: List[PdfBlock]


C_ORANGE = HexColor("#D94B00")
C_GREEN = HexColor("#1E8E00")
C_BLUE = HexColor("#0090A8")
C_INK = HexColor("#15131C")
C_MUTED = HexColor("#5B5566")


def _styles():
    base = ParagraphStyle("base", fontName="Helvetica", fontSize=10.5, leading=16, textColor=C_INK)
    return {
        "cover_title": ParagraphStyle("cover_title", parent=base, fontName="Helvetica-Bold", fontSize=34, leading=38, alignment=TA_CENTER, textColor=C_INK),
        "cover_sub": ParagraphStyle("cover_sub", parent=base, fontSize=12, leading=18, alignment=TA_CENTER, textColor=C_MUTED),
        "cover_edition": ParagraphStyle("cover_edition", parent=base, fontName="Helvetica-Bold", fontSize=13, alignment=TA_CENTER, textColor=C_GREEN),
        "kicker": ParagraphStyle("kicker", parent=base, fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=C_ORANGE, spaceAfter=2),
        "h1": ParagraphStyle("h1", parent=base, fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=C_INK, spaceBefore=10, spaceAfter=8),
        "h2": ParagraphStyle("h2", parent=base, fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=C_GREEN, spaceBefore=12, spaceAfter=4),
        "p": ParagraphStyle("p", parent=base, spaceAfter=8),
        "quote": ParagraphStyle("quote", parent=base, fontName="Helvetica-BoldOblique", fontSize=13, leading=18, textColor=C_ORANGE, leftIndent=14, spaceBefore=6, spaceAfter=10, borderColor=C_ORANGE),
        "terms": ParagraphStyle("terms", parent=base, fontSize=9.5, leading=14, textColor=C_BLUE, spaceBefore=4, spaceAfter=6),
        "li": ParagraphStyle("li", parent=base, leftIndent=14, bulletIndent=2, spaceAfter=4),
        "note": ParagraphStyle("note", parent=base, fontSize=9.5, leading=14, textColor=C_MUTED, spaceAfter=6),
    }


def _esc(t: str) -> str:
    return html_lib.escape(t or "")


def _build_pdf(blocks: List[PdfBlock]) -> bytes:
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=letter,
        leftMargin=0.9 * inch, rightMargin=0.9 * inch,
        topMargin=0.85 * inch, bottomMargin=0.8 * inch,
        title="The Needle Drop",
    )
    st = _styles()
    story = []
    for b in blocks:
        if b.t == "pagebreak":
            story.append(PageBreak())
        elif b.t == "rule":
            story.append(Spacer(1, 6))
            story.append(HRFlowable(width="100%", thickness=1, color=C_GREEN))
            story.append(Spacer(1, 6))
        elif b.t == "cover":
            story.append(Spacer(1, 1.6 * inch))
            story.append(Paragraph(_esc(b.text or "The Needle Drop"), st["cover_title"]))
            story.append(Spacer(1, 0.2 * inch))
            if b.sub:
                story.append(Paragraph(_esc(b.sub), st["cover_sub"]))
            story.append(Spacer(1, 0.35 * inch))
            if b.edition:
                story.append(Paragraph(_esc(b.edition), st["cover_edition"]))
            story.append(Spacer(1, 0.5 * inch))
            story.append(Paragraph("Rave And Warehouse DJ Association &middot; A non-profit professional association", st["note"]))
            story.append(PageBreak())
        elif b.t == "kicker":
            story.append(Paragraph(_esc(b.text).upper(), st["kicker"]))
        elif b.t == "h1":
            story.append(Paragraph(_esc(b.text), st["h1"]))
        elif b.t == "h2":
            story.append(Paragraph(_esc(b.text), st["h2"]))
        elif b.t == "p":
            story.append(Paragraph(_esc(b.text), st["p"]))
        elif b.t == "quote":
            story.append(Paragraph("&ldquo;" + _esc(b.text) + "&rdquo;", st["quote"]))
        elif b.t == "terms":
            story.append(Paragraph("<b>Key terms:</b> " + _esc(b.text), st["terms"]))
        elif b.t == "li":
            story.append(Paragraph("&bull;&nbsp;&nbsp;" + _esc(b.text), st["li"]))
        elif b.t == "note":
            story.append(Paragraph(_esc(b.text), st["note"]))
    doc.build(story)
    return buf.getvalue()


@api_router.post("/downloads/pdf")
async def downloads_pdf(req: PdfRequest):
    pdf_bytes = _build_pdf(req.blocks)
    safe_name = "".join(c for c in req.filename if c.isalnum() or c in "-_.") or "the-needle-drop.pdf"
    if not safe_name.lower().endswith(".pdf"):
        safe_name += ".pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )

# ----------------------------- Teacher gate (cert-unlocked) -----------------------------
class UnlockRequest(BaseModel):
    serial: str


def _create_teacher_token(serial: str, name: str) -> str:
    payload = {
        "serial": serial,
        "name": name,
        "scope": "teacher",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


async def require_teacher(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Teacher access token required.")
    token = auth[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Access expired. Unlock again with your certificate.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid access token.")
    if payload.get("scope") != "teacher":
        raise HTTPException(status_code=401, detail="Invalid access scope.")
    return payload


@api_router.post("/teacher/unlock")
async def teacher_unlock(req: UnlockRequest):
    serial = req.serial.strip()
    doc = await db.certificates.find_one({"serial": serial}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=403, detail="That certificate serial was not found. Enter a valid RAWDJA serial.")
    expected = _compute_hash(doc["serial"], doc["name"], doc["issued_at"], doc["seq"], doc["prev_hash"])
    if expected != doc["hash"]:
        raise HTTPException(status_code=403, detail="Certificate failed integrity check.")
    token = _create_teacher_token(doc["serial"], doc["name"])
    return {"token": token, "holder": doc["name"], "serial": doc["serial"]}


@api_router.get("/teacher/content")
async def get_teacher_content(_=Depends(require_teacher)):
    return {
        "course": COURSE_META,
        "guide": TEACHER_GUIDE,
        "editorial": EDITORIAL,
        "glossary": GLOSSARY,
    }


def _teacher_blocks() -> List[PdfBlock]:
    b: List[PdfBlock] = [PdfBlock(t="cover", text=COURSE_META["title"], sub=COURSE_META["subtitle"], edition="TEACHER'S EDITION")]
    b.append(PdfBlock(t="h1", text="How to use this guide"))
    b.append(PdfBlock(t="p", text=TEACHER_GUIDE["intro"]))
    b.append(PdfBlock(t="h2", text="Learning objectives"))
    for o in TEACHER_GUIDE["objectives"]:
        b.append(PdfBlock(t="li", text=o))
    b.append(PdfBlock(t="pagebreak"))
    b.append(PdfBlock(t="h1", text="Lesson plans"))
    for l in TEACHER_GUIDE["lessons"]:
        b.append(PdfBlock(t="h2", text=f"{l['module']}  ({l['duration']})"))
        b.append(PdfBlock(t="p", text=f"Objective: {l['objective']}"))
        for a in l["activities"]:
            b.append(PdfBlock(t="li", text=a))
    b.append(PdfBlock(t="pagebreak"))
    b.append(PdfBlock(t="h1", text="Discussion questions"))
    for i, q in enumerate(TEACHER_GUIDE["discussion"], 1):
        b.append(PdfBlock(t="li", text=f"Q{i}. {q}"))
    b.append(PdfBlock(t="h2", text="Assessment ideas"))
    for a in TEACHER_GUIDE["assessmentIdeas"]:
        b.append(PdfBlock(t="li", text=a))
    b.append(PdfBlock(t="pagebreak"))
    b.append(PdfBlock(t="h1", text="Glossary"))
    for g in GLOSSARY:
        b.append(PdfBlock(t="p", text=f"{g['term']} — {g['def']}"))
    b.append(PdfBlock(t="h2", text="Further resources"))
    for r in TEACHER_GUIDE["resources"]:
        b.append(PdfBlock(t="li", text=f"{r['type']}: {r['text']}"))
    b.append(PdfBlock(t="h2", text="Editorial process (3-pass review)"))
    for p in EDITORIAL["passes"]:
        b.append(PdfBlock(t="p", text=p["pass"]))
        b.append(PdfBlock(t="note", text=p["note"]))
    return b


@api_router.post("/teacher/pdf")
async def teacher_pdf(_=Depends(require_teacher)):
    pdf_bytes = _build_pdf(_teacher_blocks())
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="The-Needle-Drop-Teachers-Edition.pdf"'},
    )




app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def ensure_indexes():
    # Unique seq guarantees the append-only ledger cannot fork under concurrency.
    await db.certificates.create_index("seq", unique=True)
    await db.certificates.create_index("serial", unique=True)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
