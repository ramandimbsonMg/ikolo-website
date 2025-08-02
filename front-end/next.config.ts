// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ PAS de output: 'export'
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
