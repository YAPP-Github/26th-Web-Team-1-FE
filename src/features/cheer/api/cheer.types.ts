import { type ImageMeta, type ImageResponse } from "@/types";

// ============================================
// Cheer Register Types (from (cheer)/_api)
// ============================================

type CheerImage = {
  imageKey: string;
  orderIndex: number;
  contentType: string;
  fileSize: number;
};

export type CheerRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string;
  tags: string[];
  images?: CheerImage[];
};

export type CheerRegisterResponse = {
  storeId: number;
  cheerId: number;
  cheerDescription: string;
  images: CheerImage[];
};

// ============================================
// Cheer List Types (from (cheer)/_api)
// ============================================

export type CheerListParams = {
  size?: number;
  category?: string;
  tag?: string[];
  location?: string[];
};

export type CheerResponse = {
  storeId: number;
  storeName: string;
  storeDistrict: string;
  storeNeighborhood: string;
  storeCategory: string;
  images: ImageMeta[];

  cheerId: number;
  cheerDescription: string;
  tags: string[];

  memberId: number;
  memberNickname: string;
};

export type CheerListResponse = {
  cheers: CheerResponse[];
};

// ============================================
// Cheers Types (from (home)/_api/cheer)
// ============================================

export type Cheer = {
  storeId: number;
  images: ImageResponse[];
  storeName: string;
  storeDistrict: string;
  storeNeighborhood: string;
  storeCategory: string;
  cheerId: number;
  cheerDescription: string;
  tags: string[];
};

export type CheersResponse = {
  cheers: Cheer[];
};
