"use client";

import { Suspense } from "@suspensive/react";

import { ChipFilter } from "@/app/_shared/ChipFilter";
import { RegisterFloatingButton } from "@/features/cheer";
import { Bleed } from "@/shared/components/ui/Bleed";
import { FoodCategories } from "@/shared/components/ui/FoodCategory";
import { Spacer } from "@/shared/components/ui/Spacer";
import { VStack } from "@/shared/components/ui/Stack";
import { useFoodCategory } from "@/shared/hooks/useFoodCategory";

import { StoreList, StoreListGNB } from "./_components";

export default function StoreListPage() {
  const { categories, selectedCategory, handleSelectCategory } =
    useFoodCategory("/stores");

  return (
    <VStack>
      <Bleed inline={20}>
        <StoreListGNB />
      </Bleed>
      <Bleed inline={20}>
        <FoodCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </Bleed>

      <Spacer size={12} />

      <ChipFilter />

      <Suspense>
        <StoreList category={selectedCategory.name} />
      </Suspense>
      <RegisterFloatingButton />
    </VStack>
  );
}
