import { authHttp } from "@/lib/api";

import {
  type StoryRegisterRequest,
  type StoryRegisterResponse,
} from "./register.types";

/**
 * 스토리 등록 API
 * @param {StoryRegisterRequest} storyRequest - 스토리 등록 요청 데이터
 *
 * @returns {Promise<StoryRegisterResponse>} 등록된 스토리 ID 반환
 */
export const postStory = async (
  storyRequest: StoryRegisterRequest
): Promise<StoryRegisterResponse> => {
  return await authHttp
    .post("api/stories", {
      json: storyRequest,
    })
    .json<StoryRegisterResponse>();
};
