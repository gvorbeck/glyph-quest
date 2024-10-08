import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      amber: "#ffc107",
      darkGray: "#242120",
      white: "#ffffff",
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        "jaini-purva": ["var(--font-jaini-purva)"],
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "sheet-hero": "url('/images/hero.webp')",
        "sheet-wizard": "url('/images/wizard.webp')",
        "sheet-dwarf": "url('/images/dwarf.webp')",
        "sheet-cleric": "url('/images/cleric.webp')",
        "sheet-ranger": "url('/images/ranger.webp')",
        "sheet-thief": "url('/images/thief.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
