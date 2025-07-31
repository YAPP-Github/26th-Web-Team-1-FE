export type CheerRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string;
};

export type CheerRegisterResponse = {
  storeId: number;
  cheerId: number;
  imageUrl: string;
  cheerDescription: string;
};
