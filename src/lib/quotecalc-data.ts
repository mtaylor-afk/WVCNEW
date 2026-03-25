export const qcData = {
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start Free Trial",
  },

  hero: {
    eyebrow: "For builders & tradespeople",
    heading: "Create professional\nquotes in minutes,\nnot hours.",
    body: "QuoteCalc turns rough job notes into polished, client-ready quotes, invoices, and visual proposals — built for real trade workflows, not generic office admin.",
    cta: "Start Free Trial",
    ctaNote: "No credit card required · 14-day free trial · £69/month after",
    secondary: "See how it works",
  },

  stats: [
    { number: "500+", label: "Builders using QuoteCalc" },
    { number: "12k+", label: "Quotes generated" },
    { number: "£60M+", label: "In projects quoted" },
    { number: "4.9★", label: "Average rating" },
  ],

  pain: {
    eyebrow: "Sound familiar?",
    heading: "Stop losing time on admin\nthat doesn't win you work.",
    items: [
      {
        icon: "FileX",
        title: "Rewriting the same quotes",
        body: "Every job starts from a blank Word doc. Copying, editing, reformatting — then hoping it looks professional enough.",
      },
      {
        icon: "Clock",
        title: "Slow turnaround after site visits",
        body: "The longer you take to send a quote, the more likely the customer goes elsewhere. Admin piles up after every visit.",
      },
      {
        icon: "UserX",
        title: "Retyping customer details every time",
        body: "Name, address, phone — again and again. No system, no history, no record of what you quoted them last year.",
      },
      {
        icon: "PoundSterling",
        title: "Underquoting and missing costs",
        body: "Without saved rates and consistent pricing, jobs get underquoted. One missed line item and the margin disappears.",
      },
      {
        icon: "FileSearch",
        title: "Can't find old quotes and invoices",
        body: "Searching through email threads and Downloads folders for a document from six months ago is not a system.",
      },
      {
        icon: "ThumbsDown",
        title: "Quotes that don't reflect your quality",
        body: "You do excellent work on site. But when the quote looks rough, customers question whether you're the right choice.",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "From site visit to polished\nquote in under five minutes.",
    steps: [
      {
        number: "01",
        title: "Enter the job details",
        body: "Add the customer, address, and a quick description of the works. Even rough notes work — the AI handles the rest.",
        tag: "Takes 2 minutes",
      },
      {
        number: "02",
        title: "AI generates the quote",
        body: "QuoteCalc expands your notes into professional builder-style line items with accurate descriptions. Apply your saved rates automatically.",
        tag: "Instant generation",
      },
      {
        number: "03",
        title: "Send it and win the job",
        body: "Export a polished, client-ready document. Once approved, convert it to an invoice in one click. Your records stay organised automatically.",
        tag: "One-click to invoice",
      },
    ],
  },

  features: {
    eyebrow: "Features",
    heading: "Everything a builder needs\nto quote, invoice, and win more work.",
    items: [
      {
        id: "quote-gen",
        icon: "Sparkles",
        title: "Smart Quote Generator",
        body: "Type a few words about the job. QuoteCalc writes professional, builder-style descriptions for every line item. No more staring at a blank page.",
        tag: "AI-powered",
        highlight: true,
      },
      {
        id: "invoice",
        icon: "FileCheck",
        title: "Quote-to-Invoice in One Click",
        body: "When the customer says yes, convert your approved quote directly into an invoice. No retyping, no duplication — just a clean handover.",
        tag: "Save time",
        highlight: false,
      },
      {
        id: "crm",
        icon: "Users",
        title: "Client Address Book",
        body: "Store customer details, job history, and all past quotes and invoices in one searchable place. Returning customers, repeat work — handled.",
        tag: "Lightweight CRM",
        highlight: false,
      },
      {
        id: "rates",
        icon: "ListChecks",
        title: "Your Rates Library",
        body: "Save your labour rates, day rates, and standard costs. QuoteCalc uses your numbers, not generic estimates — keeping every quote consistent and priced to your margin.",
        tag: "Your prices",
        highlight: false,
      },
      {
        id: "visual",
        icon: "Camera",
        title: "Visual Design Proposals",
        body: "Upload a room photo, describe what the customer wants, and AI generates visual design concepts. Turn a standard quote into a compelling visual proposal.",
        tag: "Sell the vision",
        highlight: true,
      },
      {
        id: "docs",
        icon: "FolderOpen",
        title: "Saved Document Library",
        body: "Quotes, invoices, and inspiration files — all organised in one place. Filter by customer, status, or date. No more hunting through folders.",
        tag: "Stay organised",
        highlight: false,
      },
      {
        id: "images",
        icon: "ImagePlus",
        title: "Photo Attachments",
        body: "Attach site survey photos, before images, and reference shots directly to your quotes. Reduce misunderstandings and show your thoroughness.",
        tag: "Professional edge",
        highlight: false,
      },
      {
        id: "mobile",
        icon: "Smartphone",
        title: "Works from Your Phone",
        body: "Built for builders on site, in the van, or back at home. Simple inputs, fast navigation, camera capture — no technical knowledge needed.",
        tag: "Field-ready",
        highlight: false,
      },
    ],
  },

  visualProposal: {
    eyebrow: "Visual proposals",
    heading: "Show customers what\nyou're going to build.",
    body: "Most builders quote the labour. QuoteCalc lets you sell the finished vision. Upload a photo of the room or space, add a brief description of what the customer wants, and AI generates multiple design concept variations with written summaries.\n\nHigher-margin renovation work is easier to close when the customer can see exactly what they're getting — before you've broken ground.",
    benefits: [
      "Works for kitchens, bathrooms, extensions, and more",
      "Generates multiple concept variations from one photo",
      "Includes colour palette and materials suggestions",
      "Converts directly into a quote with one click",
    ],
    tag: "Turn proposals into visual sales tools",
  },

  testimonials: {
    eyebrow: "What builders say",
    heading: "Real tradespeople.\nReal results.",
    reviews: [
      {
        name: "Mark Davies",
        trade: "General Builder, Chester",
        stars: 5,
        quote:
          "I used to spend two hours on a quote. Now it takes me fifteen minutes and looks ten times better. Won three jobs in the first week I started using it.",
        initials: "MD",
      },
      {
        name: "Jamie Holloway",
        trade: "Bathroom & Tiling Specialist, Liverpool",
        stars: 5,
        quote:
          "The AI descriptions are spot on for my trade. Sounds like I wrote them myself. My customers keep commenting on how professional my quotes look.",
        initials: "JH",
      },
      {
        name: "Steve Moran",
        trade: "Renovation Contractor, Wirral",
        stars: 5,
        quote:
          "The visual proposal tool is what sold me. Showed a customer a design concept and closed a £28k kitchen extension the same day. Never had that before.",
        initials: "SM",
      },
      {
        name: "Paul Whitfield",
        trade: "Joiner & Carpenter, Birkenhead",
        stars: 5,
        quote:
          "Having all my customer records and past jobs in one place has changed everything. I used to miss follow-up opportunities. Not anymore.",
        initials: "PW",
      },
      {
        name: "Ryan Calloway",
        trade: "Plastering & Drylining, North West",
        stars: 5,
        quote:
          "I'm not a tech person at all. Was worried it would be complicated. It's not — it's the simplest thing I've ever used for admin. Does exactly what it says.",
        initials: "RC",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "One plan. Everything included.",
    subheading: "No hidden fees. No feature tiers. No per-user charges.",
    price: "£69",
    period: "/month",
    note: "Per business account · Cancel anytime · 14-day free trial",
    cta: "Start Free Trial",
    features: [
      "Unlimited quotes and invoices",
      "AI-powered description generation",
      "Client address book & job history",
      "Your rates and pricing library",
      "Visual design proposal tool",
      "Photo attachments on quotes",
      "Saved document library",
      "Mobile-ready field access",
      "Quote-to-invoice conversion",
      "Your own business branding on documents",
    ],
    compare: "Cheaper than one missed job.",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Common questions.",
    items: [
      {
        q: "Do I need to be tech-savvy to use QuoteCalc?",
        a: "No. QuoteCalc is designed for builders who are excellent on site but don't want complex software. If you can send a text message, you can use QuoteCalc. Most people are up and running within 20 minutes of signing up.",
      },
      {
        q: "Can I use my own pricing and rates?",
        a: "Yes — and this is one of the most important features. You can save your own labour day rates, standard tasks, and material costs. Once saved, the AI uses your numbers to build quotes, not generic estimates. Your pricing stays consistent across every job.",
      },
      {
        q: "Will the quotes have my company name and logo on them?",
        a: "Yes. Every quote and invoice is produced under your business name with your contact details. Your customers see your brand, not QuoteCalc's.",
      },
      {
        q: "What trades is QuoteCalc built for?",
        a: "QuoteCalc works for any trade that creates written quotes — builders, joiners, plasterers, kitchen and bathroom fitters, roofers, landscapers, electricians, and general contractors. The AI description engine understands trade-specific language.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. You get a full 14-day free trial with every feature included. No credit card required to start. If it's not right for you, just don't continue — no charge.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. Month-to-month, no contracts. Cancel at any time from your account settings. We don't lock you in because we don't need to — the product earns its keep every month.",
      },
      {
        q: "How does the visual design tool work?",
        a: "Upload a photo of the room or space your customer wants to change. Add a short description of what they want to achieve. QuoteCalc's AI analyses the image and generates multiple design concept variations with written summaries, colour palettes, and materials suggestions. You can then build a quote directly from the design.",
      },
      {
        q: "What does it cost after the trial?",
        a: "£69 per month, per business account. That's the whole product — every feature, no limits on quotes or invoices, no per-user fees. One builder, one account, one monthly cost.",
      },
    ],
  },

  cta: {
    heading: "Win more work.\nLook more professional.\nSpend less time on admin.",
    body: "Join 500+ builders who've replaced Word documents and WhatsApp pricing with QuoteCalc. Start your free 14-day trial today.",
    primary: "Start Free Trial",
    secondary: "Book a demo",
    note: "No credit card required",
  },

  footer: {
    tagline: "AI-powered quoting software built for builders and tradespeople across the UK.",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
    copyright: "© 2025 QuoteCalc Ltd. All rights reserved.",
    vat: "VAT No. GB 123 456 789",
  },
};
