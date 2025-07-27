import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postStory } from "./register.api";
import type { StoryRegisterRequest } from "./register.types";

export const storyQueryKeys = {
  all: ["story"] as const,
  lists: () => [...storyQueryKeys.all, "list"] as const,
} as const;

export const usePostStoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storyRequest,
      imageFile,
    }: {
      storyRequest: StoryRegisterRequest;
      imageFile: File;
    }) => {
      return postStory(storyRequest, imageFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storyQueryKeys.lists(),
      });
    },
  });
};
