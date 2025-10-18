import { Suspense } from "@suspensive/react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { storyDetailQueryOptions } from "@/features/story";
import getQueryClient from "@/shared/lib/tanstack/getQueryClient";

import { StoryDetailContent } from "./_components/StoryDetailContent";

type StoryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoryDetailPage({
  params,
}: StoryDetailPageProps) {
  const { id: storyId } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(storyDetailQueryOptions(storyId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <StoryDetailContent storyId={storyId} />
      </Suspense>
    </HydrationBoundary>
  );
}
