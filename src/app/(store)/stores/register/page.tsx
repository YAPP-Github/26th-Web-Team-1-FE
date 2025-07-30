import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { memberQueryOptions } from "@/app/member/_api/member.queries";
import { VStack } from "@/components/ui/Stack";
import getQueryClient from "@/lib/tanstack/getQueryClient";

import { RegisterFunnel } from "./_components";

export default function StoreRegisterPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(memberQueryOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VStack style={{ height: "100%" }}>
        <RegisterFunnel />
      </VStack>
    </HydrationBoundary>
  );
}
