"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import type { ProcessStep } from "@/lib/data";

export default function Process() {
  const { process } = siteData;
  const sectionRef = useRef<HTMLElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineWidth(100);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        backgroundColor: "#FFFFFF",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#B8975A",
              marginBottom: "16px",
            }}
          >
            {process.label}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              color: "#1D1D1F",
              letterSpacing: "-0.01em",
            }}
          >
            {process.heading}
          </h2>
        </motion.div>

        {/* Desktop timeline */}
        <div className="process-desktop" style={{ position: "relative" }}>
          {/* Timeline base line */}
          <div
            style={{
              position: "absolute",
              top: "17px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              backgroundColor: "#D2D2D7",
              zIndex: 0,
            }}
          />

          {/* Animated gold line */}
          <div
            style={{
              position: "absolute",
              top: "17px",
              left: "12.5%",
              height: "1px",
              backgroundColor: "#B8975A",
              width: `${lineWidth}%`,
              maxWidth: "75%",
              zIndex: 1,
              transition: "width 1.5s ease",
            }}
          />

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {process.steps.map((step, i) => (
              <ProcessStepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile vertical stack */}
        <div
          className="process-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {process.steps.map((step, i) => (
            <ProcessStepCard key={step.number} step={step} index={i} vertical />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}

function ProcessStepCard({
  step,
  index,
  vertical = false,
}: {
  step: ProcessStep;
  index: number;
  vertical?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        display: "flex",
        flexDirection: vertical ? "row" : "column",
        alignItems: vertical ? "flex-start" : "center",
        gap: vertical ? "24px" : "0",
        textAlign: vertical ? "left" : "center",
      }}
    >
      {/* Circle indicator */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: vertical ? "0" : "24px",
          flexShrink: 0,
        }}
      >
        {/* Ghost number behind */}
        {!vertical && (
          <span
            style={{
              position: "absolute",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "64px",
              color: "rgba(29,29,31,0.06)",
              lineHeight: 1,
              top: "-16px",
              zIndex: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            {step.number}
          </span>
        )}
        {/* Circle */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "2px solid #B8975A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#B8975A",
            }}
          >
            {index + 1}
          </span>
        </div>
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            color: "#1D1D1F",
            marginTop: vertical ? "0" : "20px",
            marginBottom: "8px",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            color: "#6E6E73",
            lineHeight: 1.6,
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
