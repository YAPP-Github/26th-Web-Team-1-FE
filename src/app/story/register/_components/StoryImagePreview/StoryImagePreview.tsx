"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { imageFileSchema, type StoryRegisterFormData } from "../../_schemas";
import * as styles from "./StoryImagePreview.css";

export const StoryImagePreview = () => {
  const { watch, setValue } = useFormContext<StoryRegisterFormData>();
  const imageFile = watch("image");

  const previewUrl = imageFile && URL.createObjectURL(imageFile);

  const validateImage = (file: File) => {
    const result = imageFileSchema.safeParse(file);

    if (!result.success) {
      const errorMessage = result.error.errors[0]?.message;
      // TODO: Toast 변경
      toast.warning(errorMessage);
      return;
    }

    setValue("image", file, { shouldValidate: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    if (newFile) {
      validateImage(newFile);
    }

    e.target.value = "";
  };

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={previewUrl}
        alt='스토리 등록 사진 프리뷰'
        width={121}
        height={213}
        className={styles.image}
      />
      <div className={styles.overlayButtonWrapper}>
        <label className={styles.overlayButton}>
          사진 변경
          <input
            type='file'
            onChange={handleImageChange}
            accept='image/jpeg,image/jpg,image/png'
            hidden
          />
        </label>
      </div>
    </div>
  );
};
