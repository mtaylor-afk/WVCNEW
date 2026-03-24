"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import type { ProcessStep } from "@/lib/data";

export default function Process() {
  const { process } = siteData;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ backgroundColor: "#FFFFFF", padding: "120px 0" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "80px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  backgroundColor: "#C9A84C",
                }}
                aria-hidden="true"
              />
              {process.label}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(38px, 5vw, 68px)",
                lineHeight: 1.02,
                color: "#0B1F3A",
                letterSpacing: "-0.025em",
              }}
            >
              {process.heading}
            </h2>
          </div>
        </motion.div>

        {/* Desktop timeline */}
        <div className="process-desktop" style={{ position: "relative" }}>
          {/* Base line */}
          <div
            style={{
              position: "absolute",
              top: "27px",
              left: "calc(12.5%)",
              right: "calc(12.5%)",
              height: "1px",
              backgroundColor: "rgba(11,31,58,0.09)",
            }}
            aria-hidden="true"
          />
          {/* Animated gold line */}
          <div
            style={{
              position: "absolute",
              top: "27px",
              left: "calc(12.5%)",
              height: "1px",
              backgroundColor: "#C9A84C",
              width: isVisible ? "75%" : "0%",
              transition:
                "width 1.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s",
            }}
            aria-hidden="true"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {process.steps.map((step, i) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                index={i}
                vertical={false}
              />
            ))}
          </div>
        </div>

        {/* Mobile vertical stack */}
        <div
          className="process-mobile"
          style={{ display: "none", flexDirection: "column", gap: "48px" }}
        >
          {process.steps.map((step, i) => (
            <ProcessStepCard
              key={step.number}
              step={step}
              index={i}
              vertical
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: flex !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-line { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

function ProcessStepCard({
  step,
  index,
  vertical,
}: {
  step: ProcessStep;
  index: number;
  vertical: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
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
      {/* Step indicator */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: vertical ? "0" : "32px",
          flexShrink: 0,
        }}
      >
        {/* Ghost number */}
        {!vertical && (
          <span
            style={{
              position: "absolute",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: "76px",
              color: "rgba(11,31,58,0.04)",
              lineHeight: 1,
              top: "-20px",
              zIndex: 0,
              pointerEvents: "none",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {step.number}
          </span>
        )}

        {/* Circle */}
        <div
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            border: "1.5px solid #C9A84C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 0 0 7px rgba(201,168,76,0.06)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#C9A84C",
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
            fontSize: "17px",
            color: "#0B1F3A",
            marginTop: vertical ? "0" : "24px",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "#6E6E73",
            lineHeight: 1.65,
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
