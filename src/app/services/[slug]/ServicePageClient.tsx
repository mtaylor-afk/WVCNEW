"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Maximize2,
  Wrench,
  Triangle,
  LayoutGrid,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { siteData, ServiceItem } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Maximize2,
  Wrench,
  Triangle,
  LayoutGrid,
  Layers,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function ServicePageClient({ service }: { service: ServiceItem }) {
  const Icon = iconMap[service.icon] ?? Home;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight = html.style.height;

    html.style.height = "auto";
    html.style.overflow = "auto";
    body.style.height = "auto";
    body.style.overflow = "auto";
    body.style.webkitOverflowScrolling = "touch";

    return () => {
      html.style.height = prevHtmlHeight;
      html.style.overflow = prevHtmlOverflow;
      body.style.height = prevBodyHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.webkitOverflowScrolling = "";
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* Navbar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "52px",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(210,210,215,0.5)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#1D1D1F",
              }}
            >
              WV
            </span>
            <span
              style={{ width: "1px", height: "16px", backgroundColor: "#B8975A", display: "block" }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                color: "#1D1D1F",
                letterSpacing: "0.02em",
              }}
            >
              Construction
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            {siteData.nav.links.map((link) => (
              <Link
                key={link.href}
                href={`/${link.href}`}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#1D1D1F",
                  textDecoration: "none",
                  opacity: 0.75,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#contact"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              color: "#FFFFFF",
              backgroundColor: "#1D1D1F",
              padding: "8px 20px",
              borderRadius: "980px",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            Get a Quote
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          paddingTop: "132px",
          paddingBottom: "80px",
          backgroundColor: "#F5F5F7",
          borderBottom: "1px solid #E5E5EA",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div {...fadeUp}>
            <Link
              href="/#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#B8975A",
                textDecoration: "none",
                marginBottom: "32px",
              }}
            >
              <ArrowLeft size={14} />
              All Services
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  flexShrink: 0,
                }}
              >
                <Icon size={24} color="#1D1D1F" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#B8975A",
                    marginBottom: "10px",
                  }}
                >
                  WV Construction · Wirral
                </p>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(36px, 5vw, 56px)",
                    lineHeight: 1.1,
                    color: "#1D1D1F",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {service.name}
                </h1>
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(18px, 2.5vw, 22px)",
                color: "#6E6E73",
                lineHeight: 1.55,
                maxWidth: "680px",
                margin: 0,
              }}
            >
              {service.hero}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "96px 0" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "80px",
            alignItems: "start",
          }}
          className="service-content-grid"
        >
          {/* Left — detail + features */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "17px",
                color: "#3C3C43",
                lineHeight: 1.75,
                marginBottom: "56px",
              }}
            >
              {service.detail}
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "28px",
                color: "#1D1D1F",
                marginBottom: "32px",
                letterSpacing: "-0.01em",
              }}
            >
              What&apos;s Included
            </h2>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {service.features.map((feature: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <CheckCircle2 size={20} color="#B8975A" strokeWidth={1.5} style={{ marginTop: "2px", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#3C3C43",
                        lineHeight: 1.5,
                      }}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
          </motion.div>

          {/* Right — sticky CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: "sticky", top: "80px" }}
          >
            <div
              style={{
                backgroundColor: "#1D1D1F",
                borderRadius: "20px",
                padding: "40px",
                color: "#FFFFFF",
              }}
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
                Free Consultation
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "26px",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Ready to get started?
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  marginBottom: "32px",
                }}
              >
                Get in touch for a free, no-obligation consultation. We&apos;ll visit your property and provide a detailed fixed-price quote.
              </p>

              <Link
                href="/#contact"
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: "#1D1D1F",
                  backgroundColor: "#FFFFFF",
                  padding: "14px 24px",
                  borderRadius: "980px",
                  textDecoration: "none",
                  textAlign: "center",
                  marginBottom: "16px",
                  transition: "background-color 0.2s ease",
                }}
              >
                Request a Free Quote
              </Link>

              <a
                href={`tel:${siteData.company.phone}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} />
                {siteData.company.phone}
              </a>
            </div>

            {/* Stats */}
            <div
              style={{
                marginTop: "24px",
                backgroundColor: "#F5F5F7",
                borderRadius: "16px",
                padding: "28px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {siteData.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 600,
                      fontSize: "24px",
                      color: "#1D1D1F",
                      lineHeight: 1.2,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#86868B",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Services */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "#F5F5F7",
          borderTop: "1px solid #E5E5EA",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "32px",
              color: "#1D1D1F",
              marginBottom: "40px",
              letterSpacing: "-0.01em",
            }}
          >
            Other Services
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
            className="other-services-grid"
          >
            {siteData.services.items
              .filter((s) => s.id !== service.id)
              .slice(0, 3)
              .map((s) => {
                const OtherIcon = iconMap[s.icon] ?? Home;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "14px",
                        padding: "28px",
                        transition: "box-shadow 0.3s ease",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      }}
                    >
                      <OtherIcon size={24} color="#1D1D1F" strokeWidth={1.5} />
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 600,
                          fontSize: "17px",
                          color: "#1D1D1F",
                          marginTop: "16px",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {s.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 500,
                          fontSize: "13px",
                          color: "#B8975A",
                        }}
                      >
                        Learn more →
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#000000",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "60px 0 32px",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "18px", color: "#FFFFFF" }}>WV</span>
              <span style={{ width: "1px", height: "16px", backgroundColor: "#B8975A", display: "block" }} aria-hidden="true" />
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300, fontSize: "14px", color: "#FFFFFF", letterSpacing: "0.02em" }}>Construction</span>
            </div>
            <nav style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {siteData.footer.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              {siteData.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .service-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .other-services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
