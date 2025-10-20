import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CircleCloseIcon from "@/assets/circle-close.svg";
import { usePhoneNumberCheckMutation } from "@/features/member/api/member.queries";
import { Button } from "@/shared/components/ui/Button";
import { VStack } from "@/shared/components/ui/Stack";
import { TextField } from "@/shared/components/ui/TextField";

import { formatPhoneNumber } from "../../_helpers";
import { phoneNumberSchema } from "../../_schemas";
import { type PhoneNumberFormValues } from "../../_types";
import { OnboardingTitle } from "../OnboardingTitle";
import * as styles from "./PhoneNumberStep.css";

export const PhoneNumberStep = ({
  phoneNumber,
  onNext,
}: {
  phoneNumber?: string;
  onNext: (phoneNumber: string) => void;
}) => {
  const { mutate: checkPhoneNumber, isPending } = usePhoneNumberCheckMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    setError,
  } = useForm<PhoneNumberFormValues>({
    resolver: zodResolver(phoneNumberSchema),
    mode: "onTouched",
    defaultValues: {
      phoneNumber: formatPhoneNumber(phoneNumber ?? ""),
    },
  });
  const phoneNumberValue = watch("phoneNumber");

  const onSubmit = () => {
    const removeHyphenPhoneNumber = phoneNumberValue.replace(/-/g, "");
    checkPhoneNumber(
      { phoneNumber: removeHyphenPhoneNumber },
      {
        onSuccess: isAvailable => {
          if (isAvailable) {
            onNext(removeHyphenPhoneNumber);
          } else {
            setError("phoneNumber", {
              type: "manual",
              message: "이미 사용 중인 번호에요",
            });
          }
        },
        onError: error => {
          console.error("휴대폰 번호 중복 확인 실패:", error);
        },
      }
    );
  };

  const handleClearClick = () => {
    setValue("phoneNumber", "");
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
          휴대폰 번호를 <br />
          입력해주세요
        </OnboardingTitle>
        <TextField
          label='휴대폰 번호'
          placeholder='010-1234-5678'
          {...register("phoneNumber", {
            onChange: e => {
              const formatted = formatPhoneNumber(e.target.value);
              setValue("phoneNumber", formatted);
            },
          })}
          status={errors.phoneNumber ? "negative" : "inactive"}
          helperText={errors.phoneNumber?.message}
          rightAddon={
            phoneNumberValue && (
              <CircleCloseIcon
                width={22}
                height={22}
                className={styles.icon}
                onClick={handleClearClick}
              />
            )
          }
        />
      </VStack>
      <Button size='fullWidth' type='submit' disabled={!isValid || isPending}>
        다음
      </Button>
    </VStack>
  );
};
