import { authHttp } from "@/lib/api";

import {
  type CheerRegisterRequest,
  type CheerRegisterResponse,
} from "./cheer.types";

/**
 * 응원 등록 API
 * @param {CheerRegisterRequest} cheerRequest - 응원 등록 요청 데이터
 * @param {File | null} imageFile - 업로드할 이미지 파일 (선택사항)
 *
 * @returns {Promise<CheerRegisterResponse>} 등록된 응원 ID 반환
 */
export const postCheer = async (
  cheerRequest: CheerRegisterRequest,
  imageFile: File | null
): Promise<CheerRegisterResponse> => {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify(cheerRequest)], { type: "application/json" })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  return await authHttp
    .post("api/cheer", {
      body: formData,
    })
    .json<CheerRegisterResponse>();
};
