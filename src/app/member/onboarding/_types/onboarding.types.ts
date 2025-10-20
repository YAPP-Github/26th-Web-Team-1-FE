import { type Member } from "@/features/member/api";

export type NicknameFunnel = {
  nickname?: string;
  phoneNumber?: string;
  agree?: boolean;
};

export type PhoneNumberFunnel = {
  nickname: string;
  phoneNumber?: string;
  agree?: boolean;
};

export type AgreeFunnel = {
  nickname: string;
  phoneNumber: string;
  agree?: boolean;
};

export type AgreementConstants = {
  id: string;
  label: string;
  required: boolean;
};

// Form values for onboarding steps
export type NicknameFormValues = Pick<Member, "nickname">;

export type PhoneNumberFormValues = Pick<Member, "phoneNumber">;
