import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCheer } from "./cheer.api";

export const cheerQueryKeys = {
  all: ["cheer"] as const,
  lists: () => [...cheerQueryKeys.all, "list"] as const,
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
