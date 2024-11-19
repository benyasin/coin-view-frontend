/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/dashboard", // 用户访问的路径
        destination: "/dashboard/profile", // 重定向的目标路径
        permanent: false, // 设置为 false 表示临时重定向 (302)
      },
      {
        source: "/zh/dashboard", // 用户访问的路径
        destination: "/zh/dashboard/profile", // 重定向的目标路径
        permanent: false, // 设置为 false 表示临时重定向 (302)
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
  },
};

module.exports = nextConfig;
