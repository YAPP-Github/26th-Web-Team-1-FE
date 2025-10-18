import "@/styles/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { type CSSProperties } from "react";
import { Toaster } from "sonner";

import { RegisterServiceWorkerClient } from "@/lib/pwa";
import { MSWProvider, OverlayProvider, QueryProvider } from "@/providers";
import { semantic } from "@/styles";
import { pretendard } from "@/styles/pretendard";

import * as styles from "./layout.css";
import { UploadProvider } from "./story/register/_contexts";

export const metadata: Metadata = {
  title: "잇다",
  description:
    "우리 동네 사라지면 안 되는 가게를 기록하고, 모두가 함께 응원하는 플랫폼 잇다",
  openGraph: {
    title: "잇다",
    description:
      "우리 동네 사라지면 안 되는 가게를 기록하고, 모두가 함께 응원하는 플랫폼 잇다",
    images: "/images/opengraph-image.png",
    type: "website",
    siteName: "잇다",
    url: "https://eatda.net/",
  },
  keywords: [
    "잇다",
    "eatda",
    "잇다 플랫폼",
    "잇다 맛집",
    "우리동네 맛집",
    "동네 가게",
    "로컬 맛집",
    "숨은 맛집",
    "사라지면 안 되는 가게",
    "응원하는 가게",
    "단골 가게",
    "가게 이야기",
    "맛집 기록",
    "가게 추천",
    "맛집 공유",
    "가게 등록",
    "소상공인",
    "동네의 이야기",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.MOCKING_ENABLED === "true"
) {
  const { server } = await import("@/mocks/server");
  console.info("🔥 [MSW] Server-side mocking enabled");
  server.listen();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={pretendard.className}>
      <GoogleAnalytics gaId='G-H7HEQSEBC7' />
      <Script id='clarity-script' strategy='lazyOnload'>
        {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "socxfpd9d9");
        `}
      </Script>
      <body className={styles.body}>
        <div className={styles.wrapper}>
          <RegisterServiceWorkerClient />
          <QueryProvider>
            <OverlayProvider>
              <MSWProvider>
                <UploadProvider>{children}</UploadProvider>
              </MSWProvider>
            </OverlayProvider>
          </QueryProvider>
          <Toaster
            position='bottom-center'
            toastOptions={{
              style: {
                backdropFilter: "blur(26px)",
              },
            }}
            style={
              {
                "--normal-bg": "rgba(42, 42, 42, 0.52)",
                "--normal-text": semantic.text.white,
                "--normal-border": "transparent",
              } as CSSProperties
            }
          />
        </div>
      </body>
    </html>
  );
}
