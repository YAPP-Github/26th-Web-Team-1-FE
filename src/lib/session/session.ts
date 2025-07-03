import { getIronSession, type SessionOptions } from "iron-session";
import { cache } from "react";

import { type SessionData } from "./type";

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

const COOKIE_NAME = "time-eat-session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14일

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || "",
  cookieName: COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
  },
};

/**
 * 세션 데이터를 가져옵니다.
 *
 * @description react cache를 사용하여 1회 렌더링 사이클 내에서 요청이 캐싱되도록 합니다.
 */
export const getSession = cache(async () => {
  const { cookies } = await import("next/headers");
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return session;
});
