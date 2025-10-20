import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { memberQueryOptions } from "@/features/member/api/member.queries";
import { VStack } from "@/shared/components/ui/Stack";
import getQueryClient from "@/shared/lib/tanstack/getQueryClient";

import { RegisterFunnel } from "./_components";

export default async function StoreRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const storeId = (await searchParams).storeId as string;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(memberQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VStack style={{ height: "100%" }}>
        <RegisterFunnel storeId={Number(storeId)} />
      </VStack>
    </HydrationBoundary>
  );
}
