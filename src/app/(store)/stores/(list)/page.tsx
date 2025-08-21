"use client";

import { Suspense } from "@suspensive/react";

import { ChipFilter } from "@/app/_shared/ChipFilter";
import { RegisterFloatingButton } from "@/app/(home)/_shared/RegisterFloatingButton";
import { Bleed } from "@/components/ui/Bleed";
import { FoodCategories } from "@/components/ui/FoodCategory";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { useFoodCategory } from "@/hooks/useFoodCategory";

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
