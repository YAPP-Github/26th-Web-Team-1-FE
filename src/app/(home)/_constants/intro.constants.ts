export type IntroStepContent = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
};

export const INTRO_STEP_CONTENTS: IntroStepContent[] = [
  {
    id: 1,
    title: "잇다에는 여러분이 등록한 \n가게만 존재해요",
    subtitle: "여러분의 응원으로 잇다의 리스트를 채워주세요.",
    imageSrc: "/images/intro-artwork1.png",
    imageAlt: "잇다 서비스 소개 1단계",
    buttonText: "다음",
  },
  {
    id: 2,
    title: "이미 있는 가게라면, \n내 응원이 더해져요",
    subtitle: "응원이 많을수록 더 오래, 많은 사람들에게 기억돼요.",
    imageSrc: "/images/intro-artwork2.png",
    imageAlt: "잇다 서비스 소개 2단계",
    buttonText: "다음",
  },
  {
    id: 3,
    title: "응원은 단 3곳만, \n더 특별하고 집중적으로",
    subtitle: "최대 3개의 가게만 응원할 수 있어요.",
    imageSrc: "/images/intro-artwork3.png",
    imageAlt: "잇다 서비스 소개 3단계",
    buttonText: "다음",
  },
  {
    id: 4,
    title: "스토리에서는 가볍게, \n자주 공유해요",
    subtitle: "맛집 방문 순간을 사진과 짧은 이야기로 쉽게 남겨요",
    imageSrc: "/images/intro-artwork4.png",
    imageAlt: "잇다 서비스 소개 4단계",
    buttonText: "잇다 시작하기",
  },
];
