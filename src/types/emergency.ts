export interface EmergencyContact {
  phone: string | null;
  label: string;
  description: string;
}

export interface SafetyGuideCategory {
  title: string;
  steps: string[];
}
