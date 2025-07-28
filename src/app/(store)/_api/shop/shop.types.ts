type StoreDetail = {
  id: number;
  kakaoId: string;
  name: string;
  district: string;
  neighborhood: string;
  category: string;
  placeUrl: string;
};

export type StoreDetailResponse = StoreDetail;

type StoreCheers = {
  id: number;
  memberId: number;
  memberNickname: string;
  description: string;
};

export type StoreCheersResponse = { cheers: StoreCheers[] };

export type StoreImagesResponse = {
  imageUrls: string[];
};
