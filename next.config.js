/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
  },
};

module.exports = nextConfig;
