"use client";

import { useState } from "react";

type Theme = "light" | "dark";

export function NewsletterForm({
  theme = "light",
  buttonLabel = "Subscribe",
}: {
  theme?: Theme;
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3500);
  };

  if (theme === "dark") {
    return (
      <form
        onSubmit={onSubmit}
        className="mt-10 flex max-w-md mx-auto border-b border-paper/40 focus-within:border-paper transition-colors"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={submitted ? "Thank you. We'll be in touch." : "you@email.com"}
          className="flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-paper/45 text-paper"
        />
        <button
          type="submit"
          className="text-[11px] uppercase tracking-widest text-paper hover:text-matcha-200 transition-colors px-3"
        >
          {submitted ? "✓" : buttonLabel}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 flex gap-0 border-b border-ink-line focus-within:border-ink transition-colors"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={submitted ? "Thank you. We'll be in touch." : "you@email.com"}
        className="flex-1 bg-transparent py-3 text-[14px] outline-none placeholder:text-ink-mute"
      />
      <button
        type="submit"
        className="text-[11px] uppercase tracking-widest text-ink-soft hover:text-matcha-600 transition-colors px-3"
      >
        {submitted ? "✓" : buttonLabel}
      </button>
    </form>
  );
}
