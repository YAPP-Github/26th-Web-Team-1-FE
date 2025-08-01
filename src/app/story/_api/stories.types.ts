export type Story = {
  storyId: number;
  imageUrl: string;
};

export type StoriesResponse = {
  stories: Story[];
};

export type StoryByKakaoId = {
  storyId: number;
  imageUrl: string;
  memberId: number;
  memberNickname: string;
};

export type StoriesByKakaoIdResponse = {
  stories: StoryByKakaoId[];
};
