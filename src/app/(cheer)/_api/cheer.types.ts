import { type ImageMeta } from "@/types";

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
