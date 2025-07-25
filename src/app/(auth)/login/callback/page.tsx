"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useLoginMutation } from "@/app/(auth)/_api/auth/auth.queries";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  const { mutate: login } = useLoginMutation();

  useEffect(() => {
    if (code) {
      login(
        { code },
        {
          onSuccess: response => {
            if (response.isSignUp) {
              router.replace("/member/onboarding");
            } else {
              router.replace("/");
            }
          },
          onError: error => {
            console.error("로그인에 실패했습니다:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
            router.replace("/login");
          },
        }
      );
    } else {
      alert("비정상적인 접근입니다.");
      router.replace("/");
    }
  }, [code, login, router, next]);

  return <div>로그인 중입니다...</div>;
}
