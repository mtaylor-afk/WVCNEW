"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

export default function QCPricing() {
  const { pricing } = qcData;

  return (
    <section
      id="pricing"
      style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#2563EB",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", backgroundColor: "#2563EB" }} aria-hidden="true" />
            {pricing.eyebrow}
            <span style={{ display: "block", width: "24px", height: "1px", backgroundColor: "#2563EB" }} aria-hidden="true" />
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(38px, 5vw, 68px)",
              lineHeight: 1.05,
              color: "#0F172A",
              letterSpacing: "-0.025em",
              marginBottom: "16px",
            }}
          >
            {pricing.heading}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              color: "#64748B",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {pricing.subheading}
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <div
            className="qc-pricing-card"
            style={{
              display: "flex",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 24px 80px rgba(15,23,42,0.12)",
            }}
          >
            {/* Left — dark / price */}
            <div
              className="qc-pricing-left"
              style={{
                backgroundColor: "#0B1424",
                padding: "48px 40px",
                flex: "0 0 280px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              {/* Most popular badge */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  backgroundColor: "#F97316",
                  padding: "4px 14px",
                  borderRadius: "980px",
                  marginBottom: "28px",
                }}
              >
                Most popular
              </span>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "2px", marginBottom: "6px" }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "80px",
                    color: "#F8FAFC",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {pricing.price}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    color: "rgba(248,250,252,0.5)",
                    marginTop: "18px",
                  }}
                >
                  {pricing.period}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: "rgba(248,250,252,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: "36px",
                }}
              >
                per business account
              </p>

              {/* CTA */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="shimmer-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "56px",
                  backgroundColor: "#F97316",
                  color: "#FFFFFF",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background-color 0.25s ease",
                  marginBottom: "16px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EA6C0A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F97316";
                }}
                aria-label="Start your free trial of QuoteCalc"
              >
                {pricing.cta}
              </a>

              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(248,250,252,0.4)",
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                No credit card required
              </p>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(249,115,22,0.8)",
                  textAlign: "center",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <CheckCircle2 size={12} aria-hidden="true" />
                14-day free trial included
              </p>
            </div>

            {/* Right — features */}
            <div
              className="qc-pricing-right"
              style={{
                backgroundColor: "#F8FAFC",
                padding: "48px 40px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "#0F172A",
                  marginBottom: "24px",
                }}
              >
                Everything included:
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                {pricing.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(15,23,42,0.06)",
                    }}
                  >
                    <CheckCircle2 size={16} color="#2563EB" strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#0F172A",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "#2563EB",
                  marginTop: "24px",
                }}
              >
                {pricing.compare}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust note below card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontSize: "14px", color: "#F97316", letterSpacing: "2px" }}
            aria-label="4.9 out of 5 stars"
          >
            ★★★★★
          </span>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "#64748B",
            }}
          >
            4.9/5 average · Trusted by 500+ builders across the UK
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .qc-pricing-card {
            flex-direction: column !important;
          }
          .qc-pricing-left {
            flex: unset !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
