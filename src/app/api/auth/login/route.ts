import { type NextRequest, NextResponse } from "next/server";

import { postLogin } from "@/app/_api/auth/auth.api";
import { TOKEN_TIMES } from "@/constants/time.constants";
import { type ApiError } from "@/lib/api/type";
import { getSessionFromServer } from "@/lib/session/serverSession";

/**
 * 로그인 요청
 * @param req - 요청 객체
 * @returns 응답 객체
 */
export const POST = async (req: NextRequest) => {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json<ApiError>(
      { errorMessage: "인가 코드가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const data = await postLogin({ code });
    const session = await getSessionFromServer();

    session.isLoggedIn = true;
    session.accessToken = data.token.accessToken;
    session.refreshToken = data.token.refreshToken;
    session.userId = String(data.information.id);
    // TODO: 백엔드로부터 토큰 만료 시간 받아오면 변경하기 (1시간)
    session.accessTokenExpiresAt =
      Date.now() + TOKEN_TIMES.ACCESS_TOKEN_LIFESPAN;

    await session.save();

    return NextResponse.json(data.information);
  } catch (error) {
    console.error("Login failed:", error);
    // TODO: 에러 처리 세분화
    return NextResponse.json<ApiError>(
      { errorMessage: "인증에 실패했습니다." },
      { status: 401 }
    );
  }
};
