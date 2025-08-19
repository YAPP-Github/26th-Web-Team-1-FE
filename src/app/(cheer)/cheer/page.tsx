"use client";

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

      <div>서울 전체, 분위기, 실용도 chip이 들어갈 자리</div>

      <Spacer size={16} />

      <Bleed inline={20}>
        <CheerCard category={selectedCategory.name} />
      </Bleed>
      <RegisterFloatingButton />
    </>
  );
}
