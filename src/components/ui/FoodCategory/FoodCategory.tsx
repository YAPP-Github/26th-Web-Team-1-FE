"use client";

import Image from "next/image";

import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { type FoodCategory } from "@/types";

import * as styles from "./FoodCategory.css";

type FoodCategoryProps = {
  categories: readonly FoodCategory[];
  selectedCategory: FoodCategory;
  onSelectCategory: (category: FoodCategory) => void;
};

export const FoodCategories = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: FoodCategoryProps) => {
  const isSelected = (category: FoodCategory) =>
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
              width={category.name === "ALL" ? 26 : 24}
              height={category.name === "ALL" ? 26 : 24}
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
