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
          50: "#fdeae6",    // Très pâle  
          100: "#f9c5ba",   // Très clair  
          200: "#f59d8d",   // Clair  
          DEFAULT: "#f07561",   // Milieu clair  
          400: "#ec4e35",   // Couleur principale  
          500: "#c73e22",   // Légèrement plus foncé  
          600: "#9b311b",   // Foncé léger  
          700: "#702414",   // Plus foncé  
          800: "#46180e",   // Foncé profond  
          900: "#250d07",   // Très foncé  
          950: "#120603",   // Quasi noir  
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
