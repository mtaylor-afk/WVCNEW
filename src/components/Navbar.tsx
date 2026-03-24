"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/lib/data";

const SECTION_IDS = ["services", "why-us", "testimonials", "process", "contact"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

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
            maxWidth: "920px",
            backgroundColor: isScrolled
              ? "rgba(255,255,255,0.97)"
              : "rgba(255,255,255,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "980px",
            border: "1px solid rgba(210,210,215,0.55)",
            boxShadow: isScrolled
              ? "0 8px 40px rgba(0,0,0,0.14)"
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label="WV Construction — return to top"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "17px",
                color: "#0B1F3A",
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
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "13px",
                color: "#0B1F3A",
                letterSpacing: "0.04em",
              }}
            >
              Construction
            </span>
          </a>

          {/* Centre nav — desktop */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "2px" }}
          >
            {siteData.nav.links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: "13.5px",
                    color: isActive ? "#0B1F3A" : "#6E6E73",
                    textDecoration: "none",
                    padding: "6px 13px",
                    borderRadius: "980px",
                    backgroundColor: isActive ? "rgba(11,31,58,0.07)" : "transparent",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#0B1F3A";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "rgba(11,31,58,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#6E6E73";
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                        "transparent";
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              href="/our-work"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13.5px",
                color: "#C9A84C",
                textDecoration: "none",
                padding: "6px 13px",
                borderRadius: "980px",
                transition: "all 0.2s ease",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              Our Work
            </Link>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="hidden md:inline-flex"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                color: "#FAF7F0",
                backgroundColor: "#0B1F3A",
                padding: "0 22px",
                borderRadius: "980px",
                textDecoration: "none",
                transition: "background-color 0.25s ease",
                alignItems: "center",
                cursor: "pointer",
                height: "40px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0B1F3A";
              }}
              aria-label="Get a quote from WV Construction"
            >
              {siteData.nav.cta}
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="flex md:hidden"
              style={{
                background: "rgba(11,31,58,0.07)",
                border: "none",
                cursor: "pointer",
                color: "#0B1F3A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                flexShrink: 0,
                transition: "background-color 0.2s ease",
              }}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "#0B1F3A",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Mobile header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "56px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#FAF7F0",
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
                  }}
                >
                  Construction
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  color: "#FAF7F0",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.2s ease",
                }}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile links */}
            <nav
              style={{ display: "flex", flexDirection: "column", flex: 1, gap: "0" }}
              aria-label="Mobile navigation"
            >
              {siteData.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(34px, 8vw, 52px)",
                    color: "#FAF7F0",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    borderBottom: "1px solid rgba(250,247,240,0.08)",
                    padding: "12px 0",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    minHeight: "44px",
                    display: "block",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: siteData.nav.links.length * 0.07,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  href="/our-work"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "clamp(34px, 8vw, 52px)",
                    color: "#C9A84C",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    display: "block",
                    padding: "12px 0",
                    cursor: "pointer",
                    minHeight: "44px",
                  }}
                >
                  Our Work
                </Link>
              </motion.div>
            </nav>

            {/* Mobile CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#0B1F3A",
                backgroundColor: "#C9A84C",
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
              }}
            >
              Get a Free Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
