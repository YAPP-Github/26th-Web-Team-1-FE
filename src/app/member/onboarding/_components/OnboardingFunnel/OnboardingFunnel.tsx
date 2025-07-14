"use client";

import { useFunnel } from "@use-funnel/browser";

import { useMemberQuery } from "@/app/member/_api";

import type {
  AgreeFunnel,
  NicknameFunnel,
  PhoneNumberFunnel,
} from "../../_types";
import { AgreeStep } from "../AgreeStep";
import { NicknameStep } from "../NicknameStep";
import { PhoneNumberStep } from "../PhoneNumberStep";

export const OnboardingFunnel = () => {
  const { data: member } = useMemberQuery();

  const funnel = useFunnel<{
    nicknameStep: NicknameFunnel;
    phoneNumberStep: PhoneNumberFunnel;
    agreeStep: AgreeFunnel;
  }>({
    id: "onboarding-funnel",
    initial: {
      step: "nicknameStep",
      context: {
        nickname: member?.nickname ?? "",
        phoneNumber: member?.phoneNumber ?? "",
      },
    },
  });

  return (
    <funnel.Render
      nicknameStep={({ context, history }) => (
        <NicknameStep
          nickname={context.nickname}
          onNext={nickname => {
            history.push("phoneNumberStep", { nickname });
          }}
        />
      )}
      phoneNumberStep={({ context, history }) => (
        <PhoneNumberStep
          phoneNumber={context.phoneNumber}
          onNext={phoneNumber => {
            history.push("agreeStep", { phoneNumber });
          }}
        />
      )}
      agreeStep={({ context }) => (
        <AgreeStep
          nickname={context.nickname}
          phoneNumber={context.phoneNumber}
        />
      )}
    />
  );
};
