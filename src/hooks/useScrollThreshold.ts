import { useEffect, useState } from "react";

/**
 * 스크롤 위치가 지정된 임계값을 넘었는지 추적하는 훅
 * @param threshold - 스크롤 임계값 (기본값: 100px)
 * @returns { isScrolled: boolean } - 임계값을 넘었는지 여부
 *
 * @example
 * ```tsx
 * const { isScrolled } = useScrollThreshold(200);
 *
 * // 스크롤이 200px을 넘으면 isScrolled가 true가 됨
 * ```
 */
export const useScrollThreshold = (threshold: number = 100) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
};
