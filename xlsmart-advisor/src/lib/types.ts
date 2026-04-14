export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  target_industries: string[];
  target_company_size: string;
  key_features: string[];
  use_cases: string[];
  tagline?: string;
  pricing?: string;
}

export interface Recommendation {
  product_id: string;
  product_name: string;
  fit_reason: string;
  cta: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  summary: string;
  fallback?: boolean;
}

export interface RecommendRequest {
  industry: string;
  industryLabel: string;
  companySize: string;
  companySizeLabel: string;
  primaryNeeds: string[];
  primaryNeedsLabels: string[];
}

export interface QuestionOption {
  value: string;
  label: string;
  label_en: string;
}

export interface Question {
  id: string;
  label: string;
  label_en: string;
  type: string;
  required: boolean;
  options: QuestionOption[];
  max_selections?: number;
  hint?: string;
  hint_en?: string;
}
