import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname; // 使用 pathname 获取路径部分
  // 判断 URL 是否以 "/zh" 开头
  if (pathname.startsWith("/zh")) {
    // 移除 "/zh" 前缀，但不改变显示的 URL
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = pathname.replace(/^\/zh/, "");

    // 重写 URL 并设置语言头
    const response = NextResponse.rewrite(newUrl);
    response.headers.set("x-locale", "zh");
    return response;
  }

  // 对于没有 "/zh" 前缀的路径，默认为英文
  const response = NextResponse.next();
  response.headers.set("x-locale", "en");
  return response;
}

// 配置匹配的路径
export const config = {
  matcher: ["/:path*", "/detail/:path*"], // 使中间件匹配所有路径
};
