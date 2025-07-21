import { NextResponse } from "next/server";

import { getSessionFromServer } from "@/lib/session/serverSession";

export const DELETE = async () => {
  try {
    const session = await getSessionFromServer();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { errorMessage: "세션이 존재하지 않습니다." },
        { status: 401 }
      );
    }

    await session.destroy();

    return NextResponse.json({ message: "로그아웃 완료" }, { status: 200 });
  } catch (error) {
    console.error("로그아웃 중 에러:", error);
    return NextResponse.json(
      { errorMessage: "로그아웃 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
