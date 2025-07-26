import { http } from "@/lib/api";

import { type CheersResponse } from "./cheer.types";

/**
 * 최신 응원 조회 API
 * @params size 조회할 응원 개수 (최소 1, 최대 50)
 * @returns 최신 응원 목록
 */
export const getCheers = async (size: number): Promise<CheersResponse> => {
  return await http
    .get("api/cheer", {
      searchParams: {
        size,
      },
    })
    .json<CheersResponse>();
};
