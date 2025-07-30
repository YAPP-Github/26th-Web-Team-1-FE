import { http } from "@/lib/api";

import { type StoryDetailResponse } from "./detail.types";

/**
 * 스토리 상세 정보 조회 API
 * @param storyId - 조회할 스토리 ID
 * @returns {Promise<StoryDetailResponse>} 스토리 상세 정보
 */
export const getStoryDetail = async (
  storyId: string
): Promise<StoryDetailResponse> => {
  return await await http
    .get(`api/stories/${storyId}`)
    .json<StoryDetailResponse>();
};
