import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef, useState } from "react";

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
import { semantic } from "@/styles";

import * as styles from "./ImagesStep.css";

type ImageStepProps = {
  storeKakaoId: string;
  storeName: string;
  supportText: string;
  tags: string[];
  onNext: (storeId: number) => void;
};

export const ImagesStep = ({
  storeKakaoId,
  storeName,
  supportText,
  tags,
  onNext,
}: ImageStepProps) => {
  const { data: member } = useQuery(memberQueryOptions);

  const { mutate: postCheer, isPending } = usePostCheerMutation();

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCheer(
      {
        cheerRequest: {
          storeName,
          description: supportText,
          storeKakaoId,
          tags,
        },
        imageFile: image,
      },
      {
        onSuccess: data => {
          onNext(data.storeId);
        },
      }
    );
  };

  return (
    <VStack
      as='form'
      onSubmit={handleSubmit}
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

        <VStack gap={8}>
          <Text as='p' typo='label1Md' color='text.alternative'>
            사진을 추가해 주세요 (최대 1장)
          </Text>

          <ImageUploader value={image} onSelect={setImage} />
        </VStack>
      </VStack>

      <VStack gap={10}>
        <Button
          variant='primary'
          size='fullWidth'
          type='submit'
          disabled={isPending || !image}
        >
          완료
        </Button>
        <TextButton
          size='small'
          variant='assistive'
          type='submit'
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
  onSelect: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
};

const ImageUploader = ({
  value,
  onSelect,
  className,
  disabled,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelect(file);
    }
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      data-has-image={Boolean(imageSrc)}
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
        <div className={styles.imagePreview}>
          <div className={styles.imagePreviewWrapper}>
            <img
              src={imageSrc}
              alt='업로드된 이미지'
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <button onClick={handleRemove} className={styles.imageRemoveButton}>
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
