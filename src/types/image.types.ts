export type ImageMeta = {
  imageKey: string;
  orderIndex: number;
  contentType: string;
  fileSize: number;
  url: string;
};

export type ImageRequest = Omit<ImageMeta, "url">;

export type ImageResponse = ImageMeta;