import { queryOptions } from "@tanstack/react-query";

import { getStoreSearch } from "./search.api";

export const storeSearchQueryKeys = {
  all: ["storeSearch"] as const,
  list: (query: string) =>
    [...storeSearchQueryKeys.all, "list", query] as const,
};

export const storeSearchQueryOptions = (query: string) =>
  queryOptions({
    queryKey: storeSearchQueryKeys.list(query),
    queryFn: () => getStoreSearch(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
