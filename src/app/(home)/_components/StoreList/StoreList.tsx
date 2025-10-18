import { Suspense } from "react";

import { StoreList as StoreListComponent } from "@/app/stores/(list)/_components";
import { ChipFilter } from "@/shared/components/ChipFilter";
import { Bleed } from "@/shared/components/ui/Bleed";
import { FoodCategories } from "@/shared/components/ui/FoodCategory";
import { Spacer } from "@/shared/components/ui/Spacer";
import { VStack } from "@/shared/components/ui/Stack";
import { useFoodCategory } from "@/shared/hooks/useFoodCategory";

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
