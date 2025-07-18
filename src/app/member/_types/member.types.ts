import { type Member } from "../_api";

export type NicknameFormValues = Pick<Member, "nickname">;

export type PhoneNumberFormValues = Pick<Member, "phoneNumber">;
