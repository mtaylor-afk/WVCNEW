"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteData } from "@/lib/data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
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
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "52px",
      }}
    >
      {/* Main content block */}
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          padding: "80px 24px 0",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Gold label */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#B8975A",
            marginBottom: "24px",
          }}
        >
          {hero.label}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.5)}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 9vw, 88px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#1D1D1F",
            marginBottom: "28px",
          }}
        >
          {hero.headline[0]}
          <br />
          {hero.headline[1]}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.7)}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(17px, 2.5vw, 21px)",
            lineHeight: 1.6,
            color: "#6E6E73",
            maxWidth: "560px",
            marginBottom: "44px",
          }}
        >
          {hero.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.9)}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <HeroPrimaryButton onClick={scrollToContact}>
            {hero.cta.primary}
          </HeroPrimaryButton>
          <HeroSecondaryButton onClick={scrollToServices}>
            {hero.cta.secondary} ↓
          </HeroSecondaryButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(1.1)}
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "0",
            justifyContent: "center",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "0 24px",
                borderLeft: i > 0 ? "1px solid #D2D2D7" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "28px",
                  color: "#1D1D1F",
                  lineHeight: 1.2,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#86868B",
                  marginTop: "4px",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "80px auto 0",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
            lineHeight: 0,
          }}
        >
          <Image
            src="/assets/hero-house.png"
            alt="From architectural design to completed home — WV Construction"
            width={1120}
            height={720}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </motion.div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "48px auto 0",
          padding: "0 24px",
        }}
      >
        <div style={{ height: "1px", backgroundColor: "#D2D2D7" }} />
      </div>

      {/* Marquee strip */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "20px 0",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="marquee-track">
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.15em",
              color: "#86868B",
              whiteSpace: "nowrap",
            }}
          >
            {hero.marquee}
          </span>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.15em",
              color: "#86868B",
              whiteSpace: "nowrap",
            }}
          >
            {hero.marquee}
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroPrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: "16px",
        color: "#FFFFFF",
        backgroundColor: "#1D1D1F",
        border: "none",
        padding: "14px 28px",
        borderRadius: "980px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B8975A";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1D1D1F";
      }}
      aria-label="Get a free quote from WV Construction"
    >
      {children}
    </motion.button>
  );
}

function HeroSecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 500,
        fontSize: "16px",
        color: "#1D1D1F",
        backgroundColor: "transparent",
        border: "1px solid #1D1D1F",
        padding: "14px 28px",
        borderRadius: "980px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F5F5F7";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
      aria-label="View our services"
    >
      {children}
    </motion.button>
  );
}
