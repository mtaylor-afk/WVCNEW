import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a senior interior designer and renovation consultant for WV Construction, a premium UK renovation contractor.
Analyse the room photo provided and the client's renovation brief. Respond ONLY with a valid JSON object:
{
  "design_title": "Short evocative title for the design concept",
  "design_summary": "2-3 sentence professional description of the proposed design direction",
  "key_changes": [
    "Specific change 1",
    "Specific change 2",
    "Specific change 3",
    "Specific change 4",
    "Specific change 5"
  ],
  "materials": [
    { "name": "Material/finish name", "colour": "#hexcode", "category": "wall|floor|ceiling|fixture|furniture" }
  ],
  "colour_palette": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "estimated_scope": "Professional paragraph describing the works scope — suitable for a construction quote preamble",
  "suggested_trades": ["trade1", "trade2", "trade3"],
  "complexity": "low|medium|high",
  "room_type": "kitchen|bathroom|bedroom|living|hallway|extension|other"
}
Be specific to what you can actually see in the room photo. Tailor recommendations to the style and budget selected. Use professional UK construction and interior design terminology.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, imageType, description, style, budget } = body;

    if (!imageBase64 || !description) {
      return NextResponse.json(
        { error: "Image and description are required" },
        { status: 400 }
      );
    }

    const mediaType = (imageType || "image/jpeg").replace("image/", "") as
      | "jpeg"
      | "png"
      | "gif"
      | "webp";

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: `image/${mediaType}`,
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `Renovation brief: ${description}
${style ? `Preferred design style: ${style}` : ""}
${budget ? `Budget range: ${budget}` : ""}

Please analyse this room and provide a detailed design concept as a JSON object.`,
            },
          ],
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const design = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (!design.design_title || !design.colour_palette || !design.key_changes) {
      throw new Error("Invalid design response structure");
    }

    // Ensure colour_palette has valid hex codes
    design.colour_palette = (design.colour_palette as string[]).map((c: string) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(c)) return c;
      return "#C9A84C";
    });

    return NextResponse.json({ design });
  } catch (err: unknown) {
    console.error("Design generation error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to generate design",
      },
      { status: 500 }
    );
  }
}
