import { type ImageResponse } from "@/types";

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
