import { type ImageRequest } from "@/types";

export type StoryRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string | null;
  images: ImageRequest[];
};

export type StoryRegisterResponse = {
  storyId: number;
};
