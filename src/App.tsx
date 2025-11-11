import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ThemeToggle from "./components/ThemeToggle";
import { chat, type ChatMessage } from "./lib/api";

export default function App() {
  const [model, setModel] = React.useState(
    "ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW"
  );
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const outRef = React.useRef<HTMLDivElement | null>(null);

  async function onSend(userText: string) {
    if (!userText.trim() || loading) return;
    setError("");
    // append user message
    const next = [...messages, { role: "user" as const, content: userText.trim() }];
    setMessages(next);
    setLoading(true);

    const { text, error } = await chat(next, model);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    setMessages(prev => [...prev, { role: "assistant", content: text || "" }]);
    requestAnimationFrame(() => outRef.current?.scrollIntoView({ behavior: "smooth" }));
  }

  function onNewChat() {
    setMessages([]);
    setError("");
  }

  // last assistant for “Copy last reply” if you want to keep it somewhere
  const lastAssistant = [...messages].reverse().find(m => m.role === "assistant")?.content ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-neutral-200/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
        <div className="container-wide flex items-center justify-between py-4">
          <Header />
          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600 dark:text-neutral-400">Model</label>
            <select
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-4o-mini-2024-07-18">gpt-4o-mini</option>
              <option value="ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW">RallyUp AI</option>
            </select>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="container-wide flex-1 pb-32 pt-6 space-y-4">
        {/* Show Hero only before first message */}
        {messages.length === 0 && <Hero />}

        {/* conversation bubbles */}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-auto max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-3"
                : "mr-auto max-w-[80%] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3"
            }
          >
            {m.content}
          </div>
        ))}

        {/* error / loading notes */}
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        {loading && (
          <div className="text-sm text-neutral-500">Thinking…</div>
        )}

        {/* anchor for smooth scroll */}
        <div ref={outRef} />
      </main>

      {/* Bottom composer: fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
        <div className="container-wide py-3">
          <PromptForm
            onSend={onSend}
            onNewChat={onNewChat}
            loading={loading}
            copyText={lastAssistant}
          />
        </div>
      </div>
    </div>
  );
}

/* Internal PromptForm import moved to bottom to avoid circular glance */
import PromptForm from "./components/PromptForm";