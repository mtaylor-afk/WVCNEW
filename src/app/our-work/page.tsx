import type { Metadata } from "next";
import { siteData } from "@/lib/data";
import OurWorkClient from "./OurWorkClient";

export const metadata: Metadata = {
  title: "Our Work — Completed Projects | WV Construction LTD",
  description:
    "See completed building projects by WV Construction across the Wirral Peninsula — full renovations, extensions, roofing, kitchens, brickwork and more. Real examples, real homeowners.",
  openGraph: {
    title: "Our Work — Completed Projects | WV Construction LTD",
    description:
      "See completed building projects by WV Construction across the Wirral Peninsula — full renovations, extensions, roofing, kitchens, brickwork and more.",
    url: "https://wvconstructionltd.co.uk/our-work",
    siteName: "WV Construction LTD",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://wvconstructionltd.co.uk/our-work",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://wvconstructionltd.co.uk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Our Work",
          item: "https://wvconstructionltd.co.uk/our-work",
        },
      ],
    },
    {
      "@type": "HomeAndConstructionBusiness",
      name: siteData.company.name,
      description: siteData.company.tagline,
      url: "https://wvconstructionltd.co.uk",
      telephone: siteData.company.phone,
      email: siteData.company.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wallasey",
        addressRegion: "Merseyside",
        addressCountry: "GB",
      },
      areaServed: {
        "@type": "Place",
        name: "Wirral Peninsula, Merseyside",
      },
      knowsAbout: siteData.services.items.map((s) => s.name),
    },
  ],
};

export default function OurWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OurWorkClient />
    </>
  );
}
