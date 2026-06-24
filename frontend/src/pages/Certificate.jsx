import React, { useState, useEffect } from "react";
import { Award, Printer, ShieldCheck, ShieldAlert, Loader2, Search, Crown } from "lucide-react";
import api from "../lib/api";
import { RawdjaSeal } from "../components/RawdjaSeal";
import { Reveal } from "../components/Reveal";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
};

function CertificateCard({ cert }) {
  const isFounder = cert.seq === 1;
  return (
    <div data-testid="certificate-card" className="cert-print relative bg-cardp border-2 border-neon-green rounded-md overflow-hidden">
      <div className="absolute inset-0 chevron-strip opacity-[0.06]" />
      <div className="absolute top-0 left-0 right-0 h-2 chevron-strip opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-2 chevron-strip opacity-80" />

      <div className="relative p-8 sm:p-12 text-center">
        <div className="flex justify-center mb-4">
          <RawdjaSeal size={110} />
        </div>
        <div className="font-mono-x text-[10px] sm:text-xs uppercase tracking-[0.35em] text-neon-orange">
          Rave And Warehouse DJ Association
        </div>
        <h2 className="mt-4 font-display font-black uppercase tracking-tighter text-3xl sm:text-4xl">
          Certificate of <span className="text-neon-green">Completion</span>
        </h2>
        <p className="mt-6 text-white/60 text-sm uppercase tracking-wide">This certifies that</p>
        <p className="mt-2 font-display font-extrabold uppercase tracking-tight text-3xl sm:text-5xl text-neon-orange text-glow-orange break-words">
          {cert.name}
        </p>

        {isFounder && (
          <div className="mt-3 inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase text-xs tracking-wide px-4 py-1.5 rounded-sm">
            <Crown className="w-4 h-4" /> Founder · Certificate No. 1
          </div>
        )}

        <p className="mt-6 text-white/75 max-w-lg mx-auto leading-relaxed">
          has successfully completed <span className="text-neon-green font-semibold">{cert.course}</span> and is
          recognized as a student of DJ &amp; rave culture history.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          <div className="border border-white/15 rounded-sm p-4">
            <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Serial</div>
            <div className="font-mono-x text-xs text-neon-green mt-1 break-all">{cert.serial}</div>
          </div>
          <div className="border border-white/15 rounded-sm p-4">
            <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Issued</div>
            <div className="font-mono-x text-xs text-neon-blue mt-1">{fmtDate(cert.issued_at)}</div>
          </div>
          <div className="border border-white/15 rounded-sm p-4">
            <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Ledger #</div>
            <div className="font-mono-x text-xs text-neon-orange mt-1">{String(cert.seq).padStart(5, "0")}</div>
          </div>
        </div>

        <div className="mt-5 max-w-2xl mx-auto border border-neon-green/25 rounded-sm p-4 text-left">
          <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-neon-green" /> Hash-linked ledger fingerprint (SHA-256)
          </div>
          <div className="font-mono-x text-[10px] text-white/60 mt-1 break-all">{cert.hash}</div>
        </div>

        <p className="mt-6 font-mono-x text-[10px] uppercase tracking-widest text-white/40">
          Verify authenticity at xophur.com · serial {cert.serial}
        </p>
      </div>
    </div>
  );
}

export default function Certificate() {
  const [tab, setTab] = useState("issue");
  const [name, setName] = useState("");
  const [cert, setCert] = useState(null);
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState("");

  const [serial, setSerial] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);

  const [count, setCount] = useState(null);

  useEffect(() => {
    api.get("/stats").then((r) => setCount(r.data.certificates_issued)).catch(() => {});
  }, []);

  const issue = async () => {
    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    setError("");
    setIssuing(true);
    try {
      const r = await api.post("/certificates", { name: name.trim() });
      setCert(r.data);
      setCount((c) => (c == null ? 1 : c + 1));
    } catch (e) {
      setError("Could not issue certificate. Please try again.");
    } finally {
      setIssuing(false);
    }
  };

  const verify = async () => {
    if (!serial.trim()) return;
    setVerifying(true);
    setVerifyResult(null);
    try {
      const r = await api.get(`/certificates/verify/${encodeURIComponent(serial.trim())}`);
      setVerifyResult(r.data);
    } catch {
      setVerifyResult({ valid: false, message: "Verification failed. Check the serial and try again." });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div data-testid="certificate-page" className="relative z-10 pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="no-print">
          <Reveal>
            <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">RAWDJA · Official credential</span>
            <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
              Get <span className="text-neon-orange">Certified</span>
            </h1>
            <p className="mt-5 text-white/75 max-w-2xl leading-relaxed">
              Finished the course? Issue your official certificate from the Rave And Warehouse DJ Association. Every
              certificate is written into a tamper-evident, hash-linked ledger and is publicly verifiable by serial number.
            </p>
            {count != null && (
              <p className="mt-3 font-mono-x text-xs uppercase tracking-widest text-neon-blue">
                {count} certificate{count === 1 ? "" : "s"} issued to date
              </p>
            )}
          </Reveal>

          {/* Tabs */}
          <div className="mt-8 inline-flex border border-white/15 rounded-sm overflow-hidden">
            <button
              data-testid="tab-issue"
              onClick={() => setTab("issue")}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${tab === "issue" ? "bg-neon-green text-black" : "text-white/70 hover:text-white"}`}
            >
              Issue
            </button>
            <button
              data-testid="tab-verify"
              onClick={() => setTab("verify")}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${tab === "verify" ? "bg-neon-blue text-black" : "text-white/70 hover:text-white"}`}
            >
              Verify
            </button>
          </div>

          {tab === "issue" && (
            <div className="mt-8 bg-cardp border border-white/10 rounded-md p-6 sm:p-8">
              <label className="font-display uppercase text-sm tracking-tight text-neon-green">Your full name</label>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  data-testid="certificate-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && issue()}
                  placeholder="e.g. Xophur"
                  className="flex-1 bg-ink border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-neon-green focus:outline-none"
                />
                <button
                  data-testid="issue-certificate-btn"
                  onClick={issue}
                  disabled={issuing}
                  className="inline-flex items-center justify-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
                >
                  {issuing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                  Issue certificate
                </button>
              </div>
              {error && <p data-testid="certificate-error" className="mt-3 text-sm text-neon-orange">{error}</p>}
            </div>
          )}

          {tab === "verify" && (
            <div className="mt-8 bg-cardp border border-white/10 rounded-md p-6 sm:p-8">
              <label className="font-display uppercase text-sm tracking-tight text-neon-blue">Certificate serial number</label>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  data-testid="verify-serial-input"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && verify()}
                  placeholder="RAWDJA-2026-00001-XXXXXX"
                  className="flex-1 bg-ink border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-neon-blue focus:outline-none font-mono-x text-sm"
                />
                <button
                  data-testid="verify-certificate-btn"
                  onClick={verify}
                  disabled={verifying}
                  className="inline-flex items-center justify-center gap-2 bg-neon-blue text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 transition-all disabled:opacity-60"
                >
                  {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Verify
                </button>
              </div>

              {verifyResult && (
                <div
                  data-testid="verify-result"
                  className={`mt-5 flex items-start gap-3 rounded-sm p-4 border ${verifyResult.valid ? "border-neon-green/50 bg-neon-green/5" : "border-neon-orange/50 bg-neon-orange/5"}`}
                >
                  {verifyResult.valid ? <ShieldCheck className="w-5 h-5 text-neon-green shrink-0" /> : <ShieldAlert className="w-5 h-5 text-neon-orange shrink-0" />}
                  <div>
                    <p className={`font-bold uppercase text-sm tracking-wide ${verifyResult.valid ? "text-neon-green" : "text-neon-orange"}`}>
                      {verifyResult.valid ? "Authentic" : "Not verified"}
                    </p>
                    <p className="text-white/70 text-sm mt-1">{verifyResult.message}</p>
                    {verifyResult.valid && verifyResult.certificate && (
                      <p className="text-white/60 text-sm mt-2 font-mono-x">
                        {verifyResult.certificate.name} · issued {fmtDate(verifyResult.certificate.issued_at)} · ledger #{String(verifyResult.certificate.seq).padStart(5, "0")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Issued certificate */}
        {tab === "issue" && cert && (
          <div className="mt-10">
            <div className="no-print flex items-center justify-between mb-4">
              <p className="font-display uppercase text-sm tracking-tight text-neon-green">Your certificate is ready</p>
              <button
                data-testid="print-certificate-btn"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-neon-green text-black font-bold uppercase tracking-wide text-xs px-5 py-2.5 rounded-sm hover:brightness-110 glow-green"
              >
                <Printer className="w-4 h-4" /> Download / Print
              </button>
            </div>
            <CertificateCard cert={cert} />
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
  );
}
