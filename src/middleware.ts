import { type NextRequest, NextResponse } from "next/server";

import { postReissue } from "@/features/auth/api";
import { TOKEN_TIMES } from "@/shared/constants";
import { getSessionFromServer } from "@/shared/lib/session";

type PathPattern = {
  pattern: RegExp;
  description: string;
};

const PUBLIC_PATTERNS: PathPattern[] = [
  { pattern: /^\/$/, description: "홈페이지" },
  { pattern: /^\/login(?:\/.*)?$/, description: "로그인 관련 페이지" },
  { pattern: /^\/signup(?:\/.*)?$/, description: "회원가입 관련 페이지" },
  { pattern: /^\/public(?:\/.*)?$/, description: "정적 파일" },
  { pattern: /^\/stores$/, description: "가게 목록 페이지" },
  {
    pattern: /^\/stores\/\d+(?:\/.*)?$/,
    description: "가게 상세 페이지 (동적)",
  },
  {
    pattern: /^\/story\/\d+(?:\/.*)?$/,
    description: "스토리 상세 페이지 (동적)",
  },
];

const PROTECTED_PATTERNS: PathPattern[] = [
  { pattern: /^\/stores\/register(?:\/.*)?$/, description: "가게 등록 관련" },
  { pattern: /^\/story\/register(?:\/.*)?$/, description: "스토리 등록" },
  { pattern: /^\/member(?:\/.*)?$/, description: "회원 관련 페이지" },
];

const isPublicPath = (pathname: string): boolean => {
  const isProtected = PROTECTED_PATTERNS.some(({ pattern }) =>
    pattern.test(pathname)
  );

  if (isProtected) {
    return false;
  }

  const isPublic = PUBLIC_PATTERNS.some(({ pattern }) =>
    pattern.test(pathname)
  );

  if (isPublic) {
    return true;
  }

  // 기본적으로 모든 다른 경로는 인증 필요
  return false;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트에 대한 처리
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await getSessionFromServer();

  if (!session.isLoggedIn) {
    const loginUrl = new URL("/login", request.url);

    const originalUrl = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("next", originalUrl);

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
        console.warn("Refresh token이 없습니다. 로그인이 필요합니다.");
        throw new Error("No refresh token available");
      }

      console.info("토큰 갱신을 시도합니다...");

      // 백엔드에 직접 토큰 재발급 요청
      const newTokens = await postReissue({
        refreshToken: session.refreshToken,
      });

      if (!newTokens.accessToken || !newTokens.refreshToken) {
        throw new Error("Invalid token response from server");
      }

      // 세션에 새로운 토큰 정보와 만료 시각 갱신
      session.accessToken = newTokens.accessToken;
      session.refreshToken = newTokens.refreshToken;
      session.accessTokenExpiresAt =
        Date.now() + TOKEN_TIMES.ACCESS_TOKEN_LIFESPAN;

      await session.save();
      console.info("토큰이 성공적으로 갱신되었습니다.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("토큰 갱신 실패:", {
        error: errorMessage,
        pathname: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
      });

      // 재발급 실패 시 세션을 파기하고 로그인 페이지로 리디렉트
      session.destroy();
      const loginUrl = new URL("/login", request.url);

      // 원래 접근하려던 URL과 쿼리스트링을 next 파라미터에 저장
      const originalUrl = request.nextUrl.pathname + request.nextUrl.search;
      loginUrl.searchParams.set("next", originalUrl);
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
