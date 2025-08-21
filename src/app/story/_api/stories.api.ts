import { authHttp, http } from "@/lib/api";

import type {
  StoriesByKakaoIdResponse,
  StoriesResponse,
  StoryMemberParams,
  StoryMemberResponse,
} from "./stories.types";

/**
 * 스토리 목록 조회 API
 *
 * @returns {Promise<StoriesResponse>} 스토리 목록 리스트 반환
 */
export const getStories = async (size: number): Promise<StoriesResponse> => {
  return await http
    .get("api/stories", { searchParams: { size } })
    .json<StoriesResponse>();
};

/**
 * 카카오 ID로 스토리 목록 조회 API
 *
 * @param kakaoId - 가게의 카카오 ID (path parameter)
 * @param size - 스토리 개수 (기본값: 5, 최소: 1, 최대: 50)
 * @returns {Promise<StoriesByKakaoIdResponse>} 해당 카카오 ID의 스토리 목록 반환
 */
export const getStoriesByKakaoId = async (
  kakaoId: string,
  size: number = 5
): Promise<StoriesByKakaoIdResponse> => {
  return await http
    .get(`api/stories/kakao/${kakaoId}`, {
      searchParams: {
        size,
      },
    })
    .json<StoriesByKakaoIdResponse>();
};

/**
 * 사용자가 등록한 스토리 목록 조회 API
 *
 * @param params - 스토리 목록 조회에 필요한 쿼리 파라미터
 * @param params.page - 페이지 번호 (기본값: 0, 최소값: 0)
 * @param params.size - 스토리 개수 (기본값: 5, 최소값: 1, 최대값: 50)
 *
 * @returns {Promise<StoryMemberResponse>} 사용자가 등록한 스토리 목록 반환
 */
export const getStoryMember = async (
  params: StoryMemberParams
): Promise<StoryMemberResponse> => {
  const { page = 0, size = 5 } = params;

  return await authHttp
    .get("api/stories/member", {
      searchParams: { page, size },
    })
    .json<StoryMemberResponse>();
};
