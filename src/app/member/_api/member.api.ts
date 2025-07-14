import { authHttp } from "@/lib/api";

import type {
  MemberResponse,
  NicknameCheckRequest,
  PhoneNumberCheckRequest,
  UpdateMemberRequest,
  UpdateMemberResponse,
} from "../_types";

/**
 * 회원 정보 조회 API
 * 요청 헤더에 포함된 액세스 토큰으로 현재 로그인한 사용자의 정보를 받아옵니다.
 *
 * @returns {Promise<MemberResponse>} 사용자 정보 반환
 */
export const getMember = async (): Promise<MemberResponse> => {
  return await authHttp.get("api/member").json<MemberResponse>();
};

/**
 * 회원 정보 수정 API
 *
 * @param {UpdateMemberRequest} 수정할 회원 정보 request body
 * @returns {Promise<UpdateMemberResponse>} 회원 정보 수정 응답 데이터
 */
export const putMember = async (
  updateMember: UpdateMemberRequest
): Promise<UpdateMemberResponse> => {
  return await authHttp
    .put("api/member", {
      json: updateMember,
    })
    .json<UpdateMemberResponse>();
};

/**
 * 닉네임 중복 체크 API
 * 성공 시 true를 반환합니다.
 *
 * @param nickname - 검사할 닉네임
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능)
 */
export const getNicknameCheck = async (nickname: NicknameCheckRequest) => {
  const response = await authHttp.get("api/member/nickname/check", {
    searchParams: nickname,
    throwHttpErrors: false,
  });

  if (response.status === 204) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    throw new Error("닉네임 중복 체크 실패");
  }
};

/**
 * 휴대폰 번호 중복 체크 API
 * 성공 시 true를 반환합니다.
 *
 * @param phoneNumber - 검사할 휴대폰 번호
 * @returns {Promise<boolean>} 사용 가능 여부 (true: 사용 가능)
 */
export const getPhoneNumberCheck = async (
  phoneNumber: PhoneNumberCheckRequest
) => {
  const response = await authHttp.get("api/member/phone-number/check", {
    searchParams: phoneNumber,
    throwHttpErrors: false,
  });

  if (response.status === 204) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    throw new Error("휴대폰 번호 중복 체크 실패");
  }
};
