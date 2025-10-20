export type FileDetail = {
  order: number;
  contentType: string;
  fileSize: number;
};

export type PresignedUrlRequest = {
  fileDetails: FileDetail[];
};

type PresignedUrl = {
  order: number;
  contentType: string;
  key: string;
  url: string;
  expiresIn: number;
};

export type PresignedUrlResponse = {
  urls: PresignedUrl[];
};
