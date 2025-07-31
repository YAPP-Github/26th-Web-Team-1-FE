import { queryOptions } from "@tanstack/react-query";

import { getStories, getStoriesByKakaoId } from "./stories.api";

export const storiesQueryKeys = {
  all: ["story"] as const,

  lists: () => [...storiesQueryKeys.all, "list"] as const,

  kakaoLists: () => [...storiesQueryKeys.all, "kakao"] as const,
  kakaoList: (kakaoId: string, size: number) =>
    [...storiesQueryKeys.kakaoLists(), kakaoId, { size }] as const,
} as const;

export const storiesQueryOptions = (size: number) =>
  queryOptions({
    queryKey: storiesQueryKeys.lists(),
    queryFn: () => getStories(size),
  });

export const storiesByKakaoIdQueryOptions = (
  kakaoId: string,
  size: number = 5
) =>
  queryOptions({
    queryKey: storiesQueryKeys.kakaoList(kakaoId, size),
    queryFn: () => getStoriesByKakaoId(kakaoId, size),
    enabled: !!kakaoId,
  });
