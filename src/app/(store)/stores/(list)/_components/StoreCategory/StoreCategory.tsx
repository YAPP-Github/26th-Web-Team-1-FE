"use client";

import Image from "next/image";

import { type StoreCategory } from "@/app/(store)/_types/storeCategory.types";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import * as styles from "./StoreCategory.css";

type StoreCategoryProps = {
  categories: readonly StoreCategory[];
  selectedCategory: StoreCategory;
  onSelectCategory: (category: StoreCategory) => void;
};

export const StoreCategories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: StoreCategoryProps) => {
  const isSelected = (category: StoreCategory) =>
    selectedCategory.name === category.name;

  return (
    <HStack gap={16} className={styles.container}>
      {categories.map(category => (
        <VStack
          key={category.name}
          onClick={() => onSelectCategory(category)}
          align='center'
          gap={8}
          className={styles.category}
        >
          <div
            className={styles.categoryImage}
            data-selected={isSelected(category)}
          >
            <Image
              src={category.imageUrl}
              alt={category.label}
              width={category.label === "전체" ? 26 : 24}
              height={category.label === "전체" ? 26 : 24}
            />
          </div>
          <Text
            as='span'
            typo='caption1Sb'
            className={styles.categoryName}
            color={isSelected(category) ? "text.primary" : "text.neutral"}
          >
            {category.label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};
