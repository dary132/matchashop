"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-store";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCart((s) => s.totalItems());
  const hydrated = useCart((s) => s.hydrated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-gentle ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-ink-line/70"
          : "bg-paper/0 border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex h-[68px] items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-2.5 group"
            aria-label="Kuroha — home"
          >
            <span className="font-serif text-2xl tracking-wide text-ink">
              Kuroha
            </span>
            <span className="font-jp text-[11px] text-ink-mute tracking-[0.2em] hidden sm:inline">
              黒葉
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={pathname.startsWith(l.href)}
                className="link-underline text-[12px] uppercase tracking-widest text-ink-soft hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="text-[12px] uppercase tracking-widest text-ink-soft hover:text-ink relative"
              aria-label="Cart"
            >
              <span className="hidden sm:inline">Cart</span>
              <span className="sm:ml-1.5 numeral text-[13px]">
                ({hydrated ? totalItems : 0})
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
