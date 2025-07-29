"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type UploadContextProps = {
  file?: File;
  previewUrl?: string;
  setUpload: (file: File, previewUrl: string) => void;
  clearUpload: () => void;
};

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const setUpload = (newFile: File, newPreviewUrl: string) => {
    setFile(newFile);
    setPreviewUrl(newPreviewUrl);
  };

  const clearUpload = () => {
    setFile(undefined);
    setPreviewUrl(undefined);
  };

  return (
    <UploadContext.Provider
      value={{ file, previewUrl, setUpload, clearUpload }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useImageUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context)
    throw new Error("useImageUploadContext must be used within UploadProvider");
  return context;
};
