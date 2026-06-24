from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import DuplicateKeyError
import os
import logging
import hashlib
import random
import string
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
