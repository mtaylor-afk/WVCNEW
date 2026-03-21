"use client";

import { motion } from "framer-motion";
import { Star, Shield, MapPin, Award } from "lucide-react";
import { siteData } from "@/lib/data";
import { HouseIllustration } from "@/components/illustrations/HouseIllustration";

const iconMap: Record<string, React.ElementType> = { Star, Shield, MapPin, Award };

export default function WhyUs() {
  const { whyUs } = siteData;

  return (
    <section
      id="why-us"
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="why-us-grid"
      >
        {/* Left column — text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
            {whyUs.label}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 4vw, 52px)",
              lineHeight: 1.1,
              color: "#1D1D1F",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
            }}
          >
            {whyUs.heading}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "19px",
              lineHeight: 1.6,
              color: "#6E6E73",
              marginBottom: "48px",
            }}
          >
            {whyUs.body}
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {whyUs.features.map((feature, i) => {
              const Icon = iconMap[feature.icon] ?? Star;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "#F5F5F7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color="#B8975A" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "#1D1D1F",
                        marginBottom: "6px",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "15px",
                        color: "#6E6E73",
                        lineHeight: 1.5,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right column — visual card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            style={{
              backgroundColor: "#F5F5F7",
              borderRadius: "18px",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            {/* Illustration */}
            <div style={{ marginBottom: "40px" }}>
              <HouseIllustration />
            </div>

            {/* Stars */}
            <div
              style={{
                fontSize: "28px",
                color: "#B8975A",
                marginBottom: "16px",
                letterSpacing: "4px",
              }}
              aria-label="Five star rating"
            >
              ★★★★★
            </div>

            {/* Rating */}
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "32px",
                color: "#1D1D1F",
                marginBottom: "8px",
              }}
            >
              {whyUs.rating.score}
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#86868B",
                marginBottom: "32px",
              }}
            >
              {whyUs.rating.label}
            </div>

            {/* Avatar placeholders */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "-8px",
              }}
            >
              {[
                "#B8975A",
                "#8A9BA8",
                "#C4BAA8",
                "#6B7C8A",
                "#D4C9B5",
              ].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "2px solid #F5F5F7",
                    marginLeft: i > 0 ? "-10px" : "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 5 - i,
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.3)",
                      marginBottom: "4px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-us-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
