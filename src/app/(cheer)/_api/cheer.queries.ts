import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postCheer } from "./cheer.api";
import type { CheerRegisterRequest } from "./cheer.types";

export const cheerQueryKeys = {
  all: ["cheer"] as const,
  lists: () => [...cheerQueryKeys.all, "list"] as const,
} as const;

export const usePostCheerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cheerRequest,
      imageFile,
    }: {
      cheerRequest: CheerRegisterRequest;
      imageFile: File | null;
    }) => {
      return postCheer(cheerRequest, imageFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cheerQueryKeys.lists(),
      });
    },
  });
};
