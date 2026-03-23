"use client";

import { Facebook, Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/lib/data";

export default function Footer() {
  const { footer, company } = siteData;

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "80px 0 0",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Three column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: "64px",
            marginBottom: "64px",
          }}
          className="footer-grid"
        >
          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#FFFFFF",
                }}
              >
                WV
              </span>
              <span
                style={{
                  width: "1px",
                  height: "16px",
                  backgroundColor: "#B8975A",
                  display: "block",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                Construction
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.6,
                marginBottom: "28px",
                maxWidth: "240px",
              }}
            >
              {footer.tagline}
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "16px" }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WV Construction on Facebook"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <Facebook size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WV Construction on Instagram"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "20px",
              }}
            >
              {footer.nav.heading}
            </h3>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {footer.nav.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {/* Our Work — standalone page */}
                <li>
                  <Link
                    href="/our-work"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "rgba(184,151,90,0.75)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#B8975A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(184,151,90,0.75)";
                    }}
                  >
                    Our Work
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Compact verified reviews trust line */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1.5,
                  marginBottom: "8px",
                }}
              >
                Reviews independently verified on
              </p>
              <a
                href={siteData.ourWork.verifiedReviews.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View WV Construction reviews on MyBuilder (opens in a new tab)"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "rgba(184,151,90,0.6)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#B8975A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(184,151,90,0.6)";
                }}
              >
                {siteData.ourWork.verifiedReviews.platform}
                <ExternalLink size={10} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 3 — Company info */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "20px",
              }}
            >
              {footer.company.heading}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <FooterDetail label="Company No." value={footer.company.companyNo} />
              <FooterDetail label="VAT No." value={footer.company.vatNo} />
              <FooterDetail label="Registered" value={footer.company.registered} />
              <FooterDetail label="Phone" value={company.phone} />
              <FooterDetail label="Email" value={company.email} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {footer.copyright}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function FooterDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: "rgba(255,255,255,0.25)",
          display: "block",
          marginBottom: "2px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
