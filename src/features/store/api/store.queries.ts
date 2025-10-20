import { queryOptions } from "@tanstack/react-query";

import {
  getCheeredMember,
  getStoreCheers,
  getStoreDetail,
  getStoreImages,
  getStores,
  getStoreSearch,
  getStoreTags,
} from "./store.api";

// ============================================
// Query Keys Factory (Unified)
// ============================================

export const storeQueryKeys = {
  all: ["store"] as const,

  // Store Detail
  detail: (storeId: number) => [...storeQueryKeys.all, storeId] as const,

  // Store Cheers
  cheers: (storeId: number, size: number) =>
    [...storeQueryKeys.all, storeId, "cheers", size] as const,

  // Store Images
  images: (storeId: number) =>
    [...storeQueryKeys.all, storeId, "images"] as const,

  // Store Tags
  tags: (storeId: number) => [...storeQueryKeys.all, storeId, "tags"] as const,

  // Store Lists
  lists: () => [...storeQueryKeys.all, "list"] as const,
  list: (
    size: number,
    category?: string,
    tag?: string[],
    location?: string[]
  ) => [...storeQueryKeys.lists(), size, category, tag, location] as const,

  // Store Search
  searches: () => [...storeQueryKeys.all, "search"] as const,
  search: (query: string) => [...storeQueryKeys.searches(), query] as const,
} as const;

export const cheeredMemberQueryKeys = {
  all: ["cheeredMember"] as const,
} as const;

// ============================================
// Query Options (Detail & Related)
// ============================================

export const storeDetailQueryOptions = (storeId: number) =>
  queryOptions({
    queryKey: storeQueryKeys.detail(storeId),
    queryFn: () => getStoreDetail(storeId),
  });

export const storeCheersQueryOptions = (storeId: number, size: number) =>
  queryOptions({
    queryKey: storeQueryKeys.cheers(storeId, size),
    queryFn: () => getStoreCheers(storeId, size),
  });

export const storeImagesQueryOptions = (storeId: number) =>
  queryOptions({
    queryKey: storeQueryKeys.images(storeId),
    queryFn: () => getStoreImages(storeId),
  });

export const storeTagsQueryOptions = (storeId: number) =>
  queryOptions({
    queryKey: storeQueryKeys.tags(storeId),
    queryFn: () => getStoreTags(storeId),
  });

export const cheeredMemberQueryOptions = () =>
  queryOptions({
    queryKey: cheeredMemberQueryKeys.all,
    queryFn: () => getCheeredMember(),
  });

// ============================================
// Query Options (List)
// ============================================

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
    queryKey: storeQueryKeys.list(size, category, tag, location),
    queryFn: () => getStores({ size, category, tag, location }),
  });

// ============================================
// Query Options (Search)
// ============================================

export const storeSearchQueryOptions = (query: string) =>
  queryOptions({
    queryKey: storeQueryKeys.search(query),
    queryFn: () => getStoreSearch(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
