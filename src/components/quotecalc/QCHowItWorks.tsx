"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

export default function QCHowItWorks() {
  const { howItWorks } = qcData;

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      style={{
        background: "#0B1424",
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
            {howItWorks.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="how-it-works-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(38px, 5vw, 68px)",
            color: "#F8FAFC",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            maxWidth: "640px",
            marginBottom: "80px",
            whiteSpace: "pre-line",
          }}
        >
          {howItWorks.heading}
        </h2>

        {/* Steps row */}
        <div
          className="qc-hiw-steps"
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "0",
          }}
        >
          {howItWorks.steps.map((step, i) => {
            const isLast = i === howItWorks.steps.length - 1;
            return (
              <React.Fragment key={step.number}>
                {/* Step card */}
                <motion.article
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-label={`Step ${step.number}: ${step.title}`}
                  className="qc-hiw-card"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    padding: "40px 32px",
                    transition:
                      "background 0.25s ease, border-color 0.25s ease",
                    minWidth: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(37,99,235,0.08)";
                    el.style.borderColor = "rgba(37,99,235,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  {/* Step number watermark */}
                  <div
                    aria-hidden="true"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "72px",
                      color: "rgba(37,99,235,0.2)",
                      lineHeight: 1,
                      marginBottom: "24px",
                      userSelect: "none",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Tag badge */}
                  <div
                    style={{
                      display: "inline-block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#F97316",
                      background: "rgba(249,115,22,0.12)",
                      padding: "4px 12px",
                      borderRadius: "980px",
                      marginBottom: "16px",
                    }}
                  >
                    {step.tag}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "20px",
                      color: "#F8FAFC",
                      marginBottom: "12px",
                      marginTop: 0,
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "rgba(248,250,252,0.6)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.body}
                  </p>
                </motion.article>

                {/* Connecting chevron — desktop only, not after last step */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="qc-hiw-chevron"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      width: "48px",
                      alignSelf: "center",
                    }}
                  >
                    <ChevronRight
                      size={24}
                      color="rgba(37,99,235,0.4)"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .qc-hiw-steps {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .qc-hiw-chevron {
            display: none !important;
          }
          .qc-hiw-card {
            flex: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
