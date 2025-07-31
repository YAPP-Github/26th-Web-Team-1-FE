import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { memberQueryOptions } from "@/app/member/_api/member.queries";
import { VStack } from "@/components/ui/Stack";
import getQueryClient from "@/lib/tanstack/getQueryClient";

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
