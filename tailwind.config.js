/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: {
          50: "#e6f5eb", // très clair
          100: "#c0e6cd", // clair
          200: "#99d6af", // moyen clair
          300: "#73c690", // moyen
          400: "#4db672", // moyen foncé
          DEFAULT: "#2a7149", // couleur principale
          500: "#25643f", // légèrement plus foncé
          600: "#1f5635", // foncé
          700: "#19462b", // très foncé
          800: "#123622", // presque noir
          900: "#0b2518", // noir profond
        },
        secondary: {
          50: "#fff4e6", // très clair
          100: "#ffe0bf", // clair
          200: "#ffc999", // moyen clair
          300: "#ffb273", // moyen
          400: "#ff9b4d", // moyen foncé
          DEFAULT: "#be7b45", // couleur principale
          500: "#a6693b", // légèrement plus foncé
          600: "#8d5531", // foncé
          700: "#724427", // très foncé
          800: "#58331c", // presque noir
          900: "#3c2312", // noir profond
        },

        accent: {
          50: "#fffbe6",
          100: "#fff1b8",
          200: "#ffe58f",
          DEFAULT: "#ffd666", // Jaune doux enfant
          500: "#fadb14",
          700: "#d4b106",
          900: "#614700",
        },
        gray: {
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          DEFAULT: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        alert: {
          success: "#4ade80",
          danger: "#dc2626",
          warning: "#fbbf24",
        },
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        full: "9999px",
      },
    },
  },
  plugins: [require("daisyui")],
};
