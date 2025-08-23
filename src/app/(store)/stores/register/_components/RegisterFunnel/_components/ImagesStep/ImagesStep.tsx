import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { getPresignedUrl, uploadImageToS3 } from "@/app/_api/image/image.api";
import { usePostCheerMutation } from "@/app/(cheer)/_api/cheer.queries";
import { memberQueryOptions } from "@/app/member/_api/member.queries";
import CircleCloseIcon from "@/assets/circle-close.svg";
import LocationIcon from "@/assets/location-20.svg";
import PlusIcon from "@/assets/plus.svg";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";
import { ApiException } from "@/lib/exceptions";
import { semantic } from "@/styles";

import * as styles from "./ImagesStep.css";

type ImageStepProps = {
  storeKakaoId: string;
  storeName: string;
  supportText: string;
  tags: string[];
  onNext: (storeId: number) => void;
};

const MAX_IMAGE_COUNT = 3;

export const ImagesStep = ({
  storeKakaoId,
  storeName,
  supportText,
  tags,
  onNext,
}: ImageStepProps) => {
  const { data: member } = useQuery(memberQueryOptions);

  const { mutateAsync: postCheer, isPending } = usePostCheerMutation();

  const [images, setImages] = useState<File[]>([]);

  const handleImageAdd = async (file: File) => {
    setImages(prev => [...prev, file]);
  };

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (submitType: "with-images" | "without-images") => {
    try {
      let imageData: Array<{
        imageKey: string;
        orderIndex: number;
        contentType: string;
        fileSize: number;
      }> = [];

      if (submitType === "with-images" && images.length > 0) {
        const { urls: presignedUrls } = await getPresignedUrl(
          images.map((image, index) => ({
            order: index,
            contentType: image.type,
            fileSize: image.size,
          }))
        );

        const uploadPromises = presignedUrls.map(({ url, order }) =>
          uploadImageToS3(url, images[order]!)
        );

        await Promise.all(uploadPromises);

        imageData = presignedUrls.map(({ key, order, contentType }) => ({
          imageKey: key,
          orderIndex: order,
          contentType,
          fileSize: images[order]!.size,
        }));
      }

      const { storeId } = await postCheer({
        storeName,
        description: supportText,
        storeKakaoId,
        images: imageData,
        tags,
      });

      onNext(storeId);
    } catch (error) {
      if (error instanceof ApiException) {
        toast.error(error.message);
      }
    }
  };

  return (
    <VStack justify='between' style={{ height: "100%" }}>
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

        <VStack gap={8}>
          <Text as='p' typo='label1Md' color='text.alternative'>
            사진을 추가해 주세요 (최대 3장)
          </Text>

          <HStack gap={12}>
            {/* 기존 이미지들 (미리보기) */}
            {images.map((image, index) => (
              <ImageUploader
                key={`preview-${index}`}
                value={image}
                onRemove={() => handleImageRemove(index)}
                isPreview
              />
            ))}

            {/* 새 이미지 업로드 (3개 미만일 때만 표시) */}
            {images.length < MAX_IMAGE_COUNT && (
              <ImageUploader
                key='upload'
                value={null}
                onSelect={handleImageAdd}
              />
            )}
          </HStack>
        </VStack>
      </VStack>

      <VStack gap={10}>
        <Button
          variant='primary'
          size='fullWidth'
          onClick={() => handleSubmit("with-images")}
          disabled={isPending || images.length === 0}
        >
          완료
        </Button>
        <TextButton
          size='small'
          variant='assistive'
          onClick={() => handleSubmit("without-images")}
          disabled={isPending}
        >
          사진 없이 등록하기
        </TextButton>
      </VStack>
    </VStack>
  );
};

type ImageUploaderProps = {
  value?: File | string | null;
  onSelect?: (file: File) => void;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
  isPreview?: boolean;
  style?: React.CSSProperties;
};

const ImageUploader = ({
  value,
  onSelect,
  onRemove,
  className,
  disabled,
  isPreview = false,
  style,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled || isPreview) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelect?.(file);
    }
  };

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isPreview && onRemove) {
      onRemove();
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getImageSrc = () => {
    if (!value) return null;

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    return value;
  };

  const imageSrc = getImageSrc();

  return (
    <div
      className={clsx(styles.imageUploader, className)}
      onClick={handleClick}
      role='button'
      tabIndex={0}
      data-has-image={Boolean(imageSrc)}
      style={style}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        hidden
        disabled={disabled}
      />

      {imageSrc ? (
        <div className={styles.imagePreviewContainer}>
          <div className={styles.imagePreviewWrapper}>
            <img
              src={imageSrc}
              alt='업로드된 이미지'
              className={styles.imagePreview}
            />
          </div>
          <button
            type='button'
            onClick={handleRemoveClick}
            className={styles.imageRemoveButton}
            aria-label='이미지 삭제'
          >
            <CircleCloseIcon width={20} height={20} />
          </button>
        </div>
      ) : (
        <div className={styles.emptyImageUploader}>
          <PlusIcon width={24} height={24} color={semantic.icon.disabled} />
        </div>
      )}
    </div>
  );
};
