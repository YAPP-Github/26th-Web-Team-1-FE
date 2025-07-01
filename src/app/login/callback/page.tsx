"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useLoginMutation } from "@/app/_api/auth/auth.queries";
import { clearClientSessionCache } from "@/lib/session/clientSession";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  const { mutate: login, isError } = useLoginMutation();

  useEffect(() => {
    if (code) {
      login(
        { code },
        {
          onSuccess: () => {
            clearClientSessionCache();

            const redirectUrl = next || "/";

            router.replace(redirectUrl);
          },
          onError: error => {
            console.error("로그인에 실패했습니다:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
            router.back();
          },
        }
      );
    } else {
      alert("비정상적인 접근입니다.");
      router.replace("/");
    }
  }, [code, login, router, next]);

  if (isError) {
    return <div>로그인 처리 중 오류가 발생했습니다.</div>;
  }

  return <div>로그인 중입니다...</div>;
}
