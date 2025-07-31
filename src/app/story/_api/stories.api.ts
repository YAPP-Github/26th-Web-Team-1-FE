import { http } from "@/lib/api";

import type { StoriesResponse } from "./stories.types";

/**
 * 스토리 목록 조회 API
 *
 * @returns {Promise<StoriesResponse>} 스토리 목록 리스트 반환
 */
export const getStories = async (): Promise<StoriesResponse> => {
  return await http.get("api/stories").json<StoriesResponse>();
};
