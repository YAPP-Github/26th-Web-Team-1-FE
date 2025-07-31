"use client";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop/shop.queries";
import LocationIcon from "@/assets/location-20.svg";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { semantic } from "@/styles";

export default function StoreRegisterSuccessPage() {
  const searchParams = useSearchParams();

  const storeId = searchParams.get("storeId");

  return (
    <VStack justify='between' style={{ height: "100%" }}>
      <GNB />

      <VStack style={{ flex: 1 }}>
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

        <div>여기 로띠</div>
      </VStack>

      <Link href={`/stores/${storeId}`}>
        <Button variant='primary' size='fullWidth' type='button'>
          내가 등록한 가게 보러가기
        </Button>
      </Link>
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
