export type ChatMessage = { role: "user" | "assistant"; content: string };

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
    return { text: (data.text ?? "") as string };
  } catch (e: any) {
    return { error: e?.message || "Network error" };
  }
}

export async function chat(
  history: ChatMessage[],
  model?: string
): Promise<{ text?: string; error?: string }> {
  if (!history.length) return { error: "Empty conversation" };

  const recent = history.slice(-6);
  const last = recent[recent.length - 1];
  const before = recent.slice(0, recent.length - 1);

  const context =
    (before
      .map(m => (m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`))
      .join("\n")) + (before.length ? "\n" : "");

  const prompt = `${context}User: ${last.content}\nAssistant:`;
  return generatePost(prompt, model);
}