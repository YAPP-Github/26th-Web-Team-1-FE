export type StoryRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description?: string;
};

export type StoryRegisterResponse = {
  storyId: number;
};
