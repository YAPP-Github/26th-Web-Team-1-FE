"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop";
import ChevronLeftIcon from "@/assets/chevron-left.svg";
import ShareIcon from "@/assets/share-24.svg";
import { GNB } from "@/components/ui/GNB";
import { semantic } from "@/styles";

export const StoreDetailGNB = () => {
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();

  const { data: store } = useQuery(storeDetailQueryOptions(Number(storeId)));

  const handleClickBack = () => {
    router.back();
  };

  const handleClickShare = () => {
    navigator.share({
      title: store?.name,
      text: store?.name,
      url: window.location.href,
    });
  };

  return (
    <GNB
      leftAddon={
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleClickBack}
        >
          <ChevronLeftIcon width={24} height={24} />
        </button>
      }
      rightAddon={
        <button onClick={handleClickShare}>
          <ShareIcon width={24} height={24} color={semantic.icon.black} />
        </button>
      }
    />
  );
};
