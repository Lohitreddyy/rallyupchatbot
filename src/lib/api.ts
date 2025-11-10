export async function generatePost(
  topic: string,
  model?: string
): Promise<{ text?: string; error?: string }> {
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: topic, model })
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const data = await res.json();
    return { text: data.text as string };
  } catch (e: any) {
    return { error: e?.message || "Network error" };
  }
}