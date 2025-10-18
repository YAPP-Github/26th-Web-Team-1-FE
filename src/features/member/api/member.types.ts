export type Member = {
  id: number;
  email: string;
  isSignUp: boolean;
  nickname: string;
  phoneNumber: string;
  optInMarketing: boolean;
};
export type MemberResponse = Member;

export type UpdateMemberRequest = Pick<
  Member,
  "nickname" | "phoneNumber" | "optInMarketing"
>;
export type UpdateMemberResponse = Member;

export type NicknameCheckRequest = Pick<Member, "nickname">;

export type PhoneNumberCheckRequest = Pick<Member, "phoneNumber">;
