"use client";

import { Twitter, Linkedin, ExternalLink } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

export default function QCFooter() {
  const { footer } = qcData;

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#060E1A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Main grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div
          className="qc-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "56px",
            padding: "64px 0 56px",
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#2563EB",
                  letterSpacing: "-0.02em",
                }}
              >
                QC
              </span>
              <div
                style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#F97316" }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "14px",
                  color: "#F8FAFC",
                  letterSpacing: "0.04em",
                }}
              >
                QuoteCalc
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                color: "rgba(248,250,252,0.65)",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "260px",
              }}
            >
              {footer.tagline}
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "10px" }}>
              <SocialLink href="#" ariaLabel="QuoteCalc on Twitter (opens in new tab)">
                <Twitter size={17} strokeWidth={1.5} aria-hidden="true" />
              </SocialLink>
              <SocialLink href="#" ariaLabel="QuoteCalc on LinkedIn (opens in new tab)">
                <Linkedin size={17} strokeWidth={1.5} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          {/* Col 2 — Product links */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(248,250,252,0.45)",
                marginBottom: "20px",
              }}
            >
              Product
            </h3>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(248,250,252,0.70)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        cursor: "pointer",
                        minHeight: "44px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F8FAFC")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.70)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(248,250,252,0.45)",
                marginBottom: "20px",
              }}
            >
              Company
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#F8FAFC",
                }}
              >
                QuoteCalc Ltd
              </span>
              <a
                href="mailto:hello@quotecalc.co.uk"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgba(248,250,252,0.70)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F8FAFC")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.70)")}
              >
                hello@quotecalc.co.uk
              </a>
            </div>

            <nav aria-label="Legal links">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                {footer.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        color: "rgba(248,250,252,0.45)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        minHeight: "44px",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.75)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.45)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(248,250,252,0.45)",
            }}
          >
            {footer.copyright}
          </p>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(248,250,252,0.30)",
            }}
          >
            {footer.vat}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .qc-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .qc-footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .qc-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

function SocialLink({ href, ariaLabel, children }: { href: string; ariaLabel: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "rgba(248,250,252,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(248,250,252,0.55)",
        transition: "background-color 0.2s ease, color 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(37,99,235,0.18)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#60A5FA";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(248,250,252,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(248,250,252,0.55)";
      }}
    >
      {children}
    </a>
  );
}
