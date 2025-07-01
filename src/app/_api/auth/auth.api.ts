import { http, nextHttp } from "@/lib/api/client";

import type {
  LoginRequest,
  LoginResponse,
  ReissueRequest,
  ReissueResponse,
} from "./auth.types";

/**
 * 백엔드의 /api/auth/login 엔드포인트에 로그인 요청을 보냅니다.
 *
 * @param {LoginRequest} params - 카카오 인가 코드
 * @returns {Promise<LoginResponse>} 로그인 응답 데이터
 */
export const postLogin = async (params: LoginRequest) => {
  return await http
    .post("api/auth/login", { json: params })
    .json<LoginResponse>();
};

/**
 * 백엔드의 /api/auth/reissue 엔드포인트에 토큰 재발급 요청을 보냅니다.
 *
 * @param {ReissueRequest} params - 리프레시 토큰
 * @returns {Promise<ReissueResponse>} 재발급된 토큰 데이터
 */
export const postReissue = async (params: ReissueRequest) => {
  return await http
    .post("api/auth/reissue", { json: params })
    .json<ReissueResponse>();
};

/**
 * 백엔드의 /api/auth/login/oauth 엔드포인트에 oauth 로그인 요청 URL을 받아옵니다.
 * @description kakao provider만 지원합니다.
 *
 * @returns 302 리다이렉트 응답
 */
export const getOauthLoginUrl = async () => {
  return await http.get("api/auth/login/oauth").json();
};

type Information = Omit<LoginResponse, "token">["information"];

/**
 * Next.js API Route(/api/auth/login)를 통해 로그인 요청을 보냅니다.
 *
 * @param {LoginRequest} params - 카카오 인가 코드
 * @returns {Promise<Information>} 회원 정보
 */
export const postClientLogin = async (params: LoginRequest) => {
  return await nextHttp
    .post("api/auth/login", { json: params })
    .json<Information>();
};

/**
 * Next.js API Route(/api/auth/reissue)를 통해 토큰 재발급 요청을 보냅니다.
 *
 * @returns {Promise<ReissueResponse>} 재발급된 세션 정보
 */
export const postClientReissue = async () => {
  return await nextHttp.post("api/auth/reissue").json<ReissueResponse>();
};

/**
 * Next.js API Route(/api/auth/logout)를 통해 세션 삭제(로그아웃) 요청을 보냅니다.
 *
 * @returns {Promise<void>} 로그아웃 결과
 */
export const deleteClientSession = async () => {
  return await nextHttp.delete("api/auth/logout").json();
};
