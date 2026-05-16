import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/lib/products";
import type { CartLine } from "@/types/product";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { lines } = (await req.json()) as { lines: CartLine[] };

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    // Resolve products and validate inventory
    const resolved = lines.map((line) => {
      const product = getProductBySlug(line.slug);
      if (!product) throw new Error(`Unknown product: ${line.slug}`);
      if (line.quantity <= 0) throw new Error("Invalid quantity.");
      return { product, quantity: line.quantity };
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    // Fallback path — no Stripe key configured. Mock a confirmation redirect.
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret || secret.startsWith("sk_test_xxx") || secret === "") {
      const mockId = `mock_${Date.now().toString(36)}`;
      return NextResponse.json({
        url: `${baseUrl}/order/confirmation?session_id=${mockId}&mock=1`,
      });
    }

    const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: resolved.map(({ product, quantity }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${product.name} (${product.nameJp})`,
            description: `${product.grade} · ${product.origin} · ${product.weightGrams}g`,
            images: [product.image],
          },
          unit_amount: product.priceCents,
        },
        quantity,
      })),
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "JP",
          "AU",
          "DE",
          "FR",
          "NL",
          "SE",
          "DK",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 850, currency: "usd" },
            display_name: "Standard · 3–5 business days",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1800, currency: "usd" },
            display_name: "Express · 1–2 business days",
          },
        },
      ],
      success_url: `${baseUrl}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
