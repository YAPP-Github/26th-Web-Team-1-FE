/**
 * 애플리케이션에서 사용되는 주요 HTTP 상태 코드를 정의합니다.
 */
export enum StatusCode {
  /** 401: 인증되지 않았거나 유효하지 않은 인증 정보 */
  Unauthorized = 401,
  /** 403: 접근 권한이 없음 */
  Forbidden = 403,
  /** 404: 요청한 리소스를 찾을 수 없음 */
  NotFound = 404,
  /** 408: 요청 시간 초과 */
  Timeout = 408,
  /** 500: 서버 내부 오류 */
  InternalServerError = 500,
  /** 502: 게이트웨이 오류 */
  BadGateway = 502,
}

/**
 * 모든 커스텀 예외 클래스의 기반이 되는 추상 클래스입니다.
 * `Error`를 상속받아 공통 속성을 정의합니다.
 */
class BaseException extends Error {
  /** 예외 발생 시각 (ISO 8601 형식) */
  timestamp: string;
  /** 예외에 해당하는 HTTP 상태 코드 */
  statusCode: StatusCode;
  /** 백엔드에서 정의한 특정 에러 코드 (선택 사항) */
  errorCode?: string;

  constructor(message: string, statusCode: StatusCode, errorCode?: string) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

/**
 * 일반적인 커스텀 예외 클래스입니다.
 */
export class CustomException extends BaseException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.InternalServerError,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * 네트워크 연결 문제로 인해 발생하는 예외입니다. (예: 오프라인 상태)
 */
export class NetworkException extends CustomException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.InternalServerError,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * 백엔드 API 응답 관련 예외입니다. (예: 404 Not Found)
 */
export class ApiException extends CustomException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.NotFound,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * 요청 시간 초과로 인해 발생하는 예외입니다.
 */
export class TimeoutException extends CustomException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.Timeout,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * 인증되지 않은 사용자의 요청으로 발생하는 예외입니다. (401)
 */
export class UnauthorizedException extends CustomException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.Unauthorized,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}

/**
 * 권한이 없는 리소스에 접근 시 발생하는 예외입니다. (403)
 */
export class ForbiddenException extends CustomException {
  constructor(
    message: string,
    statusCode: StatusCode = StatusCode.Forbidden,
    errorCode?: string
  ) {
    super(message, statusCode, errorCode);
  }
}
