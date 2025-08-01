export type StoryDetailResponse = {
  storeKakaoId: string;
  category: string;
  storeName: string;
  storeDistrict: string;
  storeNeighborhood: string;
  description: string | null;
  imageUrl: string;
  memberId: number;
  memberNickname: string;
  storeId: number | null;
};
