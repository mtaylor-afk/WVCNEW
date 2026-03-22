import { notFound } from "next/navigation";
import { siteData } from "@/lib/data";
import ServicePageClient from "./ServicePageClient";

export function generateStaticParams() {
  return siteData.services.items.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteData.services.items.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.name} — WV Construction LTD`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteData.services.items.find((s) => s.id === slug);
  if (!service) notFound();

  return <ServicePageClient service={service} />;
}
