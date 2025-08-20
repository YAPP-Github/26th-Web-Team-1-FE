import { useMutation, useQueryClient } from "@tanstack/react-query";

import { storiesQueryKeys } from "../../_api";
import { postStory } from "./register.api";

export const usePostStoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postStory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storiesQueryKeys.lists(),
      });
    },
  });
};
