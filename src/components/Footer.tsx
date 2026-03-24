"use client";

import { Facebook, Instagram, ExternalLink, ArrowUpRight } from "lucide-react";
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
        backgroundColor: "#060E1A",
        borderTop: "1px solid rgba(250,247,240,0.06)",
      }}
    >
      {/* CTA row */}
      <div
        style={{
          borderBottom: "1px solid rgba(250,247,240,0.06)",
          padding: "64px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
          }}
          className="footer-cta-row"
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "rgba(250,247,240,0.35)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Ready to start your project?
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#FAF7F0",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Get a free quote today.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              color: "#0B1F3A",
              backgroundColor: "#C9A84C",
              padding: "0 32px",
              borderRadius: "980px",
              textDecoration: "none",
              transition: "background-color 0.25s ease, transform 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "52px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#DFB23A";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C9A84C";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
            aria-label="Get a free quote from WV Construction"
          >
            Get a Free Quote
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "56px",
            padding: "64px 0 56px",
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "19px",
                  color: "#FAF7F0",
                  letterSpacing: "-0.02em",
                }}
              >
                WV
              </span>
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#C9A84C",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "14px",
                  color: "#FAF7F0",
                  letterSpacing: "0.04em",
                }}
              >
                Construction
              </span>
            </div>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                color: "rgba(250,247,240,0.38)",
                lineHeight: 1.65,
                marginBottom: "28px",
                maxWidth: "240px",
              }}
            >
              {footer.tagline}
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: "12px" }}>
              <SocialLink
                href="https://facebook.com"
                aria-label="WV Construction on Facebook"
              >
                <Facebook size={17} strokeWidth={1.5} aria-hidden="true" />
              </SocialLink>
              <SocialLink
                href="https://instagram.com"
                aria-label="WV Construction on Instagram"
              >
                <Instagram size={17} strokeWidth={1.5} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(250,247,240,0.28)",
                marginBottom: "20px",
              }}
            >
              {footer.nav.heading}
            </h3>
            <nav aria-label="Footer navigation">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {footer.nav.links.map((link) => (
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
                        color: "rgba(250,247,240,0.55)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        cursor: "pointer",
                        minHeight: "32px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "#FAF7F0";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "rgba(250,247,240,0.55)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/our-work"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "rgba(201,168,76,0.7)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      cursor: "pointer",
                      minHeight: "32px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#C9A84C";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(201,168,76,0.7)";
                    }}
                  >
                    Our Work
                  </Link>
                </li>
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
                color: "rgba(250,247,240,0.28)",
                marginBottom: "20px",
              }}
            >
              {footer.company.heading}
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <FooterDetail label="Company No." value={footer.company.companyNo} />
              <FooterDetail label="VAT No." value={footer.company.vatNo} />
              <FooterDetail
                label="Registered"
                value={footer.company.registered}
              />
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(250,247,240,0.28)",
                marginBottom: "20px",
              }}
            >
              Contact
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <FooterDetail label="Phone" value={company.phone} />
              <FooterDetail label="Email" value={company.email} />
            </div>

            {/* MyBuilder badge */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(250,247,240,0.07)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: "rgba(250,247,240,0.22)",
                  lineHeight: 1.5,
                  marginBottom: "6px",
                }}
              >
                Reviews verified on
              </p>
              <a
                href={siteData.ourWork.verifiedReviews.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View reviews on ${siteData.ourWork.verifiedReviews.platform} (opens in new tab)`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "rgba(201,168,76,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(201,168,76,0.55)";
                }}
              >
                {siteData.ourWork.verifiedReviews.platform}
                <ExternalLink size={10} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(250,247,240,0.06)",
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
              color: "rgba(250,247,240,0.25)",
            }}
          >
            {footer.copyright}
          </p>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              color: "rgba(250,247,240,0.18)",
            }}
          >
            Built with care on the Wirral
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-cta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}

function SocialLink({
  href,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "rgba(250,247,240,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(250,247,240,0.45)",
        transition: "background-color 0.2s ease, color 0.2s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
          "rgba(201,168,76,0.15)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
          "rgba(250,247,240,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.color =
          "rgba(250,247,240,0.45)";
      }}
    >
      {children}
    </a>
  );
}

function FooterDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "11px",
          color: "rgba(250,247,240,0.22)",
          display: "block",
          marginBottom: "2px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "13.5px",
          color: "rgba(250,247,240,0.42)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
