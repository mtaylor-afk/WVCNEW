"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { siteData } from "@/lib/data";

const SECTION_IDS = ["services", "why-us", "testimonials", "process", "contact"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "52px",
          backgroundColor: isScrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(210,210,215,0.5)",
          transition: "background-color 0.3s ease",
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
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
            aria-label="WV Construction — return to top"
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 600,
                fontSize: "18px",
                color: "#1D1D1F",
                letterSpacing: "-0.01em",
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
                color: "#1D1D1F",
                letterSpacing: "0.02em",
              }}
            >
              Construction
            </span>
          </a>

          {/* Centre nav links — desktop only */}
          <nav
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
            className="hidden md:flex"
          >
            {siteData.nav.links.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: isActive ? 500 : 400,
                    fontSize: "14px",
                    color: isActive ? "#1D1D1F" : "#1D1D1F",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    opacity: isActive ? 1 : 0.75,
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = "#B8975A";
                    (e.target as HTMLAnchorElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = "#1D1D1F";
                    (e.target as HTMLAnchorElement).style.opacity = isActive ? "1" : "0.75";
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#FFFFFF",
                backgroundColor: "#1D1D1F",
                padding: "8px 20px",
                borderRadius: "980px",
                textDecoration: "none",
                transition: "background-color 0.3s ease",
                display: "inline-block",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = "#B8975A";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = "#1D1D1F";
              }}
              className="hidden md:inline-block"
              aria-label="Get a quote from WV Construction"
            >
              {siteData.nav.cta}
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "#1D1D1F",
                display: "flex",
                alignItems: "center",
              }}
              className="flex md:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
          >
            {/* Close button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "48px" }}>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#1D1D1F",
                  padding: "8px",
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}
              aria-label="Mobile navigation"
            >
              {siteData.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "40px",
                    color: "#1D1D1F",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "#FFFFFF",
                backgroundColor: "#1D1D1F",
                padding: "16px",
                borderRadius: "980px",
                textDecoration: "none",
                textAlign: "center",
                marginBottom: "32px",
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
