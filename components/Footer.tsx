import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-line/70 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl tracking-wide">Kuroha</span>
              <span className="font-jp text-xs text-ink-mute tracking-[0.2em]">
                黒葉
              </span>
            </div>
            <p className="mt-5 text-[14px] text-ink-mute max-w-sm leading-relaxed">
              Single-origin matcha, sourced directly from growers in Uji,
              Nishio, and Kagoshima. Shipped from a small warehouse in
              Brooklyn.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-widest text-ink-mute">
              Shop
            </h4>
            <ul className="mt-5 space-y-3 text-[14px]">
              <li>
                <Link href="/shop?grade=ceremonial" className="link-underline">
                  Ceremonial
                </Link>
              </li>
              <li>
                <Link href="/shop?grade=premium" className="link-underline">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/shop?grade=culinary" className="link-underline">
                  Culinary
                </Link>
              </li>
              <li>
                <Link href="/shop" className="link-underline">
                  All matcha
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-widest text-ink-mute">
              The studio
            </h4>
            <p className="mt-5 text-[14px] text-ink-mute leading-relaxed max-w-sm">
              Receive our quarterly letter on new harvests, brewing notes, and
              upcoming tastings. No promotional emails — ever.
            </p>
            <NewsletterForm />

          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ink-line/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-ink-mute">
          <p>© {new Date().getFullYear()} Kuroha Tea Co. Brooklyn, NY.</p>
          <p className="font-jp tracking-[0.25em]">
            一 期 一 会
          </p>
        </div>
      </div>
    </footer>
  );
}
