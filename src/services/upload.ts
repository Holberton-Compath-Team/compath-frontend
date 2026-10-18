import { apiClient } from "@/lib/api-client";

export interface UploadFileOptions {
  onProgress?: (percent: number) => void;
}

interface UploadFileResponse {
  url?: string;
  fileUrl?: string;
  fileName?: string;
}

export async function uploadFile(file: File, options: UploadFileOptions = {}): Promise<string> {
  const response = await apiClient.upload<UploadFileResponse>("/upload", file, {
    onProgress: options.onProgress,
  });

  const url = response.url ?? response.fileUrl;
  if (!url) {
    throw new Error("Backend fayl URL-i qaytarmadı");
  }

  return url;
}
