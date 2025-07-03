"use client";

import { redirectToKakaoOAuthLoginPage } from "@/app/(auth)/_api/auth/auth.api";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <Button onClick={redirectToKakaoOAuthLoginPage}>로그인좀 해볼까요~</Button>
  );
}
