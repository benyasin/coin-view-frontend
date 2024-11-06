import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.startsWith("/zh") ? "zh" : "en";

  // 创建一个响应并设置自定义的 x-locale 头
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  return response;
}

// 配置匹配的路径
export const config = {
  matcher: "/:path*", // 使中间件匹配所有路径
};
