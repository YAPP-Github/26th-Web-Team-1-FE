import { getStoryDetail } from "./detail.api";

export const storyDetailQueryKeys = {
  all: ["story", "detail"] as const,
  detail: (id: string) => [...storyDetailQueryKeys.all, id] as const,
} as const;

export const storyDetailQueryOptions = (storyId: string) => ({
  queryKey: storyDetailQueryKeys.detail(storyId),
  queryFn: () => getStoryDetail(storyId),
  enabled: !!storyId,
});
