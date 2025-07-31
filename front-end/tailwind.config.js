/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Tous les fichiers dans "src/"
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: {
          50: "#e0f7f9",    // Couleur la plus claire (très pâle)
          100: "#b3eef3",   // Très clair
          200: "#80e4ed",   // Clair
          DEFAULT: "#4ddae7",   // Milieu clair
          400: "#1bd0e0",   // Couleur principale
          500: "#17a8b3",   // Légèrement plus foncé
          600: "#12818c",   // Foncé léger
          700: "#0d5b64",   // Plus foncé
          800: "#093740",   // Foncé profond
          900: "#041f27",   // Très foncé
          950: "#021014",   // Couleur quasi noire
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
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
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
  plugins: [require('daisyui')],
}

