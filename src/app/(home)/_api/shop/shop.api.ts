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
  tag,
  location,
}: {
  size: number;
  category?: string;
  tag?: string[];
  location?: string[];
}): Promise<StoresResponse> => {
  const toCSV = (v?: string | string[]) =>
    Array.isArray(v) ? v.filter(Boolean).join(",") : v || undefined;

  return await http
    .get("api/shops", {
      searchParams: {
        size,
        ...(category ? { category } : {}),
        ...(toCSV(tag) ? { tag: toCSV(tag) } : {}),
        ...(toCSV(location) ? { location: toCSV(location) } : {}),
      },
    })
    .json<StoresResponse>();
};
