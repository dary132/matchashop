"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import Link from "next/link";

export function AddToCart({
  slug,
  maxInventory,
}: {
  slug: string;
  maxInventory: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  const onAdd = () => {
    add(slug, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <div className="flex items-center border border-ink-line">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-11 h-12 text-[18px] text-ink-soft hover:bg-paper-warm transition-colors"
          >
            −
          </button>
          <span className="numeral w-10 text-center text-[16px] text-ink">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() =>
              setQuantity(Math.min(maxInventory, quantity + 1))
            }
            className="w-11 h-12 text-[18px] text-ink-soft hover:bg-paper-warm transition-colors"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex-1 bg-ink text-paper py-3.5 text-[12px] uppercase tracking-widest hover:bg-matcha-600 transition-colors duration-500 disabled:opacity-50"
          disabled={maxInventory === 0}
        >
          {maxInventory === 0
            ? "Sold out"
            : added
              ? "Added — view cart"
              : "Add to cart"}
        </button>
      </div>
      {added && (
        <Link
          href="/cart"
          className="block text-[12px] uppercase tracking-widest text-matcha-600 link-underline w-fit"
        >
          Proceed to cart →
        </Link>
      )}
      {maxInventory < 10 && maxInventory > 0 && (
        <p className="text-[12px] text-clay tracking-wide">
          Only {maxInventory} tins remaining from this harvest.
        </p>
      )}
    </div>
  );
}
