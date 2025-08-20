import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { FOOD_CATEGORIES } from "@/constants";
import { type FoodCategory } from "@/types";

/**
 * 음식 카테고리 훅
 *
 * @description
 * 음식 카테고리 선택 상태를 관리하고, URL 파라미터와 동기화하는 훅입니다.
 *
 * @param basePath - 카테고리 변경 시 이동할 기본 경로 (예: "/cheer", "/stores")
 *
 * @returns {Object} 훅에서 제공하는 값들과 함수들
 * @returns {FoodCategory[]} categories - 사용 가능한 모든 음식 카테고리 목록
 * @returns {FoodCategory} selectedCategory - 현재 선택된 카테고리 (URL 파라미터 기반)
 * @returns {Function} handleSelectCategory - 카테고리 선택 처리 함수
 *
 * @example
 * ```tsx
 * // Cheer 페이지에서 사용
 * function CheerPage() {
 *   const { categories, selectedCategory, handleSelectCategory } =
 *     useFoodCategory("/cheer");
 *
 *   return (
 *     <FoodCategories
 *       categories={categories}
 *       selectedCategory={selectedCategory}
 *       onSelectCategory={handleSelectCategory}
 *     />
 *   );
 * }
 *
 * ```
 */
export const useFoodCategory = (basePath: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryName = searchParams.get("category");

  const selectedCategory =
    FOOD_CATEGORIES.find(category => category.name === categoryName) ??
    FOOD_CATEGORIES[0];

  const handleSelectCategory = (category: FoodCategory) => {
    if (category.name === "") {
      router.replace(basePath);
    } else {
      router.replace(`${basePath}?category=${category.name}`);
    }
  };

  useEffect(() => {
    if (!FOOD_CATEGORIES.some(category => category.name === categoryName)) {
      router.replace(basePath);
    }
  }, [categoryName, router, basePath]);

  return {
    categories: FOOD_CATEGORIES,
    selectedCategory: selectedCategory as FoodCategory,
    handleSelectCategory,
  };
};
