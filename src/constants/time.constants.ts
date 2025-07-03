// 기본 시간 단위 (밀리초)
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const TIME = {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
};

/**
 * 인증 및 토큰과 관련된 시간 상수(밀리초 단위)를 정의합니다.
 */
export const TOKEN_TIMES = {
  // /** Access Token의 유효 시간 (1시간) */
  ACCESS_TOKEN_LIFESPAN: 1 * HOUR,

  // /** 클라이언트 세션 캐시 유지 시간 (59분) */
  CLIENT_SESSION_CACHE_DURATION: 59 * MINUTE,

  // /** 주기적 토큰 재발급 간격 (59분) */
  PERIODIC_TOKEN_REFRESH_INTERVAL: 59 * MINUTE,

  // /** 미들웨어에서 토큰 만료 임박으로 간주하고 재발급을 시도하는 시간 (5분) */
  MIDDLEWARE_TOKEN_REFRESH_THRESHOLD: 5 * MINUTE,
};
