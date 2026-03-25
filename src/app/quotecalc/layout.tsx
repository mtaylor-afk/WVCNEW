import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "QuoteCalc — Professional Builder Quoting Software | £69/month",
  description:
    "AI-powered quoting, invoicing, and visual proposal software built for builders and tradespeople. Create professional quotes in minutes. 14-day free trial.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1424",
};

export default function QuoteCalcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
