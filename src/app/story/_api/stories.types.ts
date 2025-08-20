import { type ImageResponse } from "@/types";

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
