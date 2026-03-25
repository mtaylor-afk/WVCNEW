"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  FileCheck,
  Users,
  ListChecks,
  Camera,
  FolderOpen,
  ImagePlus,
  Smartphone,
} from "lucide-react";
import { qcData } from "@/lib/quotecalc-data";

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const iconMap = {
  Sparkles,
  FileCheck,
  Users,
  ListChecks,
  Camera,
  FolderOpen,
  ImagePlus,
  Smartphone,
} as const;

type IconKey = keyof typeof iconMap;

// ---------------------------------------------------------------------------
// Bento grid-column layout per card index (0-based)
// Desktop three-column grid:
//   Row 1: [0] span-2 highlight | [1] span-1 | [2] span-1   → but that's 4 cols
//   Spec: row 1 = card1 span-2, card2 span-1, card3 span-1
//         row 2 = card4 span-1, card5 span-2, card6 span-1
//         row 3 = card7 span-1, card8 full (span-3)
// Indices: 0,1,2,3,4,5,6,7
// ---------------------------------------------------------------------------
type ColSpan = 1 | 2 | 3;

const desktopColSpan: ColSpan[] = [2, 1, 1, 1, 2, 1, 1, 1];

// Card 7 (index 6) and card 8 (index 7) are in row 3.
// Row 3: card7 (span-1) + card8 (span-1) — but the spec says "Card 7, Card 8 (full width)".
// Reading the spec literally: row 3 → Card 7 span-1, Card 8 full width (span-3).
// That means row 3 breaks across two grid rows visually, so we give card 8 span-3 to
// force it to its own row:
// Actually re-reading: "Row 3: Card 7, Card 8 (full width)" — card 8 is full width (span 3).
// Card 7 is span 1, then card 8 is span 3 which wraps. That leaves a gap.
// Better interpretation: both on one row → card 7 span-1, card 8 span-2 to fill 3 cols.
// Or: they each get their own row — card 7 span-3, card 8 span-3.
// The clearest reading is "Row 3 = Card 7 (span-1) + Card 8 (span-2, full remaining)".
// We'll give card 7 span-1, card 8 span-2 so row 3 is a clean 1+2 = 3 cols.
// Override index 7 to span-2:
const desktopColSpanFinal: ColSpan[] = [2, 1, 1, 1, 2, 1, 1, 2];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  body: string;
  tag: string;
  highlight: boolean;
}

// ---------------------------------------------------------------------------
// FeatureCard
// ---------------------------------------------------------------------------
function FeatureCard({
  item,
  index,
  colSpan,
}: {
  item: FeatureItem;
  index: number;
  colSpan: ColSpan;
}) {
  const IconComponent = iconMap[item.icon as IconKey] ?? Sparkles;
  const isHighlight = item.highlight;

  // ---- colour tokens ----
  const cardBg = isHighlight
    ? "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)"
    : "#FFFFFF";
  const cardBorder = isHighlight ? "none" : "1px solid rgba(15,23,42,0.07)";
  const cardPadding = isHighlight ? "40px" : "32px";
  const cardMinHeight = isHighlight ? "260px" : "220px";

  const tagColor = isHighlight ? "rgba(255,255,255,0.7)" : "#2563EB";
  const tagBg = isHighlight ? "rgba(255,255,255,0.12)" : "rgba(37,99,235,0.08)";

  const iconColor = isHighlight ? "#FFFFFF" : "#2563EB";
  const iconContainerBg = isHighlight
    ? "rgba(255,255,255,0.15)"
    : "rgba(37,99,235,0.08)";

  const titleColor = isHighlight ? "#FFFFFF" : "#0F172A";
  const bodyColor = isHighlight ? "rgba(255,255,255,0.7)" : "#64748B";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.52,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      // data attribute carries the col-span value so the <style> tag can target it
      data-col-span={colSpan}
      aria-label={item.title}
      style={{
        background: cardBg,
        border: cardBorder,
        borderRadius: "20px",
        padding: cardPadding,
        minHeight: cardMinHeight,
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        cursor: "default",
        // grid-column applied via className + style — we use inline style here
        // and override per breakpoint in the <style> block.
      }}
      className={`qcf-card qcf-card--span-${colSpan}${isHighlight ? " qcf-card--highlight" : ""}`}
      // Hover is handled via CSS in the <style> tag (can't do :hover in inline styles)
    >
      {/* Tag badge */}
      <span
        style={{
          display: "inline-block",
          alignSelf: "flex-start",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: tagColor,
          backgroundColor: tagBg,
          padding: "4px 10px",
          borderRadius: "980px",
          lineHeight: 1.4,
        }}
      >
        {item.tag}
      </span>

      {/* Icon container */}
      <div
        aria-hidden="true"
        style={{
          marginTop: "20px",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          backgroundColor: iconContainerBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IconComponent
          size={24}
          strokeWidth={1.5}
          color={iconColor}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "17px",
          color: titleColor,
          marginTop: "20px",
          marginBottom: "8px",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: 1.65,
          color: bodyColor,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {item.body}
      </p>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// QCFeatures
// ---------------------------------------------------------------------------
export default function QCFeatures() {
  const { eyebrow, heading, items } = qcData.features;

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{
        backgroundColor: "#F8FAFC",
        padding: "120px 0",
      }}
    >
      {/* ---- Responsive styles ---- */}
      <style>{`
        /* Hover states for regular cards */
        .qcf-card:not(.qcf-card--highlight):hover {
          box-shadow: 0 12px 48px rgba(15,23,42,0.08);
          transform: translateY(-3px);
        }

        /* Grid layout defaults — mobile: 1 col */
        .qcf-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* All cards span 1 col on mobile */
        .qcf-card {
          grid-column: span 1;
        }

        /* Tablet: 2 columns, all cards span 1 */
        @media (min-width: 768px) {
          .qcf-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .qcf-card {
            grid-column: span 1;
          }
        }

        /* Desktop: 3-column bento */
        @media (min-width: 1024px) {
          .qcf-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .qcf-card--span-1 {
            grid-column: span 1;
          }
          .qcf-card--span-2 {
            grid-column: span 2;
          }
          .qcf-card--span-3 {
            grid-column: span 3;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ---- Section header ---- */}
        <header style={{ textAlign: "center", marginBottom: "72px" }}>
          {/* Eyebrow with flanking rules */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#2563EB",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#2563EB",
                padding: "0 12px",
                whiteSpace: "nowrap",
              }}
            >
              {eyebrow}
            </span>
            <div
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "#2563EB",
                flexShrink: 0,
              }}
            />
          </div>

          {/* Heading — spec text overrides the data newline variant */}
          <h2
            id="features-heading"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(38px, 5vw, 64px)",
              color: "#0F172A",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Everything a builder needs to quote, invoice, and win more work.
          </h2>
        </header>

        {/* ---- Bento grid ---- */}
        <div className="qcf-grid" role="list">
          {(items as FeatureItem[]).map((item, index) => (
            <div key={item.id} role="listitem" style={{ display: "contents" }}>
              <FeatureCard
                item={item}
                index={index}
                colSpan={desktopColSpanFinal[index] ?? 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
