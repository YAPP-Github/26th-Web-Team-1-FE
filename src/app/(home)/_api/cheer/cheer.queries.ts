import { queryOptions } from "@tanstack/react-query";

import { getCheers } from "./cheer.api";

export const cheersQueryKeys = {
  all: ["cheers"] as const,
  size: (size: number) => [...cheersQueryKeys.all, size] as const,
};

export const cheerQueryOptions = (size: number) =>
  queryOptions({
    queryKey: cheersQueryKeys.size(size),
    queryFn: () => getCheers(size),
  });
