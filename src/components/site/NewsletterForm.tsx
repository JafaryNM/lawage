"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-7 max-w-sm">
      <label htmlFor="footer-newsletter" className="text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
        Industry alerts &amp; insights
      </label>
      <div className="mt-3 flex items-center rounded-full border border-white/15 bg-white/5 p-1.5 transition-colors focus-within:border-gold">
        {mounted ? (
          <input
            id="footer-newsletter"
            required
            type="email"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            placeholder="Your email address"
            className="w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
          />
        ) : (
          <div className="w-full h-9 bg-transparent px-4 flex items-center text-sm text-white/40">
            Your email address
          </div>
        )}
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gold text-white transition-colors hover:bg-white hover:text-brand"
        >
          <Send className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </form>
  );
}

