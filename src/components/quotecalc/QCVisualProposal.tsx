"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

export default function QCVisualProposal() {
  const { visualProposal } = qcData;
  const paragraphs = visualProposal.body.split("\n\n");

  return (
    <section
      id="visual-proposal"
      aria-labelledby="visual-proposal-heading"
      style={{
        background: "#FFFFFF",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div className="qc-vp-grid">
          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "24px",
                  height: "1px",
                  background: "#F97316",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#F97316",
                }}
              >
                {visualProposal.eyebrow}
              </span>
            </div>

            {/* Heading */}
            <h2
              id="visual-proposal-heading"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(34px, 4.5vw, 60px)",
                color: "#0F172A",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                marginBottom: "28px",
                whiteSpace: "pre-line",
              }}
            >
              {visualProposal.heading}
            </h2>

            {/* Body paragraphs */}
            <div style={{ marginBottom: "32px" }}>
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#0F172A",
                    lineHeight: 1.75,
                    margin: i < paragraphs.length - 1 ? "0 0 18px" : "0",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Benefits list */}
            <ul
              aria-label="Visual proposal benefits"
              style={{
                listStyle: "none",
                margin: "0 0 32px",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {visualProposal.benefits.map((benefit) => (
                <li
                  key={benefit}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    color="#2563EB"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: "1px" }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "#0F172A",
                      lineHeight: 1.55,
                    }}
                  >
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tag badge */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#F97316",
                  background: "rgba(249,115,22,0.1)",
                  padding: "6px 16px",
                  borderRadius: "980px",
                  letterSpacing: "0.01em",
                }}
              >
                {visualProposal.tag}
              </span>
            </div>
          </motion.div>

          {/* ── Right column — Visual Proposal Mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
              style={{
                width: "100%",
                maxWidth: "480px",
                background: "#F8FAFC",
                border: "1px solid rgba(15,23,42,0.08)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow:
                  "0 24px 80px rgba(15,23,42,0.1), 0 8px 24px rgba(15,23,42,0.06)",
              }}
            >
              {/* Tab bar */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(15,23,42,0.07)",
                  background: "#FFFFFF",
                }}
              >
                <button
                  tabIndex={-1}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#64748B",
                    background: "transparent",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    cursor: "default",
                  }}
                >
                  Before
                </button>
                <button
                  tabIndex={-1}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#FFFFFF",
                    background: "#2563EB",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    cursor: "default",
                  }}
                >
                  After Design
                </button>
              </div>

              {/* Image placeholder — 16/9 */}
              <div
                style={{
                  aspectRatio: "16 / 9",
                  background: "linear-gradient(135deg, #E8F0FE 0%, #DBEAFE 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "32px", lineHeight: 1 }}>🏠</span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#1E3A8A",
                    marginTop: "4px",
                  }}
                >
                  Modern Kitchen Concept
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#2563EB",
                    opacity: 0.75,
                  }}
                >
                  Transformed by QuoteCalc AI
                </span>
              </div>

              {/* Colour Palette section */}
              <div
                style={{
                  padding: "16px 18px 14px",
                  borderBottom: "1px solid rgba(15,23,42,0.07)",
                  background: "#FFFFFF",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#0F172A",
                    margin: "0 0 10px",
                  }}
                >
                  Colour Palette
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["#1E3A5F", "#F8F9FA", "#C9A84C", "#2D5016", "#8B4513"].map(
                    (hex) => (
                      <div
                        key={hex}
                        title={hex}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: hex,
                          border:
                            hex === "#F8F9FA"
                              ? "1px solid rgba(15,23,42,0.15)"
                              : "1px solid rgba(15,23,42,0.06)",
                          flexShrink: 0,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Key changes list */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid rgba(15,23,42,0.07)",
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  gap: "7px",
                }}
              >
                {[
                  "Replace units with handleless",
                  "Quartz worktops in light grey",
                  "Recessed LED ceiling lighting",
                ].map((change) => (
                  <div
                    key={change}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#2563EB",
                        lineHeight: 1,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        color: "#0F172A",
                      }}
                    >
                      {change}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA inside mockup */}
              <div style={{ padding: "14px 18px", background: "#FFFFFF" }}>
                <div
                  style={{
                    width: "100%",
                    height: "44px",
                    background: "#F97316",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#FFFFFF",
                    cursor: "default",
                    userSelect: "none",
                  }}
                >
                  Build Quote from This Design →
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Responsive layout */}
      <style>{`
        .qc-vp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 959px) {
          .qc-vp-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
