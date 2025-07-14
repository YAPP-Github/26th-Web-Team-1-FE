import { type AgreementConstants } from "../_types";

export const AGREEMENTS: AgreementConstants[] = [
  {
    id: "termsOfService",
    label: "[필수] 개인정보 수집 및 이용",
    required: true,
  },
  {
    id: "privacyPolicy",
    label: "[필수] 서비스 이용약관",
    required: true,
  },
  {
    id: "marketing",
    label: "[선택] 마케팅 정보 수신 동의",
    required: false,
  },
];
