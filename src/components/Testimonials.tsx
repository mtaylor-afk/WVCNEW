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
    const amount = 440;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(updateScrollState, 400);
  };

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "#F5F5F7",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header with nav buttons */}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#B8975A",
                marginBottom: "12px",
              }}
            >
              {testimonials.label}
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
              {testimonials.heading}
            </h2>
          </motion.div>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <NavButton
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll reviews left"
            />
            <NavButton
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll reviews right"
            />
          </div>
        </div>
      </div>

      {/* Carousel — full-width overflow */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="testimonial-scroll"
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingLeft: "max(24px, calc((100vw - 1120px) / 2 + 24px))",
          paddingRight: "max(24px, calc((100vw - 1120px) / 2 + 24px))",
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        flexShrink: 0,
        width: "400px",
        minHeight: "280px",
        backgroundColor: "#FFFFFF",
        borderRadius: "18px",
        padding: "36px",
        scrollSnapAlign: "start",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Stars */}
      <div
        style={{
          fontSize: "16px",
          color: "#B8975A",
          letterSpacing: "2px",
          marginBottom: "20px",
        }}
        aria-label={`${review.stars} stars`}
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
          color: "#1D1D1F",
          lineHeight: 1.7,
          flex: 1,
          margin: 0,
        }}
      >
        &ldquo;{review.quote}&rdquo;
      </blockquote>

      {/* Reviewer */}
      <div style={{ marginTop: "28px" }}>
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "#1D1D1F",
          }}
        >
          {review.name}
        </div>
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#86868B",
            marginTop: "2px",
          }}
        >
          {review.location}
        </div>
      </div>
    </motion.div>
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
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        border: "1px solid #D2D2D7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background-color 0.2s ease, opacity 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F5F5F7";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
      }}
    >
      {direction === "left" ? (
        <ChevronLeft size={20} color="#1D1D1F" aria-hidden="true" />
      ) : (
        <ChevronRight size={20} color="#1D1D1F" aria-hidden="true" />
      )}
    </button>
  );
}
