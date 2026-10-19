"use client";

import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS, URGENCY_OPTIONS } from "@/constants/needs-assessment";
import type { StudentStatus, UrgencyLevel } from "@/types/needs-assessment";
import { cn } from "@/utils/cn";

interface NeedsAssessmentQuestionsStepProps {
  urgency: UrgencyLevel | null;
  onUrgencyChange: (value: UrgencyLevel) => void;
  status: StudentStatus | null;
  onStatusChange: (value: StudentStatus) => void;
  onBack: () => void;
  onNext: () => void;
}

function chipClassName(isSelected: boolean) {
  return cn(
    "rounded-lg border px-4 py-2 text-small font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ku-green focus-visible:ring-offset-2",
    isSelected
      ? "border-ku-green bg-ku-green-soft/40 text-ku-green-dark"
      : "border-border bg-surface text-text-primary hover:border-ku-green hover:bg-ku-green-soft/20",
  );
}

export function NeedsAssessmentQuestionsStep({
  urgency,
  onUrgencyChange,
  status,
  onStatusChange,
  onBack,
  onNext,
}: NeedsAssessmentQuestionsStepProps) {
  const canProceed = Boolean(urgency) && Boolean(status);

  return (
    <div className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-3">
        <legend className="text-small font-medium text-text-primary">Nə qədər təcilidir?</legend>
        <div className="flex flex-wrap gap-3">
          {URGENCY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={urgency === option.id}
              onClick={() => onUrgencyChange(option.id)}
              className={chipClassName(urgency === option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-small font-medium text-text-primary">Statusunuz</legend>
        <div className="flex flex-wrap gap-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={status === option.id}
              onClick={() => onStatusChange(option.id)}
              className={chipClassName(status === option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 tablet:flex-row">
        <Button type="button" variant="secondary" onClick={onBack} className="w-full tablet:w-auto">
          Geri
        </Button>
        <Button type="button" onClick={onNext} disabled={!canProceed} className="w-full tablet:flex-1">
          Davam et
        </Button>
      </div>
    </div>
  );
}
