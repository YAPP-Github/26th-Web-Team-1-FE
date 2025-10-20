import { authHttp } from "@/shared/lib/api";
import { ApiException } from "@/shared/lib/exceptions";

import { type FileDetail, type PresignedUrlResponse } from "./image.types";

/**
 * 이미지 업로드를 위한 presigned URL 발급
 * @param request - 업로드할 이미지 정보
 * @returns 업로드할 이미지의 presigned URL
 */
export const getPresignedUrl = async (
  fileDetails: FileDetail[]
): Promise<PresignedUrlResponse> => {
  return await authHttp
    .post("api/image/presigned-url", {
      json: { fileDetails },
    })
    .json<PresignedUrlResponse>();
};

/**
 * S3에 이미지 업로드
 * @param presignedUrl - S3에 업로드할 이미지의 presigned URL
 * @param file - 업로드할 이미지 파일
 * @returns 업로드 결과
 */
export const uploadImageToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  const response = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok) {
    throw new ApiException("이미지 업로드에 실패했습니다.", response.status);
  }
};
