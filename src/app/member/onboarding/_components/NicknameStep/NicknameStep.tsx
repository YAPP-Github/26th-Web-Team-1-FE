"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "react-simplikit";

import { useNicknameCheckMutation } from "@/app/member/_api/member.queries";
import { nicknameSchema } from "@/app/member/_schemas";
import ClearIcon from "@/assets/circle-clear.svg";
import { Button } from "@/components/ui/Button";
import { VStack } from "@/components/ui/Stack";
import { TextField } from "@/components/ui/TextField";

import { OnboardingTitle } from "../OnboardingTitle";
import * as styles from "./NicknameStep.css";

type NicknameStepProps = {
  nickname?: string;
  onNext: (nickname: string) => void;
};

export const NicknameStep = ({ nickname, onNext }: NicknameStepProps) => {
  const [isNicknameValidating, setIsNicknameValidating] = useState(false);

  const { mutate: checkNickname, isPending } = useNicknameCheckMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(nicknameSchema),
    defaultValues: { nickname: nickname || "" },
    mode: "onChange",
  });

  const nicknameValue = watch("nickname");

  const debouncedNicknameCheck = useDebounce((nicknameValue: string) => {
    checkNickname(
      { nickname: nicknameValue },
      {
        onSuccess: isAvailable => {
          if (!isAvailable) {
            setError("nickname", {
              type: "manual",
              message: "이미 사용 중인 닉네임이에요",
            });
          }
        },
        onError: () => {
          setError("nickname", {
            type: "manual",
            message: "확인 중 오류가 발생했어요. 다시 시도해주세요.",
          });
        },
        onSettled: () => {
          setIsNicknameValidating(false);
        },
      }
    );
  }, 2000);

  useEffect(() => {
    const { success } = nicknameSchema.safeParse({ nickname: nicknameValue });

    if (
      (nickname && nicknameValue === nickname) ||
      !nicknameValue ||
      !success
    ) {
      setIsNicknameValidating(false);
      return;
    }

    setIsNicknameValidating(true);
    debouncedNicknameCheck(nicknameValue);
  }, [nicknameValue]);

  const onSubmit = () => {
    onNext(nicknameValue);
  };

  const handleClearClick = () => {
    setValue("nickname", "");
  };

  return (
    <VStack
      justify='between'
      className={styles.wrapper}
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack gap={44}>
        <OnboardingTitle>
          안녕하세요, <br />
          어떻게 불러드릴까요?
        </OnboardingTitle>
        <TextField
          label='닉네임'
          placeholder='닉네임을 입력해 주세요'
          {...register("nickname")}
          status={errors.nickname ? "negative" : "inactive"}
          helperText={errors.nickname?.message}
          rightAddon={
            nicknameValue && (
              <ClearIcon
                width={22}
                height={22}
                className={styles.icon}
                onClick={handleClearClick}
              />
            )
          }
        />
      </VStack>
      <Button
        size='fullWidth'
        type='submit'
        disabled={!isValid || isNicknameValidating || isPending}
      >
        다음
      </Button>
    </VStack>
  );
};
