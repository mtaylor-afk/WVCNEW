import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert quantity surveyor and construction estimator for WV Construction, a UK renovation contractor.
When given a works description, total cost, and requested number of line items, respond ONLY with a valid JSON array of line items.
Each item must follow this exact format:
{
  "description": "Professional line item title",
  "notes": "Optional detail: materials spec, methodology, inclusions/exclusions",
  "amount": 0000.00
}
Rules:
1. Match trades from the description to the correct categories
2. Allocate costs proportionally using realistic labour weight ratios for each trade
3. Pad to the requested item count using site preparation, snagging, protection, clearance items
4. All amounts must sum EXACTLY to the total provided — force-adjust the last item if needed
5. Use professional UK construction industry language throughout
6. Notes should add genuine value — specs, standards, methodology
Trade categories and labour weight multipliers:
- Roofing: 1.4 — strip & re-felt, new ridge tiles, lead flashing, EPDM flat roof
- Painting & Render: 0.9 — external render, masonry paint, interior emulsion, feature walls
- Guttering & Fascias: 0.7 — UPVC fascia/soffit/guttering, RWP replacement
- Bathrooms: 1.2 — suite supply & fit, tiling, wet room tanking, accessories
- Kitchens: 1.2 — units, worktop, appliance installation, splash back
- Flooring: 0.8 — engineered wood, LVT, carpet, subfloor prep, screeding
- Plastering: 1.0 — full re-skim, dot & dab, coving, beading
- Windows: 1.1 — UPVC double glazed supply & fit, lintel check, making good
- Doors: 0.9 — external composite, internal fire doors, furniture, frames
- Gates & Fencing: 0.8 — steel gates, close-board panels, posts, concrete
- Electrics: 1.3 — consumer unit upgrade, rewire, EV charger, testing & cert
- Plumbing: 1.2 — boiler replacement, radiators, pipework, unvented cylinder
- Loft: 1.1 — insulation, boarding, hatch, ladder, ventilation
- Driveway: 1.0 — block paving, tarmac, edging, drainage, drop kerb
- Extension / Groundworks: 1.5 — foundations, blockwork, DPC, drainage, steelwork
- Refurbishment: 1.0 — strip out, structural alterations, making good, finishing
- Site Preparation: 0.6 — protection, hoarding, access, welfare facilities
- Snagging & Completion: 0.5 — punch list, touch-ups, client walkthrough, sign-off
- Clearance & Disposal: 0.5 — skip hire, spoil removal, clean down
- Decoration & Finishing: 0.7 — coving, architrave, skirting, door furniture`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, totalCost, lineItemCount } = body;

    if (!description || typeof totalCost !== "number" || totalCost <= 0) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const count = Math.max(4, Math.min(20, lineItemCount || 8));

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Works description: ${description}
Total cost: £${totalCost.toFixed(2)}
Number of line items required: ${count}

Generate exactly ${count} professional line items that sum to exactly £${totalCost.toFixed(2)}.`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }

    let items: Array<{ description: string; notes?: string; amount: number }> =
      JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!Array.isArray(items)) {
      throw new Error("Response is not an array");
    }

    items = items.map((item) => ({
      description: String(item.description || "").slice(0, 200),
      notes: item.notes ? String(item.notes).slice(0, 500) : undefined,
      amount: Math.max(0, Number(item.amount) || 0),
    }));

    // Auto-correct sum to match total
    const currentSum = items.reduce((sum, item) => sum + item.amount, 0);
    const diff = totalCost - currentSum;
    if (Math.abs(diff) > 0.005) {
      // Adjust last item
      items[items.length - 1].amount = Math.max(
        0,
        items[items.length - 1].amount + diff
      );
      // Round all to 2dp
      items = items.map((item) => ({
        ...item,
        amount: Math.round(item.amount * 100) / 100,
      }));
      // Final penny correction
      const finalSum = items.reduce((sum, item) => sum + item.amount, 0);
      const finalDiff = Math.round((totalCost - finalSum) * 100) / 100;
      if (Math.abs(finalDiff) > 0) {
        items[items.length - 1].amount = Math.round(
          (items[items.length - 1].amount + finalDiff) * 100
        ) / 100;
      }
    }

    return NextResponse.json({ lineItems: items });
  } catch (err: unknown) {
    console.error("Quote generation error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to generate quote",
      },
      { status: 500 }
    );
  }
}
