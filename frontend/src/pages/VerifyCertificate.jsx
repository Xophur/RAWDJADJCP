import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ShieldAlert, Loader2, Search, Disc3 } from "lucide-react";
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

export default function VerifyCertificate() {
  const { serial: serialParam } = useParams();
  const navigate = useNavigate();
  const [serial, setSerial] = useState(serialParam || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runVerify = useCallback(async (s) => {
    if (!s || !s.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await api.get(`/certificates/verify/${encodeURIComponent(s.trim())}`);
      setResult(r.data);
    } catch {
      setResult({ valid: false, message: "Verification failed. Check the serial and try again." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (serialParam) {
      setSerial(serialParam);
      runVerify(serialParam);
    }
  }, [serialParam, runVerify]);

  const submit = () => {
    if (!serial.trim()) return;
    navigate(`/verify/${encodeURIComponent(serial.trim())}`);
    runVerify(serial);
  };

  const cert = result?.valid ? result.certificate : null;

  return (
    <div data-testid="verify-page" className="relative z-10 pt-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex justify-center mb-6"><RawdjaSeal size={110} /></div>
          <div className="text-center">
            <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">RAWDJA · Public verification</span>
            <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl">
              Verify a <span className="text-neon-green">Certificate</span>
            </h1>
            <p className="mt-5 text-white/75 leading-relaxed">
              Enter a RAWDJA certificate serial number to confirm it's authentic and recorded in the tamper-evident,
              hash-linked ledger.
            </p>
          </div>

          <div className="mt-8 bg-cardp border border-white/10 rounded-md p-6 sm:p-8">
            <label className="font-display uppercase text-sm tracking-tight text-neon-blue">Certificate serial number</label>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <input
                data-testid="verify-page-input"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="RAWDJA-2026-00001-XXXXXX"
                className="flex-1 bg-ink border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-neon-blue focus:outline-none font-mono-x text-sm"
              />
              <button
                data-testid="verify-page-btn"
                onClick={submit}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-neon-blue text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 transition-all disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Verify
              </button>
            </div>
          </div>
        </Reveal>

        {result && (
          <Reveal>
            <div
              data-testid="verify-page-result"
              className={`mt-6 rounded-md p-6 border ${result.valid ? "border-neon-green/50 bg-neon-green/5" : "border-neon-orange/50 bg-neon-orange/5"}`}
            >
              <div className="flex items-start gap-3">
                {result.valid ? <ShieldCheck className="w-6 h-6 text-neon-green shrink-0" /> : <ShieldAlert className="w-6 h-6 text-neon-orange shrink-0" />}
                <div className="flex-1">
                  <p className={`font-display uppercase tracking-tight text-xl ${result.valid ? "text-neon-green" : "text-neon-orange"}`}>
                    {result.valid ? "Authentic" : "Not verified"}
                  </p>
                  <p className="text-white/70 text-sm mt-1">{result.message}</p>

                  {cert && (
                    <div className="mt-5 grid sm:grid-cols-2 gap-4">
                      <div className="border border-white/15 rounded-sm p-4">
                        <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Holder (DJ)</div>
                        <div className="text-neon-orange font-display uppercase tracking-tight mt-1">{cert.name}</div>
                      </div>
                      <div className="border border-white/15 rounded-sm p-4">
                        <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Issued</div>
                        <div className="font-mono-x text-xs text-neon-blue mt-1">{fmtDate(cert.issued_at)}</div>
                      </div>
                      <div className="border border-white/15 rounded-sm p-4">
                        <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Ledger #</div>
                        <div className="font-mono-x text-xs text-neon-orange mt-1">{String(cert.seq).padStart(5, "0")}</div>
                      </div>
                      <div className="border border-white/15 rounded-sm p-4">
                        <div className="font-mono-x text-[9px] uppercase tracking-widest text-white/40">Serial</div>
                        <div className="font-mono-x text-xs text-neon-green mt-1 break-all">{cert.serial}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-10 text-center">
          <Link to="/certificate" className="inline-flex items-center gap-2 text-white/60 hover:text-neon-green text-sm">
            <Disc3 className="w-4 h-4" /> Don't have one? Get certified
          </Link>
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
