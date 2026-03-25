"use client";

import { motion } from "framer-motion";
import { qcData } from "@/lib/quotecalc-data";

/* ─── Palette & type tokens ──────────────────────────────────────────────── */
const C = {
  darkBg: "#0B1424",
  brandBlue: "#2563EB",
  orange: "#F97316",
  cream: "#F8FAFC",
  mutedCream: "rgba(248,250,252,0.6)",
  gold: "#F59E0B",
  blueFaint: "rgba(37,99,235,0.12)",
  blueBorder: "rgba(37,99,235,0.3)",
  blueLight: "#60A5FA",
  cardBg: "#0F1C35",
  topBarBg: "#0A1628",
  creamMuted70: "rgba(248,250,252,0.7)",
  creamMuted40: "rgba(248,250,252,0.4)",
  creamMuted65: "rgba(248,250,252,0.65)",
  creamMuted20: "rgba(248,250,252,0.2)",
  creamMuted50: "rgba(248,250,252,0.5)",
  creamMuted80: "rgba(248,250,252,0.8)",
  orangeFaint: "rgba(249,115,22,0.12)",
  orangeBorder: "rgba(249,115,22,0.3)",
};

/* ─── Easing ─────────────────────────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ─── Line items data ────────────────────────────────────────────────────── */
const lineItems = [
  { num: "01", desc: "Full bathroom strip out", amount: "£480" },
  { num: "02", desc: "Waterproofing & tanking", amount: "£320" },
  { num: "03", desc: "New tiling (floor+walls)", amount: "£950" },
  { num: "04", desc: "Sanitaryware fitting", amount: "£680" },
  { num: "05", desc: "Plumbing connections", amount: "£420" },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function TrafficLights() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {["#FF5F57", "#FFBD2E", "#28CA41"].map((color, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        backgroundColor: "rgba(248,250,252,0.08)",
        margin: "0 0",
      }}
    />
  );
}

function MockupCard() {
  return (
    <div style={{ position: "relative" }}>
      {/* Floating badge */}
      <div
        style={{
          position: "absolute",
          top: -12,
          right: -12,
          backgroundColor: C.orange,
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 11,
          borderRadius: 8,
          padding: "6px 12px",
          zIndex: 10,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
        }}
      >
        £2,850 saved in admin time
      </div>

      {/* Outer card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundColor: C.cardBg,
          border: `1px solid rgba(37,99,235,0.2)`,
          borderRadius: 20,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            backgroundColor: C.topBarBg,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <TrafficLights />
          <span
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 12,
              color: C.gold,
              letterSpacing: "0.05em",
              marginLeft: 4,
            }}
          >
            QC-2025-047
          </span>
          {/* Status badge */}
          <div
            style={{
              marginLeft: "auto",
              backgroundColor: "rgba(37,99,235,0.18)",
              border: "1px solid rgba(37,99,235,0.35)",
              borderRadius: 6,
              padding: "2px 9px",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 10,
              fontWeight: 600,
              color: C.blueLight,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Draft
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "0 0 0 0" }}>
          {/* Job title */}
          <div
            style={{
              padding: "16px 20px 10px",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: C.cream,
              letterSpacing: "-0.01em",
            }}
          >
            Bathroom Renovation — Jones Res.
          </div>

          <Divider />

          {/* Line items */}
          <div style={{ padding: "10px 20px 8px" }}>
            {lineItems.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6 + i * 0.06,
                  duration: 0.4,
                  ease,
                }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 10,
                  padding: "5px 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: 11,
                    color: C.gold,
                    flexShrink: 0,
                    width: 20,
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 13,
                    color: C.creamMuted70,
                    flex: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {item.desc}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.cream,
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {item.amount}
                </span>
              </motion.div>
            ))}
          </div>

          <Divider />

          {/* Subtotal + VAT */}
          <div style={{ padding: "10px 20px 0" }}>
            {[
              { label: "Subtotal", amount: "£2,850" },
              { label: "VAT (20%)", amount: "£570" },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12,
                }}
              >
                <span style={{ color: C.creamMuted40 }}>{row.label}</span>
                <span
                  style={{
                    color: C.creamMuted70,
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Total row */}
          <div
            style={{
              margin: "10px 20px 16px",
              backgroundColor: C.orangeFaint,
              borderTop: `1px solid ${C.orangeBorder}`,
              borderRadius: "0 0 8px 8px",
              padding: "10px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: C.orange,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: C.orange,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              £3,420
            </span>
          </div>
        </div>

        {/* ── AI prompt bar ── */}
        <div
          style={{
            backgroundColor: "rgba(37,99,235,0.15)",
            borderTop: "1px solid rgba(37,99,235,0.2)",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              color: C.blueLight,
              fontSize: 13,
              lineHeight: 1,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 12,
              color: C.blueLight,
              lineHeight: 1.4,
            }}
          >
            AI: Generated 5 line items for &ldquo;bathroom renovation&rdquo; &mdash; 12s ago
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function QCHero() {
  const { eyebrow, heading, body, cta, ctaNote, secondary } = qcData.hero;

  // Split heading to highlight "minutes"
  const headingParts = heading.replace(/\n/g, " ").split("minutes");

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100dvh",
        background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.15), transparent), ${C.darkBg}`,
        paddingTop: 120,
        paddingBottom: 80,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Shimmer keyframes injected inline once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

        .qc-hero-primary-btn {
          background-color: #F97316;
          color: #fff;
          height: 56px;
          padding: 0 32px;
          border-radius: 980px;
          border: none;
          font-family: Inter, system-ui, sans-serif;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.25s ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .qc-hero-primary-btn:hover {
          background-color: #EA6C0A;
        }
        .qc-hero-primary-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          animation: qc-shimmer-sweep 2.4s infinite;
        }
        @keyframes qc-shimmer-sweep {
          0%   { left: -70%; }
          100% { left: 130%; }
        }

        .qc-hero-secondary-btn {
          background-color: transparent;
          border: 1px solid rgba(248,250,252,0.2);
          color: rgba(248,250,252,0.8);
          height: 56px;
          padding: 0 28px;
          border-radius: 980px;
          font-family: Inter, system-ui, sans-serif;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .qc-hero-secondary-btn:hover {
          border-color: rgba(248,250,252,0.5);
          color: #F8FAFC;
        }

        @media (max-width: 900px) {
          .qc-hero-cols {
            flex-direction: column !important;
          }
          .qc-hero-text-col {
            max-width: 100% !important;
            text-align: center;
          }
          .qc-hero-text-col .qc-eyebrow-wrap {
            justify-content: center;
          }
          .qc-hero-text-col .qc-cta-row {
            justify-content: center;
          }
          .qc-hero-text-col .qc-body {
            margin-left: auto;
            margin-right: auto;
          }
          .qc-hero-mockup-col {
            display: flex;
            justify-content: center;
            padding-top: 48px;
          }
        }

        @media (max-width: 600px) {
          .qc-hero-heading {
            font-size: clamp(36px, 10vw, 54px) !important;
          }
          .qc-hero-primary-btn,
          .qc-hero-secondary-btn {
            height: 50px;
            font-size: 14px;
          }
          .qc-hero-primary-btn {
            padding: 0 22px;
          }
          .qc-hero-secondary-btn {
            padding: 0 18px;
          }
        }
      `}</style>

      {/* ── Container ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="qc-hero-cols"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 64,
          }}
        >
          {/* ── Left: text ── */}
          <motion.div
            className="qc-hero-text-col"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
            style={{ flex: "1 1 0", minWidth: 0 }}
          >
            {/* Eyebrow */}
            <div
              className="qc-eyebrow-wrap"
              style={{ display: "flex", marginBottom: 24 }}
            >
              <span
                style={{
                  backgroundColor: C.blueFaint,
                  border: `1px solid ${C.blueBorder}`,
                  color: C.blueLight,
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "6px 14px",
                  borderRadius: 980,
                  display: "inline-block",
                }}
              >
                {eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h1
              className="qc-hero-heading"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(44px, 6vw, 88px)",
                color: C.cream,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: "0 0 24px 0",
              }}
            >
              {headingParts[0]}
              <span style={{ color: C.orange }}>minutes</span>
              {headingParts[1]}
            </h1>

            {/* Body */}
            <p
              className="qc-body"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 19,
                color: C.creamMuted65,
                lineHeight: 1.72,
                maxWidth: 480,
                margin: "0 0 40px 0",
              }}
            >
              {body}
            </p>

            {/* CTAs */}
            <div
              className="qc-cta-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 18,
                alignItems: "center",
              }}
            >
              <a href="#" className="qc-hero-primary-btn shimmer-btn">
                {cta}
              </a>
              <a href="#how-it-works" className="qc-hero-secondary-btn">
                {secondary}
              </a>
            </div>

            {/* Note */}
            <p
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: C.creamMuted40,
                margin: 0,
              }}
            >
              {ctaNote}
            </p>
          </motion.div>

          {/* ── Right: mockup ── */}
          <motion.div
            className="qc-hero-mockup-col"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            style={{
              flex: "0 0 auto",
              maxWidth: 520,
              width: "100%",
              position: "relative",
            }}
          >
            <MockupCard />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade to white ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.12))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
