"use client";

import "./register.slick.css";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Slider from "react-slick";

import { Bleed } from "@/components/ui/Bleed";
import { Button } from "@/components/ui/Button";
import { Popup } from "@/components/ui/Popup";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";

const IMAGES = [
  "/images/register-popup-card1.png",
  "/images/register-popup-card2.png",
  "/images/register-popup-card3.png",
];

export const RegisterPopup = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("register") === "true";

  return (
    <Popup.Root
      defaultOpen={isOpen}
      onOpenChange={() => {
        router.replace(pathname);
      }}
    >
      <Popup.Content>
        <Popup.Body style={{ padding: "4rem 2rem 1.6rem 2rem" }}>
          <VStack align='center' gap={8}>
            <Text
              typo='title2Bd'
              color='text.normal'
              style={{ textAlign: "center" }}
            >
              잊혀지면 안 되는
              <br />
              나만의 맛집이 있나요?
            </Text>
            <Text typo='body2Rg' color='text.alternative'>
              단 3곳만, 당신의 진짜 맛집을 남겨주세요.
            </Text>
          </VStack>

          <Spacer size={24} />

          <Bleed inline={20}>
            <Slider
              className='register-popup-slider'
              autoplay
              slidesToShow={1}
              centerMode
              arrows={false}
              centerPadding='60px'
              speed={500}
            >
              {IMAGES.map(image => (
                <div key={image}>
                  <div>
                    <Image
                      src={image}
                      alt='맛집 등록하기'
                      width={187}
                      height={214}
                      style={{
                        width: "187px",
                        height: "214px",
                        marginLeft: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </Bleed>
        </Popup.Body>
        <Popup.Footer gap={10}>
          <Link href='/stores/register'>
            <Button size='fullWidth'>맛집 등록하기</Button>
          </Link>
          <Popup.Close asChild>
            <TextButton variant='assistive' size='small'>
              나중에 하기
            </TextButton>
          </Popup.Close>
        </Popup.Footer>
      </Popup.Content>
    </Popup.Root>
  );
};
