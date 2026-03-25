"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

const SECTION_IDS = ["features", "how-it-works", "pricing", "faq"];
const MOBILE_MENU_ID = "qc-mobile-menu";

export default function QCNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  // Focus close button when mobile menu opens
  useEffect(() => {
    if (mobileOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    // Return focus to hamburger when menu closes
    if (!mobileOpen && hamburgerRef.current) {
      // Only refocus if the menu was previously open (avoid initial render)
    }
  }, [mobileOpen]);

  // Focus management: return focus to hamburger on close
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    // Defer so AnimatePresence exit runs first
    requestAnimationFrame(() => {
      hamburgerRef.current?.focus();
    });
  }, []);

  // Escape key handler for overlay
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  // Smooth scroll to section by ID
  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNavLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo]
  );

  const handleMobileNavLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMobileMenu();
      // Slight delay so overlay exit animation starts before scroll
      setTimeout(() => scrollTo(href), 120);
    },
    [closeMobileMenu, scrollTo]
  );

  const handleMobileCtaClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      closeMobileMenu();
      setTimeout(() => {
        const el = document.getElementById("pricing");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    },
    [closeMobileMenu]
  );

  return (
    <>
      {/* Floating pill wrapper */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "16px 24px",
          pointerEvents: "none",
        }}
      >
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "100%",
            maxWidth: "960px",
            backgroundColor: isScrolled
              ? "rgba(255,255,255,0.97)"
              : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "980px",
            border: "1px solid rgba(15,23,42,0.1)",
            boxShadow: isScrolled
              ? "0 8px 40px rgba(0,0,0,0.13)"
              : "0 4px 20px rgba(0,0,0,0.07)",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px 0 24px",
            pointerEvents: "all",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          }}
          role="banner"
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="QuoteCalc — return to top"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              flexShrink: 0,
              borderRadius: "4px",
              outline: "none",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 0 3px rgba(37,99,235,0.45)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#2563EB",
                letterSpacing: "-0.02em",
              }}
            >
              QC
            </span>
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#2563EB",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                color: "#0F172A",
                letterSpacing: "0.02em",
              }}
            >
              QuoteCalc
            </span>
          </a>

          {/* Centre nav — desktop only (hidden on mobile via media query via inline style trick) */}
          <nav
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
            }}
            className="qc-desktop-nav"
          >
            {qcData.nav.links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: "13.5px",
                    color: isActive ? "#0F172A" : "#64748B",
                    textDecoration: "none",
                    padding: "6px 13px",
                    borderRadius: "980px",
                    backgroundColor: isActive
                      ? "rgba(37,99,235,0.08)"
                      : "transparent",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#0F172A";
                      (
                        e.currentTarget as HTMLAnchorElement
                      ).style.backgroundColor = "rgba(37,99,235,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#64748B";
                      (
                        e.currentTarget as HTMLAnchorElement
                      ).style.backgroundColor = "transparent";
                    }
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 0 3px rgba(37,99,235,0.45)";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Desktop CTA */}
            <a
              href="#pricing"
              onClick={(e) => handleNavLinkClick(e, "#pricing")}
              aria-label="Start your free trial of QuoteCalc"
              className="qc-desktop-cta"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#FFFFFF",
                backgroundColor: "#F97316",
                padding: "0 20px",
                borderRadius: "980px",
                textDecoration: "none",
                transition: "background-color 0.25s ease, box-shadow 0.2s ease",
                cursor: "pointer",
                height: "44px",
                display: "inline-flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                outline: "none",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#ea6c0a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#F97316";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 0 3px rgba(249,115,22,0.45)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              {qcData.nav.cta}
            </a>

            {/* Hamburger — mobile */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-haspopup="dialog"
              className="qc-mobile-hamburger"
              style={{
                background: "rgba(37,99,235,0.07)",
                border: "none",
                cursor: "pointer",
                color: "#0F172A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                flexShrink: 0,
                transition: "background-color 0.2s ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(37,99,235,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  "rgba(37,99,235,0.07)";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 0 3px rgba(37,99,235,0.45)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Responsive style rules injected once */}
      <style>{`
        .qc-desktop-nav {
          display: flex !important;
        }
        .qc-desktop-cta {
          display: inline-flex !important;
        }
        .qc-mobile-hamburger {
          display: none !important;
        }
        @media (max-width: 767px) {
          .qc-desktop-nav {
            display: none !important;
          }
          .qc-desktop-cta {
            display: none !important;
          }
          .qc-mobile-hamburger {
            display: flex !important;
          }
        }
        /* Global focus-visible ring for keyboard users */
        .qc-mobile-hamburger:focus-visible,
        .qc-desktop-cta:focus-visible {
          box-shadow: 0 0 0 3px rgba(37,99,235,0.45) !important;
          outline: none;
        }
      `}</style>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "#0B1424",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMenuKeyDown}
          >
            {/* Mobile header row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "56px",
              }}
            >
              {/* Logo in overlay */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#2563EB",
                  }}
                >
                  QC
                </span>
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "#2563EB",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: "14px",
                    color: "#FFFFFF",
                  }}
                >
                  QuoteCalc
                </span>
              </div>

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  color: "#FFFFFF",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s ease",
                  outline: "none",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 0 3px rgba(37,99,235,0.55)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 0,
              }}
              aria-label="Mobile navigation"
            >
              {qcData.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNavLinkClick(e, link.href)}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.38,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(34px, 8vw, 52px)",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    padding: "12px 0",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    minHeight: "44px",
                    display: "block",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#F97316";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#FFFFFF";
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#F97316";
                    (e.currentTarget as HTMLAnchorElement).style.outline =
                      "2px solid rgba(249,115,22,0.7)";
                    (e.currentTarget as HTMLAnchorElement).style.outlineOffset =
                      "4px";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#FFFFFF";
                    (e.currentTarget as HTMLAnchorElement).style.outline =
                      "none";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.a
              href="#pricing"
              onClick={handleMobileCtaClick}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: qcData.nav.links.length * 0.07,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              aria-label="Start your free trial of QuoteCalc"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#FFFFFF",
                backgroundColor: "#F97316",
                padding: "18px",
                borderRadius: "980px",
                textDecoration: "none",
                textAlign: "center",
                marginBottom: "32px",
                cursor: "pointer",
                minHeight: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#ea6c0a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#F97316";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 0 3px rgba(249,115,22,0.55)";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              {qcData.nav.cta}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
