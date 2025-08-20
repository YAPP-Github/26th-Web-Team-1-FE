import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getCheerList, postCheer } from "./cheer.api";
import { type CheerListParams } from "./cheer.types";

export const cheerQueryKeys = {
  all: ["cheer"] as const,
  lists: () => [...cheerQueryKeys.all, "list"] as const,
  list: (params: CheerListParams) =>
    [...cheerQueryKeys.lists(), params] as const,
} as const;

export const usePostCheerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCheer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cheerQueryKeys.lists(),
      });
    },
  });
};

export const cheerListQueryOptions = (params: CheerListParams) =>
  queryOptions({
    queryKey: cheerQueryKeys.list(params),
    queryFn: () => getCheerList(params),
  });
