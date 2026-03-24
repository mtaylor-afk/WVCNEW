"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteData } from "@/lib/data";
import type { Review } from "@/lib/data";

export default function Testimonials() {
  const { testimonials } = siteData;
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
    el.scrollBy({
      left: direction === "left" ? -440 : 440,
      behavior: "smooth",
    });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section
      id="testimonials"
      style={{ backgroundColor: "#FAF7F0", padding: "120px 0", overflow: "hidden" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
      >
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
              {testimonials.label}
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
              {testimonials.heading}
            </h2>
          </motion.div>

          {/* Arrow buttons */}
          <div
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <NavButton
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
            />
            <NavButton
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next reviews"
            />
          </div>
        </div>
      </div>

      {/* Carousel — edge-to-edge */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="testimonial-scroll"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "max(24px, calc((100vw - 1200px) / 2 + 24px))",
          paddingRight: "max(24px, calc((100vw - 1200px) / 2 + 24px))",
          paddingBottom: "8px",
        }}
      >
        {testimonials.reviews.map((review, i) => (
          <ReviewCard key={review.name} review={review} index={i} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        flexShrink: 0,
        width: "380px",
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "40px 36px 36px",
        scrollSnapAlign: "start",
        border: "1px solid rgba(11,31,58,0.07)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 20px 56px rgba(11,31,58,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Large decorative quote mark */}
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "88px",
          lineHeight: 0.72,
          color: "#C9A84C",
          opacity: 0.13,
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
        style={{
          fontSize: "13px",
          color: "#C9A84C",
          letterSpacing: "3px",
          marginBottom: "18px",
        }}
        aria-label={`${review.stars} out of 5 stars`}
      >
        {"★".repeat(review.stars)}
      </div>

      {/* Quote text */}
      <blockquote
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "17px",
          color: "#0B1F3A",
          lineHeight: 1.75,
          flex: 1,
          margin: 0,
        }}
      >
        {review.quote}
      </blockquote>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(11,31,58,0.07)",
          margin: "24px 0 20px",
        }}
        aria-hidden="true"
      />

      {/* Reviewer */}
      <footer style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(201,168,76,0.13)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#C9A84C",
            }}
          >
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              color: "#0B1F3A",
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
              color: "#86868B",
              marginTop: "1px",
            }}
          >
            {review.location}
          </div>
        </div>
      </footer>
    </motion.article>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  "aria-label": string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        backgroundColor: disabled ? "transparent" : "#0B1F3A",
        border: "1px solid",
        borderColor: disabled ? "rgba(11,31,58,0.14)" : "#0B1F3A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "background-color 0.25s ease, border-color 0.25s ease",
        color: disabled ? "#0B1F3A" : "#FFFFFF",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A84C";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0B1F3A";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#0B1F3A";
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
