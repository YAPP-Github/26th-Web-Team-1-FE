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

export type NicknameFormValues = Pick<Member, "nickname">;
export type NicknameCheckRequest = Pick<Member, "nickname">;

export type PhoneNumberFormValues = Pick<Member, "phoneNumber">;
export type PhoneNumberCheckRequest = Pick<Member, "phoneNumber">;
