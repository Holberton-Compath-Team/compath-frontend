import type { LucideIcon } from "lucide-react";

import type { Service } from "@/types/service";

export type NeedCategoryId = "academic" | "administrative" | "sensitive";

export interface NeedCategory {
  id: NeedCategoryId;
  label: string;
  icon: LucideIcon;
}

export interface NeedTopic {
  id: string;
  categoryId: NeedCategoryId;
  label: string;
  keywords: string[];
  urgent?: boolean;
}

export type UrgencyLevel = "not_urgent" | "few_days" | "today";

export type StudentStatus = "student" | "graduate";

export interface NeedOption<T extends string> {
  id: T;
  label: string;
}

export interface MatchResult {
  service: Service;
  score: number;
  matchedKeywords: string[];
}
