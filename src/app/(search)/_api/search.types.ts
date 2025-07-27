export type Store = {
  kakaoId: string;
  name: string;
  address: string;
};

export type StoreSearchResponse = {
  stores: Store[];
};
