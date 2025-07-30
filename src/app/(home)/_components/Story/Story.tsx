"use client";

import { Suspense } from "@suspensive/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { useImageUploadContext } from "@/app/story/register/_contexts";
import { imageFileSchema } from "@/app/story/register/_schemas";
import { HStack } from "@/components/ui/Stack";

import { AddStoryAvatar } from "./AddStoryAvatar";
import * as styles from "./Story.css";
import { StoryList } from "./StoryList";
import { StoryListSkeleton } from "./StoryList";

export const Story = () => {
  const router = useRouter();
  const { setUpload } = useImageUploadContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenPhotoGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationResult = imageFileSchema.safeParse(file);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message;
      // TODO: Toast 변경
      alert(errorMessage || "올바르지 않은 파일입니다.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUpload(file, previewUrl);

    router.push("/story/register");
  };

  return (
    <div className={styles.wrapper}>
      <HStack align='center' gap={16}>
        <div>
          <AddStoryAvatar onClick={handleOpenPhotoGallery} />
        </div>

        <input
          ref={fileInputRef}
          type='file'
          accept='image/jpeg,image/jpg,image/png'
          onChange={handleFileChange}
          hidden
        />

        <Suspense clientOnly fallback={<StoryListSkeleton />}>
          <StoryList />
        </Suspense>
      </HStack>
    </div>
  );
};
