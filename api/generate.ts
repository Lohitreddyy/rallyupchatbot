import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const DEFAULT_MODEL = process.env.OPENAI_MODEL_ID || "ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, model } = (req.body || {}) as { prompt?: string; model?: string };
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await client.responses.create({
      model: model || DEFAULT_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are RallyUp AI — a writing assistant that creates authentic, founder-style LinkedIn posts. Write in a professional yet conversational tone. Keep the natural whitespace rhythm for readability. Never repeat exact phrases from training data — always create fresh, human-sounding wording. Avoid including any real names, company tags, or user mentions unless explicitly provided in the prompt."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      top_p: 0.9,
      max_output_tokens: 500
    });

    const text = response.output_text ?? "";
    return res.status(200).json({ text });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Unexpected error" });
  }
}
