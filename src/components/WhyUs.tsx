"use client";

import { motion } from "framer-motion";
import { Star, Shield, MapPin, Award } from "lucide-react";
import { siteData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Star,
  Shield,
  MapPin,
  Award,
};

export default function WhyUs() {
  const { whyUs, hero } = siteData;

  return (
    <section
      id="why-us"
      style={{ backgroundColor: "#0B1F3A", padding: "120px 0" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: "72px" }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "20px",
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
            {whyUs.label}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(38px, 5.5vw, 76px)",
              lineHeight: 1.02,
              color: "#FAF7F0",
              letterSpacing: "-0.03em",
              maxWidth: "680px",
            }}
          >
            {whyUs.heading}
          </h2>
        </motion.div>

        {/* Giant stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="why-stats-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid rgba(250,247,240,0.09)",
            borderBottom: "1px solid rgba(250,247,240,0.09)",
            marginBottom: "80px",
          }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "48px 32px",
                borderRight:
                  i < 2 ? "1px solid rgba(250,247,240,0.09)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(44px, 6vw, 84px)",
                  color: "#C9A84C",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: "10px",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.09em",
                  color: "rgba(250,247,240,0.38)",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Two-column: body text + feature list */}
        <div
          className="why-us-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left — text + rating card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "19px",
                lineHeight: 1.72,
                color: "rgba(250,247,240,0.6)",
                marginBottom: "44px",
              }}
            >
              {whyUs.body}
            </p>

            {/* Rating pill card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "24px 28px",
                borderRadius: "14px",
                backgroundColor: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.16)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "40px",
                    color: "#C9A84C",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {whyUs.rating.score}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                    color: "rgba(250,247,240,0.38)",
                    marginTop: "5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {whyUs.rating.label}
                </div>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "44px",
                  backgroundColor: "rgba(201,168,76,0.2)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#C9A84C",
                    letterSpacing: "4px",
                    marginBottom: "5px",
                  }}
                  aria-label="Five star rating"
                >
                  ★★★★★
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "11px",
                    color: "rgba(250,247,240,0.38)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Verified reviews
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — feature list */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {whyUs.features.map((feature, i) => {
              const Icon = iconMap[feature.icon] ?? Star;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    padding: "28px 0",
                    borderBottom:
                      i < whyUs.features.length - 1
                        ? "1px solid rgba(250,247,240,0.07)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "42px",
                      height: "42px",
                      borderRadius: "11px",
                      backgroundColor: "rgba(201,168,76,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1px",
                    }}
                  >
                    <Icon
                      size={18}
                      color="#C9A84C"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#FAF7F0",
                        marginBottom: "6px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(250,247,240,0.48)",
                        lineHeight: 1.65,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-us-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .why-stats-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .why-stats-row > div:nth-child(3) {
            grid-column: span 2;
            border-right: none !important;
            border-top: 1px solid rgba(250,247,240,0.09);
          }
        }
        @media (max-width: 480px) {
          .why-stats-row {
            grid-template-columns: 1fr !important;
          }
          .why-stats-row > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(250,247,240,0.09);
            padding: 32px 0 !important;
          }
          .why-stats-row > div:nth-child(3) {
            grid-column: span 1;
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
