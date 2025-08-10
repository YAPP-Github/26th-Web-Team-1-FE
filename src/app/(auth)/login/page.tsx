"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { redirectToKakaoOAuthLoginPage } from "@/app/(auth)/_api/auth/auth.api";
import KakaoLogoIcon from "@/assets/kakao-logo.svg";
import LogoWordmarkIcon from "@/assets/logo-wordmark.svg";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";
import { TextButton } from "@/components/ui/TextButton";

import * as styles from "./_styles/Login.css";

export default function LoginPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.backgroundWrapper}>
        <Image
          src='/images/login-background.png'
          alt='로그인 배경화면'
          fill
          priority
        />

        <GNB
          align='left'
          background='transparent'
          rightAddon={
            <TextButton
              variant='custom'
              size='small'
              className={styles.textButton}
              onClick={handleClick}
            >
              둘러보기
            </TextButton>
          }
        />
        <div className={styles.logoWrapper}>
          <LogoWordmarkIcon className={styles.logoIcon} />
          <Image
            src='/images/login-house.png'
            alt='로그인 일러스트'
            width={149}
            height={139}
          />
        </div>

        <div className={styles.gradientOverlay} />

        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>
              나만 알던 가게,
              <br />
              우리 모두의 한 끼로
            </h1>
            <p className={styles.subtitle}>
              우리의 식사가 누군가의 내일을 바꿉니다
            </p>
          </div>
          <div className={styles.kakaoButtonWrapper}>
            <Button
              variant='custom'
              size='fullWidth'
              className={styles.kakaoButton}
              onClick={redirectToKakaoOAuthLoginPage}
            >
              <KakaoLogoIcon className={styles.kakaoLogo} />
              <span className={styles.kakaoText}>
                카카오로 3초 만에 시작하기
              </span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
