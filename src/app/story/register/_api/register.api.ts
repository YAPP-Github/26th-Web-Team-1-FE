import { authHttp } from "@/lib/api";

import {
  type StoryRegisterRequest,
  type StoryRegisterResponse,
} from "./register.types";

/**
 * 스토리 등록 API
 * @param {StoryRegisterRequest} storyRequest - 스토리 등록 요청 데이터
 * @param {File} imageFile - 업로드할 이미지 파일
 *
 * @returns {Promise<StoryRegisterResponse>} 등록된 스토리 ID 반환
 */
export const postStory = async (
  storyRequest: StoryRegisterRequest,
  imageFile: File
): Promise<StoryRegisterResponse> => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify(storyRequest)], { type: "application/json" })
  );

  formData.append("image", imageFile);

  return await authHttp
    .post("api/stories", {
      body: formData,
    })
    .json<StoryRegisterResponse>();
};
