import React from "react";

export default function Header() {
  return (
    <header className="relative w-full">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4">
        <img
          src="/favicon.ico"
          alt="RallyUp logo"
          className="h-6 w-6 rounded-md shadow-sm"
        />
        <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          RallyUp
        </span>
      </div>
    </header>
  );
}
