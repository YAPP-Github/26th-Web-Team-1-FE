export type Store = {
  id: number;
  imageUrl: string;
  name: string;
  district: string;
  neighborhood: string;
  category: string;
};

export type StoresResponse = {
  stores: Store[];
};
