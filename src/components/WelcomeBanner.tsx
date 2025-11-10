import React from "react";

export default function WelcomeBanner() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center px-4">
      <div className="pointer-events-auto rounded-full border border-zinc-200/60 bg-white/70 px-4 py-2 text-xs text-zinc-700 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/70 dark:text-zinc-300">
        <span className="font-medium">Welcome to RallyUp AI</span>
        <span className="mx-2 opacity-50">•</span>
        Your Personal AI Assistant
      </div>
    </div>
  );
}