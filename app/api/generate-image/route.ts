import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function toDataUrl(input: string): Promise<string> {
  if (input.startsWith("data:image/")) {
    return input;
  }
  if (input.startsWith("http://") || input.startsWith("https://")) {
    const res = await fetch(input);
    if (!res.ok) {
      throw new Error(`Failed to fetch image from URL: ${input} (${res.status})`);
    }
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  }
  // Local file in public directory (e.g. /before_image.png)
  const cleanPath = input.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", cleanPath);
  const buffer = await fs.readFile(filePath);
  const ext = path.extname(cleanPath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
      ? "image/webp"
      : "image/jpeg";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      roomImage,
      curtainImage,
      drapeLength = "just touching the floor",
      drapePosition = "pulled open to the sides framing the window with natural daylight coming through",
      curtainRod = "matte black minimalist curtain rod mounted just below the ceiling",
    } = body;

    if (!roomImage || !curtainImage) {
      return NextResponse.json(
        {
          error:
            "Both room photo and curtain style image are required to generate preview.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    const modelName =
      process.env.OPENAI_IMAGE_MODEL?.trim() || "gpt-image-2.5-sunburst";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API Key is missing. Please add your OPENAI_API_KEY in the .env.local file to enable live image generation.",
        },
        { status: 400 }
      );
    }

    // Convert both inputs to Data URLs
    const [roomDataUrl, curtainDataUrl] = await Promise.all([
      toDataUrl(roomImage),
      toDataUrl(curtainImage),
    ]);

    // Construct precision prompt with strict room preservation invariance
    const promptInstruction = `
You are an expert architectural visualizer and photorealistic interior designer specialized in precision virtual curtain installations.

TASK:
You are provided with two images:
1. IMAGE 1: The user's target room photo containing one or more windows.
2. IMAGE 2: The catalog image showing the specific curtain, fabric, textile weave, pattern, and color.

EXECUTE THE FOLLOWING PRECISE EDIT:
1. WINDOW IDENTIFICATION: Identify the window(s) and window frames in IMAGE 1.
2. CURTAIN FITTING: Install the exact curtain fabric, color, texture, and pattern from IMAGE 2 over the window(s) of IMAGE 1.
3. STYLING SPECIFICATIONS:
   - Draping length: ${drapeLength}.
   - Draping arrangement: ${drapePosition}.
   - Mounting hardware: ${curtainRod}.
   - Real-world physics: Render realistic fabric folds, vertical ripples, realistic weight, natural drop, and accurate light pass-through according to the lighting angle in the original room.

CRITICAL INVARIANCE RULES (STRICT PRESERVATION):
- DO NOT change, alter, or re-render any other element of the room in IMAGE 1.
- DO NOT modify the walls, wall color, wallpapers, mouldings, or baseboards.
- DO NOT move, modify, replace, or alter any furniture (sofas, tables, chairs, beds), decorative items, lamps, ceiling lights, rugs, or plants.
- DO NOT change the flooring (hardwood, carpet, tiles).
- DO NOT change the room's camera perspective, depth of field, or architectural dimensions.
- The ONLY modification allowed is installing the curtain and curtain rod at the window opening, keeping the rest of the room 100% identical.

Output ONLY the modified room photograph with the newly fitted curtains.
`.trim();

    const payload = {
      model: modelName,
      images: [
        { image_url: roomDataUrl },
        { image_url: curtainDataUrl },
      ],
      prompt: promptInstruction,
      quality: "low",
      size: "auto",
      output_format: "jpeg",
      output_compression: 90,
      n: 1,
    };

    const apiUrl = "https://api.openai.com/v1/images/edits";
    const openAiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!openAiResponse.ok) {
      const errData = await openAiResponse.json().catch(() => ({}));
      let errMsg =
        errData.error?.message ||
        `OpenAI error (${openAiResponse.status}): ${openAiResponse.statusText}`;

      if (openAiResponse.status === 401) {
        errMsg =
          "OpenAI rejected this API key. Check that your OPENAI_API_KEY is active and has billing/credits enabled.";
      } else if (openAiResponse.status === 403) {
        errMsg =
          "Your OpenAI organization is not permitted to use this image edit model. Check project permissions.";
      } else if (openAiResponse.status === 429) {
        errMsg =
          "OpenAI rate limit or usage quota reached. Please check your credit balance or try again shortly.";
      }

      return NextResponse.json({ error: errMsg }, { status: openAiResponse.status });
    }

    const data = await openAiResponse.json();
    const b64Json = data?.data?.[0]?.b64_json;
    const directUrl = data?.data?.[0]?.url;

    if (!b64Json && !directUrl) {
      return NextResponse.json(
        {
          error:
            "OpenAI returned no fitted image result. Please verify image inputs and try again.",
        },
        { status: 500 }
      );
    }

    const finalResultUrl = b64Json
      ? `data:image/jpeg;base64,${b64Json}`
      : directUrl;

    return NextResponse.json({
      success: true,
      imageUrl: finalResultUrl,
    });
  } catch (error: any) {
    console.error("Generate image API error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An unexpected error occurred while generating the curtain fitting.",
      },
      { status: 500 }
    );
  }
}

