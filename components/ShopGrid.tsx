"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { Grade, Product } from "@/types/product";

const grades: { value: Grade | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ceremonial", label: "Ceremonial" },
  { value: "premium", label: "Premium" },
  { value: "culinary", label: "Culinary" },
];

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price · low to high" },
  { value: "price-desc", label: "Price · high to low" },
];

export function ShopGrid({
  products,
  origins,
}: {
  products: Product[];
  origins: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlGrade = (searchParams.get("grade") as Grade | null) ?? "all";
  const urlOrigin = searchParams.get("origin") ?? "all";

  const [grade, setGrade] = useState<Grade | "all">(urlGrade);
  const [origin, setOrigin] = useState<string>(urlOrigin);
  const [sort, setSort] = useState<string>("default");

  // Sync state FROM url when query string changes (e.g. clicking nav links)
  useEffect(() => {
    setGrade(urlGrade);
  }, [urlGrade]);

  useEffect(() => {
    setOrigin(urlOrigin);
  }, [urlOrigin]);

  // Sync url FROM state when user clicks filter buttons
  useEffect(() => {
    const params = new URLSearchParams();
    if (grade !== "all") params.set("grade", grade);
    if (origin !== "all") params.set("origin", origin);
    const qs = params.toString();
    const target = `${pathname}${qs ? "?" + qs : ""}`;
    const currentQs = searchParams.toString();
    const current = `${pathname}${currentQs ? "?" + currentQs : ""}`;
    if (target !== current) {
      router.replace(target, { scroll: false });
    }
  }, [grade, origin, pathname, router, searchParams]);

  const filtered = useMemo(() => {
    let out = products.slice();
    if (grade !== "all") out = out.filter((p) => p.grade === grade);
    if (origin !== "all") out = out.filter((p) => p.origin === origin);
    if (sort === "price-asc") out.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-desc") out.sort((a, b) => b.priceCents - a.priceCents);
    return out;
  }, [products, grade, origin, sort]);

  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-14 md:py-20">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
          {grades.map((g) => (
            <button
              key={g.value}
              onClick={() => setGrade(g.value)}
              className={`text-[12px] uppercase tracking-widest px-4 py-2 border transition-colors duration-300 ${
                grade === g.value
                  ? "border-ink bg-ink text-paper"
                  : "border-ink-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Select
            label="Origin"
            value={origin}
            onChange={setOrigin}
            options={[
              { value: "all", label: "All origins" },
              ...origins.map((o) => ({ value: o, label: o })),
            ]}
          />
          <Select
            label="Sort"
            value={sort}
            onChange={setSort}
            options={sortOptions}
          />
        </div>
      </div>

      <div className="text-[12px] uppercase tracking-widest text-ink-mute mb-8">
        <span className="numeral text-[13px]">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "tea" : "teas"}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-ink-mute">
          <p className="font-serif text-[28px] text-ink">
            Nothing matches that combination.
          </p>
          <button
            onClick={() => {
              setGrade("all");
              setOrigin("all");
            }}
            className="mt-6 text-[12px] uppercase tracking-widest link-underline text-matcha-600"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-ink-mute">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-ink-line text-ink py-1.5 pr-6 text-[13px] uppercase tracking-widest outline-none focus:border-ink cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
