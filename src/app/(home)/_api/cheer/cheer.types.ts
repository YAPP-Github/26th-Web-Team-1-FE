export type Cheer = {
  storeId: number;
  imageUrl: string;
  storeName: string;
  storeDistrict: string;
  storeNeighborhood: string;
  storeCategory: string;
  cheerId: number;
  cheerDescription: string;
};

export type CheersResponse = {
  cheers: Cheer[];
};
