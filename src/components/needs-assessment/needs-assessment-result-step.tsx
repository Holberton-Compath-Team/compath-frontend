"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardActions, CardContent, CardTitle } from "@/components/ui/card";
import { NATIONAL_EMERGENCY_CONTACTS } from "@/constants/emergency";
import { EMERGENCY_BANNER } from "@/constants/landing";
import { NEED_DESCRIPTION_MAX_LENGTH, STATUS_LABEL } from "@/constants/needs-assessment";
import { useAuthToken } from "@/hooks/use-auth-token";
import { getServices } from "@/services/services";
import type { NeedCategoryId, NeedTopic, StudentStatus, UrgencyLevel } from "@/types/needs-assessment";
import {
  buildTicketDescription,
  hasDangerSignal,
  matchServices,
  suggestPriority,
} from "@/utils/needs-assessment";

interface NeedsAssessmentResultStepProps {
  category: NeedCategoryId | null;
  freeText: string;
  topic: NeedTopic | null;
  urgency: UrgencyLevel;
  status: StudentStatus;
  onBack: () => void;
}

export function NeedsAssessmentResultStep({
  category,
  freeText,
  topic,
  urgency,
  status,
  onBack,
}: NeedsAssessmentResultStepProps) {
  const token = useAuthToken();
  const emergencyContact = NATIONAL_EMERGENCY_CONTACTS[0];

  const {
    data: services,
    isPending,
    isError,
    refetch,
  } = useQuery({ queryKey: ["services"], queryFn: getServices });

  const keywords = useMemo(() => topic?.keywords ?? [], [topic]);
  const isDanger = useMemo(() => hasDangerSignal(keywords, freeText), [keywords, freeText]);
  const showEmergencyBlock = isDanger || urgency === "today";
  const priority = suggestPriority(urgency, isDanger);
  const description = buildTicketDescription(freeText, topic?.label ?? null, STATUS_LABEL[status]).slice(
    0,
    NEED_DESCRIPTION_MAX_LENGTH,
  );

  const matches = useMemo(
    () => (services ? matchServices(keywords, freeText, services) : []),
    [services, keywords, freeText],
  );
  const bestMatch = matches[0] ?? null;

  const ticketUrl = bestMatch
    ? `/tickets/new?department=${encodeURIComponent(bestMatch.service.name)}&priority=${encodeURIComponent(priority)}&description=${encodeURIComponent(description)}`
    : null;

  const isSensitive = category === "sensitive";

  return (
    <div className="flex flex-col gap-6">
      {showEmergencyBlock && (
        <div className="flex flex-col gap-3 rounded-card border border-danger/20 bg-danger/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0 text-danger" aria-hidden="true" />
            <p className="text-small text-danger">
              Bu, təcili və ya təhlükəli bir vəziyyət ola bilər. Təhlükəsizliyiniz üçün {emergencyContact.phone}{" "}
              nömrəsinə zəng edə və ya Təcili Dəstək səhifəsinə baxa bilərsiniz.
            </p>
          </div>
          <Link
            href={EMERGENCY_BANNER.href}
            className={buttonVariants({ variant: "danger", className: "w-full tablet:w-auto" })}
          >
            Təcili Dəstək səhifəsinə keç
          </Link>
        </div>
      )}

      {isPending && (
        <div
          className="flex animate-pulse flex-col gap-4 rounded-card bg-surface p-6 shadow-sm"
          aria-hidden="true"
        >
          <div className="h-5 w-2/5 rounded-lg bg-border" />
          <div className="h-4 w-full rounded-lg bg-border" />
          <div className="h-4 w-3/5 rounded-lg bg-border" />
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-12 text-center shadow-sm">
          <p className="text-body text-text-secondary">
            Xidmətlər yüklənərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
          </p>
          <Button onClick={() => refetch()}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Yenidən cəhd et
          </Button>
        </div>
      )}

      {!isPending && !isError && bestMatch && (
        <Card>
          <CardTitle>{bestMatch.service.name}</CardTitle>
          <CardContent className="text-small text-text-secondary">
            {bestMatch.service.description}
          </CardContent>

          {bestMatch.matchedKeywords.length > 0 && (
            <p className="text-small text-text-secondary">
              <span className="font-medium text-text-primary">Niyə bu xidmət? </span>
              &ldquo;{Array.from(new Set(bestMatch.matchedKeywords)).slice(0, 4).join(", ")}&rdquo; ilə uyğun gəldi.
            </p>
          )}

          <p className="text-caption text-text-secondary">
            Bu təklif qaydalara əsaslanan avtomatik yönləndirmədir, istədiyiniz xidməti özünüz də seçə bilərsiniz.
          </p>

          <CardActions>
            {token ? (
              <Link href={ticketUrl ?? "/tickets/new"} className={buttonVariants({ variant: "primary" })}>
                Bu mövzuda müraciət et
              </Link>
            ) : (
              <Link
                href={`/login?next=${encodeURIComponent(ticketUrl ?? "/tickets/new")}`}
                className={buttonVariants({ variant: "primary" })}
              >
                Davam etmək üçün daxil ol
              </Link>
            )}

            {isSensitive && (
              <Link href="/anonymous" className={buttonVariants({ variant: "secondary" })}>
                Anonim müraciət et
              </Link>
            )}

            <Link href="/services" className={buttonVariants({ variant: "secondary" })}>
              Başqa xidmət seç
            </Link>
          </CardActions>
        </Card>
      )}

      {!isPending && !isError && !bestMatch && (
        <div className="flex flex-col items-center gap-4 rounded-card bg-surface p-12 text-center shadow-sm">
          <Inbox className="size-6 text-text-secondary" aria-hidden="true" />
          <p className="text-body text-text-secondary">
            Dəqiq uyğun xidmət tapılmadı. Bütün xidmətlərə baxa və ya başqa yolla müraciət edə bilərsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/services" className={buttonVariants({ variant: "primary" })}>
              Bütün xidmətlərə bax
            </Link>
            {isSensitive && (
              <Link href="/anonymous" className={buttonVariants({ variant: "secondary" })}>
                Anonim müraciət et
              </Link>
            )}
          </div>
        </div>
      )}

      <Button type="button" variant="secondary" onClick={onBack} className="w-full">
        Geri
      </Button>
    </div>
  );
}
