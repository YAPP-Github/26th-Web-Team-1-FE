type CheerImage = {
  imageKey: string;
  orderIndex: number;
  contentType: string;
  fileSize: number;
};

export type CheerRegisterRequest = {
  storeKakaoId: string;
  storeName: string;
  description: string;
  tags: string[];
  images?: CheerImage[];
};

export type CheerRegisterResponse = {
  storeId: number;
  cheerId: number;
  cheerDescription: string;
  images: CheerImage[];
};
