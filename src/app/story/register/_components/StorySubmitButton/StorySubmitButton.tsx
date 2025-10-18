"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";

import { type StoryRegisterFormData } from "../../_schemas";

type StorySubmitButtonProps = {
  isPending?: boolean;
};

export const StorySubmitButton = ({
  isPending = false,
}: StorySubmitButtonProps) => {
  const {
    formState: { isValid },
  } = useFormContext<StoryRegisterFormData>();

  const image = useWatch<StoryRegisterFormData>({ name: "image" });
  const storeName = useWatch<StoryRegisterFormData>({ name: "storeName" });

  const isDisabled = !image || !storeName || !isValid || isPending;

  return (
    <Button type='submit' variant='primary' size='large' disabled={isDisabled}>
      {/* TODO: 스토리 등록 상태 변경 */}
      {isPending ? "등록 중" : "등록하기"}
    </Button>
  );
};
