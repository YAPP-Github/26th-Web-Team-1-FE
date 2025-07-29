"use client";

import { useParams } from "next/navigation";
import { Separated } from "react-simplikit";

import { Bleed } from "@/components/ui/Bleed";
import { VStack } from "@/components/ui/Stack";
import { semantic } from "@/styles";

import { StoreCheers, StoreInfo, StoreStories } from "./_components";

export default function StoreDetailPage() {
  const { storeId } = useParams<{ storeId: string }>();

  return (
    <VStack>
      <Separated
        by={
          <Bleed inline={20}>
            <hr
              style={{
                backgroundColor: semantic.background.grayLight,
                height: "1rem",
              }}
            />
          </Bleed>
        }
      >
        <StoreInfo storeId={storeId} />
        <StoreCheers storeId={storeId} />
        <StoreStories storeId={storeId} />
      </Separated>
    </VStack>
  );
}
