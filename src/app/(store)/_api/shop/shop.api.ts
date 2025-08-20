import { authHttp, http } from "@/lib/api";

import {
  type CheeredMemberResponse,
  type StoreCheersResponse,
  type StoreDetailResponse,
  type StoreImagesResponse,
  type StoreTagsResponse,
} from "./shop.types";

export const STORE_ERROR_CODES = {
  NOT_FOUND: "ST0012",
} as const;

/**
 * 가게 상세 조회 API
 * @params storeId 조회할 가게 ID
 * @returns 가게 상세 정보
 */
export const getStoreDetail = async (
  storeId: number
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
  storeId: number,
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
  storeId: number
): Promise<StoreImagesResponse> => {
  return await http
    .get(`api/shops/${storeId}/images`)
    .json<StoreImagesResponse>();
};

/**
 * 자신이 응원한 가게 목록 조회 API
 *
 * @description
 * 현재 로그인한 사용자가 응원하고 있는 가게들의 정보를 가져옵니다.
 *
 * @returns {Promise<CheeredMemberResponse>} 응원한 가게 목록과 관련 정보
 */
export const getCheeredMember = async (): Promise<CheeredMemberResponse> => {
  return await authHttp
    .get("api/shops/cheered-member")
    .json<CheeredMemberResponse>();
};

/**
 * 가게별 태그 조회 API
 * @params storeId 조회할 가게 ID
 * @returns 가게별 태그 정보
 */
export const getStoreTags = async (
  storeId: number
): Promise<StoreTagsResponse> => {
  return await http.get(`api/shops/${storeId}/tags`).json<StoreTagsResponse>();
};
