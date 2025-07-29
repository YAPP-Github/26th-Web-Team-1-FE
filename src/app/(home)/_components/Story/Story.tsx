"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { useImageUploadContext } from "@/app/story/register/_contexts";
import { imageFileSchema } from "@/app/story/register/_schemas";

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
    <>
      <button onClick={handleOpenPhotoGallery}>스토리 사진 선택</button>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/jpg,image/png'
        onChange={handleFileChange}
        hidden
      />
    </>
  );
};
