"use client";

import { Suspense } from "@suspensive/react";

import { Bleed } from "@/components/ui/Bleed";
import { VStack } from "@/components/ui/Stack";

import { StoreCategories, StoreList, StoreListGNB } from "./_components";
import { useStoreCategory } from "./_hooks";

export default function StoreListPage() {
  const { categories, selectedCategory, handleSelectCategory } =
    useStoreCategory();

  return (
    <VStack>
      <Bleed inline={20}>
        <StoreListGNB />
      </Bleed>
      <Bleed inline={20}>
        <StoreCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={({ name }) => handleSelectCategory(name)}
        />
      </Bleed>
      <Suspense fallback={<div>Loading...</div>}>
        <StoreList category={selectedCategory.name} />
      </Suspense>
    </VStack>
  );
}
