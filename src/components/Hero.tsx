"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { siteData } from "@/lib/data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function Hero() {
  const { hero } = siteData;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#0B1F3A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(201,168,76,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Top-right gold glow */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "560px",
          height: "560px",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Bottom-left subtle glow */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow label */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              backgroundColor: "#C9A84C",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
            }}
          >
            {hero.label}
          </span>
        </motion.div>

        {/* Main headline — very large */}
        <motion.h1
          {...fadeUp(0.4)}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(52px, 9.5vw, 108px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#FAF7F0",
            marginBottom: "0",
          }}
        >
          {hero.headline[0]}
          <br />
          <span style={{ color: "#C9A84C" }}>{hero.headline[1]}</span>
        </motion.h1>

        {/* Subheadline + CTA row */}
        <div
          className="hero-sub-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "flex-end",
            marginTop: "40px",
            marginBottom: "72px",
          }}
        >
          <motion.p
            {...fadeUp(0.6)}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(250,247,240,0.58)",
              maxWidth: "500px",
            }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            {...fadeUp(0.7)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <button
              onClick={scrollToContact}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#0B1F3A",
                backgroundColor: "#C9A84C",
                border: "none",
                padding: "0 32px",
                borderRadius: "980px",
                cursor: "pointer",
                transition: "background-color 0.25s ease, transform 0.15s ease",
                whiteSpace: "nowrap",
                height: "52px",
                minWidth: "180px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#DFB23A";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A84C";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
              aria-label="Get a free quote from WV Construction"
            >
              {hero.cta.primary}
            </button>
            <button
              onClick={scrollToServices}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "rgba(250,247,240,0.4)",
                padding: "4px 0",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(250,247,240,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(250,247,240,0.4)";
              }}
              aria-label="View our services"
            >
              {hero.cta.secondary}
              <ArrowDown size={12} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-stats"
          style={{
            display: "flex",
            alignItems: "stretch",
            borderTop: "1px solid rgba(250,247,240,0.09)",
            paddingTop: "40px",
            marginBottom: "64px",
          }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                paddingRight: i < hero.stats.length - 1 ? "32px" : "0",
                borderRight:
                  i < hero.stats.length - 1
                    ? "1px solid rgba(250,247,240,0.09)"
                    : "none",
                marginRight: i < hero.stats.length - 1 ? "32px" : "0",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(30px, 4vw, 52px)",
                  color: "#C9A84C",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "rgba(250,247,240,0.38)",
                  marginTop: "7px",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image — bleeds to bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            lineHeight: 0,
            border: "1px solid rgba(201,168,76,0.14)",
            borderBottom: "none",
          }}
        >
          <Image
            src="/assets/hero-house.png"
            alt="From architectural design to completed home — WV Construction"
            width={1200}
            height={700}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </motion.div>

      {/* Gold marquee strip */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "14px 0",
          backgroundColor: "#C9A84C",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="marquee-track" aria-hidden="true">
          {[1, 2].map((n) => (
            <span
              key={n}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: "#0B1F3A",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {hero.marquee}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-sub-row {
            grid-template-columns: 1fr !important;
          }
          .hero-sub-row > div:last-child {
            align-items: flex-start !important;
            flex-direction: row !important;
            gap: 16px !important;
          }
          .hero-stats > div {
            border-right: none !important;
            margin-right: 0 !important;
            padding-right: 16px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
