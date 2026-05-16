import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const jp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuroha — Matcha, as it was meant to be.",
  description:
    "Single-origin ceremonial and premium matcha, sourced directly from growers in Uji, Nishio, and Kagoshima.",
  openGraph: {
    title: "Kuroha — Matcha, as it was meant to be.",
    description:
      "Single-origin ceremonial and premium matcha, sourced directly from growers in Uji, Nishio, and Kagoshima.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${jp.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink">
        <Nav />
        <main className="pt-[68px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
