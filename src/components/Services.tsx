"use client";

import { motion } from "framer-motion";
import {
  Home,
  Maximize2,
  Wrench,
  Triangle,
  LayoutGrid,
  Layers,
} from "lucide-react";
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

// Returns border-radius based on grid position (3-col grid, 6 items)
function getCardRadius(index: number): string {
  const isTop = index < 3;
  const isBottom = index >= 3;
  const isLeft = index % 3 === 0;
  const isRight = index % 3 === 2;

  const tl = isTop && isLeft ? "18px" : "4px";
  const tr = isTop && isRight ? "18px" : "4px";
  const bl = isBottom && isLeft ? "18px" : "4px";
  const br = isBottom && isRight ? "18px" : "4px";

  return `${tl} ${tr} ${br} ${bl}`;
}

export default function Services() {
  const { services } = siteData;

  return (
    <section
      id="services"
      style={{
        backgroundColor: "#F5F5F7",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
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
            {services.label}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.1,
              color: "#1D1D1F",
              letterSpacing: "-0.01em",
            }}
          >
            {services.heading}
          </h2>
        </motion.div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
          className="services-grid"
        >
          {services.items.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Home;
            return (
              <ServiceCard
                key={service.id}
                service={service}
                Icon={Icon}
                index={i}
                borderRadius={getCardRadius(i)}
              />
            );
          })}
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({
  service,
  Icon,
  index,
  borderRadius,
}: {
  service: { id: string; name: string; description: string };
  Icon: React.ElementType;
  index: number;
  borderRadius: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}
      transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius,
        padding: "40px",
        cursor: "default",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        transition: "all 0.4s cubic-bezier(0.25,0.1,0.25,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Icon
        size={32}
        color="#1D1D1F"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 600,
          fontSize: "22px",
          color: "#1D1D1F",
          marginTop: "24px",
          marginBottom: "12px",
          lineHeight: 1.3,
        }}
      >
        {service.name}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "15px",
          color: "#6E6E73",
          lineHeight: 1.6,
          marginBottom: "24px",
          flex: 1,
        }}
      >
        {service.description}
      </p>
      <Link
        href={`/services/${service.id}`}
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: "14px",
          color: "#B8975A",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          transition: "gap 0.2s ease",
        }}
      >
        Learn more →
      </Link>
    </motion.div>
  );
}
