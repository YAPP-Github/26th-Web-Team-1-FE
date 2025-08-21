import { Suspense } from "react";

import { ChipFilter } from "@/app/_shared/ChipFilter";
import { StoreList as StoreListComponent } from "@/app/(store)/stores/(list)/_components";
import { Bleed } from "@/components/ui/Bleed";
import { FoodCategories } from "@/components/ui/FoodCategory";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { useFoodCategory } from "@/hooks/useFoodCategory";

export const StoreList = () => {
  const { categories, handleSelectCategory, selectedCategory } =
    useFoodCategory("/");

  return (
    <VStack>
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
        <StoreListComponent category={selectedCategory.name} />
      </Suspense>
    </VStack>
  );
};
