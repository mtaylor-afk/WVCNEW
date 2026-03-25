"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

export default function QCTestimonials() {
  const { testimonials } = qcData;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -420 : 420, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section
      style={{ backgroundColor: "#F8FAFC", padding: "120px 0", overflow: "hidden" }}
      aria-label="Customer testimonials"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
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
                gap: "10px",
              }}
            >
              <span
                style={{ display: "block", width: "24px", height: "1px", backgroundColor: "#2563EB" }}
                aria-hidden="true"
              />
              {testimonials.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.05,
                color: "#0F172A",
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
              }}
            >
              {testimonials.heading}
            </h2>
          </motion.div>

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <NavBtn direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
            <NavBtn direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
          </div>
        </div>
      </div>

      {/* aria-live region */}
      <div aria-live="polite" aria-atomic="false" className="sr-only" />

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        role="region"
        aria-label="Testimonials carousel — scroll to see more"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "max(24px, calc((100vw - 1200px) / 2 + 24px))",
          paddingRight: "max(24px, calc((100vw - 1200px) / 2 + 24px))",
          paddingBottom: "8px",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        } as React.CSSProperties}
      >
        {testimonials.reviews.map((review, i) => (
          <motion.article
            key={review.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              flexShrink: 0,
              width: "380px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "40px 36px 36px",
              scrollSnapAlign: "start",
              border: "1px solid rgba(15,23,42,0.07)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 56px rgba(15,23,42,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Decorative quote */}
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "88px",
                lineHeight: 0.72,
                color: "#2563EB",
                opacity: 0.12,
                marginBottom: "20px",
                userSelect: "none",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Stars */}
            <div
              style={{ fontSize: "13px", color: "#F97316", letterSpacing: "3px", marginBottom: "18px" }}
              aria-label={`${review.stars} out of 5 stars`}
            >
              {"★".repeat(review.stars)}
            </div>

            {/* Quote */}
            <blockquote
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "17px",
                color: "#0F172A",
                lineHeight: 1.75,
                flex: 1,
                margin: 0,
              }}
            >
              {review.quote}
            </blockquote>

            {/* Divider */}
            <div
              style={{ height: "1px", backgroundColor: "rgba(15,23,42,0.07)", margin: "24px 0 20px" }}
              aria-hidden="true"
            />

            {/* Reviewer */}
            <footer style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(37,99,235,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#2563EB",
                  }}
                >
                  {review.initials}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "#0F172A",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {review.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#64748B",
                    marginTop: "1px",
                  }}
                >
                  {review.trade}
                </div>
              </div>
            </footer>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function NavBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous testimonials" : "Next testimonials"}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: disabled ? "transparent" : "#0F172A",
        border: "1px solid",
        borderColor: disabled ? "rgba(15,23,42,0.14)" : "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "background-color 0.25s ease, border-color 0.25s ease",
        color: disabled ? "#0F172A" : "#FFFFFF",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563EB";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#2563EB";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0F172A";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#0F172A";
        }
      }}
    >
      {direction === "left" ? (
        <ChevronLeft size={18} aria-hidden="true" />
      ) : (
        <ChevronRight size={18} aria-hidden="true" />
      )}
    </button>
  );
}
