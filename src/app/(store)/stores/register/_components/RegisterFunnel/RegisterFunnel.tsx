"use client";

import { useQuery } from "@tanstack/react-query";
import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop";
import { Bleed } from "@/shared/components/ui/Bleed";

import { ProgressBar } from "../ProgressBar";
import { StoreRegisterGNB } from "../StoreRegisterGNB";
import {
  ImagesStep,
  StoreInfoStep,
  SupportTextStep,
  TagStep,
} from "./_components";

type StoreInfo = {
  storeName: string;
  storeKakaoId: string;
};

type FunnelContext = {
  storeInfo?: StoreInfo;
  supportText?: string;
  tags?: string[];
};

const FUNNEL_STEPS = [
  "storeStep",
  "supportTextStep",
  "tagStep",
  "imagesStep",
] as const;

const FUNNEL_BACK_MAP = {
  supportTextStep: "storeStep",
  tagStep: "supportTextStep",
  imagesStep: "tagStep",
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
    tagStep: FunnelContext & {
      storeInfo: StoreInfo;
      supportText: string;
    };
    imagesStep: FunnelContext & {
      storeInfo: StoreInfo;
      supportText: string;
      tags: string[];
    };
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
        currentStep={FUNNEL_STEPS.indexOf(funnel.step)}
        totalSteps={FUNNEL_STEPS.length}
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
              history.replace("tagStep", {
                supportText,
              });
            }}
          />
        )}
        tagStep={({ context, history }) => (
          <TagStep
            tags={context.tags}
            onNext={tags => {
              history.replace("imagesStep", { tags });
            }}
          />
        )}
        // TODO: upload는 images step에서 처리하지 않고 바깥으로 위임하게끔 수정 필요
        imagesStep={({ context }) => (
          <ImagesStep
            storeName={context.storeInfo.storeName}
            storeKakaoId={context.storeInfo.storeKakaoId}
            supportText={context.supportText}
            tags={context.tags}
            onNext={storeId => {
              router.replace(`/stores/register/success?storeId=${storeId}`);
            }}
          />
        )}
      />
    </>
  );
};
