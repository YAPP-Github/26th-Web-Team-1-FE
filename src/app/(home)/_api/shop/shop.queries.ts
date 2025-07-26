import { queryOptions } from "@tanstack/react-query";

import { getStores } from "./shop.api";

export const storesQueryKeys = {
  all: ["stores"] as const,
  size: (size: number) => [...storesQueryKeys.all, size] as const,
};

export const storesQueryOptions = (size: number) =>
  queryOptions({
    queryKey: storesQueryKeys.size(size),
    queryFn: () => getStores(size),
  });
