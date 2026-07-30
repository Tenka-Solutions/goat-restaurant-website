import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        ivory: "var(--ivory)",
        gold: "var(--gold)",
        "gold-dark": "var(--gold-dark)",
        sky: "var(--sky)",
        "sky-light": "var(--sky-light)",
        "blue-deep": "var(--blue-deep)",
      },
      fontFamily: {
        display: ["Bebas Neue", "Arial Narrow", "sans-serif"],
        sans: ["Montserrat", "Arial", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,.035) 0 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
