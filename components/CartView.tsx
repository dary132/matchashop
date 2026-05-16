"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/types/product";
import productsData from "@/data/products.json";

const allProducts = productsData as Product[];

export function CartView() {
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const hydrated = useCart((s) => s.hydrated);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(() => {
    return lines
      .map((line) => {
        const product = allProducts.find((p) => p.slug === line.slug);
        return product ? { product, quantity: line.quantity } : null;
      })
      .filter((x): x is { product: Product; quantity: number } => x !== null);
  }, [lines]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.priceCents * i.quantity,
    0
  );
  const shipping = subtotal > 0 && subtotal < 7500_0 ? 850 : 0;
  const total = subtotal + shipping;

  const onCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setCheckoutLoading(false);
    }
  };

  if (!hydrated) {
    return <div className="text-ink-mute text-[14px]">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="py-16 border-t border-ink-line/70">
        <p className="font-serif text-[28px] text-ink">
          The cart is empty.
        </p>
        <p className="mt-3 text-[15px] text-ink-mute max-w-prose">
          A small selection of this season's harvest is waiting in the shop.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block text-[12px] uppercase tracking-widest text-matcha-600 link-underline"
        >
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <ul className="lg:col-span-7 divide-y divide-ink-line/70 border-t border-b border-ink-line/70">
        {items.map(({ product, quantity }) => (
          <li
            key={product.slug}
            className="py-7 grid grid-cols-12 gap-5 items-start"
          >
            <Link
              href={`/products/${product.slug}`}
              className="col-span-3 sm:col-span-2 relative aspect-square overflow-hidden bg-paper-warm"
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </Link>
            <div className="col-span-9 sm:col-span-7 flex flex-col">
              <div className="flex items-baseline gap-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-serif text-[22px] text-ink leading-tight link-underline"
                >
                  {product.name}
                </Link>
                <span className="font-jp text-[11px] text-ink-mute tracking-[0.15em]">
                  {product.nameJp}
                </span>
              </div>
              <p className="mt-1 text-[12px] uppercase tracking-widest text-ink-mute">
                {product.grade} · {product.origin} · {product.weightGrams}g
              </p>
              <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center border border-ink-line">
                  <button
                    onClick={() =>
                      setQuantity(product.slug, Math.max(0, quantity - 1))
                    }
                    className="w-9 h-9 text-ink-soft hover:bg-paper-warm transition-colors"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="numeral w-8 text-center text-[14px]">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(
                        product.slug,
                        Math.min(product.inventory, quantity + 1)
                      )
                    }
                    className="w-9 h-9 text-ink-soft hover:bg-paper-warm transition-colors"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => remove(product.slug)}
                  className="text-[11px] uppercase tracking-widest text-ink-mute hover:text-ink link-underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="col-span-12 sm:col-span-3 numeral text-[18px] text-ink sm:text-right">
              {formatPrice(product.priceCents * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="lg:col-span-5 lg:col-start-9 lg:sticky lg:top-24 self-start">
        <div className="border border-ink-line p-8 bg-paper-warm/40">
          <h2 className="font-serif text-[24px] text-ink leading-tight">
            Order summary
          </h2>
          <dl className="mt-7 space-y-3 text-[14px]">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row
              label="Shipping"
              value={
                shipping === 0
                  ? "Complimentary"
                  : formatPrice(shipping)
              }
            />
            {shipping > 0 && (
              <p className="text-[12px] text-ink-mute">
                Free over {formatPrice(75000)}.
              </p>
            )}
          </dl>
          <div className="mt-7 pt-5 border-t border-ink-line flex items-baseline justify-between">
            <span className="text-[12px] uppercase tracking-widest text-ink-mute">
              Total
            </span>
            <span className="numeral text-[24px] text-ink">
              {formatPrice(total)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={checkoutLoading}
            className="mt-8 w-full bg-ink text-paper py-4 text-[12px] uppercase tracking-widest hover:bg-matcha-600 transition-colors duration-500 disabled:opacity-60"
          >
            {checkoutLoading ? "Preparing checkout…" : "Proceed to checkout"}
          </button>
          {error && (
            <p className="mt-4 text-[12px] text-clay">
              {error}
            </p>
          )}
          <p className="mt-5 text-[11px] uppercase tracking-widest text-ink-mute text-center">
            Guest checkout · Secure payment by Stripe
          </p>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="numeral text-ink">{value}</dd>
    </div>
  );
}
