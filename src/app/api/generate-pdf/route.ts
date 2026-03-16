import { NextRequest, NextResponse } from "next/server";
import type { Quote } from "@/lib/types";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function generateHTML(quote: Quote): string {
  const subtotal = quote.subtotal || 0;
  const vatAmount = quote.vat_amount || 0;
  const grandTotal = quote.grand_total || 0;
  const vatRate = quote.vat_rate || 20;
  const lineItems = quote.line_items || [];
  const terms = quote.terms || "";
  const quoteDate = quote.quote_date
    ? formatDate(quote.quote_date)
    : formatDate(quote.created_at || new Date().toISOString());

  const lineItemRows = lineItems
    .map(
      (item, i) => `
    <tr class="${i % 2 === 0 ? "row-cream" : "row-white"}">
      <td class="col-num">${String(i + 1).padStart(2, "0")}</td>
      <td class="col-desc">
        <div class="item-desc">${item.description || ""}</div>
        ${item.notes ? `<div class="item-notes">${item.notes}</div>` : ""}
      </td>
      <td class="col-amount">${formatCurrency(item.amount || 0)}</td>
    </tr>`
    )
    .join("");

  const hexLogo = `<svg width="52" height="52" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,2 35,10.5 35,27.5 20,36 5,27.5 5,10.5" fill="#C9A84C"/>
    <text x="20" y="23.5" text-anchor="middle" font-family="Georgia, serif" font-size="10" font-weight="700" fill="#0B1F3A" letter-spacing="0.5">WVC</text>
  </svg>`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Quote ${quote.ref}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Syne:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Syne', sans-serif;
    background: white;
    color: #0B1F3A;
    font-size: 11px;
    line-height: 1.5;
  }

  .header {
    background: #0B1F3A;
    padding: 28px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-logo-area {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .header-company {
    text-align: right;
  }

  .company-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #FAF7F0;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .company-sub {
    font-family: 'Syne', sans-serif;
    color: #C9A84C;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 3px;
    opacity: 0.85;
  }

  .gold-bar {
    height: 4px;
    background: linear-gradient(90deg, #C9A84C, #DFB23A, #C9A84C);
  }

  .meta-block {
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #E8EDF4;
  }

  .quote-label {
    font-family: 'DM Mono', monospace;
    color: #C9A84C;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .quote-ref {
    font-family: 'DM Mono', monospace;
    color: #0B1F3A;
    font-size: 18px;
    font-weight: 500;
    margin-top: 4px;
    letter-spacing: 0.05em;
  }

  .quote-date {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 11px;
    margin-top: 3px;
  }

  .client-block {
    text-align: right;
  }

  .prepared-for {
    font-family: 'Syne', sans-serif;
    color: #C9A84C;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .client-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #0B1F3A;
    font-size: 20px;
    font-weight: 600;
    margin-top: 3px;
  }

  .client-address {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 10px;
    margin-top: 2px;
    max-width: 220px;
    text-align: right;
    margin-left: auto;
  }

  .client-contact {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 10px;
    margin-top: 3px;
  }

  .section-header {
    font-family: 'DM Mono', monospace;
    color: #C9A84C;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 16px 32px 8px;
  }

  .scope-text {
    padding: 0 32px 20px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    color: #3A5073;
    font-size: 13px;
    line-height: 1.7;
    border-bottom: 1px solid #E8EDF4;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-header {
    background: #0B1F3A;
  }

  .table-header th {
    font-family: 'DM Mono', monospace;
    color: #FAF7F0;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 10px 16px;
    font-weight: 400;
  }

  .table-header th.col-num { width: 48px; text-align: center; }
  .table-header th.col-desc { text-align: left; border-left: 3px solid #C9A84C; }
  .table-header th.col-amount { width: 110px; text-align: right; }

  .row-cream { background: #FAF7F0; }
  .row-white { background: #FFFFFF; }

  tr td.col-num {
    font-family: 'DM Mono', monospace;
    color: #C9A84C;
    font-size: 10px;
    text-align: center;
    padding: 11px 8px;
    vertical-align: top;
  }

  tr td.col-desc {
    padding: 11px 16px;
    border-left: 3px solid #C9A84C;
    vertical-align: top;
  }

  .item-desc {
    font-family: 'Syne', sans-serif;
    color: #0B1F3A;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
  }

  .item-notes {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 9.5px;
    font-style: italic;
    margin-top: 3px;
    line-height: 1.5;
  }

  tr td.col-amount {
    font-family: 'DM Mono', monospace;
    color: #0B1F3A;
    font-size: 11px;
    text-align: right;
    padding: 11px 16px;
    vertical-align: top;
    white-space: nowrap;
  }

  .totals-section {
    padding: 20px 32px;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #E8EDF4;
  }

  .totals-box {
    width: 260px;
  }

  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #E8EDF4;
    font-family: 'Syne', sans-serif;
    color: #3A5073;
    font-size: 11px;
  }

  .totals-row:last-of-type {
    border-bottom: none;
  }

  .totals-amount {
    font-family: 'DM Mono', monospace;
  }

  .grand-total-row {
    background: #0B1F3A;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    margin-top: 8px;
  }

  .grand-total-label {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #FAF7F0;
    font-size: 17px;
    font-weight: 600;
  }

  .grand-total-amount {
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #C9A84C;
    font-size: 20px;
    font-weight: 700;
  }

  .terms-section {
    padding: 20px 32px;
    border-top: 1px solid #E8EDF4;
  }

  .terms-text {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 8.5px;
    line-height: 1.7;
    white-space: pre-line;
  }

  .footer {
    padding: 16px 32px;
    border-top: 2px solid #C9A84C;
    text-align: center;
  }

  .footer-text {
    font-family: 'Syne', sans-serif;
    color: #6B7E99;
    font-size: 8.5px;
    line-height: 1.8;
  }

  .footer-company {
    font-family: 'DM Mono', monospace;
    color: #0B1F3A;
    font-size: 9px;
    font-weight: 500;
  }
</style>
</head>
<body>

<!-- Header -->
<div class="header">
  <div class="header-logo-area">
    ${hexLogo}
    <div>
      <div style="font-family: 'Syne', sans-serif; color: rgba(250,247,240,0.4); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;">Building & Property Solutions</div>
    </div>
  </div>
  <div class="header-company">
    <div class="company-name">WV CONSTRUCTION</div>
    <div class="company-sub">Building &amp; Property Solutions</div>
  </div>
</div>
<div class="gold-bar"></div>

<!-- Quote Meta -->
<div class="meta-block">
  <div>
    <div class="quote-label">Quotation</div>
    <div class="quote-ref">${quote.ref}</div>
    <div class="quote-date">${quoteDate}</div>
  </div>
  <div class="client-block">
    <div class="prepared-for">Prepared for</div>
    <div class="client-name">${quote.client_name || ""}</div>
    ${quote.property_address ? `<div class="client-address">${quote.property_address.replace(/\n/g, ", ")}</div>` : ""}
    ${quote.client_mobile || quote.client_email
      ? `<div class="client-contact">${[quote.client_mobile, quote.client_email].filter(Boolean).join(" · ")}</div>`
      : ""}
  </div>
</div>

${quote.scope_summary
  ? `<div class="section-header">Scope of Works</div>
     <div class="scope-text">${quote.scope_summary}</div>`
  : ""}

<!-- Line Items -->
<div class="section-header">Schedule of Works</div>
<table>
  <thead>
    <tr class="table-header">
      <th class="col-num">#</th>
      <th class="col-desc">Description</th>
      <th class="col-amount">Amount</th>
    </tr>
  </thead>
  <tbody>
    ${lineItemRows}
  </tbody>
</table>

<!-- Totals -->
<div class="totals-section">
  <div class="totals-box">
    <div class="totals-row">
      <span>Subtotal</span>
      <span class="totals-amount">${formatCurrency(subtotal)}</span>
    </div>
    ${quote.vat_enabled
      ? `<div class="totals-row">
          <span>VAT @ ${vatRate}%</span>
          <span class="totals-amount">${formatCurrency(vatAmount)}</span>
        </div>`
      : ""}
    <div class="grand-total-row">
      <span class="grand-total-label">Grand Total</span>
      <span class="grand-total-amount">${formatCurrency(grandTotal)}</span>
    </div>
  </div>
</div>

${terms
  ? `<div class="terms-section">
      <div class="section-header" style="padding: 0 0 8px 0;">Terms &amp; Conditions</div>
      <div class="terms-text">${terms}</div>
    </div>`
  : ""}

<!-- Footer -->
<div class="footer">
  <div class="footer-company">ACOR Building and Property Solutions Ltd · Registered in England &amp; Wales · Company No. 9287377</div>
  <div class="footer-text">20 Ripon Road, Wallasey, Merseyside CH45 6TR · 07966 978824 · 0151 200 1341</div>
</div>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quote = body.quote as Quote;

    if (!quote || !quote.ref) {
      return NextResponse.json({ error: "Quote data required" }, { status: 400 });
    }

    const html = generateHTML(quote);

    // Try to use Puppeteer if available
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const puppeteer = require("puppeteer");
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdf = await (page as any).pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
      });
      await browser.close();

      return new NextResponse(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${quote.ref}.pdf"`,
        },
      });
    } catch (puppeteerErr) {
      // Puppeteer not available — return HTML for client-side printing
      console.log("Puppeteer not available, returning HTML:", puppeteerErr);
    }

    // Fallback: return HTML (client will use print-to-PDF)
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="${quote.ref}.html"`,
        "X-PDF-Fallback": "true",
      },
    });
  } catch (err: unknown) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "PDF generation failed" },
      { status: 500 }
    );
  }
}
