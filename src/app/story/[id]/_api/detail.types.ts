import type { ImageResponse } from "@/types";

export type StoryDetailResponse = {
  storeKakaoId: string;
  category: string;
  storeName: string;
  storeDistrict: string;
  storeNeighborhood: string;
  description: string | null;
  images: ImageResponse[];
  memberId: number;
  memberNickname: string;
  storeId: number | null;
};
