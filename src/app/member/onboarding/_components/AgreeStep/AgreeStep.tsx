import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useUpdateMemberMutation } from "@/features/member/api";
import { Button } from "@/shared/components/ui/Button";
import { CheckBox } from "@/shared/components/ui/CheckBox";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";

import { AGREEMENTS } from "../../_constants/agreement.constants";
import { OnboardingTitle } from "../OnboardingTitle";
import * as styles from "./AgreeStep.css";

export const AgreeStep = ({
  nickname,
  phoneNumber,
}: {
  nickname: string;
  phoneNumber: string;
}) => {
  const router = useRouter();
  const { mutate: updateMember } = useUpdateMemberMutation();

  const { register, handleSubmit, watch, setValue } = useForm<{
    agreements: string[];
  }>({
    defaultValues: { agreements: [] },
  });

  const checkedIds = watch("agreements");

  const isAllAgreed = checkedIds.length === AGREEMENTS.length;
  const isAllRequiredAgreed = AGREEMENTS.filter(a => a.required).every(a =>
    checkedIds.includes(a.id)
  );

  const handleAllAgree = (checked: boolean) => {
    setValue("agreements", checked ? AGREEMENTS.map(a => a.id) : []);
  };

  const handleIndividualAgree = (id: string, checked: boolean) => {
    setValue(
      "agreements",
      checked ? [...checkedIds, id] : checkedIds.filter(item => item !== id)
    );
  };

  const onSubmit = () => {
    updateMember(
      {
        nickname: nickname,
        phoneNumber: phoneNumber,
        optInMarketing: checkedIds.includes("marketing"),
      },
      {
        onSuccess: () => {
          router.push("/?register=true");
        },
      }
    );
  };

  return (
    <VStack
      justify='between'
      className={styles.wrapper}
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <VStack gap={44}>
        <OnboardingTitle>이용약관에 동의해주세요</OnboardingTitle>
        <VStack gap={20}>
          <HStack gap={8} align='center' className={styles.allAgreeBox}>
            <CheckBox
              width={24}
              height={24}
              checked={isAllAgreed}
              onCheckedChange={handleAllAgree}
              className={styles.allAgreeCheckIcon}
            />
            <Text typo='body1Sb'>모두 동의합니다</Text>
          </HStack>
          <ul className={styles.individualAgreeBox}>
            {AGREEMENTS.map(agreement => (
              <HStack
                key={agreement.id}
                as='li'
                gap={8}
                className={styles.agreeList}
              >
                <CheckBox
                  value={agreement.id}
                  checked={checkedIds.includes(agreement.id)}
                  onCheckedChange={value =>
                    handleIndividualAgree(agreement.id, value)
                  }
                  hasBackground={false}
                  {...register("agreements")}
                />
                <Text typo='body2Md' color='neutral.50'>
                  {agreement.label}
                </Text>
              </HStack>
            ))}
          </ul>
        </VStack>
      </VStack>
      <Button size='fullWidth' type='submit' disabled={!isAllRequiredAgreed}>
        동의하고 시작하기
      </Button>
    </VStack>
  );
};
