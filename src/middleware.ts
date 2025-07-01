// src/middleware.ts
import { type NextRequest, NextResponse } from "next/server";

import { postReissue } from "@/app/_api/auth/auth.api";
import { TOKEN_TIMES } from "@/constants";
import { getSessionFromServer } from "@/lib/session";

// 인증이 필요 없는 경로
const PUBLIC_PATHS = ["/login", "/signup", "/public", "/login/callback"];

const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS.some(path => pathname.startsWith(path));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await getSessionFromServer();

  if (!session.isLoggedIn) {
    const loginUrl = new URL("/login", request.url);

    return NextResponse.redirect(loginUrl);
  }

  const now = Date.now();

  // Access Token이 만료되었거나, 5분 이내에 만료될 예정인 경우
  if (
    session.accessTokenExpiresAt &&
    session.accessTokenExpiresAt <
      now + TOKEN_TIMES.MIDDLEWARE_TOKEN_REFRESH_THRESHOLD
  ) {
    try {
      if (!session.refreshToken) {
        throw new Error("No refresh token");
      }

      // 백엔드에 직접 토큰 재발급 요청
      const newTokens = await postReissue({
        refreshToken: session.refreshToken,
      });

      // 세션에 새로운 토큰 정보와 만료 시각 갱신
      session.accessToken = newTokens.accessToken;
      session.refreshToken = newTokens.refreshToken;
      session.accessTokenExpiresAt =
        Date.now() + TOKEN_TIMES.ACCESS_TOKEN_LIFESPAN;

      await session.save();
      console.info("토큰이 성공적으로 갱신되었습니다.");
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      // 재발급 실패 시 세션을 파기하고 로그인 페이지로 리디렉트
      session.destroy();
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("error", "session_expired");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js|pwaServiceWorker.js|.*\\.png$|manifest.webmanifest).*)",
  ],
};
