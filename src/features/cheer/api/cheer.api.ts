import { authHttp, http } from "@/shared/lib/api";

import type {
  CheerListParams,
  CheerListResponse,
  CheerRegisterRequest,
  CheerRegisterResponse,
  CheersResponse,
} from "./cheer.types";

// ============================================
// Cheer Register & List APIs (from (cheer)/_api)
// ============================================

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

/**
 * 최신 응원 조회 API (with filters)
 * @example
 * /api/cheer?category=KOREAN&tag=OLD_STORE_MOOD,ENERGETIC&location=HONGDAE,IHWA
 *
 * @param size  페이지 사이즈 (기본 5, 1~50)
 * @param category  음식 카테고리
 * @param tag  분위기, 실용도 태그
 * @param location  서울 위치
 *
 * @returns {Promise<CheerListResponse>} 등록된 응원 리스트 반환
 */
export const getCheerList = async ({
  size = 5,
  category,
  tag,
  location,
}: CheerListParams): Promise<CheerListResponse> => {
  const toCSV = (v?: string | string[]) =>
    Array.isArray(v) ? v.filter(Boolean).join(",") : v || undefined;

  return await http
    .get("api/cheer", {
      searchParams: {
        size,
        ...(category ? { category } : {}),
        ...(toCSV(tag) ? { tag: toCSV(tag) } : {}),
        ...(toCSV(location) ? { location: toCSV(location) } : {}),
      },
    })
    .json<CheerListResponse>();
};

// ============================================
// Cheers API (from (home)/_api/cheer)
// ============================================

/**
 * 최신 응원 조회 API (simple, no filters)
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
