import { nextHttp } from "@/lib/api/client";

import type { SessionData } from "./session.dto";

/**
 * Next.js API Route(/api/session)를 통해 세션 정보를 요청합니다.
 *
 * @returns {Promise<SessionData>} 세션 정보
 */
export const getSession = async () => {
  return await nextHttp.get<SessionData>("api/session").json();
};
