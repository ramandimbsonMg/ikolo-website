/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Tous les fichiers dans "src/"
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#276ed2", // couleur principale
          600: "#1f55a0",
          700: "#173c6f",
          800: "#0f2340",
          900: "#070b1a",
        },
        green: {
          50: "#f0ffe6",
          100: "#e0ffcc",
          200: "#b2ff99",
          300: "#80ff66",
          400: "#4dff33",
          500: "#3ee00a", // couleur principale
          600: "#2fb008",
          700: "#208006",
          800: "#105003",
          900: "#082801",
        },
        gray: {
          // 100: "#f1f5f9",
          // 200: "#e2e8f0",
          // 300: "#cbd5e1",
          // 400: "#94a3b8",
          // 500: "#64748b",
          // 600: "#475569",
          // 700: "#334155",
          // 800: "#1e293b",
          // 900: "#0f172a",
          // 950: "#020617",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          DEFAULT: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        alert: {
          success: "#4ade80",
          danger: "#dc2626",
          warning: "#fbbf24",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      borderRadius: {
        DEFAULT: "8px", // Définit une bordure arrondie par défaut de 12px
        sm: "8px", // Petite bordure
        md: "16px", // Moyenne bordure
        lg: "24px", // Grande bordure
        full: "9999px", // Bordure totalement ronde
      },
    },
  },
  plugins: [require("daisyui")],
};

