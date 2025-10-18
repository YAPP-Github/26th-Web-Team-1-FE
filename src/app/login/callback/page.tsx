"use client";

import Lottie from "lottie-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import loginSpinner from "@/assets/login-spinner.json";
import { useLoginMutation } from "@/features/auth/api";
import { VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";

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

  return (
    <VStack
      gap={12}
      align='center'
      justify='center'
      style={{ minHeight: "100dvh" }}
    >
      <Lottie animationData={loginSpinner} style={{ width: 76, height: 76 }} />

      <VStack gap={4} align='center'>
        <Text
          as='h1'
          typo='title2Md'
          color='text.normal'
          style={{ fontWeight: 700, textAlign: "center" }}
        >
          로그인 중입니다..
        </Text>
        <Text
          as='p'
          typo='body2Md'
          color='text.alternative'
          style={{ textAlign: "center" }}
        >
          잠시만 기다려 주세요
        </Text>
      </VStack>
    </VStack>
  );
}
