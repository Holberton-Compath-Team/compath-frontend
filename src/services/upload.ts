import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "@/lib/firebase";

export interface UploadFileOptions {
  onProgress?: (percent: number) => void;
}

export function uploadFile(file: File, options: UploadFileOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `tickets/${crypto.randomUUID()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        options.onProgress?.(percent);
      },
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve, reject);
      },
    );
  });
}
