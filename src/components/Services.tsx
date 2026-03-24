"use client";

import { motion } from "framer-motion";
import { Home, Maximize2, Wrench, Triangle, LayoutGrid, Layers } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Maximize2,
  Wrench,
  Triangle,
  LayoutGrid,
  Layers,
};

// 4-column bento: row 1 = [2, 1, 1], row 2 = [1, 2, 1]
const bentoSpans = [2, 1, 1, 1, 2, 1];

// Alternating card themes: dark navy / white / dark
const cardTheme = (index: number) => {
  const isDark = [0, 2, 4].includes(index);
  return {
    bg: isDark ? "#0B1F3A" : "#FFFFFF",
    text: isDark ? "#FAF7F0" : "#0B1F3A",
    sub: isDark ? "rgba(250,247,240,0.52)" : "#6E6E73",
    iconBg: isDark ? "rgba(201,168,76,0.13)" : "#F5F5F7",
    ghostColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(11,31,58,0.04)",
    hoverShadow: isDark
      ? "0 16px 56px rgba(11,31,58,0.35)"
      : "0 16px 56px rgba(0,0,0,0.1)",
  };
};

export default function Services() {
  const { services } = siteData;

  return (
    <section
      id="services"
      style={{ backgroundColor: "#FAF7F0", padding: "120px 0" }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
      >
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "56px",
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
              {services.label}
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
              {services.heading}
            </h2>
          </div>

          <Link
            href="/our-work"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              color: "#0B1F3A",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              borderRadius: "980px",
              border: "1px solid rgba(11,31,58,0.16)",
              transition: "all 0.25s ease",
              cursor: "pointer",
              whiteSpace: "nowrap",
              height: "44px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0B1F3A";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F0";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#0B1F3A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0B1F3A";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(11,31,58,0.16)";
            }}
          >
            View completed work
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div
          className="services-bento"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Home;
            const span = bentoSpans[i];
            const theme = cardTheme(i);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  gridColumn: `span ${span}`,
                  backgroundColor: theme.bg,
                  borderRadius: "16px",
                  padding: span === 2 ? "44px 40px" : "36px 32px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    theme.hoverShadow;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Ghost number watermark */}
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "12px",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 800,
                    fontSize: "110px",
                    color: theme.ghostColor,
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: theme.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "28px",
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    size={22}
                    color="#C9A84C"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: span === 2 ? "clamp(21px, 2.5vw, 27px)" : "20px",
                    color: theme.text,
                    marginBottom: "12px",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "14.5px",
                    color: theme.sub,
                    lineHeight: 1.65,
                    marginBottom: "28px",
                  }}
                >
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.id}`}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#C9A84C",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "gap 0.2s ease",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.gap = "10px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.gap = "6px";
                  }}
                >
                  Learn more
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .services-bento {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .services-bento > div {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 520px) {
          .services-bento {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .services-bento > div {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
