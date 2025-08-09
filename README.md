# CoinView 前端（coin-view-frontend）

基于 Next.js 14 与 NextUI 的加密资讯前台应用。聚合后端提供的“视频→摘要/情感→个性化推荐”数据，为用户提供高效的信息摄入体验。

## 技术栈
- Next.js 14（`app` 目录，SSR/CSR 混合渲染）
- TypeScript、TailwindCSS、NextUI v2
- Framer Motion 动效、`next-themes` 主题切换

## 功能概览
- 首页：推荐/关注的 Youtuber 最新观点卡片（含情感与要点）
- 频道页/视频详情：原文与中文摘要、情感解释、互动入口
- 会员/试用：根据用户状态控制可见性与调用频率
- 公告/索引：与后端公告与索引文档联动

## 与后端的交互
- 统一通过域名访问：
  - 页面静态资源与应用：`https://coinviews.org`
  - 接口：`https://coinviews.org/api`（通过 Cloudflare Tunnel 将 `/api/*` 转发到后端 8080）
- REST 客户端：以 DTO 形式消费 FastAPI 输出；
- 鉴权：登录后以 JWT 调用受保护接口（建议 httpOnly/短时令牌策略）。

## 环境变量
在项目根目录创建 `.env.local`：
```env
NEXT_PUBLIC_API_URL=https://coinviews.org/api
DOMAIN_BASE_URL=https://coinviews.org
```
若使用子域直达后端：`NEXT_PUBLIC_API_URL=https://api.coinviews.org`。

## 本地开发
```bash
npm install
npm run dev
# 访问 http://localhost:3000
```
确保后端已运行（127.0.0.1:8080）并按需配置 Tunnel 映射。

## 构建与部署
```bash
npm run build
npm run start
```
生产建议与 Cloudflare Tunnel 配置配合：
- `coinviews.org` → 127.0.0.1:3000
- `coinviews.org/api/*` → 127.0.0.1:8080（后端）

## 性能与体验
- 公共页 SSR，提高首屏与 SEO；
- 用户个性化内容 CSR/SWR，减少服务端负担；
- 卡片化呈现摘要与情感，避免“大段原文墙”。

## 难点与解决
- 跨域与路径统一：前端仅感知一个域名，Tunnel 将 `/api/*` 路由到后端，避免多源 CORS 复杂度；
- 渲染取舍：公共页 SSR + 个人页 CSR 的混合策略；
- 内容密集可读性：摘要/情感徽章与“展开更多”交互提升可读性。

## 价值点
- 将复杂的视频内容转化为“可一扫而过”的文字精华，显著提升信息获取效率；
- 与后端流水线打通，提供实时、个性化的加密分析视图；

## 许可证
MIT
