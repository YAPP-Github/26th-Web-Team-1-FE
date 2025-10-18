import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TIME } from "@/shared/constants";

import {
  getStories,
  getStoriesByKakaoId,
  getStoryDetail,
  getStoryMember,
  postStory,
} from "./story.api";
import type { StoryMemberParams } from "./story.types";

// ============================================
// Query Keys Factory (통합)
// ============================================

export const storyQueryKeys = {
  all: ["story"] as const,

  // Story Lists
  lists: () => [...storyQueryKeys.all, "list"] as const,

  // Story Detail
  details: () => [...storyQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...storyQueryKeys.details(), id] as const,

  // Stories by Kakao ID
  kakaoLists: () => [...storyQueryKeys.all, "kakao"] as const,
  kakaoList: (kakaoId: string, size: number) =>
    [...storyQueryKeys.kakaoLists(), kakaoId, { size }] as const,

  // Member Stories
  memberLists: () => [...storyQueryKeys.all, "member"] as const,
  memberList: (params: StoryMemberParams) =>
    [...storyQueryKeys.memberLists(), params] as const,
} as const;

// ============================================
// Cache Constants
// ============================================

export const CACHE_CONSTANTS = {
  STORIES_LIST: {
    STALE_TIME: 5 * TIME.MINUTE,
    GC_TIME: 10 * TIME.MINUTE,
  },
} as const;

// ============================================
// Query Options (공통 조회)
// ============================================

export const storiesQueryOptions = (size: number) =>
  queryOptions({
    queryKey: storyQueryKeys.lists(),
    queryFn: () => getStories(size),
    staleTime: CACHE_CONSTANTS.STORIES_LIST.STALE_TIME,
    gcTime: CACHE_CONSTANTS.STORIES_LIST.GC_TIME,
  });

export const storiesByKakaoIdQueryOptions = (
  kakaoId: string,
  size: number = 5
) =>
  queryOptions({
    queryKey: storyQueryKeys.kakaoList(kakaoId, size),
    queryFn: () => getStoriesByKakaoId(kakaoId, size),
    enabled: !!kakaoId,
  });

export const storyMemberQueryOptions = (params: StoryMemberParams) =>
  queryOptions({
    queryKey: storyQueryKeys.memberList(params),
    queryFn: () => getStoryMember(params),
  });

// ============================================
// Query Options (상세 조회)
// ============================================

export const storyDetailQueryOptions = (storyId: string) => ({
  queryKey: storyQueryKeys.detail(storyId),
  queryFn: () => getStoryDetail(storyId),
  enabled: !!storyId,
});

// ============================================
// Mutations (등록)
// ============================================

export const usePostStoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueryKeys.lists(),
      });
    },
  });
};
