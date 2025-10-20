import { useEffect, useRef, useState } from "react";

export const useExpandableText = (text: string) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setShowMoreButton(isOverflowing);
    }
  }, [text]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    showMoreButton,
    textRef,
    toggleExpanded,
  };
};
