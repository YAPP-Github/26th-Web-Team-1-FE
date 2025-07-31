import { z } from "zod";

export const imageFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= 5 * 1024 * 1024, {
    message: "5MB 이하 사진만 업로드할 수 있어요.",
  })
  .refine(
    file => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
    {
      message: "지원하지 않는 이미지 형식입니다.",
    }
  );

export const storyRegisterSchema = z.object({
  storeKakaoId: z.string().trim(),
  storeName: z.string().trim(),
  description: z
    .string()
    .max(300, "최대 300자까지 입력할 수 있어요")
    .trim()
    .nullable(),
  image: imageFileSchema,
});

export type StoryRegisterFormData = z.infer<typeof storyRegisterSchema>;
