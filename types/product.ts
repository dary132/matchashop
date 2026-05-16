export type Grade = "ceremonial" | "premium" | "culinary";

export type Product = {
  slug: string;
  name: string;
  nameJp: string;
  grade: Grade;
  origin: string;
  prefecture: string;
  weightGrams: number;
  priceCents: number;
  tagline: string;
  description: string;
  tastingNotes: string[];
  story: string;
  brewing: {
    water: string;
    tea: string;
    method: string;
  };
  harvest: string;
  cultivar: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  featured?: boolean;
  inventory: number;
};

export type CartLine = {
  slug: string;
  quantity: number;
};
