import { HStack } from "@/shared/components/ui/Stack";

import * as styles from "./ProgressBar.css";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const isActive = (index: number) => currentStep >= index + 1;

  return (
    <HStack gap={4}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={styles.progressBar}
          data-active={isActive(index)}
        />
      ))}
    </HStack>
  );
};
