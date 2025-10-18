"use client";

import { useRouter } from "next/navigation";

import { STORE_ERROR_CODES } from "@/app/(store)/_api/shop/shop.api";
import { ApiException } from "@/shared/lib/exceptions";

/**
 * TODO: 에러 처리 강화
 */

export default function StoreDetailError({ error }: { error: Error }) {
  const router = useRouter();

  if (
    error instanceof ApiException &&
    error.errorCode === STORE_ERROR_CODES.NOT_FOUND
  ) {
    return (
      <div>
        없는 가게입니다.
        <button onClick={() => router.back()}>뒤로가기</button>
      </div>
    );
  }

  return (
    <div>
      <p>문제가 발생했어요.</p>
    </div>
  );
}
