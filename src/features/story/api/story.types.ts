import { type ImageRequest, type ImageResponse } from "@/types";

// ============================================
// Story List Types (공통 조회)
// ============================================

export type Story = {
  storyId: number;
  images: ImageResponse[];
};

export type StoriesResponse = {
  stories: Story[];
};

export type StoryByKakaoId = {
  storyId: number;
  images: ImageResponse[];
  memberId: number;
  memberNickname: string;
};

export type StoriesByKakaoIdResponse = {
  stories: StoryByKakaoId[];
};

export type StoryMemberParams = {
  page?: number;
  size?: number;
};

export type StoryMember = {
  id: number;
  images: ImageResponse[];
  storeName: string;
};

export type StoryMemberResponse = {
  stories: StoryMember[];
};

// ============================================
// Story Detail Types (상세 조회)
// ============================================

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

// ============================================
// Story Register Types (등록)
// ============================================

export type StoryRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string | null;
  images: ImageRequest[];
};

export type StoryRegisterResponse = {
  storyId: number;
};
