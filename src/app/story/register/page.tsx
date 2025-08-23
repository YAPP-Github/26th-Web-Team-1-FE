"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { getPresignedUrl, uploadImageToS3 } from "@/app/_api/image/image.api";
import CancelIcon from "@/assets/cancel.svg";
import { GNB } from "@/components/ui/GNB";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { type ImageRequest } from "@/types/image.types";

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

  const [isPending, setIsPending] = useState(false);
  const { mutate: postStory } = usePostStoryMutation();

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
    try {
      let imageData: ImageRequest[] = [];

      if (data.image) {
        setIsPending(true);

        const { urls: presignedUrls } = await getPresignedUrl([
          {
            order: 0,
            contentType: data.image.type,
            fileSize: data.image.size,
          },
        ]);

        const { url, key, order, contentType } = presignedUrls[0]!;
        await uploadImageToS3(url, data.image);

        imageData = [
          {
            imageKey: key,
            orderIndex: order,
            contentType,
            fileSize: data.image.size,
          },
        ];
      }

      postStory(
        {
          storeKakaoId: data.storeKakaoId,
          storeName: data.storeName,
          description: data.description || null,
          images: imageData,
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
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsPending(false);
    }
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
              <Spacer size={20} />
              <StorySearchStore />
              <StoryDescription />
            </VStack>
            <StorySubmitButton isPending={isPending} />
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  );
}
