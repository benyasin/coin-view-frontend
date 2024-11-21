const fs = require("fs");
const path = require("path");

// 动态获取 app 文件夹中的路由
const getStaticRoutes = (baseDir = "./app") => {
  const routes = [];

  const traverse = (dir, prefix = "") => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === "admin" || entry.name.startsWith("[")) {
          // 排除动态路由或需要隐藏的路由
          continue;
        }
        traverse(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      } else if (entry.name === "page.tsx" || entry.name === "page.jsx") {
        // 只处理静态的 `page.tsx` 或 `page.jsx`
        routes.push(prefix || "/");
      }
    }
  };

  traverse(baseDir);
  return routes;
};

// 提取静态路由
const staticRoutes = getStaticRoutes();

module.exports = {
  siteUrl: "https://coinview.today",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin", "/api/*"], // 排除不必要的路由
  additionalPaths: async (config) => {
    // 将静态路由添加到 sitemap
    return staticRoutes.map((route) => ({
      loc: route,
      changefreq: "daily",
      priority: 0.7,
    }));
  },
};
