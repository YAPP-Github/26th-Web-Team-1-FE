import { queryOptions } from "@tanstack/react-query";

import { getStories } from "./stories.api";

export const storiesQueryKeys = {
  all: ["story"] as const,
  lists: () => [...storiesQueryKeys.all, "list"] as const,
} as const;

export const storiesQueryOptions = queryOptions({
  queryKey: storiesQueryKeys.lists(),
  queryFn: getStories,
});
