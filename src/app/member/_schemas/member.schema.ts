import { z } from "zod";

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, "2~8자 이내로 써주세요")
    .max(8, "2~8자 이내로 써주세요")
    .regex(/^[A-Za-z가-힣]{2,8}$/, "특수문자는 사용할 수 없어요"),
});

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(010|011|016|017|018|019)[-]?\d{3,4}[-]?\d{4}$/,
      "유효하지 않은 휴대폰 번호 형식입니다."
    ),
});
