import { Suspense } from "react";
import { getAllProducts, uniqueOrigins } from "@/lib/products";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata = {
  title: "Shop — Kuroha",
  description:
    "Browse our spring harvest: ceremonial, premium, and culinary matcha.",
};

export default function ShopPage() {
  const products = getAllProducts();
  const origins = uniqueOrigins();

  return (
    <div className="bg-paper">
      <section className="border-b border-ink-line/70">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-24 pb-14">
          <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
            お 茶 一 覧 — the collection
          </span>
          <h1 className="mt-5 font-serif text-[48px] md:text-[64px] leading-[1.02] text-ink font-light">
            Spring 2026.
          </h1>
          <p className="mt-6 max-w-md text-[15px] text-ink-soft leading-relaxed">
            Eight teas, three grades, three regions. Listed in the order our
            tea master placed them on the tasting table this April.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <ShopGrid products={products} origins={origins} />
      </Suspense>
    </div>
  );
}
