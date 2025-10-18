import { authHttp } from "@/shared/lib/api";

import { type StoreSearchResponse } from "./search.types";

/**
 * 거게 검색 API
 * @param query 검색어
 * @returns {Promise<StoreSearchResponse>} 검색된 가게 리스트
 */
export const getStoreSearch = async (
  query: string
): Promise<StoreSearchResponse> => {
  return await authHttp
    .get("api/shop/search", {
      searchParams: { query },
    })
    .json<StoreSearchResponse>();
};
