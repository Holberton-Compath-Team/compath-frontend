"use client";

import { Button } from "@/components/ui/button";
import type { NeedCategory, NeedTopic } from "@/types/needs-assessment";
import { cn } from "@/utils/cn";

interface NeedsAssessmentTopicStepProps {
  category: NeedCategory;
  topics: NeedTopic[];
  selectedTopicId: string | null;
  onSelectTopic: (id: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}

export function NeedsAssessmentTopicStep({
  category,
  topics,
  selectedTopicId,
  onSelectTopic,
  onBack,
  onNext,
}: NeedsAssessmentTopicStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-h2 text-text-primary">{category.label} mövzusunda daha dəqiq nə var?</h2>
        <p className="text-body text-text-secondary">
          İstəyə bağlıdır, keçmək istəsəniz birbaşa davam edə bilərsiniz.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {topics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;

          return (
            <button
              key={topic.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectTopic(isSelected ? null : topic.id)}
              className={cn(
                "rounded-lg border px-4 py-2 text-small font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ku-green focus-visible:ring-offset-2",
                isSelected
                  ? "border-ku-green bg-ku-green-soft/40 text-ku-green-dark"
                  : "border-border bg-surface text-text-primary hover:border-ku-green hover:bg-ku-green-soft/20",
              )}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 tablet:flex-row">
        <Button type="button" variant="secondary" onClick={onBack} className="w-full tablet:w-auto">
          Geri
        </Button>
        <Button type="button" onClick={onNext} className="w-full tablet:flex-1">
          Davam et
        </Button>
      </div>
    </div>
  );
}
