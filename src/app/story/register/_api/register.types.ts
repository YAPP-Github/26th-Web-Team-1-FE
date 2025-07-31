export type StoryRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string | null;
};

export type StoryRegisterResponse = {
  storyId: number;
};
