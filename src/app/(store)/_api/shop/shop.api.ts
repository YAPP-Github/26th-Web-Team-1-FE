import { http } from "@/lib/api";

import {
  type StoreCheersResponse,
  type StoreDetailResponse,
  type StoreImagesResponse,
} from "./shop.types";

/**
 * 가게 상세 조회 API
 * @params storeId 조회할 가게 ID
 * @returns 가게 상세 정보
 */
export const getStoreDetail = async (
  storeId: string
): Promise<StoreDetailResponse> => {
  return await http.get(`api/shops/${storeId}`).json<StoreDetailResponse>();
};

/**
 * 가게별 응원 조회 API
 * @params storeId 조회할 가게 ID
 * @params size 조회할 응원 개수
 * @returns 가게별 응원 정보
 */
export const getStoreCheers = async (
  storeId: string,
  size: number
): Promise<StoreCheersResponse> => {
  return await http
    .get(`api/shops/${storeId}/cheers`, {
      searchParams: {
        size,
      },
    })
    .json<StoreCheersResponse>();
};

// /api/shops/{storeId}/images

/**
 * 가게별 이미지 조회 API
 * @params storeId 조회할 가게 ID
 * @returns 가게별 이미지 정보
 */
export const getStoreImages = async (
  storeId: string
): Promise<StoreImagesResponse> => {
  return await http
    .get(`api/shops/${storeId}/images`)
    .json<StoreImagesResponse>();
};
