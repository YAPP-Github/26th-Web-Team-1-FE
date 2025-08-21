import { queryOptions } from "@tanstack/react-query";

import { getStores } from "./shop.api";

export const storesQueryKeys = {
  all: ["stores"] as const,
  size: (
    size: number,
    category?: string,
    tag?: string[],
    location?: string[]
  ) => [...storesQueryKeys.all, size, category, tag, location] as const,
};

export const storesQueryOptions = ({
  size,
  category,
  tag,
  location,
}: {
  size: number;
  category?: string;
  tag?: string[];
  location?: string[];
}) =>
  queryOptions({
    queryKey: storesQueryKeys.size(size, category, tag, location),
    queryFn: () => getStores({ size, category, tag, location }),
  });
