import { NextResponse } from "next/server";

import { postReissue } from "@/features/auth/api";
import { type ApiError } from "@/shared/lib/api";
import { getSessionFromServer } from "@/shared/lib/session";

export const POST = async () => {
  const session = await getSessionFromServer();
  const { refreshToken } = session;

  if (!refreshToken) {
    return NextResponse.json<ApiError>(
      { errorMessage: "리프레시 토큰이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const data = await postReissue({ refreshToken });

    session.accessToken = data.accessToken;
    session.refreshToken = data.refreshToken;
    await session.save();

    return NextResponse.json(session);
  } catch (error) {
    console.error("Reissue failed:", error);
    // 토큰 재발급 실패 시 세션 초기화
    session.destroy();
    return NextResponse.json<ApiError>(
      { errorMessage: "토큰 재발급에 실패했습니다." },
      { status: 401 }
    );
  }
};
