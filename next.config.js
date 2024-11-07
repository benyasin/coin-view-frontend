/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
  },
  // 开启生产环境的静态优化
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },
};

module.exports = nextConfig;
