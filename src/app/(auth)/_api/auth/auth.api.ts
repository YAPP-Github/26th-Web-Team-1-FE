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
 * OAuth 제공자의 인증 페이지로 브라우저를 리다이렉트시킵니다.
 *
 * @description
 * 이 함수를 호출하면, 서버로부터 302 리다이렉트 응답을 받아
 * OAuth 제공자의 인증 페이지로 즉시 이동합니다.
 * 반환 값은 없으며, 호출 즉시 페이지가 전환됩니다.
 */
export const redirectToKakaoOAuthLoginPage = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/oauth`;
};

type Information = Omit<LoginResponse, "token">["information"];

/**
 * Next.js API Route(/api/auth/login)를 통해 로그인 요청을 보냅니다.
 *
 * @param {LoginRequest} params - 카카오 인가 코드
 * @returns {Promise<Information>} 회원 정보
 */
export const postClientLogin = async (params: Omit<LoginRequest, "origin">) => {
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
