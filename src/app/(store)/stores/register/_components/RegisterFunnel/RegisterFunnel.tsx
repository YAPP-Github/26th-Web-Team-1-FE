"use client";

import { useQuery } from "@tanstack/react-query";
import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop";
import { Bleed } from "@/components/ui/Bleed";

import { ProgressBar } from "../ProgressBar";
import { StoreRegisterGNB } from "../StoreRegisterGNB";
import { ImagesStep, StoreInfoStep, SupportTextStep } from "./_components";

type StoreInfo = {
  storeName: string;
  storeKakaoId: string;
};

type FunnelContext = {
  storeInfo?: StoreInfo;
  supportText?: string;
};

const STEP_MAP = {
  storeStep: 1,
  supportTextStep: 2,
  imagesStep: 3,
} as const;

export const RegisterFunnel = ({ storeId }: { storeId?: number }) => {
  const router = useRouter();

  const { data: store } = useQuery({
    ...storeDetailQueryOptions(storeId!),
    enabled: !!storeId,
  });

  const funnel = useFunnel<{
    storeStep: FunnelContext;
    supportTextStep: FunnelContext & { storeInfo: StoreInfo };
    imagesStep: FunnelContext & { storeInfo: StoreInfo; supportText: string };
  }>({
    id: "register-funnel",
    initial: {
      step: "storeStep",
      context: {
        storeInfo: store
          ? {
              storeName: store.name,
              storeKakaoId: store.kakaoId,
            }
          : undefined,
        supportText: undefined,
      },
    },
  });

  const FUNNEL_BACK_MAP = {
    supportTextStep: "storeStep",
    imagesStep: "supportTextStep",
  } as const;

  return (
    <>
      <Bleed inline={20}>
        <StoreRegisterGNB
          onBack={
            funnel.step === "storeStep"
              ? undefined
              : () => {
                  funnel.history.replace(FUNNEL_BACK_MAP[funnel.step]);
                }
          }
          onCancel={router.back}
        />
      </Bleed>

      <ProgressBar
        currentStep={STEP_MAP[funnel.step]}
        totalSteps={Object.keys(STEP_MAP).length}
      />

      <funnel.Render
        storeStep={({ history, context }) => (
          <StoreInfoStep
            storeName={context.storeInfo?.storeName}
            storeKakaoId={context.storeInfo?.storeKakaoId}
            onNext={storeInfo => {
              history.replace("supportTextStep", {
                storeInfo,
              });
            }}
          />
        )}
        supportTextStep={({ context, history }) => (
          <SupportTextStep
            storeName={context.storeInfo.storeName}
            onNext={supportText => {
              history.replace("imagesStep", {
                supportText,
              });
            }}
          />
        )}
        imagesStep={({ context }) => (
          <ImagesStep
            storeName={context.storeInfo.storeName}
            storeKakaoId={context.storeInfo.storeKakaoId}
            supportText={context.supportText}
            onNext={storeId => {
              router.replace(`/stores/register/success?storeId=${storeId}`);
            }}
          />
        )}
      />
    </>
  );
};
