import { queryOptions } from "@tanstack/react-query";

import { getArticles } from "./articles.api";

export const articlesQueryKeys = {
  all: ["articles"] as const,
  size: (size: number) => [...articlesQueryKeys.all, size] as const,
};

export const articleQueryOptions = (size: number) =>
  queryOptions({
    queryKey: articlesQueryKeys.size(size),
    queryFn: () => getArticles(size),
  });
