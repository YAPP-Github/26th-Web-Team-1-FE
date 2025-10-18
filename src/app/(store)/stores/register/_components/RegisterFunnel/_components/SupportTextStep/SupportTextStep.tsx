import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { MAX_SUPPORT_TEXT_LENGTH } from "@/app/(store)/stores/register/_constants";
import { supportTextSchema } from "@/app/(store)/stores/register/_schemas";
import { memberQueryOptions } from "@/app/member/_api/member.queries";
import LocationIcon from "@/assets/location-20.svg";
import { Button } from "@/shared/components/ui/Button";
import { Spacer } from "@/shared/components/ui/Spacer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";
import { TextField } from "@/shared/components/ui/TextField";
import { semantic } from "@/styles";

import * as styles from "./SupportTextStep.css";

export const SupportTextStep = ({
  storeName,
  onNext,
  supportText,
}: {
  storeName: string;
  onNext: (supportText: string) => void;
  supportText?: string;
}) => {
  const { data: member } = useQuery(memberQueryOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supportText: supportText || "",
    },
    resolver: zodResolver(supportTextSchema),
  });

  const onSubmit = (data: { supportText: string }) => {
    onNext(data.supportText);
  };

  return (
    <VStack
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      justify='between'
      style={{ height: "100%" }}
    >
      <VStack>
        <Spacer size={32} />

        <VStack gap={12}>
          <Text as='h2' typo='title1Bd' color='text.normal'>
            가게에 담긴 {member?.nickname}님의
            <br />
            스토리를 들려주세요
          </Text>

          <HStack>
            <LocationIcon
              width={20}
              height={20}
              color={semantic.icon.primary}
            />
            <Text as='p' typo='label1Md' color='text.primary'>
              {storeName}
            </Text>
          </HStack>
        </VStack>
        <Spacer size={44} />

        <TextField
          as='textarea'
          label='친구에게 소개하듯 편한 말투로 적어주세요'
          placeholder='ex) 엄마랑 처음 갔던 백반집인데 생일마다 꼭 가던 곳이에요. 주인 어머님이 늘 웃으며 맞아주셨어요.'
          className={styles.supportTextArea}
          status={errors.supportText ? "negative" : "inactive"}
          helperText={errors.supportText?.message}
          maxLength={MAX_SUPPORT_TEXT_LENGTH}
          {...register("supportText")}
        />
      </VStack>

      <Button variant='primary' size='fullWidth' type='submit'>
        다음
      </Button>
    </VStack>
  );
};
