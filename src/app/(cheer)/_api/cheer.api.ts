import { authHttp } from "@/lib/api";

import {
  type CheerRegisterRequest,
  type CheerRegisterResponse,
} from "./cheer.types";

/**
 * 응원 등록 API
 * @param {CheerRegisterRequest} body - 응원 등록 요청 데이터
 *
 * @returns {Promise<CheerRegisterResponse>} 등록된 응원 ID 반환
 */
export const postCheer = async (
  body: CheerRegisterRequest
): Promise<CheerRegisterResponse> => {
  return await authHttp
    .post("api/cheer", {
      json: body,
    })
    .json<CheerRegisterResponse>();
};
