/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // ✅ pour générer un site statique compatible Netlify
  images: {
    unoptimized: true, // ✅ pour corriger l’erreur avec next export
  },
};

module.exports = nextConfig;
