import { type StoreCategory } from "../_types/storeCategory.types";

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    label: "전체",
    name: "",
    imageUrl: "/images/categories/all.png",
  },
  {
    label: "한식",
    name: "한식",
    imageUrl: "/images/categories/korean.png",
  },
  {
    label: "중식",
    name: "중식",
    imageUrl: "/images/categories/chinese.png",
  },
  {
    label: "일식",
    name: "일식",
    imageUrl: "/images/categories/japanese.png",
  },
  {
    label: "양식",
    name: "양식",
    imageUrl: "/images/categories/western.png",
  },
  {
    label: "카페 · 디저트",
    name: "카페/디저트",
    imageUrl: "/images/categories/cafe.png",
  },
  {
    label: "기타",
    name: "기타",
    imageUrl: "/images/categories/etc.png",
  },
];
