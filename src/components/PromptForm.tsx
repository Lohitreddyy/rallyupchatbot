import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  onGenerate: (prompt: string) => void;
  loading?: boolean;
};

export default function PromptForm({ onGenerate, loading }: Props) {
  const [prompt, setPrompt] = React.useState("");
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize up to 3 lines
  const resize = React.useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;

    // reset height to measure content height correctly
    ta.style.height = "auto";

    // compute the line-height from computed styles
    const cs = window.getComputedStyle(ta);
    const lineHeight = parseFloat(cs.lineHeight || "20"); // fallback
    const paddingY = parseFloat(cs.paddingTop || "0") + parseFloat(cs.paddingBottom || "0");
    const borderY = parseFloat(cs.borderTopWidth || "0") + parseFloat(cs.borderBottomWidth || "0");

    // max height = 3 lines + paddings/borders
    const max = lineHeight * 3 + paddingY + borderY;

    // desired height = min(scrollHeight, max)
    const desired = Math.min(ta.scrollHeight, max);
    ta.style.height = `${desired}px`;

    // enable scrollbar only if exceeding max
    ta.style.overflowY = ta.scrollHeight > max ? "auto" : "hidden";
  }, []);

  React.useEffect(() => {
    resize();
  }, [prompt, resize]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;
    onGenerate(trimmed);
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 flex flex-col items-center"
      aria-label="Generate post form"
    >
      <div className="flex items-center w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <textarea
          ref={taRef}
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onInput={resize}
          rows={1}
          // prevent the browser’s manual resize handle
          className="flex-1 resize-none bg-transparent outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm leading-6"
          placeholder="I want to…"
          // optional: submit on Cmd/Ctrl+Enter
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              submit();
            }
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-3 flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all shadow-md"
          aria-label="Generate"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </div>
    </form>
  );
}
