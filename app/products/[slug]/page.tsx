import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getProductBySlug, formatPrice } from "@/lib/products";
import { AddToCart } from "@/components/AddToCart";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Kuroha`,
    description: product.tagline,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-10 md:pt-14 pb-24">
        <Link
          href="/shop"
          className="text-[11px] uppercase tracking-widest text-ink-mute link-underline"
        >
          ← All matcha
        </Link>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* IMAGERY */}
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-warm">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {product.gallery.slice(1, 4).map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden bg-paper-warm"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="md:col-span-5 md:pt-8 md:sticky md:top-24 self-start">
            <span className="text-[11px] uppercase tracking-widest text-matcha-600">
              {product.grade} grade
            </span>
            <div className="mt-4 flex items-baseline gap-3">
              <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.02] text-ink font-light">
                {product.name}
              </h1>
              <span className="font-jp text-[14px] text-ink-mute tracking-[0.15em]">
                {product.nameJp}
              </span>
            </div>
            <p className="mt-4 font-serif text-[20px] italic text-ink-soft leading-snug max-w-md">
              {product.tagline}
            </p>

            <div className="mt-8 flex items-baseline gap-3 pb-8 border-b border-ink-line">
              <p className="numeral text-[28px] text-ink">
                {formatPrice(product.priceCents)}
              </p>
              <p className="text-[12px] uppercase tracking-widest text-ink-mute">
                · {product.weightGrams}g tin
              </p>
            </div>

            <p className="mt-8 text-[15px] leading-[1.8] text-ink-soft">
              {product.description}
            </p>

            <div className="mt-10">
              <AddToCart slug={product.slug} maxInventory={product.inventory} />
            </div>

            {/* SPEC TABLE */}
            <dl className="mt-12 grid grid-cols-2 gap-y-4 text-[13px]">
              <Spec label="Origin" value={`${product.origin}, ${product.prefecture}`} />
              <Spec label="Cultivar" value={product.cultivar} />
              <Spec label="Harvest" value={product.harvest} />
              <Spec label="Weight" value={`${product.weightGrams} g`} />
            </dl>
          </div>
        </div>

        {/* TASTING NOTES */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-ink-line/70 pt-20">
          <div className="md:col-span-4">
            <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
              味 — taste
            </span>
            <h2 className="mt-5 font-serif text-[32px] md:text-[40px] leading-[1.1] text-ink font-light">
              Tasting notes.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {product.tastingNotes.map((note) => (
                <li
                  key={note}
                  className="border border-ink-line px-4 py-2 text-[13px] tracking-wide text-ink-soft"
                >
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[15px] leading-[1.8] text-ink-soft max-w-prose">
              {product.story}
            </p>
          </div>
        </section>

        {/* BREWING */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-ink-line/70 pt-20">
          <div className="md:col-span-4">
            <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
              点 て 方 — brewing
            </span>
            <h2 className="mt-5 font-serif text-[32px] md:text-[40px] leading-[1.1] text-ink font-light">
              How to prepare.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-8 max-w-prose">
            <Step n="01" label="Water" value={product.brewing.water} />
            <Step n="02" label="Tea" value={product.brewing.tea} />
            <Step n="03" label="Method" value={product.brewing.method} />
          </div>
        </section>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-[11px] uppercase tracking-widest text-ink-mute">
        {label}
      </dt>
      <dd className="text-ink">{value}</dd>
    </>
  );
}

function Step({
  n,
  label,
  value,
}: {
  n: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 items-baseline border-b border-ink-line/60 pb-7">
      <span className="numeral col-span-2 text-[28px] text-matcha-500/70">
        {n}
      </span>
      <div className="col-span-10">
        <p className="text-[11px] uppercase tracking-widest text-ink-mute">
          {label}
        </p>
        <p className="mt-2 text-[16px] leading-[1.7] text-ink-soft">{value}</p>
      </div>
    </div>
  );
}
