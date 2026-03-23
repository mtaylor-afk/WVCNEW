"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, ExternalLink, CheckCircle2, MapPin, Tag } from "lucide-react";
import { siteData } from "@/lib/data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

function ProjectImage({
  src,
  alt,
  bg,
  index,
}: {
  src?: string;
  alt: string;
  bg: string;
  index: number;
}) {
  if (src) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "62%",
          borderRadius: "16px",
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: "#1E1E20",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 860px) 100vw, 50vw"
          priority={index < 2}
        />
      </div>
    );
  }

  // Fallback placeholder when no image is available
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "62%",
        borderRadius: "16px",
        overflow: "hidden",
        background: bg,
        flexShrink: 0,
      }}
      role="img"
      aria-label={alt}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 8vw, 72px)",
            color: "rgba(184,151,90,0.15)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          WV
        </span>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            userSelect: "none",
          }}
        >
          Photo coming soon
        </span>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 600,
          fontSize: "13px",
          color: "rgba(184,151,90,0.5)",
          letterSpacing: "0.04em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof siteData.ourWork.projects)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "56px",
        alignItems: "start",
        paddingTop: "72px",
        paddingBottom: "72px",
        borderTop: "1px solid #E5E5EA",
      }}
      className="project-card-grid"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Image column — alternates side */}
      <div
        style={{ order: isEven ? 0 : 1 }}
        className="project-image-col"
      >
        <ProjectImage
          src={project.imageSrc}
          alt={project.imageAlt}
          bg={project.imageBg}
          index={index}
        />
        {/* Tags below image */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#B8975A",
                backgroundColor: "rgba(184,151,90,0.08)",
                padding: "5px 10px",
                borderRadius: "980px",
                border: "1px solid rgba(184,151,90,0.2)",
              }}
            >
              <Tag size={10} aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content column */}
      <div style={{ order: isEven ? 1 : 0 }}>
        {/* Service label */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#B8975A",
            marginBottom: "12px",
          }}
        >
          {project.serviceLabel}
        </p>

        {/* Title */}
        <h2
          id={`project-title-${project.id}`}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 34px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#1D1D1F",
            marginBottom: "10px",
          }}
        >
          {project.title}
        </h2>

        {/* Location */}
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            color: "#86868B",
            marginBottom: "20px",
          }}
        >
          <MapPin size={13} aria-hidden="true" />
          {project.location}, Wirral
        </p>

        {/* Overview */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#3C3C43",
            marginBottom: "28px",
          }}
        >
          {project.overview}
        </p>

        {/* Challenge / Solution / Result */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          {[
            { label: "The challenge", text: project.challenge },
            { label: "Our approach", text: project.solution },
            { label: "The result", text: project.result },
          ].map(({ label, text }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#1D1D1F",
                  marginBottom: "6px",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#6E6E73",
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* What was included */}
        <div
          style={{
            backgroundColor: "#F5F5F7",
            borderRadius: "14px",
            padding: "20px 24px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1D1D1F",
              marginBottom: "14px",
            }}
          >
            What was included
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {project.included.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <CheckCircle2
                  size={15}
                  color="#B8975A"
                  strokeWidth={1.5}
                  style={{ marginTop: "2px", flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#3C3C43",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function OurWorkClient() {
  const { ourWork, company, nav } = siteData;

  return (
    <div className="our-work-page" style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* ─── Navbar ─── */}
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
            aria-label="WV Construction — home"
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

          <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
            {nav.links.map((link) => (
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
            <Link
              href="/our-work"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#B8975A",
                textDecoration: "none",
              }}
              aria-current="page"
            >
              Our Work
            </Link>
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

      <main>

        {/* ─── Hero ─── */}
        <section
          style={{
            paddingTop: "120px",
            paddingBottom: "80px",
            backgroundColor: "#F5F5F7",
            borderBottom: "1px solid #E5E5EA",
          }}
          aria-labelledby="hero-heading"
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
            <motion.div {...fadeUp}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#B8975A",
                  textDecoration: "none",
                  marginBottom: "36px",
                }}
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back to Home
              </Link>

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
                WV Construction · Wirral
              </p>

              <h1
                id="hero-heading"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 6vw, 68px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#1D1D1F",
                  marginBottom: "24px",
                }}
              >
                {ourWork.headline[0]}
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 600, color: "#3C3C43" }}>
                  {ourWork.headline[1]}
                </em>
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 2vw, 19px)",
                  color: "#6E6E73",
                  lineHeight: 1.6,
                  maxWidth: "620px",
                  marginBottom: "40px",
                }}
              >
                {ourWork.subheadline}
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/#contact"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#FFFFFF",
                    backgroundColor: "#1D1D1F",
                    padding: "14px 28px",
                    borderRadius: "980px",
                    textDecoration: "none",
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                >
                  {ourWork.cta.primary}
                </Link>
                <a
                  href={`tel:${company.phone}`}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#1D1D1F",
                    backgroundColor: "transparent",
                    padding: "14px 28px",
                    borderRadius: "980px",
                    textDecoration: "none",
                    lineHeight: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid rgba(29,29,31,0.2)",
                  }}
                >
                  <Phone size={15} aria-hidden="true" />
                  {ourWork.cta.secondary}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Trust intro ─── */}
        <section
          style={{ padding: "80px 0", borderBottom: "1px solid #E5E5EA" }}
          aria-labelledby="trust-heading"
        >
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h2
                id="trust-heading"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(26px, 4vw, 38px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#1D1D1F",
                  marginBottom: "20px",
                }}
              >
                {ourWork.trustIntro.heading}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.75,
                  color: "#6E6E73",
                  marginBottom: "16px",
                }}
              >
                {ourWork.trustIntro.body}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "#86868B",
                }}
              >
                {ourWork.trustIntro.sub}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Projects showcase ─── */}
        <section
          style={{ padding: "0 0 80px" }}
          aria-label="Completed project examples"
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
            {ourWork.projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ─── Verified reviews block ─── */}
        <section
          style={{
            backgroundColor: "#F5F5F7",
            borderTop: "1px solid #E5E5EA",
            borderBottom: "1px solid #E5E5EA",
            padding: "80px 0",
          }}
          aria-labelledby="reviews-heading"
        >
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
                  textAlign: "center",
                }}
              >
                Verified Reviews
              </p>
              <h2
                id="reviews-heading"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(26px, 4vw, 38px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "#1D1D1F",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Independently verified on {ourWork.verifiedReviews.platform}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#6E6E73",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                {ourWork.verifiedReviews.claim}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#86868B",
                  marginBottom: "36px",
                  textAlign: "center",
                }}
              >
                {ourWork.verifiedReviews.note}
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <a
                  href={ourWork.verifiedReviews.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ourWork.verifiedReviews.cta} (opens in a new tab)`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#1D1D1F",
                    backgroundColor: "#FFFFFF",
                    padding: "12px 24px",
                    borderRadius: "980px",
                    textDecoration: "none",
                    border: "1px solid #E5E5EA",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {ourWork.verifiedReviews.cta}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section
          style={{ padding: "96px 0", backgroundColor: "#1D1D1F" }}
          aria-labelledby="cta-heading"
        >
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
                Start your project
              </p>
              <h2
                id="cta-heading"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "clamp(30px, 5vw, 52px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  marginBottom: "20px",
                }}
              >
                Ready to get started?
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "40px",
                }}
              >
                Get in touch for a free, no-obligation consultation. We&apos;ll visit your property and provide a detailed, fixed-price quote.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/#contact"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#1D1D1F",
                    backgroundColor: "#FFFFFF",
                    padding: "14px 28px",
                    borderRadius: "980px",
                    textDecoration: "none",
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                >
                  Get a Quote
                </Link>
                <Link
                  href="/#services"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.8)",
                    backgroundColor: "transparent",
                    padding: "14px 28px",
                    borderRadius: "980px",
                    textDecoration: "none",
                    lineHeight: 1,
                    display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  View Services
                </Link>
                <a
                  href={`tel:${company.phone}`}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "14px 0",
                  }}
                >
                  <Phone size={14} aria-hidden="true" />
                  {company.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
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
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: "18px", color: "#FFFFFF" }}>WV</span>
                <span style={{ width: "1px", height: "16px", backgroundColor: "#B8975A", display: "block" }} aria-hidden="true" />
                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300, fontSize: "14px", color: "#FFFFFF", letterSpacing: "0.02em" }}>Construction</span>
              </div>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 300, fontSize: "13px", color: "rgba(255,255,255,0.35)", maxWidth: "220px", lineHeight: 1.6 }}>
                Building excellence across the Wirral Peninsula.
              </p>
            </div>

            {/* Nav */}
            <nav aria-label="Footer navigation" style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/our-work"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "rgba(184,151,90,0.8)",
                  textDecoration: "none",
                }}
                aria-current="page"
              >
                Our Work
              </Link>
            </nav>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 400, fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} WV Construction LTD · All rights reserved · Wallasey, Wirral
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .project-image-col {
            order: 0 !important;
          }
          .project-card-grid > div:last-child {
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
