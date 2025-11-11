import React from "react";

type Props = {
  role: "user" | "assistant";
  children: React.ReactNode;
};

export default function ChatBubble({ role, children }: Props) {
  const isUser = role === "user";
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-3xl px-4 py-3 rounded-2xl shadow-sm border",
          isUser
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
