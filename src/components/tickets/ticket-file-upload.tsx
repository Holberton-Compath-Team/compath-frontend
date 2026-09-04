"use client";

import { FileText, Upload, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { uploadFile } from "@/services/upload";
import { cn } from "@/utils/cn";

const ACCEPTED_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export interface TicketFileUploadState {
  url: string | null;
  uploading: boolean;
}

interface TicketFileUploadProps {
  onChange: (state: TicketFileUploadState) => void;
  disabled?: boolean;
}

function isAcceptedFile(file: File): boolean {
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.some((extension) =>
    file.name.toLowerCase().endsWith(extension),
  );
  return ACCEPTED_MIME_TYPES.includes(file.type) || hasAcceptedExtension;
}

export function TicketFileUpload({ onChange, disabled = false }: TicketFileUploadProps) {
  const inputId = useId();
  const objectUrlRef = useRef<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  function reset() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setUploading(false);
    setError(null);
    onChange({ url: null, uploading: false });
  }

  async function handleFile(selected: File) {
    setError(null);

    if (!isAcceptedFile(selected)) {
      setError("Fayl növü dəstəklənmir. Yalnız PDF, PNG və ya JPG yükləyin.");
      return;
    }

    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setError("Fayl 5MB-dan böyük ola bilməz.");
      return;
    }

    setFile(selected);
    if (selected.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selected);
      objectUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
    }

    setUploading(true);
    setProgress(0);
    onChange({ url: null, uploading: true });

    try {
      const url = await uploadFile(selected, { onProgress: setProgress });
      setUploading(false);
      onChange({ url, uploading: false });
    } catch {
      setError("Fayl yüklənə bilmədi. Yenidən cəhd edin.");
      setUploading(false);
      onChange({ url: null, uploading: false });
    }
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (disabled) {
      return;
    }
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) {
      void handleFile(dropped);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-small font-medium text-text-primary">Fayl əlavə et (istəyə bağlı)</span>

      {!file && (
        <label
          htmlFor={inputId}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-8 text-center transition-colors hover:border-ku-green",
            disabled && "pointer-events-none opacity-50",
          )}
        >
          <Upload className="size-6 text-ku-green" aria-hidden="true" />
          <span className="text-small text-text-primary">
            Faylı bura sürükləyin və ya seçmək üçün klikləyin
          </span>
          <span className="text-caption text-text-secondary">PDF, PNG, JPG — maks 5MB</span>
          <input
            id={inputId}
            type="file"
            className="sr-only"
            accept={ACCEPTED_EXTENSIONS.join(",")}
            disabled={disabled}
            onChange={(event) => {
              const selected = event.target.files?.[0];
              if (selected) {
                void handleFile(selected);
              }
            }}
          />
        </label>
      )}

      {file && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt=""
              className="size-12 shrink-0 rounded-md object-cover"
            />
          ) : (
            <FileText className="size-12 shrink-0 rounded-md bg-background p-2 text-ku-green" aria-hidden="true" />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-small text-text-primary">{file.name}</span>
            {uploading && (
              <progress
                value={progress}
                max={100}
                className="h-2 w-full accent-ku-green"
              >
                {Math.round(progress)}%
              </progress>
            )}
          </div>

          <button
            type="button"
            onClick={reset}
            disabled={disabled}
            aria-label="Faylı sil"
            className="shrink-0 rounded-md p-1 text-text-secondary hover:bg-background hover:text-danger disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
