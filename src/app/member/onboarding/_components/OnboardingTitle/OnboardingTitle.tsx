import { type ReactNode } from "react";

import { Text } from "@/components/ui/Text";

type OnboardingTitleProps = {
  children: ReactNode;
};

export const OnboardingTitle = ({ children }: OnboardingTitleProps) => {
  return (
    <Text typo='title1Bd' color='text.normal'>
      {children}
    </Text>
  );
};
