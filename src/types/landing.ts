export interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  urgent?: boolean;
}

export interface HowItWorksStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface WhyCompathItem {
  id: string;
  icon: string;
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
}

export interface TrustPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  emergencyText: string;
}
