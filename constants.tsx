import { Employee, Psychometrics, SimulationState, Department } from './types';

// ==========================================
// AI MODEL CONFIGURATION (Random Forest Sim)
// ==========================================
// These weights simulate the "Feature Importance" extracted from a trained model
export const AI_MODEL_WEIGHTS = {
  affectiveCommitment: 0.30, // Most critical: Love for the job
  lmx: 0.25,                 // Critical: Relationship with manager
  burnout: 0.20,             // Health factor
  justice: 0.15,             // Fairness
  contractBreach: 0.10       // Trust
};

/**
 * Calculates Churn Risk based on psychological metrics and optional simulation adjustments.
 * This simulates the inference step of an ML model.
 */
export const calculateRiskScore = (metrics: Psychometrics, sim: SimulationState = { justiceImprovement: 0, lmxImprovement: 0, burnoutReduction: 0, commitmentBoost: 0 }): number => {
  // Apply Simulation Modifiers (Clamped 0-100)
  // Logic: Improvement % increases the score towards 100 (except burnout which decreases towards 0)
  
  const modCommitment = Math.min(100, metrics.commitment.affective * (1 + sim.commitmentBoost / 100));
  const modLMX = Math.min(100, metrics.lmx * (1 + sim.lmxImprovement / 100));
  
  // Justice is avg of 3 components
  const baseJustice = (metrics.justice.distributive + metrics.justice.procedural + metrics.justice.interactional) / 3;
  const modJustice = Math.min(100, baseJustice * (1 + sim.justiceImprovement / 100));
  
  // Burnout reduction means lowering the score
  const modBurnout = Math.max(0, metrics.burnout * (1 - sim.burnoutReduction / 100));

  // Risk Calculation Logic (Inverted: High Score = Low Risk)
  // Risk = Weight * (100 - PositiveMetric) OR Weight * (NegativeMetric)
  
  let riskScore = 0;
  
  riskScore += (100 - modCommitment) * AI_MODEL_WEIGHTS.affectiveCommitment;
  riskScore += (100 - modLMX) * AI_MODEL_WEIGHTS.lmx;
  riskScore += modBurnout * AI_MODEL_WEIGHTS.burnout;
  riskScore += (100 - modJustice) * AI_MODEL_WEIGHTS.justice;
  
  if (metrics.contractBreach) {
    riskScore += 100 * AI_MODEL_WEIGHTS.contractBreach;
  }

  return Math.min(100, Math.round(riskScore));
};

const getRiskFactorsAndAction = (metrics: Psychometrics, riskScore: number): { factors: string[], action: string } => {
  const factors = [];
  let action = "پایش دوره‌ای";

  if (riskScore < 30) return { factors: [], action: "حفظ وضعیت موجود" };

  if (metrics.commitment.affective < 50) factors.push("تعهد عاطفی پایین");
  if (metrics.lmx < 50) factors.push("رابطه ضعیف با مدیر");
  if (metrics.burnout > 60) factors.push("خطر فرسودگی");
  if (metrics.contractBreach) factors.push("نقض قرارداد روانشناختی");
  if ((metrics.justice.distributive + metrics.justice.procedural) / 2 < 50) factors.push("احساس بی‌عدالتی");

  // Prioritize Action
  if (metrics.contractBreach) action = "جلسه فوری ترمیم اعتماد";
  else if (metrics.burnout > 70) action = "کاهش بار کاری و مرخصی اجباری";
  else if (metrics.lmx < 40) action = "کوچینگ مدیر مستقیم";
  else if (metrics.commitment.affective < 40) action = "بازنگری در غنی‌سازی شغلی";
  else action = "مصاحبه ماندگاری (Stay Interview)";

  return { factors, action };
};

// ==========================================
// MOCK DATA GENERATOR (50 Employees)
// ==========================================

const MALE_NAMES = ['علی', 'محمد', 'حسین', 'رضا', 'امید', 'کیان', 'آرش', 'بهنام', 'کامران', 'سیاوش', 'احسان', 'مهدی', 'نیما', 'پارسا', 'شایان'];
const FEMALE_NAMES = ['سارا', 'مریم', 'نازنین', 'زهرا', 'نیلوفر', 'ساناز', 'الناز', 'مینا', 'پریا', 'رها', 'بهار', 'عسل', 'تارا', 'آوا', 'لیلا'];
const LAST_NAMES = ['احمدی', 'رضایی', 'کمالی', 'کاظمی', 'ایزدی', 'موسوی', 'کریمی', 'حسینی', 'راد', 'جلالی', 'نوری', 'صادقی', 'محمدی', 'فراهانی', 'شریفی', 'جمشیدی'];

const ROLES: Record<Department, string[]> = {
  'فنی': ['Backend Dev', 'Frontend Dev', 'DevOps', 'QA Engineer', 'Tech Lead'],
  'محصول': ['Product Manager', 'Product Owner', 'Scrum Master'],
  'دیزاین': ['Product Designer', 'UI/UX Designer', 'Graphic Designer'],
  'فروش': ['Sales Expert', 'Account Manager', 'Sales Lead'],
  'پشتیبانی': ['Support Agent', 'Support Lead'],
  'منابع انسانی': ['HRBP', 'Recruiter'],
  'مارکتینگ': ['Content Specialist', 'SEO Expert', 'Marketing Manager']
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateEmployees = (count: number): Employee[] => {
  return Array.from({ length: count }, (_, i) => {
    const dept = randomChoice(Object.keys(ROLES)) as Department;
    const role = randomChoice(ROLES[dept]);
    
    // Gender Logic for correct avatar mapping
    const isMale = Math.random() > 0.5;
    const firstName = isMale ? randomChoice(MALE_NAMES) : randomChoice(FEMALE_NAMES);
    const lastName = randomChoice(LAST_NAMES);
    
    // Using randomuser.me which is very reliable and supports gender filtering
    // Random ID between 1 and 99 to get different faces
    const avatarId = randomInt(1, 99);
    const avatar = `https://randomuser.me/api/portraits/${isMale ? 'men' : 'women'}/${avatarId}.jpg`;

    // Create correlated metrics
    // e.g., if manager is bad (Low LMX), justice is likely perceived low
    const lmx = randomInt(20, 95);
    const justiceBase = lmx < 50 ? randomInt(20, 60) : randomInt(50, 95);
    
    // If burnout is high, satisfaction is likely low
    const burnout = randomInt(10, 95);
    const satisfaction = burnout > 70 ? randomInt(10, 50) : randomInt(50, 95);

    const metrics: Psychometrics = {
      commitment: {
        affective: randomInt(20, 100),
        continuance: randomInt(20, 100),
        normative: randomInt(20, 100)
      },
      jobSatisfaction: satisfaction,
      engagement: randomInt(20, 100),
      justice: {
        distributive: justiceBase,
        procedural: randomInt(justiceBase - 10, justiceBase + 10),
        interactional: lmx // Highly correlated with LMX
      },
      lmx: lmx,
      pos: randomInt(20, 100),
      burnout: burnout,
      contractBreach: Math.random() < 0.15 // 15% chance
    };

    const riskScore = calculateRiskScore(metrics);
    const analysis = getRiskFactorsAndAction(metrics, riskScore);

    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      role,
      department: dept,
      avatar,
      metrics,
      churnRisk: riskScore,
      riskFactors: analysis.factors,
      suggestedAction: analysis.action
    };
  });
};

export const MOCK_EMPLOYEES = generateEmployees(50);
export const METABASE_EMBED_URL = "https://stats.example.com/embed/dashboard/mock";