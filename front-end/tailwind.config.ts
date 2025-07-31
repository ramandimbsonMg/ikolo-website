import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: {
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          DEFAULT: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        secondary: {
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          DEFAULT: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        gray: {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        alert: {
          success: "#4ade80",
          danger: "#dc2626",
          warning: "#fbbf24",
        },
      },
      borderRadius: {
        DEFAULT: "12px", // Définit une bordure arrondie par défaut de 12px
        sm: "8px", // Petite bordure
        md: "16px", // Moyenne bordure
        lg: "24px", // Grande bordure
        full: "9999px", // Bordure totalement ronde
      },
    },
  },
  plugins: [],
};
export default config;
