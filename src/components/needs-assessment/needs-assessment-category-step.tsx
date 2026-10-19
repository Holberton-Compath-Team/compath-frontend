"use client";

import { Button } from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";
import { NEED_CATEGORIES, NEED_DESCRIPTION_MAX_LENGTH } from "@/constants/needs-assessment";
import type { NeedCategoryId } from "@/types/needs-assessment";
import { cn } from "@/utils/cn";

interface NeedsAssessmentCategoryStepProps {
  selectedCategory: NeedCategoryId | null;
  onSelectCategory: (id: NeedCategoryId) => void;
  freeText: string;
  onFreeTextChange: (value: string) => void;
  onNext: () => void;
}

export function NeedsAssessmentCategoryStep({
  selectedCategory,
  onSelectCategory,
  freeText,
  onFreeTextChange,
  onNext,
}: NeedsAssessmentCategoryStepProps) {
  const canProceed = Boolean(selectedCategory) || freeText.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-h2 text-text-primary">Sizə hansı mövzuda dəstək lazımdır?</h2>
        <p className="text-body text-text-secondary">
          Kateqoriya seçin və ya probleminizi öz sözlərinizlə yazın.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
        {NEED_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-card border p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ku-green focus-visible:ring-offset-2",
                isSelected
                  ? "border-ku-green bg-ku-green-soft/40"
                  : "border-border bg-surface hover:border-ku-green hover:bg-ku-green-soft/20",
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-ku-green-soft text-ku-green-dark">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-small font-medium text-text-primary">{category.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="need-free-text" className="text-small font-medium text-text-primary">
          Problemi öz sözlərinizlə yazın (istəyə bağlı)
        </label>
        <textarea
          id="need-free-text"
          rows={4}
          maxLength={NEED_DESCRIPTION_MAX_LENGTH}
          value={freeText}
          onChange={(event) => onFreeTextChange(event.target.value)}
          className={inputVariants({ hasError: false })}
        />
        <p className="text-caption text-text-secondary text-right">
          {freeText.length}/{NEED_DESCRIPTION_MAX_LENGTH}
        </p>
      </div>

      <Button type="button" onClick={onNext} disabled={!canProceed} className="w-full">
        Davam et
      </Button>
    </div>
  );
}
