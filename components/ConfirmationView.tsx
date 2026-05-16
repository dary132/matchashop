"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export function ConfirmationView({
  sessionId,
  isMock,
}: {
  sessionId?: string;
  isMock?: boolean;
}) {
  const clear = useCart((s) => s.clear);
  const hydrated = useCart((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && sessionId) clear();
  }, [hydrated, sessionId, clear]);

  return (
    <div className="min-h-[72vh] bg-paper">
      <div className="mx-auto max-w-[760px] px-6 md:px-10 py-24 md:py-32 text-center">
        <span className="font-jp text-[11px] tracking-[0.32em] text-matcha-600">
          御 礼 — with thanks
        </span>
        <h1 className="mt-6 font-serif text-[44px] md:text-[64px] leading-[1.02] text-ink font-light">
          Your order is placed.
        </h1>
        <p className="mt-6 text-[16px] leading-[1.8] text-ink-soft max-w-prose mx-auto">
          A confirmation will arrive in your inbox shortly. Tins are packed by
          hand in our Brooklyn studio and ship within two business days.
        </p>

        {sessionId && (
          <p className="mt-10 text-[11px] uppercase tracking-widest text-ink-mute">
            Order reference ·{" "}
            <span className="numeral text-[13px] text-ink normal-case tracking-normal">
              {sessionId.slice(0, 24)}
            </span>
          </p>
        )}

        {isMock && (
          <div className="mt-10 max-w-prose mx-auto border border-ink-line p-6 text-left bg-paper-warm/50">
            <p className="text-[11px] uppercase tracking-widest text-clay">
              Demo mode
            </p>
            <p className="mt-3 text-[13px] leading-[1.7] text-ink-soft">
              No Stripe key is configured, so no real payment was processed.
              Add <span className="numeral">STRIPE_SECRET_KEY</span> to{" "}
              <span className="numeral">.env</span> to enable live checkout.
            </p>
          </div>
        )}

        <div className="mt-14 flex items-center justify-center gap-7">
          <Link
            href="/shop"
            className="text-[12px] uppercase tracking-widest text-matcha-600 link-underline"
          >
            Continue shopping →
          </Link>
          <Link
            href="/"
            className="text-[12px] uppercase tracking-widest text-ink-soft link-underline"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
