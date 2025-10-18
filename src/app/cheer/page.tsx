"use client";

import { RegisterFloatingButton } from "@/features/cheer";
import { ChipFilter, useChipFilter } from "@/shared/components/ChipFilter";
import { Bleed } from "@/shared/components/ui/Bleed";
import { FoodCategories } from "@/shared/components/ui/FoodCategory";
import { Spacer } from "@/shared/components/ui/Spacer";
import { useFoodCategory } from "@/shared/hooks/useFoodCategory";

import { CheerCard } from "./_components/CheerCard";
import { MyCheerCard } from "./_components/MyCheerCard";

export default function CheerPage() {
  const { categories, selectedCategory, handleSelectCategory } =
    useFoodCategory("/cheer");

  const { selectedFilters } = useChipFilter();

  return (
    <>
      <MyCheerCard />

      <Spacer size={40} />

      <Bleed inline={20}>
        <FoodCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </Bleed>

      <Spacer size={12} />

      <ChipFilter />

      <Spacer size={16} />

      <Bleed inline={20}>
        <CheerCard
          category={selectedCategory.name}
          location={selectedFilters.locations}
          tag={[
            ...selectedFilters.atmosphereTags,
            ...selectedFilters.utilityTags,
          ]}
        />
      </Bleed>
      <RegisterFloatingButton />
    </>
  );
}
