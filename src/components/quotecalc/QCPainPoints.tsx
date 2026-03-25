"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileX,
  Clock,
  UserX,
  PoundSterling,
  FileSearch,
  ThumbsDown,
} from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

const iconMap: Record<string, React.ElementType> = {
  FileX,
  Clock,
  UserX,
  PoundSterling,
  FileSearch,
  ThumbsDown,
};

export default function QCPainPoints() {
  const { pain } = qcData;

  return (
    <section
      id="pain-points"
      aria-labelledby="pain-points-heading"
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
              background: "#2563EB",
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
              color: "#2563EB",
            }}
          >
            {pain.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="pain-points-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(38px, 5vw, 68px)",
            color: "#0F172A",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            maxWidth: "600px",
            marginBottom: "72px",
            whiteSpace: "pre-line",
          }}
        >
          {pain.heading}
        </h2>

        {/* Pain items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
          className="qc-pain-grid"
        >
          {pain.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-label={item.title}
                style={{
                  background: "#F8FAFC",
                  padding: "32px",
                  borderRadius: "16px",
                  cursor: "default",
                  transition:
                    "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#FFFFFF";
                  el.style.boxShadow = "0 8px 40px rgba(15,23,42,0.08)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#F8FAFC";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon container */}
                <div
                  aria-hidden="true"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(37,99,235,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {Icon && (
                    <Icon
                      size={20}
                      color="#2563EB"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#0F172A",
                    marginTop: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#64748B",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 1023px) {
          .qc-pain-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .qc-pain-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
