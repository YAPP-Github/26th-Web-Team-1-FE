/**
 * 에러 응답 타입
 * @description 에러 응답 타입은 에러 코드와 에러 메시지를 포함합니다.
 */
export type ApiError = {
  /**
   * 에러 코드
   * @example "AUTH002"
   */
  errorCode?: string;
  /**
   * 에러 메시지
   * @example "이미 만료된 토큰입니다."
   */
  errorMessage?: string;
  /**
   * 에러 메시지
   * @example "이미 만료된 토큰입니다."
   */
  message?: string;
};

/**
 * 응답 타입
 * @description 성공 시 데이터를 반환하고, 실패 시 에러 응답을 반환합니다.
 */
export type ApiResponse<T> = T | ApiError;
