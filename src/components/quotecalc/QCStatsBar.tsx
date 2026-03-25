"use client";

import { motion } from "framer-motion";
import { qcData } from "@/lib/quotecalc-data";

export default function QCStatsBar() {
  return (
    <section
      aria-label="QuoteCalc at a glance"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(15,23,42,0.06)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px",
        }}
        className="qc-stats-grid"
      >
        {qcData.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "6px",
            }}
          >
            <span
              aria-label={`${stat.number} — ${stat.label}`}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "36px",
                color: "#0F172A",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {stat.number}
            </span>
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Responsive grid: 2-column on mobile */}
      <style>{`
        @media (max-width: 639px) {
          .qc-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
