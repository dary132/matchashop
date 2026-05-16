import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-paper-warm">
        <Image
          src="https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=2400&q=85"
          alt="A bowl of bright matcha, freshly whisked"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-paper/30" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            <div className="max-w-2xl animate-fade-up">
              <span className="font-jp text-[12px] tracking-[0.32em] text-paper/90">
                抹茶 · 第一摘
              </span>
              <h1 className="mt-5 font-serif text-[44px] md:text-[68px] lg:text-[84px] leading-[1.02] text-paper font-light">
                Matcha, as it was<br />meant to be.
              </h1>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-paper/85">
                Single-origin tea from a handful of growers we know by name. No
                blends, no shortcuts, no hype.
              </p>
              <div className="mt-10 flex items-center gap-7">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 bg-paper text-ink px-7 py-3.5 text-[12px] uppercase tracking-widest hover:bg-matcha-500 hover:text-paper transition-colors duration-500"
                >
                  Shop the spring harvest
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="#sourcing"
                  className="text-[12px] uppercase tracking-widest text-paper/90 link-underline"
                >
                  Our sourcing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY STRIP */}
      <section className="border-b border-ink-line/70">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-5">
              <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
                理 念 — philosophy
              </span>
              <h2 className="mt-6 font-serif text-[40px] md:text-[52px] leading-[1.08] text-ink font-light">
                The quietest cup<br />in the room.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 max-w-prose">
              <p className="text-[16px] leading-[1.8] text-ink-soft">
                We work with five families across three prefectures. They grow
                slowly, shade carefully, and stone-mill in small batches. When
                a harvest is good, we buy it. When it isn't, we say so.
              </p>
              <p className="mt-6 text-[16px] leading-[1.8] text-ink-soft">
                We do not blend. We do not stretch. We do not market a
                tradition we don't practice. We sell the tea, and we explain
                where it came from.
              </p>
              <Link
                href="#sourcing"
                className="mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-widest text-matcha-600 link-underline"
              >
                See where it comes from
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
                春 摘 — spring harvest
              </span>
              <h2 className="mt-5 font-serif text-[40px] md:text-[52px] leading-[1.05] text-ink font-light">
                This season's tins.
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[12px] uppercase tracking-widest text-ink-soft link-underline shrink-0"
            >
              See all matcha →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-14">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR SOURCING */}
      <section id="sourcing" className="washi bg-paper-warm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <span className="font-jp text-[11px] tracking-[0.32em] text-ink-mute">
                産 地 — origin
              </span>
              <h2 className="mt-6 font-serif text-[40px] md:text-[52px] leading-[1.05] text-ink font-light">
                We know every<br />field by hand.
              </h2>
              <div className="mt-10 space-y-8 max-w-prose">
                <Origin
                  label="Uji, Kyoto"
                  jp="宇治"
                  body="The oldest matcha region in Japan. We work with two families east of the Uji river, growing Okumidori, Asahi, and Yabukita under traditional reed shade."
                />
                <Origin
                  label="Nishio, Aichi"
                  jp="西尾"
                  body="Mineral-rich plains along the Yahagi river. Bright, clear matcha from a co-op of seven growers."
                />
                <Origin
                  label="Chiran, Kagoshima"
                  jp="知覧"
                  body="Southern volcanic soil. The youngest farm in our network — modern methods, exceptional results."
                />
              </div>
            </div>
            <div className="md:col-span-6 order-1 md:order-2 relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=1600&q=85"
                alt="Tea fields in early spring"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-28 text-center">
          <span className="font-jp text-[11px] tracking-[0.32em] text-paper/60">
            季 節 の 便 り — seasonal letter
          </span>
          <h2 className="mt-6 font-serif text-[36px] md:text-[48px] leading-[1.1] font-light">
            Four letters a year.<br />Nothing else.
          </h2>
          <p className="mt-6 max-w-md mx-auto text-[15px] text-paper/75">
            Harvest news, brewing notes, and a short essay on the season. We
            don't run sales, so we won't email you about them.
          </p>
          <NewsletterForm theme="dark" />
        </div>
      </section>
    </>
  );
}

function Origin({
  label,
  jp,
  body,
}: {
  label: string;
  jp: string;
  body: string;
}) {
  return (
    <div className="flex gap-6 items-start">
      <span className="font-jp text-[28px] text-matcha-500/60 leading-none mt-1">
        {jp}
      </span>
      <div>
        <h3 className="font-serif text-[22px] text-ink leading-tight">
          {label}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.75] text-ink-soft">{body}</p>
      </div>
    </div>
  );
}
