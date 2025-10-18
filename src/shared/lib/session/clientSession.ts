import { getSession } from "@/features/auth/api";
import { TOKEN_TIMES } from "@/shared/constants";
import { type SessionData } from "@/shared/lib/session";

const clientSessionCache = new Map<
  string,
  { session: SessionData; expiresAt: number }
>();

const CLIENT_SESSION_CACHE_KEY = "session";
const CACHE_DURATION_MS = TOKEN_TIMES.CLIENT_SESSION_CACHE_DURATION; // 59분

/**
 * 클라이언트 세션 캐시를 비웁니다.
 */
export const clearClientSessionCache = () => {
  clientSessionCache.clear();
};

/**
 * 클라이언트 세션 캐시를 가져옵니다.
 * @description 캐시가 있고, 만료되지 않았다면 캐시된 세션을 반환합니다.
 */
export const getSessionFromClient = async () => {
  const now = Date.now();

  // 캐시가 있고, 만료되지 않았다면 반환
  const cached = clientSessionCache.get(CLIENT_SESSION_CACHE_KEY);
  if (cached && cached.expiresAt > now) {
    return cached.session;
  }

  // API로 세션 요청
  const session = await getSession();
  const expiresAt = now + CACHE_DURATION_MS;
  clientSessionCache.set(CLIENT_SESSION_CACHE_KEY, { session, expiresAt });

  return session;
};
