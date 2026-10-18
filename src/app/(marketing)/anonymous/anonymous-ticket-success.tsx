"use client";

import { Check, CheckCircle2, Copy } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";

const COPY_FEEDBACK_DURATION_MS = 2000;

interface AnonymousTicketSuccessProps {
  trackingCode: string;
}

export function AnonymousTicketSuccess({ trackingCode }: AnonymousTicketSuccessProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }

    copyTimeoutRef.current = setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_DURATION_MS);
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
        <h2 className="text-h3 text-text-primary">Müraciətiniz qeydə alındı</h2>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-small text-text-secondary">İzləmə kodunuz</span>
        <span className="text-display text-ku-green-dark break-all">{trackingCode}</span>
        <button
          type="button"
          onClick={handleCopy}
          className={buttonVariants({ variant: "secondary" })}
        >
          {copyState === "copied" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copyState === "copied" ? "Kopyalandı" : "Kopyala"}
        </button>
        {copyState === "error" && (
          <p role="alert" className="text-small text-danger">
            Kopyalama alınmadı, kodu əl ilə seçib köçürün.
          </p>
        )}
      </div>

      <p className="max-w-md rounded-lg border border-warning bg-warning/10 px-4 py-3 text-small text-warning">
        Bu kodu saxlayın. Müraciətinizi yalnız bu kodla izləyə bilərsiniz, itirsəniz bərpa olunmur.
      </p>

      <Link href={`/track/${encodeURIComponent(trackingCode)}`} className={buttonVariants({ variant: "primary" })}>
        Müraciəti izlə
      </Link>
    </div>
  );
}
