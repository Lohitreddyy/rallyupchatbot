import React from "react";

export default function Hero() {

  return (
    <section className="relative z-0 w-full max-w-3xl mx-auto text-center py-10 md:py-14 px-4 space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          Amplify your mission,
        </span>
        <br />
        <span className="bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
          one post at a time
        </span>
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-200 bg-clip-text text-transparent">
        Hello, friend
      </h2>

      <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-400">
        What can RallyUp AI help you write today?
      </p>
    </section>
  );
}
