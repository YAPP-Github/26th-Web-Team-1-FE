import { http } from "@/lib/api";

import { type StoresResponse } from "./shop.types";

/**
 * 가게 목록 조회 API
 * @params size 조회할 가게 개수 (최소 1, 최대 50)
 * @returns 가게 목록
 */
export const getStores = async ({
  size,
  category,
}: {
  size: number;
  category?: string;
}): Promise<StoresResponse> => {
  return await http
    .get("api/shops", {
      searchParams: {
        size,
        ...(category ? { category } : {}),
      },
    })
    .json<StoresResponse>();
};
