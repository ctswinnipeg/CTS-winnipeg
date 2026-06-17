import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { ArrowLeft, Download, Archive, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=400x400&color=0a0e27&bgcolor=FFFFFF&margin=0&data=' +
  encodeURIComponent(
    'https://www.eventbrite.com/e/church-tech-summit-winnipeg-tickets-1991739238679?aff=oddtdtcreator'
  );

const NAVY = '#0a0e27';
const NAVY2 = '#141a4a';
const WHITE = '#ffffff';
const ACCENT = '#38bdf8';
const W80 = 'rgba(255,255,255,0.80)';
const W60 = 'rgba(255,255,255,0.55)';
const W30 = 'rgba(255,255,255,0.25)';
const A20 = 'rgba(56,189,248,0.18)';
const A10 = 'rgba(56,189,248,0.08)';

/* ───────── download helper ───────── */
async function download(
  ref: React.RefObject<HTMLDivElement | null>,
  w: number,
  h: number,
  name: string,
) {
  if (!ref.current) return;
  try {
    const url = await toPng(ref.current, {
      width: w,
      height: h,
      pixelRatio: 2,
      cacheBust: true,
      style: { transform: 'none' },
    });
    const a = document.createElement('a');
    a.download = name;
    a.href = url;
    a.click();
  } catch (e) {
    console.error(e);
  }
}

/* ───────── get PNG blob helper ───────── */
async function getPngBlob(
  ref: React.RefObject<HTMLDivElement | null>,
  w: number,
  h: number,
): Promise<Blob | null> {
  if (!ref.current) return null;
  try {
    const dataUrl = await toPng(ref.current, {
      width: w,
      height: h,
      pixelRatio: 2,
      cacheBust: true,
      style: { transform: 'none' },
    });
    const res = await fetch(dataUrl);
    return await res.blob();
  } catch (e) {
    console.error(e);
    return null;
  }
}

/* ───────── reusable wrapper ───────── */
function Card({
  label,
  dims,
  filename,
  posterRef,
  width,
  height,
  children,
}: {
  label: string;
  dims: string;
  filename: string;
  posterRef: React.RefObject<HTMLDivElement | null>;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const maxW = 580;
  const scale = Math.min(maxW / width, 1);

  return (
    <div className="mb-14">
      <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h3 className="text-white font-bold font-[family-name:var(--font-display)] text-lg">
            {label}
          </h3>
          <p className="text-blue-300/40 text-sm">{dims}</p>
        </div>
        <button
          onClick={() => download(posterRef, width, height, filename)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
        >
          <Download size={16} />
          Download PNG
        </button>
      </div>
      <div
        className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/5"
        style={{ width: width * scale, height: height * scale }}
      >
        <div
          ref={posterRef}
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ───────── decorative ring ───────── */
function Ring({ size, top, left, right, bottom, color = A20 }: any) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        top,
        left,
        right,
        bottom,
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   1. META AD — LANDSCAPE 1200×628
   Diagonal split layout, info scattered
   ═══════════════════════════════════════════ */
function MetaLandscape({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 1200,
        height: 628,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal accent slab */}
      <div style={{ position: 'absolute', top: -80, right: -120, width: 600, height: 900, background: NAVY2, transform: 'rotate(-12deg)', borderRadius: 40 }} />
      {/* Rings */}
      <Ring size={280} top={-80} left={-60} />
      <Ring size={180} bottom={40} left={320} color={A10} />
      <Ring size={400} top={100} right={-100} color={A10} />
      {/* Horizontal accent bar — top */}
      <div style={{ position: 'absolute', top: 0, left: 60, width: 200, height: 4, background: ACCENT, borderRadius: 2 }} />
      {/* Vertical accent bar — right */}
      <div style={{ position: 'absolute', top: 60, right: 0, width: 4, height: 160, background: ACCENT, borderRadius: 2 }} />
      {/* Dot grid bottom-left */}
      <div style={{ position: 'absolute', bottom: 30, left: 60, display: 'grid', gridTemplateColumns: 'repeat(5, 8px)', gap: 12, opacity: 0.25 }}>
        {[...Array(15)].map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT }} />)}
      </div>

      {/* TOP-LEFT — title */}
      <div style={{ position: 'absolute', top: 48, left: 60 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 64, lineHeight: 0.95, color: WHITE }}>
          CHURCH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 64, lineHeight: 0.95, color: WHITE }}>
          TECH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 64, lineHeight: 0.95, color: ACCENT }}>
          SUMMIT
        </div>
      </div>

      {/* BOTTOM-LEFT — date + location */}
      <div style={{ position: 'absolute', bottom: 48, left: 60 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: W60, marginBottom: 4 }}>📅 July 11, 2026 · Noon</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: W30 }}>📍 341 Willton Street, Winnipeg</div>
      </div>

      {/* TOP-RIGHT — topics badge */}
      <div style={{ position: 'absolute', top: 48, right: 60, textAlign: 'right' }}>
        <div style={{
          display: 'inline-block',
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 3,
          textTransform: 'uppercase',
          border: `1px solid ${A20}`,
          borderRadius: 100,
          padding: '7px 18px',
        }}>
          🔊 Audio &nbsp;·&nbsp; 💡 Lighting
        </div>
      </div>

      {/* MIDDLE-RIGHT — Winnipeg */}
      <div style={{ position: 'absolute', top: '50%', right: 60, transform: 'translateY(-50%)' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 32, color: W60, letterSpacing: 6, textAlign: 'right' }}>
          WINNIPEG
        </div>
        <div style={{ width: 50, height: 3, background: ACCENT, borderRadius: 2, marginTop: 10, marginLeft: 'auto' }} />
      </div>

      {/* BOTTOM-RIGHT — QR */}
      <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ textAlign: 'right', marginBottom: 4 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: NAVY, background: ACCENT, padding: '8px 22px', borderRadius: 100, display: 'inline-block', marginBottom: 6 }}>
            Register Now →
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: W30 }}>Scan to register</div>
        </div>
        <div style={{ background: WHITE, borderRadius: 12, padding: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
          <img src={QR_URL} width={100} height={100} style={{ display: 'block' }} crossOrigin="anonymous" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. META AD — SQUARE 1080×1080
   Corner-spread layout
   ═══════════════════════════════════════════ */
function MetaSquare({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 1080,
        height: 1080,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large accent block top-right corner */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 360, height: 360, background: NAVY2, borderRadius: '0 0 0 60px' }} />
      {/* Accent strip left edge */}
      <div style={{ position: 'absolute', top: 80, left: 0, width: 5, height: 300, background: ACCENT, borderRadius: 2 }} />
      {/* Accent strip bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 80, width: 250, height: 5, background: ACCENT, borderRadius: 2 }} />
      {/* Rings */}
      <Ring size={350} bottom={-120} right={-80} />
      <Ring size={200} top={350} left={-60} color={A10} />
      {/* Dot grid top-left */}
      <div style={{ position: 'absolute', top: 70, left: 70, display: 'grid', gridTemplateColumns: 'repeat(4, 8px)', gap: 14, opacity: 0.2 }}>
        {[...Array(16)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />)}
      </div>
      {/* Dot grid bottom-right */}
      <div style={{ position: 'absolute', bottom: 180, right: 70, display: 'grid', gridTemplateColumns: 'repeat(3, 8px)', gap: 14, opacity: 0.15 }}>
        {[...Array(9)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: WHITE }} />)}
      </div>

      {/* TOP-LEFT — badge */}
      <div style={{ position: 'absolute', top: 75, left: 75 }}>
        <div style={{
          display: 'inline-block',
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 3,
          textTransform: 'uppercase',
          border: `1px solid ${A20}`,
          borderRadius: 100,
          padding: '8px 20px',
        }}>
          July 11, 2026
        </div>
      </div>

      {/* TOP-RIGHT — topics */}
      <div style={{ position: 'absolute', top: 75, right: 75, textAlign: 'right' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT, letterSpacing: 2 }}>
          🔊 Audio
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: ACCENT, letterSpacing: 2, marginTop: 6 }}>
          💡 Lighting
        </div>
      </div>

      {/* CENTER — title stacked */}
      <div style={{ position: 'absolute', top: '50%', left: 75, transform: 'translateY(-55%)' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 90, lineHeight: 0.92, color: WHITE }}>
          CHURCH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 90, lineHeight: 0.92, color: WHITE }}>
          TECH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 90, lineHeight: 0.92, color: ACCENT }}>
          SUMMIT
        </div>
        <div style={{ width: 60, height: 4, background: ACCENT, borderRadius: 2, marginTop: 18 }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 28, color: W60, letterSpacing: 8, marginTop: 14 }}>
          WINNIPEG
        </div>
      </div>

      {/* BOTTOM-LEFT — location */}
      <div style={{ position: 'absolute', bottom: 75, left: 75 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: W60, marginBottom: 4 }}>📍 341 Willton Street</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: W30 }}>Winnipeg · Starting at Noon</div>
      </div>

      {/* BOTTOM-RIGHT — QR */}
      <div style={{ position: 'absolute', bottom: 65, right: 75, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: WHITE, borderRadius: 14, padding: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
          <img src={QR_URL} width={120} height={120} style={{ display: 'block' }} crossOrigin="anonymous" />
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: W30, marginTop: 8 }}>Scan to register</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. YOUTUBE BANNER 2560×1440
   Wide cinematic spread
   ═══════════════════════════════════════════ */
function YTBanner({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 2560,
        height: 1440,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Giant accent diagonal slab */}
      <div style={{ position: 'absolute', top: -200, right: -300, width: 1200, height: 1800, background: NAVY2, transform: 'rotate(-8deg)', borderRadius: 80 }} />
      {/* Accent bars */}
      <div style={{ position: 'absolute', top: 0, left: 200, width: 400, height: 5, background: ACCENT }} />
      <div style={{ position: 'absolute', bottom: 0, right: 200, width: 400, height: 5, background: ACCENT }} />
      <div style={{ position: 'absolute', top: 100, left: 0, width: 5, height: 500, background: ACCENT, borderRadius: 2 }} />
      <div style={{ position: 'absolute', bottom: 100, right: 0, width: 5, height: 500, background: ACCENT, borderRadius: 2 }} />
      {/* Rings */}
      <Ring size={500} top={-150} left={-120} />
      <Ring size={350} bottom={-100} right={300} color={A10} />
      <Ring size={600} top={400} right={-200} color={A10} />
      {/* Dot grids */}
      <div style={{ position: 'absolute', top: 120, right: 200, display: 'grid', gridTemplateColumns: 'repeat(6, 8px)', gap: 16, opacity: 0.18 }}>
        {[...Array(24)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />)}
      </div>
      <div style={{ position: 'absolute', bottom: 120, left: 200, display: 'grid', gridTemplateColumns: 'repeat(5, 8px)', gap: 16, opacity: 0.12 }}>
        {[...Array(15)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: WHITE }} />)}
      </div>

      {/* TOP-LEFT — date badge */}
      <div style={{ position: 'absolute', top: 80, left: 120 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 4,
          textTransform: 'uppercase',
          border: `1px solid ${A20}`,
          borderRadius: 100,
          padding: '10px 28px',
          display: 'inline-block',
        }}>
          July 11, 2026 · Noon
        </div>
      </div>

      {/* TOP-RIGHT — topics stacked */}
      <div style={{ position: 'absolute', top: 80, right: 120, textAlign: 'right' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: ACCENT, letterSpacing: 3 }}>
          🔊 AUDIO
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: ACCENT, letterSpacing: 3, marginTop: 8 }}>
          💡 LIGHTING
        </div>
      </div>

      {/* CENTER-LEFT — main title */}
      <div style={{ position: 'absolute', top: '50%', left: 120, transform: 'translateY(-55%)' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 150, lineHeight: 0.92, color: WHITE }}>
          CHURCH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 150, lineHeight: 0.92, color: WHITE }}>
          TECH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 150, lineHeight: 0.92, color: ACCENT }}>
          SUMMIT
        </div>
      </div>

      {/* MIDDLE-RIGHT — Winnipeg */}
      <div style={{ position: 'absolute', top: '50%', right: 120, transform: 'translateY(-50%)', textAlign: 'right' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 48, color: W60, letterSpacing: 10 }}>
          WINNIPEG
        </div>
        <div style={{ width: 70, height: 4, background: ACCENT, borderRadius: 2, marginTop: 14, marginLeft: 'auto' }} />
      </div>

      {/* BOTTOM-LEFT — location */}
      <div style={{ position: 'absolute', bottom: 80, left: 120 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: W60 }}>📍 341 Willton Street, Winnipeg</div>
      </div>

      {/* BOTTOM-RIGHT — QR + CTA */}
      <div style={{ position: 'absolute', bottom: 60, right: 120, display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ textAlign: 'right', marginBottom: 6 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: NAVY, background: ACCENT, padding: '12px 32px', borderRadius: 100, display: 'inline-block', marginBottom: 8 }}>
            Register Now →
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: W30 }}>Scan to register</div>
        </div>
        <div style={{ background: WHITE, borderRadius: 16, padding: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
          <img src={QR_URL} width={110} height={110} style={{ display: 'block' }} crossOrigin="anonymous" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. YOUTUBE DISPLAY PICTURE 800×800
   Off-center monogram with scattered elements
   ═══════════════════════════════════════════ */
function YTDP({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 800,
        height: 800,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner block */}
      <div style={{ position: 'absolute', top: -30, right: -30, width: 260, height: 260, background: NAVY2, borderRadius: '0 0 0 50px' }} />
      {/* Accent bars */}
      <div style={{ position: 'absolute', top: 0, left: 50, width: 120, height: 4, background: ACCENT }} />
      <div style={{ position: 'absolute', bottom: 50, right: 0, width: 4, height: 120, background: ACCENT, borderRadius: 2 }} />
      {/* Rings */}
      <Ring size={250} bottom={-80} left={-60} />
      <Ring size={150} top={200} right={40} color={A10} />
      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 50, left: 50, display: 'grid', gridTemplateColumns: 'repeat(3, 8px)', gap: 12, opacity: 0.2 }}>
        {[...Array(9)].map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT }} />)}
      </div>

      {/* TOP-LEFT — year tag */}
      <div style={{ position: 'absolute', top: 50, left: 55 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: W30, letterSpacing: 4 }}>2026</div>
      </div>

      {/* TOP-RIGHT — stacked label */}
      <div style={{ position: 'absolute', top: 50, right: 55, textAlign: 'right' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, color: ACCENT, letterSpacing: 3, textTransform: 'uppercase' }}>Church Tech</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, color: W30, letterSpacing: 3, textTransform: 'uppercase', marginTop: 2 }}>Summit</div>
      </div>

      {/* CENTER — big monogram pushed slightly up-left */}
      <div style={{ position: 'absolute', top: '44%', left: '46%', transform: 'translate(-50%, -50%)' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: 200,
          lineHeight: 1,
          color: WHITE,
        }}>
          C<span style={{ color: ACCENT }}>T</span>S
        </div>
      </div>

      {/* BOTTOM-RIGHT — Winnipeg */}
      <div style={{ position: 'absolute', bottom: 50, right: 55, textAlign: 'right' }}>
        <div style={{ width: 40, height: 3, background: ACCENT, borderRadius: 2, marginBottom: 10, marginLeft: 'auto' }} />
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: W60, letterSpacing: 5 }}>WINNIPEG</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. EVENTBRITE BANNER 2160×1080
   Full-bleed cinematic — NO QR
   ═══════════════════════════════════════════ */
function EBBanner({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 2160,
        height: 1080,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Giant diagonal slab */}
      <div style={{ position: 'absolute', top: -300, right: -200, width: 1000, height: 1700, background: NAVY2, transform: 'rotate(-10deg)', borderRadius: 80 }} />
      {/* Accent edges */}
      <div style={{ position: 'absolute', top: 0, left: 140, width: 360, height: 5, background: ACCENT }} />
      <div style={{ position: 'absolute', bottom: 0, right: 140, width: 360, height: 5, background: ACCENT }} />
      <div style={{ position: 'absolute', top: 80, left: 0, width: 5, height: 400, background: ACCENT, borderRadius: 2 }} />
      <div style={{ position: 'absolute', bottom: 80, right: 0, width: 5, height: 400, background: ACCENT, borderRadius: 2 }} />
      {/* Rings */}
      <Ring size={450} top={-150} left={-100} />
      <Ring size={300} bottom={-80} right={200} color={A10} />
      <Ring size={550} top={250} right={-120} color={A10} />
      {/* Dot grids */}
      <div style={{ position: 'absolute', top: 100, right: 140, display: 'grid', gridTemplateColumns: 'repeat(5, 8px)', gap: 16, opacity: 0.16 }}>
        {[...Array(20)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />)}
      </div>
      <div style={{ position: 'absolute', bottom: 100, left: 140, display: 'grid', gridTemplateColumns: 'repeat(4, 8px)', gap: 14, opacity: 0.1 }}>
        {[...Array(12)].map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: WHITE }} />)}
      </div>

      {/* TOP-LEFT — date badge */}
      <div style={{ position: 'absolute', top: 80, left: 100 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: ACCENT,
          letterSpacing: 4,
          textTransform: 'uppercase',
          border: `1px solid ${A20}`,
          borderRadius: 100,
          padding: '10px 26px',
          display: 'inline-block',
        }}>
          July 11, 2026 · Noon
        </div>
      </div>

      {/* TOP-RIGHT — topics */}
      <div style={{ position: 'absolute', top: 80, right: 100, textAlign: 'right' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: ACCENT, letterSpacing: 3 }}>
          🔊 AUDIO
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: ACCENT, letterSpacing: 3, marginTop: 8 }}>
          💡 LIGHTING
        </div>
      </div>

      {/* CENTER-LEFT — huge title */}
      <div style={{ position: 'absolute', top: '50%', left: 100, transform: 'translateY(-55%)' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 130, lineHeight: 0.92, color: WHITE }}>
          CHURCH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 130, lineHeight: 0.92, color: WHITE }}>
          TECH
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 130, lineHeight: 0.92, color: ACCENT }}>
          SUMMIT
        </div>
      </div>

      {/* MIDDLE-RIGHT — Winnipeg */}
      <div style={{ position: 'absolute', top: '50%', right: 100, transform: 'translateY(-50%)', textAlign: 'right' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 42, color: W60, letterSpacing: 10 }}>
          WINNIPEG
        </div>
        <div style={{ width: 60, height: 4, background: ACCENT, borderRadius: 2, marginTop: 14, marginLeft: 'auto' }} />
      </div>

      {/* BOTTOM-LEFT — location */}
      <div style={{ position: 'absolute', bottom: 80, left: 100 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: W60 }}>📍 341 Willton Street, Winnipeg</div>
      </div>

      {/* BOTTOM-RIGHT — CTA only (no QR) */}
      <div style={{ position: 'absolute', bottom: 80, right: 100 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: NAVY,
          background: ACCENT,
          padding: '14px 40px',
          borderRadius: 100,
          display: 'inline-block',
        }}>
          Register Now →
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   6. EVENTBRITE DISPLAY PICTURE 500×500
   Asymmetric monogram
   ═══════════════════════════════════════════ */
function EBDP({ posterRef }: { posterRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={posterRef}
      style={{
        width: 500,
        height: 500,
        background: NAVY,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner block */}
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 180, height: 180, background: NAVY2, borderRadius: '40px 0 0 0' }} />
      {/* Accent bars */}
      <div style={{ position: 'absolute', top: 0, left: 35, width: 80, height: 3, background: ACCENT }} />
      <div style={{ position: 'absolute', bottom: 35, right: 0, width: 3, height: 80, background: ACCENT, borderRadius: 2 }} />
      {/* Rings */}
      <Ring size={180} top={-50} right={-50} color={A10} />
      <Ring size={120} bottom={80} left={-40} color={A10} />
      {/* Dots */}
      <div style={{ position: 'absolute', top: 40, right: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 7px)', gap: 10, opacity: 0.18 }}>
        {[...Array(9)].map((_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: ACCENT }} />)}
      </div>

      {/* TOP-LEFT — year */}
      <div style={{ position: 'absolute', top: 35, left: 38 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 10, color: W30, letterSpacing: 4 }}>2026</div>
      </div>

      {/* CENTER — monogram pushed slightly up */}
      <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: 120,
          lineHeight: 1,
          color: WHITE,
          textAlign: 'center',
        }}>
          C<span style={{ color: ACCENT }}>T</span>S
        </div>
      </div>

      {/* BOTTOM-LEFT — label */}
      <div style={{ position: 'absolute', bottom: 38, left: 38 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 11, color: W80, letterSpacing: 3, textTransform: 'uppercase' }}>
          Church Tech Summit
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 10, color: W30, marginTop: 3, letterSpacing: 2 }}>
          WINNIPEG
        </div>
      </div>

      {/* BOTTOM-RIGHT — accent line */}
      <div style={{ position: 'absolute', bottom: 44, right: 38 }}>
        <div style={{ width: 30, height: 3, background: ACCENT, borderRadius: 2, marginLeft: 'auto' }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   GALLERY PAGE
   ═══════════════════════════════════════════ */
export default function Posters({ onBack }: { onBack: () => void }) {
  const [downloading, setDownloading] = useState(false);
  
  const metaLandRef = useRef<HTMLDivElement>(null);
  const metaSqRef   = useRef<HTMLDivElement>(null);
  const ytBanRef    = useRef<HTMLDivElement>(null);
  const ytDpRef     = useRef<HTMLDivElement>(null);
  const ebBanRef    = useRef<HTMLDivElement>(null);
  const ebDpRef     = useRef<HTMLDivElement>(null);

  const posters = [
    { ref: metaLandRef, w: 1200, h: 628,  name: 'CTS-Meta-Ad-Landscape.png' },
    { ref: metaSqRef,   w: 1080, h: 1080, name: 'CTS-Meta-Ad-Square.png' },
    { ref: ytBanRef,    w: 2560, h: 1440, name: 'CTS-YouTube-Banner.png' },
    { ref: ytDpRef,     w: 800,  h: 800,  name: 'CTS-YouTube-DP.png' },
    { ref: ebBanRef,    w: 2160, h: 1080, name: 'CTS-Eventbrite-Banner.png' },
    { ref: ebDpRef,     w: 500,  h: 500,  name: 'CTS-Eventbrite-DP.png' },
  ];

  async function downloadAllAsZip() {
    setDownloading(true);
    try {
      const zip = new JSZip();
      
      for (const poster of posters) {
        const blob = await getPngBlob(poster.ref, poster.w, poster.h);
        if (blob) {
          zip.file(poster.name, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'CTS-Winnipeg-Posters.zip');
    } catch (e) {
      console.error('Error creating zip:', e);
    }
    setDownloading(false);
  }

  return (
    <div className="min-h-screen bg-navy-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to Website
          </button>
          <h1 className="text-white font-bold font-[family-name:var(--font-display)] text-sm sm:text-base">
            Poster Downloads
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white mb-3">
            Platform <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">Posters</span>
          </h2>
          <p className="text-blue-200/40 text-sm max-w-md mx-auto mb-8">
            Download individual posters or get all 6 as a ZIP file.
          </p>

          {/* Download All Button */}
          <button
            onClick={downloadAllAsZip}
            disabled={downloading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-navy-950 font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {downloading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Generating ZIP...
              </>
            ) : (
              <>
                <Archive size={22} />
                Download All as ZIP
              </>
            )}
          </button>
        </div>

        {/* META ADS */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-sky-400 border border-sky-400/20 bg-sky-400/5">
            Meta Ads
          </span>
        </div>
        <Card label="Meta Ad — Landscape" dims="1200 × 628 px" filename="CTS-Meta-Ad-Landscape.png" posterRef={metaLandRef} width={1200} height={628}>
          <MetaLandscape posterRef={metaLandRef} />
        </Card>
        <Card label="Meta Ad — Square" dims="1080 × 1080 px" filename="CTS-Meta-Ad-Square.png" posterRef={metaSqRef} width={1080} height={1080}>
          <MetaSquare posterRef={metaSqRef} />
        </Card>

        {/* YOUTUBE */}
        <div className="mb-4 mt-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-sky-400 border border-sky-400/20 bg-sky-400/5">
            YouTube
          </span>
        </div>
        <Card label="YouTube Banner" dims="2560 × 1440 px" filename="CTS-YouTube-Banner.png" posterRef={ytBanRef} width={2560} height={1440}>
          <YTBanner posterRef={ytBanRef} />
        </Card>
        <Card label="YouTube Display Picture" dims="800 × 800 px" filename="CTS-YouTube-DP.png" posterRef={ytDpRef} width={800} height={800}>
          <YTDP posterRef={ytDpRef} />
        </Card>

        {/* EVENTBRITE */}
        <div className="mb-4 mt-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-sky-400 border border-sky-400/20 bg-sky-400/5">
            Eventbrite
          </span>
        </div>
        <Card label="Eventbrite Banner" dims="2160 × 1080 px" filename="CTS-Eventbrite-Banner.png" posterRef={ebBanRef} width={2160} height={1080}>
          <EBBanner posterRef={ebBanRef} />
        </Card>
        <Card label="Eventbrite Display Picture" dims="500 × 500 px" filename="CTS-Eventbrite-DP.png" posterRef={ebDpRef} width={500} height={500}>
          <EBDP posterRef={ebDpRef} />
        </Card>
      </div>
    </div>
  );
}
