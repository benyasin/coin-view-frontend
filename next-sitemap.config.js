module.exports = {
  siteUrl: "https://coinview.today", // 你的网站根 URL
  generateRobotsTxt: true, // 是否生成 robots.txt 文件
  sitemapSize: 5000, // 单个 sitemap.xml 的最大链接数
  changefreq: "daily", // 更新频率（可选）
  priority: 0.7, // 页面优先级（可选）
  exclude: ["/admin", "/api/*"], // 排除不需要出现在 sitemap 的路径
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" }, // 允许所有用户代理访问所有页面
      { userAgent: "*", disallow: ["/admin", "/api"] }, // 阻止访问某些页面
    ],
  },
};
