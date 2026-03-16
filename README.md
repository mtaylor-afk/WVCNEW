# WV Construction — Smart Quote Generator

A production-grade, mobile-first web application for WV Construction (trading name of ACOR Building and Property Solutions Ltd, Co. Reg. 9287377). AI-powered construction quote generation with room visualisation.

## Features

- **Smart Quote Generation** — Describe works in plain English, AI breaks it into professional line items
- **Room Visualiser** — Photograph a room, describe the transformation, get an AI design concept
- **PDF Generation** — Branded, print-quality quotation PDFs
- **Offline Support** — IndexedDB fallback when Supabase is unavailable
- **Mobile-First** — Optimised for iPhone, safe area insets, touch-friendly
- **Share Integration** — Email, WhatsApp, PDF download

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom WVC design tokens
- **Components**: Custom components with Radix UI primitives + Framer Motion
- **AI**: Anthropic Claude (`claude-sonnet-4-20250514`) — server-side only
- **Database**: Supabase (PostgreSQL + Storage)
- **Offline**: IndexedDB via `idb`
- **PDF**: Puppeteer (falls back to HTML for client print)
- **Fonts**: Cormorant Garamond · Syne · DM Mono

## Quick Start

### 1. Clone & Install

```bash
git clone <repo>
cd wvc-quotes
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `ANTHROPIC_API_KEY` | Anthropic API key (server-side only) |
| `REPLICATE_API_TOKEN` | Optional: Replicate for image generation |

### 3. Supabase Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Quotes table
create table quotes (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  client_name text,
  client_mobile text,
  client_email text,
  property_address text,
  scope_summary text,
  line_items jsonb not null default '[]',
  subtotal numeric(10,2),
  vat_enabled boolean default false,
  vat_rate numeric(5,2) default 20,
  vat_amount numeric(10,2),
  grand_total numeric(10,2),
  terms text,
  before_image_path text,
  design_board_path text,
  design_data jsonb,
  pdf_path text,
  quote_date text
);

-- Enable RLS
alter table quotes enable row level security;
create policy "Allow all for anon" on quotes for all using (true);

-- Storage bucket
insert into storage.buckets (id, name, public) values ('quote-assets', 'quote-assets', true);
create policy "Allow all for anon" on storage.objects for all using (bucket_id = 'quote-assets');
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/quotes/new`.

## Deployment (Vercel)

### Manual deploy

```bash
npm install -g vercel
vercel --prod
```

Set the environment variables in the Vercel dashboard (Settings → Environment Variables).

**Note:** Puppeteer is not available on Vercel's serverless edge by default. PDF generation will fall back to returning branded HTML with an `X-PDF-Fallback: true` header, which the client handles as a download. For full server-side PDF, install `puppeteer` as a dependency and configure memory limits appropriately.

To add Puppeteer support:
```bash
npm install puppeteer
```

## App Structure

```
src/
├── app/
│   ├── (app)/                    # App shell (bottom nav, header)
│   │   ├── layout.tsx            # Navigation layout
│   │   ├── quotes/
│   │   │   ├── new/page.tsx      # New Quote page
│   │   │   └── saved/page.tsx    # Saved Quotes page
│   │   ├── visualiser/page.tsx   # Room Visualiser
│   │   └── settings/page.tsx     # Settings
│   ├── api/
│   │   ├── generate-quote/       # AI quote line item generation
│   │   ├── generate-design/      # AI room design concept
│   │   └── generate-pdf/         # PDF generation
│   ├── layout.tsx                # Root layout (fonts, providers)
│   └── globals.css               # Global styles
├── components/
│   ├── providers/
│   │   └── QueryProvider.tsx     # React Query provider
│   └── ui/
│       ├── WVCLogo.tsx           # Gold hexagon SVG logo
│       ├── GoldButton.tsx        # Branded button component
│       ├── CollapsibleCard.tsx   # Animated accordion card
│       ├── FloatingInput.tsx     # Floating label inputs
│       ├── SkeletonCard.tsx      # Loading skeletons
│       └── Toast.tsx             # Sonner toast helpers
└── lib/
    ├── types.ts                  # TypeScript interfaces
    ├── utils.ts                  # Utility functions
    ├── supabase.ts               # Supabase client + storage helpers
    └── db.ts                     # Data layer (Supabase + IndexedDB)
```

## Company Details

- **Trading Name**: WV Construction
- **Legal Name**: ACOR Building and Property Solutions Ltd
- **Company No.**: 9287377
- **Address**: 20 Ripon Road, Wallasey, Merseyside CH45 6TR
- **Mobile**: 07966 978824
- **Office**: 0151 200 1341

## Design System

| Token | Value |
|-------|-------|
| Navy | `#0B1F3A` |
| Gold | `#C9A84C` |
| Cream | `#FAF7F0` |
| Heading font | Cormorant Garamond |
| Body font | Syne |
| Code font | DM Mono |
