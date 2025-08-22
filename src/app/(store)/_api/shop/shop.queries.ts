import { queryOptions } from "@tanstack/react-query";

import {
  getCheeredMember,
  getStoreCheers,
  getStoreDetail,
  getStoreImages,
  getStoreTags,
} from "./shop.api";

export const storeQueryKeys = {
  all: ["store"] as const,
  detail: (storeId: number) => [...storeQueryKeys.all, storeId] as const,
  cheers: (storeId: number, size: number) =>
    [...storeQueryKeys.all, storeId, "cheers", size] as const,
  images: (storeId: number) =>
    [...storeQueryKeys.all, storeId, "images"] as const,
  tags: (storeId: number) => [...storeQueryKeys.all, storeId, "tags"] as const,
};

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

export const cheeredMemberQueryKeys = {
  all: ["cheeredMember"] as const,
};

export const cheeredMemberQueryOptions = () =>
  queryOptions({
    queryKey: cheeredMemberQueryKeys.all,
    queryFn: () => getCheeredMember(),
  });

export const storeTagsQueryOptions = (storeId: number) =>
  queryOptions({
    queryKey: storeQueryKeys.tags(storeId),
    queryFn: () => getStoreTags(storeId),
  });
