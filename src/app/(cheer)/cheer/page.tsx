"use client";

import { ChipFilter, useChipFilter } from "@/app/_shared/ChipFilter";
import { Bleed } from "@/components/ui/Bleed";
import { FoodCategories } from "@/components/ui/FoodCategory";
import { Spacer } from "@/components/ui/Spacer";
import { useFoodCategory } from "@/hooks/useFoodCategory";

import { RegisterFloatingButton } from "../../(home)/_shared/RegisterFloatingButton";
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
