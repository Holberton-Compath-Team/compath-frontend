import {
  MOCK_CONTACT_INFO,
  MOCK_HOW_IT_WORKS_STEPS,
  MOCK_SERVICE_CATEGORIES,
  MOCK_TRUST_POINTS,
  MOCK_WHY_COMPATH_ITEMS,
} from "@/services/mock/landing.mock";
import type {
  ContactInfo,
  HowItWorksStep,
  ServiceCategory,
  TrustPoint,
  WhyCompathItem,
} from "@/types/landing";


export async function getServiceCategories(): Promise<ServiceCategory[]> {
  return Promise.resolve(MOCK_SERVICE_CATEGORIES);
}

export async function getHowItWorksSteps(): Promise<HowItWorksStep[]> {
  return Promise.resolve(MOCK_HOW_IT_WORKS_STEPS);
}

export async function getWhyCompathItems(): Promise<WhyCompathItem[]> {
  return Promise.resolve(MOCK_WHY_COMPATH_ITEMS);
}

export async function getTrustPoints(): Promise<TrustPoint[]> {
  return Promise.resolve(MOCK_TRUST_POINTS);
}

export async function getContactInfo(): Promise<ContactInfo> {
  return Promise.resolve(MOCK_CONTACT_INFO);
}
