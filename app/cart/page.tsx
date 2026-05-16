import { CartView } from "@/components/CartView";

export const metadata = { title: "Cart — Kuroha" };

export default function CartPage() {
  return (
    <div className="bg-paper min-h-[70vh]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 pt-16 md:pt-20 pb-24">
        <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
          お 買 い 物 — your cart
        </span>
        <h1 className="mt-5 font-serif text-[44px] md:text-[56px] leading-[1.02] text-ink font-light">
          Your selection.
        </h1>
        <div className="mt-12">
          <CartView />
        </div>
      </div>
    </div>
  );
}
