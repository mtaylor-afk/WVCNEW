"use client";

import { motion } from "framer-motion";
import { qcData } from "@/lib/quotecalc-data";

export default function QCCTA() {
  const { cta } = qcData;

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0B1424 0%, #1E3A8A 100%)",
        padding: "140px 0",
        overflow: "hidden",
        position: "relative",
      }}
      aria-labelledby="qc-cta-heading"
    >
      {/* Decorative blur */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          backgroundColor: "rgba(37,99,235,0.15)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            id="qc-cta-heading"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.04,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              marginBottom: "28px",
              whiteSpace: "pre-line",
            }}
          >
            {cta.heading}
          </h2>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "19px",
              color: "rgba(248,250,252,0.65)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 48px",
            }}
          >
            {cta.body}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="shimmer-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "56px",
                padding: "0 36px",
                backgroundColor: "#F97316",
                color: "#FFFFFF",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                borderRadius: "980px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "background-color 0.25s ease, transform 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#EA6C0A";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#F97316";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
              aria-label="Start your free trial of QuoteCalc — no credit card required"
            >
              {cta.primary}
            </a>

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#how-it-works");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "56px",
                padding: "0 28px",
                backgroundColor: "transparent",
                border: "1px solid rgba(248,250,252,0.25)",
                color: "rgba(248,250,252,0.8)",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                borderRadius: "980px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "border-color 0.25s ease, color 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(248,250,252,0.55)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(248,250,252,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.8)";
              }}
            >
              {cta.secondary}
            </a>
          </div>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(248,250,252,0.4)",
              marginTop: "20px",
            }}
          >
            {cta.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
