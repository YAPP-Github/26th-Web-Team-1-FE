"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

import CancelIcon from "@/assets/cancel.svg";
import { GNB } from "@/components/ui/GNB";
import { VStack } from "@/components/ui/Stack";

import { usePostStoryMutation } from "./_api";
import { StoryDescription } from "./_components/StoryDescription";
import { StoryImagePreview } from "./_components/StoryImagePreview";
import { StorySearchStore } from "./_components/StorySearchStore";
import { StorySubmitButton } from "./_components/StorySubmitButton";
import { useImageUploadContext } from "./_contexts";
import { type StoryRegisterFormData, storyRegisterSchema } from "./_schemas";
import * as styles from "./page.css";

export default function StoryRegisterPage() {
  const { file, clearUpload } = useImageUploadContext();
  const router = useRouter();
  const { mutate: postStory, isPending } = usePostStoryMutation();

  const handleClick = () => {
    router.back();
  };

  const methods = useForm<StoryRegisterFormData>({
    resolver: zodResolver(storyRegisterSchema),
    defaultValues: {
      storeKakaoId: "",
      storeName: "",
      description: null,
      image: file,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: StoryRegisterFormData) => {
    postStory(
      {
        storyRequest: {
          storeKakaoId: data.storeKakaoId,
          storeName: data.storeName,
          description: data.description || null,
        },
        imageFile: data.image,
      },
      {
        onSuccess: response => {
          clearUpload();
          router.push(`/story/${response.storyId}`);
        },
        onError: error => {
          console.error("스토리 등록 실패:", error);
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack justify='between' className={styles.wrapper}>
          <GNB
            title='스토리 올리기'
            rightAddon={
              <button type='button' onClick={handleClick} aria-label='뒤로가기'>
                <CancelIcon width={20} height={20} />
              </button>
            }
          />
          <VStack as='main' justify='between' className={styles.mainWrapper}>
            <VStack>
              <StoryImagePreview />
              <StoryDescription />
              <StorySearchStore />
            </VStack>
            <StorySubmitButton isPending={isPending} />
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  );
}
