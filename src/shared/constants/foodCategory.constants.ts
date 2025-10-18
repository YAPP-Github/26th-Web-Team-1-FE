import { type FoodCategory } from "@/types";

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    label: "전체",
    name: "",
    imageUrl: "/images/categories/all.png",
  },
  {
    label: "한식",
    name: "KOREAN",
    imageUrl: "/images/categories/korean.png",
  },
  {
    label: "중식",
    name: "CHINESE",
    imageUrl: "/images/categories/chinese.png",
  },
  {
    label: "일식",
    name: "JAPANESE",
    imageUrl: "/images/categories/japanese.png",
  },
  {
    label: "양식",
    name: "WESTERN",
    imageUrl: "/images/categories/western.png",
  },
  {
    label: "카페 · 디저트",
    name: "CAFE",
    imageUrl: "/images/categories/cafe.png",
  },
  {
    label: "기타",
    name: "OTHER",
    imageUrl: "/images/categories/etc.png",
  },
];
