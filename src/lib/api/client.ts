import ky, { type BeforeRetryState, type HTTPError } from "ky";

import { postClientReissue } from "@/app/_api/member/member.api";
import {
  ApiException,
  ForbiddenException,
  NetworkException,
  StatusCode,
  TimeoutException,
  UnauthorizedException,
} from "@/lib/exceptions";
import {
  clearClientSessionCache,
  getSessionFromClient,
  getSessionFromServer,
} from "@/lib/session";
import { isServer } from "@/lib/utils/environment";

import { type ApiError } from "./type";

const apiErrorHandler = async (error: HTTPError) => {
  const { response } = error;

  if (!response) {
    throw new NetworkException("네트워크 오류가 발생했습니다.");
  }

  const { status } = response;

  let errorMessage: string;

  try {
    const errorData = await response.json<ApiError>();
    errorMessage = errorData?.errorMessage || "알 수 없는 오류가 발생했습니다.";
  } catch {
    errorMessage = "서버 응답을 처리하는 중 오류가 발생했습니다.";
  }

  switch (status) {
    case StatusCode.Unauthorized:
      throw new UnauthorizedException(errorMessage);
    case StatusCode.Forbidden:
      throw new ForbiddenException(errorMessage);
    case StatusCode.NotFound:
      throw new ApiException(errorMessage, StatusCode.NotFound);
    case StatusCode.Timeout:
      throw new TimeoutException(errorMessage);
    default:
      throw new ApiException(errorMessage, status as StatusCode);
  }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const http = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeError: [apiErrorHandler],
  },
});

/**
 * 요청 전에 토큰을 주입합니다.
 * @description 서버 환경이면 서버 세션을 가져오고, 클라이언트 환경이면 클라이언트 세션을 가져옵니다.
 */
const setAuthorizationHeader = async (request: Request) => {
  const session = isServer()
    ? await getSessionFromServer()
    : await getSessionFromClient();

  if (session?.isLoggedIn && session.accessToken) {
    request.headers.set("Authorization", `Bearer ${session.accessToken}`);
  }
};

let isRefreshing = false;

/**
 * 토큰 재발급을 처리하는 함수
 * @description 401 에러가 발생하면 토큰을 재발급하고 재시도를 시도합니다.
 */
const refreshTokenAndRetry = async ({ error }: BeforeRetryState) => {
  // HTTPError가 아니거나, 401 에러가 아니거나, 서버 환경이거나, 이미 재발급 중이면 재시도를 중단합니다.
  if (!(error instanceof UnauthorizedException) || isServer() || isRefreshing) {
    return;
  }

  isRefreshing = true;

  try {
    // 토큰 재발급 API 호출
    await postClientReissue();
    // 클라이언트 세션 캐시 비우기
    clearClientSessionCache();

    // 재발급 성공
    console.info("토큰 재발급 성공, 원래 요청을 재시도합니다.");
  } catch (refreshError) {
    console.error("토큰 재발급 실패:", refreshError);
    // 재발급 실패 시, 재시도를 완전히 중단하고 로그인 페이지로 보냄
    clearClientSessionCache();
    // window.location.href = '/login';

    // ky.stop을 던지면 재시도를 멈추고 원래 에러를 throw 합니다.
    throw ky.stop;
  } finally {
    isRefreshing = false;
  }
};

export const authHttp = http.extend({
  hooks: {
    // 요청 전에 토큰을 주입합니다.
    beforeRequest: [setAuthorizationHeader],
    // beforeRetry 훅을 사용하여 재시도 전에 토큰을 갱신합니다.
    beforeRetry: [refreshTokenAndRetry],
  },
  // 기본적으로 4xx, 5xx 에러 시 재시도를 하지 않지만,
  // 우리가 직접 제어하기 위해 retry 옵션을 설정합니다.
  retry: {
    limit: 1, // 401 에러 시 딱 한 번만 재시도합니다.
    methods: ["get", "post", "put", "delete", "patch"], // 모든 HTTP 메서드에 대해
    statusCodes: [StatusCode.Unauthorized], // 401 상태 코드에 대해서만
  },
});

export const nextHttp = http.extend({
  prefixUrl: "/",
});
