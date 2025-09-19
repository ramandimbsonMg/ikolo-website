import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true, // Désactive l'optimisation d'images
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Désactiver les erreurs ESLint lors de la build
  },
};

module.exports = nextConfig;
