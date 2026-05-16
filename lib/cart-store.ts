"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine } from "@/types/product";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  hydrated: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      hydrated: false,
      setOpen: (v) => set({ isOpen: v }),
      add: (slug, quantity = 1) => {
        const existing = get().lines.find((l) => l.slug === slug);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.slug === slug ? { ...l, quantity: l.quantity + quantity } : l
            ),
          });
        } else {
          set({ lines: [...get().lines, { slug, quantity }] });
        }
      },
      remove: (slug) =>
        set({ lines: get().lines.filter((l) => l.slug !== slug) }),
      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.slug !== slug) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.slug === slug ? { ...l, quantity } : l
          ),
        });
      },
      clear: () => set({ lines: [] }),
      totalItems: () =>
        get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    {
      name: "matchashop-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    }
  )
);
