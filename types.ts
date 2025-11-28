import React from 'react';

export enum TabView {
  OVERVIEW = 'OVERVIEW',
  PSYCHOMETRICS = 'PSYCHOMETRICS',
  RETENTION = 'RETENTION',
  ARCHITECTURE = 'ARCHITECTURE'
}

export type Department = 'فنی' | 'محصول' | 'فروش' | 'دیزاین' | 'پشتیبانی' | 'منابع انسانی' | 'مارکتینگ';

export interface Psychometrics {
  // The Big Three (Job Attitudes)
  commitment: {
    affective: number;   // "I stay because I love it" (Strongest predictor)
    continuance: number; // "I stay because I have to"
    normative: number;   // "I stay out of obligation"
  };
  jobSatisfaction: number;
  engagement: number;

  // Justice & Relationships
  justice: {
    distributive: number; // Fair pay/rewards
    procedural: number;   // Fair processes
    interactional: number; // Respectful treatment
  };
  lmx: number; // Leader-Member Exchange (Relationship with manager)
  pos: number; // Perceived Organizational Support

  // Fit & Health
  burnout: number; // Emotional exhaustion
  contractBreach: boolean; // Broken promises
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: Department;
  avatar: string;
  metrics: Psychometrics;
  churnRisk: number; // 0-100 (Calculated by AI Model)
  riskFactors: string[];
  suggestedAction: string;
}

export interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  colorClass?: string;
}

export interface SkillMetric {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

export interface LikertData {
  category: string;
  strongDisagree: number;
  disagree: number;
  neutral: number;
  agree: number;
  strongAgree: number;
}

export interface SimulationState {
  justiceImprovement: number;
  lmxImprovement: number;
  burnoutReduction: number;
  commitmentBoost: number;
}