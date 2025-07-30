import { useMutation, useQueryClient } from "@tanstack/react-query";

import { storiesQueryKeys } from "../../_api";
import { postStory } from "./register.api";
import type { StoryRegisterRequest } from "./register.types";

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
        queryKey: storiesQueryKeys.lists(),
      });
    },
  });
};
