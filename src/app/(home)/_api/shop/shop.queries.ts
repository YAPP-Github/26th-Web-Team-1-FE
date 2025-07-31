import { queryOptions } from "@tanstack/react-query";

import { getStores } from "./shop.api";

export const storesQueryKeys = {
  all: ["stores"] as const,
  size: (size: number, category?: string) =>
    [...storesQueryKeys.all, size, category] as const,
};

export const storesQueryOptions = ({
  size,
  category,
}: {
  size: number;
  category?: string;
}) =>
  queryOptions({
    queryKey: storesQueryKeys.size(size, category),
    queryFn: () => getStores({ size, category }),
  });
