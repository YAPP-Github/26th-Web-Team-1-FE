import { queryOptions } from "@tanstack/react-query";

import { TIME } from "@/shared/constants";

import { getStories, getStoriesByKakaoId, getStoryMember } from "./stories.api";
import type { StoryMemberParams } from "./stories.types";

export const storiesQueryKeys = {
  all: ["story"] as const,

  lists: () => [...storiesQueryKeys.all, "list"] as const,

  kakaoLists: () => [...storiesQueryKeys.all, "kakao"] as const,
  kakaoList: (kakaoId: string, size: number) =>
    [...storiesQueryKeys.kakaoLists(), kakaoId, { size }] as const,

  memberLists: () => [...storiesQueryKeys.all, "member"] as const,
  memberList: (params: StoryMemberParams) =>
    [...storiesQueryKeys.memberLists(), params] as const,
} as const;

export const CACHE_CONSTANTS = {
  STORIES_LIST: {
    STALE_TIME: 5 * TIME.MINUTE,
    GC_TIME: 10 * TIME.MINUTE,
  },
} as const;

export const storiesQueryOptions = (size: number) =>
  queryOptions({
    queryKey: storiesQueryKeys.lists(),
    queryFn: () => getStories(size),
    staleTime: CACHE_CONSTANTS.STORIES_LIST.STALE_TIME,
    gcTime: CACHE_CONSTANTS.STORIES_LIST.GC_TIME,
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

export const storyMemberQueryOptions = (params: StoryMemberParams) =>
  queryOptions({
    queryKey: storiesQueryKeys.memberList(params),
    queryFn: () => getStoryMember(params),
  });
