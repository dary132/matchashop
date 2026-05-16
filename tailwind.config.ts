import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper whites and creams
        paper: {
          DEFAULT: "#F7F3EC", // washi paper
          warm: "#EFE9DE",
          cream: "#F2EBDD",
        },
        ink: {
          DEFAULT: "#1B1B1A", // sumi ink
          soft: "#2A2A28",
          mute: "#6B6B66",
          line: "#D8D2C5",
        },
        matcha: {
          50: "#F3F4ED",
          100: "#E4E8D7",
          200: "#C7CFAE",
          300: "#A6B486",
          400: "#849865",
          500: "#647B49", // primary deep matcha
          600: "#4F6238",
          700: "#3E4D2D",
          800: "#2F3B24",
          900: "#212B1A",
        },
        clay: "#B8956A", // accent — earthen pottery
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        jp: ["var(--font-jp)", "Noto Sans JP", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.32em",
        wide: "0.18em",
      },
      maxWidth: {
        prose: "62ch",
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
