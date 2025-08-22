"use client";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop/shop.queries";
import CancelIcon from "@/assets/cancel.svg";
import LocationIcon from "@/assets/location-20.svg";
import { Bleed } from "@/components/ui/Bleed";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { semantic } from "@/styles";

export default function StoreRegisterSuccessPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  return (
    <VStack justify='between' style={{ height: "100%" }}>
      <Bleed inline={20}>
        <GNB
          rightAddon={
            <button onClick={() => router.back()} aria-label='닫기'>
              <CancelIcon width={24} height={24} color={semantic.icon.black} />
            </button>
          }
        />
      </Bleed>

      <VStack style={{ flex: 1 }} align='center'>
        <Spacer size={36} />

        <VStack gap={12} align='center'>
          <Text
            as='h2'
            typo='title1Bd'
            color='text.normal'
            style={{ textAlign: "center" }}
          >
            당신의 추억이
            <br />
            잇다에 기록되었어요!
          </Text>
          {/* TODO: 추후 에러 처리 */}
          <ErrorBoundary fallback={null}>
            <Suspense
              clientOnly
              fallback={<Skeleton width={130} height={25} radius={8} />}
            >
              <StoreInfo storeId={Number(storeId)} />
            </Suspense>
          </ErrorBoundary>
        </VStack>

        <Spacer size={16} />

        <Image
          src='/images/store-register-success.png'
          alt='가게 등록 성공'
          width={280}
          height={280}
        />
      </VStack>

      <HStack gap={8} style={{ width: "100%" }}>
        <Link href='/' style={{ flex: 1 }}>
          <Button variant='assistive' size='fullWidth' type='button'>
            홈으로 가기
          </Button>
        </Link>
        <Link href={`/stores/${storeId}`} style={{ flex: 1 }}>
          <Button variant='primary' size='fullWidth' type='button'>
            내 응원 보기
          </Button>
        </Link>
      </HStack>
    </VStack>
  );
}

const StoreInfo = ({ storeId }: { storeId: number }) => {
  const { data: storeDetail } = useSuspenseQuery(
    storeDetailQueryOptions(storeId)
  );

  return (
    <HStack align='center' justify='center' gap={8}>
      <LocationIcon width={20} height={20} color={semantic.icon.primary} />
      <Text as='p' typo='title3Sb' color='text.primary'>
        {storeDetail.name}
      </Text>
    </HStack>
  );
};
