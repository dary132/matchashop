import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1600ms] ease-gentle group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/[0.04] transition-colors duration-700" />
        <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-ink-soft bg-paper/85 backdrop-blur-sm px-2.5 py-1">
          {product.grade}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="font-serif text-[22px] leading-tight text-ink truncate">
              {product.name}
            </h3>
            <span className="font-jp text-[11px] text-ink-mute tracking-[0.15em]">
              {product.nameJp}
            </span>
          </div>
          <p className="mt-1 text-[12px] uppercase tracking-widest text-ink-mute">
            {product.origin} · {product.weightGrams}g
          </p>
        </div>
        <p className="numeral text-[18px] text-ink shrink-0">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
