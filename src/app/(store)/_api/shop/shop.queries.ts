import { queryOptions } from "@tanstack/react-query";

import { getStoreCheers, getStoreDetail, getStoreImages } from "./shop.api";

export const storeQueryKeys = {
  all: ["store"] as const,
  detail: (storeId: string) => [...storeQueryKeys.all, storeId] as const,
  cheers: (storeId: string, size: number) =>
    [...storeQueryKeys.all, storeId, "cheers", size] as const,
  images: (storeId: string) =>
    [...storeQueryKeys.all, storeId, "images"] as const,
};

export const storeDetailQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: storeQueryKeys.detail(storeId),
    queryFn: () => getStoreDetail(storeId),
  });

export const storeCheersQueryOptions = (storeId: string, size: number) =>
  queryOptions({
    queryKey: storeQueryKeys.cheers(storeId, size),
    queryFn: () => getStoreCheers(storeId, size),
  });

export const storeImagesQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: storeQueryKeys.images(storeId),
    queryFn: () => getStoreImages(storeId),
  });
