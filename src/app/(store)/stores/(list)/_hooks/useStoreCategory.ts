import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { type StoreCategory } from "@/app/(store)/_types/storeCategory.types";
import { STORE_CATEGORIES } from "@/app/(store)/constants/storeCategory.constants";

export const useStoreCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryName = searchParams.get("category");

  const selectedCategory =
    STORE_CATEGORIES.find(category => category.name === categoryName) ??
    STORE_CATEGORIES[0];

  const handleSelectCategory = (category: string) => {
    router.replace(`/stores?category=${category}`);
  };

  useEffect(() => {
    if (!STORE_CATEGORIES.some(category => category.name === categoryName)) {
      router.replace("/stores");
    }
  }, [categoryName, router]);

  return {
    categories: STORE_CATEGORIES,
    selectedCategory: selectedCategory as StoreCategory,
    handleSelectCategory,
  };
};
