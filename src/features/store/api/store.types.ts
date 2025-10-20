// ============================================
// Store Detail Types (from (store)/_api/shop)
// ============================================

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

// ============================================
// Store Cheers Types (from (store)/_api/shop)
// ============================================

type StoreCheers = {
  id: number;
  memberId: number;
  memberNickname: string;
  description: string;
  tags: string[];
};

export type StoreCheersResponse = { cheers: StoreCheers[] };

// ============================================
// Store Images Types (from (store)/_api/shop)
// ============================================

export type StoreImagesResponse = {
  imageUrls: string[];
};

// ============================================
// Cheered Member Types (from (store)/_api/shop)
// ============================================

export type CheeredStore = {
  id: number;
  name: string;
  district: string;
  neighborhood: string;
  cheerCount: number;
};

export type CheeredMemberResponse = {
  stores: CheeredStore[];
};

// ============================================
// Store Tags Types (from (store)/_api/shop)
// ============================================

export type StoreTagsResponse = {
  tags: string[];
};

// ============================================
// Store List Types (from (home)/_api/shop)
// ============================================

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

// ============================================
// Store Category Types (from (store)/_types)
// ============================================

export type StoreCategory = {
  label: string;
  name: string;
  imageUrl: string;
};

// ============================================
// Store Search Types (from (search)/_api)
// ============================================

export type StoreSearchItem = {
  kakaoId: string;
  name: string;
  address: string;
};

export type StoreSearchResponse = {
  stores: StoreSearchItem[];
};
