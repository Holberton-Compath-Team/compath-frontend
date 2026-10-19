"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { NEED_CATEGORIES, getTopicsForCategory } from "@/constants/needs-assessment";
import type { NeedCategoryId, StudentStatus, UrgencyLevel } from "@/types/needs-assessment";
import { inferCategoryFromText } from "@/utils/needs-assessment";

import { NeedsAssessmentCategoryStep } from "./needs-assessment-category-step";
import { NeedsAssessmentQuestionsStep } from "./needs-assessment-questions-step";
import { NeedsAssessmentResultStep } from "./needs-assessment-result-step";
import { NeedsAssessmentTopicStep } from "./needs-assessment-topic-step";

type Step = "category" | "topic" | "questions" | "result";

const CATEGORY_IDS = NEED_CATEGORIES.map((category) => category.id);

function isNeedCategoryId(value: string | null): value is NeedCategoryId {
  return value === "academic" || value === "administrative" || value === "sensitive";
}

export function NeedsAssessmentFlow() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory = isNeedCategoryId(categoryParam) ? categoryParam : null;

  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<NeedCategoryId | null>(initialCategory);
  const [freeText, setFreeText] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<UrgencyLevel | null>(null);
  const [status, setStatus] = useState<StudentStatus | null>(null);

  const effectiveCategoryId = useMemo(
    () => selectedCategory ?? inferCategoryFromText(freeText, CATEGORY_IDS),
    [selectedCategory, freeText],
  );

  const effectiveCategory = NEED_CATEGORIES.find((category) => category.id === effectiveCategoryId) ?? null;
  const topics = effectiveCategoryId ? getTopicsForCategory(effectiveCategoryId) : [];
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) ?? null;

  function handleCategoryNext() {
    setStep(effectiveCategoryId ? "topic" : "questions");
  }

  function handleTopicBack() {
    setStep("category");
  }

  function handleQuestionsBack() {
    setStep(effectiveCategoryId ? "topic" : "category");
  }

  function handleResultBack() {
    setStep("questions");
  }

  return (
    <div className="flex flex-col gap-8">
      {step === "category" && (
        <NeedsAssessmentCategoryStep
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          freeText={freeText}
          onFreeTextChange={setFreeText}
          onNext={handleCategoryNext}
        />
      )}

      {step === "topic" && effectiveCategory && (
        <NeedsAssessmentTopicStep
          category={effectiveCategory}
          topics={topics}
          selectedTopicId={selectedTopicId}
          onSelectTopic={setSelectedTopicId}
          onBack={handleTopicBack}
          onNext={() => setStep("questions")}
        />
      )}

      {step === "questions" && (
        <NeedsAssessmentQuestionsStep
          urgency={urgency}
          onUrgencyChange={setUrgency}
          status={status}
          onStatusChange={setStatus}
          onBack={handleQuestionsBack}
          onNext={() => setStep("result")}
        />
      )}

      {step === "result" && urgency && status && (
        <NeedsAssessmentResultStep
          category={effectiveCategoryId}
          freeText={freeText}
          topic={selectedTopic}
          urgency={urgency}
          status={status}
          onBack={handleResultBack}
        />
      )}
    </div>
  );
}
