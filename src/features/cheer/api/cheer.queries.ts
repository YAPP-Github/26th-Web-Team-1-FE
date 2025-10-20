import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getCheerList, getCheers, postCheer } from "./cheer.api";
import { type CheerListParams } from "./cheer.types";

// ============================================
// Query Keys Factory (Unified)
// ============================================

export const cheerQueryKeys = {
  all: ["cheer"] as const,

  // Cheer Lists (with filters)
  lists: () => [...cheerQueryKeys.all, "list"] as const,
  list: (params: CheerListParams) =>
    [...cheerQueryKeys.lists(), params] as const,

  // Cheers (simple)
  cheers: () => [...cheerQueryKeys.all, "cheers"] as const,
  cheersBySize: (size: number) => [...cheerQueryKeys.cheers(), size] as const,
} as const;

// ============================================
// Mutations (Register)
// ============================================

export const usePostCheerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCheer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cheerQueryKeys.lists(),
      });
    },
  });
};

// ============================================
// Query Options (List with filters)
// ============================================

export const cheerListQueryOptions = (params: CheerListParams) =>
  queryOptions({
    queryKey: cheerQueryKeys.list(params),
    queryFn: () => getCheerList(params),
  });

// ============================================
// Query Options (Simple cheers)
// ============================================

export const cheerQueryOptions = (size: number) =>
  queryOptions({
    queryKey: cheerQueryKeys.cheersBySize(size),
    queryFn: () => getCheers(size),
  });
