import React from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  onSend: (prompt: string) => void;
  onNewChat?: () => void;
  loading?: boolean;
  copyText?: string; //“copy last reply”
};

export default function PromptForm({ onSend, onNewChat, loading, copyText }: Props) {
  const [prompt, setPrompt] = React.useState("");
  const taRef = React.useRef<HTMLTextAreaElement | null>(null);

  // auto-resize up to 3 lines
  const resize = React.useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const cs = window.getComputedStyle(ta);
    const line = parseFloat(cs.lineHeight || "20");
    const pad = parseFloat(cs.paddingTop || "0") + parseFloat(cs.paddingBottom || "0");
    const brd = parseFloat(cs.borderTopWidth || "0") + parseFloat(cs.borderBottomWidth || "0");
    const max = line * 3 + pad + brd;
    ta.style.height = `${Math.min(ta.scrollHeight, max)}px`;
    ta.style.overflowY = ta.scrollHeight > max ? "auto" : "hidden";
  }, []);

  React.useEffect(() => { resize(); }, [prompt, resize]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const t = prompt.trim();
    if (!t || loading) return;
    onSend(t);
    // Clear the input after sending
    setPrompt("");
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-3" aria-label="Chat composer">
      {/* New chat button – next to the composer */}
      {onNewChat && (
        <button
          type="button"
          onClick={onNewChat}
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          New chat
        </button>
      )}

      {/* Composer */}
      <div className="flex-1 flex items-center rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <textarea
          ref={taRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onInput={resize}
          rows={1}
          placeholder="I want to…"
          className="flex-1 resize-none bg-transparent outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm leading-6"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-3 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all shadow-md"
          aria-label="Send"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </div>

      {/* copy last reply button beside the composer */}
      {copyText ? (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(copyText)}
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Copy last reply
        </button>
      ) : null}
    </form>
  );
}
