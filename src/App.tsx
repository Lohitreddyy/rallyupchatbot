import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OutputCard from "./components/OutputCard";
import ThemeToggle from "./components/ThemeToggle";
import { generatePost } from "./lib/api";

export default function App() {
  const [model, setModel] = React.useState("ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const outRef = React.useRef<HTMLDivElement | null>(null);

  async function onGenerate(prompt: string) {
    setLoading(true);
    setError("");
    setOutput("");
    const { text, error } = await generatePost(prompt, model);
    setLoading(false);
    if (error) return setError(error);
    setOutput(text || "");
    requestAnimationFrame(() => outRef.current?.scrollIntoView({ behavior: "smooth" }));
  }

  
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="relative z-50 border-b border-neutral-200/70 dark:border-neutral-800">
        <div className="container-wide flex items-center justify-between py-4">
          <Header />
          <div className="flex items-center gap-3">
            <label className="text-sm text-neutral-600 dark:text-neutral-400">Model</label>
            <select
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gpt-4o-mini-2024-07-18">gpt-4o-mini</option> /*keep the base model option*/
              <option value="ft:gpt-4o-mini-2024-07-18:personal:projectv3:CaCoCqeW">RallyUp AI</option> /*keep your custom fine-tuned model option*/
            </select>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Hero with single prompt bar */}
      <Hero onGenerate={onGenerate} />

      {/* Feedback + output */}
      <div className="container-wide space-y-4 pb-12" ref={outRef}>
        {loading && <div className="text-sm text-neutral-500 animate-pulse">Generating…</div>}
        {error && <div className="text-sm text-red-500">Error: {error}</div>}
        {output && (
          // If your OutputCard expects children instead of `text`, switch to <OutputCard>{output}</OutputCard>
          <OutputCard text={output} />
        )}
      </div>
    </div>
  )
};
