export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  image?: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface CalculatorState {
  serviceType: string;
  scale: string;
  timeline: string;
  extraFeatures: string[];
  name: string;
  phone: string;
}
