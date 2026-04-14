import type { Product, Recommendation, RecommendationResponse, RecommendRequest } from './types';
import { getProductById } from './products';

// Need value -> category key mapping
const NEED_MAP: Record<string, string> = {
  connectivity: 'connectivity',
  iot_automation: 'iot',
  security: 'security',
  cloud_collaboration: 'cloud',
  ai_analytics: 'ai',
  operations_software: 'ops',
  fleet_logistics: 'fleet',
  employee_mobility: 'mobility',
};

// Section 1: Primary Need × Company Size
const MATRIX: Record<string, Record<string, string[]>> = {
  connectivity: {
    small: ['xl-satu-biz'],
    medium: ['xl-satu-biz', 'gsm-prepaid'],
    large_sme: ['internet-corporate', 'gsm-postpaid'],
    enterprise: ['internet-corporate', 'vpn-mpls'],
  },
  iot: {
    small: ['m-access'],
    medium: ['m-access'],
    large_sme: ['m-access', 'connectivity-plus'],
    enterprise: ['m-access', 'connectivity-plus'],
  },
  security: {
    small: ['managed-it-and-security'],
    medium: ['managed-it-and-security', 'google-workspace'],
    large_sme: ['sdwan-plus', 'managed-it-and-security'],
    enterprise: ['vpn-mpls', 'sdwan-plus'],
  },
  cloud: {
    small: ['google-workspace'],
    medium: ['google-workspace', 'cloud-services'],
    large_sme: ['google-workspace', 'cloud-services'],
    enterprise: ['cloud-services', 'sdwan-plus'],
  },
  ai: {
    small: ['ai-chatbot'],
    medium: ['ai-chatbot', 'biz-analytics-suite'],
    large_sme: ['biz-analytics-suite', 'ai-chatbot'],
    enterprise: ['biz-analytics-suite'],
  },
  ops: {
    small: ['smart-pos-clinic-hris-accounting'],
    medium: ['smart-pos-clinic-hris-accounting', 'managed-it-and-security'],
    large_sme: ['managed-it-and-security', 'smart-pos-clinic-hris-accounting'],
    enterprise: ['managed-it-and-security'],
  },
  fleet: {
    small: ['smart-transportation'],
    medium: ['smart-transportation', 'connectivity-plus'],
    large_sme: ['smart-transportation', 'connectivity-plus'],
    enterprise: ['smart-transportation', 'connectivity-plus'],
  },
  mobility: {
    small: ['gsm-prepaid', 'infinet-go'],
    medium: ['gsm-prepaid', 'digital-rewards-bulk-data'],
    large_sme: ['gsm-postpaid'],
    enterprise: ['gsm-postpaid', 'digital-rewards-bulk-data'],
  },
};

// Section 2: Industry boosters
const INDUSTRY_BOOSTERS: Record<string, { product: string; conditions: string[] }> = {
  agriculture: { product: 'smart-agriculture', conditions: ['iot', 'connectivity'] },
  oil_gas: { product: 'private-network', conditions: ['*'] },
  mining: { product: 'smart-mining', conditions: ['iot', 'connectivity'] },
  manufacturing: { product: 'smart-manufacture', conditions: ['iot'] },
  healthcare: { product: 'smart-healthcare', conditions: ['iot', 'ops'] },
  logistics_transportation: { product: 'smart-transportation', conditions: ['fleet', 'iot'] },
  government: { product: 'smart-city', conditions: ['iot'] },
  hospitality: { product: 'managed-wifi', conditions: ['connectivity', 'ops'] },
  fnb: { product: 'managed-wifi', conditions: ['connectivity', 'ops'] },
  retail: { product: 'biz-analytics-suite', conditions: ['ai'] },
  banking_finance: { product: 'vpn-mpls', conditions: ['security'] },
  insurance: { product: 'vpn-mpls', conditions: ['security'] },
  fmcg: { product: 'biz-analytics-suite', conditions: ['ai'] },
  ecommerce: { product: 'biz-analytics-suite', conditions: ['ai'] },
};

// Section 3: Multi-need combos
const MULTI_NEED_COMBOS: Array<{
  needA: string;
  needB: string;
  smallMedium: string[];
  largePlus: string[];
}> = [
  { needA: 'connectivity', needB: 'cloud', smallMedium: ['xl-satu-biz', 'google-workspace'], largePlus: ['internet-corporate', 'google-workspace'] },
  { needA: 'connectivity', needB: 'security', smallMedium: ['managed-it-and-security', 'xl-satu-biz'], largePlus: ['sdwan-plus', 'internet-corporate'] },
  { needA: 'iot', needB: 'fleet', smallMedium: ['smart-transportation', 'm-access'], largePlus: ['smart-transportation', 'connectivity-plus'] },
  { needA: 'cloud', needB: 'ai', smallMedium: ['google-workspace', 'ai-chatbot'], largePlus: ['cloud-services', 'biz-analytics-suite'] },
  { needA: 'ops', needB: 'cloud', smallMedium: ['smart-pos-clinic-hris-accounting', 'google-workspace'], largePlus: ['managed-it-and-security', 'cloud-services'] },
];

const SME_SIZES = new Set(['small', 'medium', 'large_sme']);

function applySuppression(ids: string[], companySize: string): string[] {
  return ids.filter((id) => {
    if (id === 'leased-line') return false;
    if (id === 'biz-analytics-suite' && companySize === 'small') return false;
    return true;
  });
}

function isSmallOrMedium(size: string): boolean {
  return size === 'small' || size === 'medium';
}

function buildRec(product: Product, reason: string): Recommendation {
  const ctaEnd = 'Hubungi tim sales XLSMART untuk konsultasi gratis.';
  const pricing = product.id === 'gsm-postpaid' ? ` (mulai IDR 65.000/bulan per line)` : '';
  return {
    product_id: product.id,
    product_name: product.name,
    fit_reason: reason + pricing,
    cta: `Pelajari lebih lanjut tentang ${product.name} untuk bisnis Anda. ${ctaEnd}`,
  };
}

export function getFallbackRecommendation(req: RecommendRequest): RecommendationResponse {
  const { industry, companySize, primaryNeeds } = req;
  const needKeys = primaryNeeds.map((n) => NEED_MAP[n] ?? n);

  let productIds: string[] = [];

  // Section 3: multi-need combo
  if (needKeys.length === 2) {
    const [a, b] = needKeys;
    const combo = MULTI_NEED_COMBOS.find(
      (c) => (c.needA === a && c.needB === b) || (c.needA === b && c.needB === a),
    );
    if (combo) {
      productIds = isSmallOrMedium(companySize) ? combo.smallMedium : combo.largePlus;
    }
  }

  // Section 1: single need
  if (productIds.length === 0 && needKeys.length > 0) {
    const key = needKeys[0];
    const sizeRow = MATRIX[key]?.[companySize];
    if (sizeRow) productIds = [...sizeRow];
  }

  // Section 2: industry booster
  const booster = INDUSTRY_BOOSTERS[industry];
  if (booster) {
    const applies = booster.conditions.includes('*') || needKeys.some((k) => booster.conditions.includes(k));
    if (applies && !productIds.includes(booster.product)) {
      productIds = [booster.product, ...productIds.filter((id) => id !== booster.product)];
    }
  }

  // Section 4: default fallback
  if (productIds.length === 0) {
    if (isSmallOrMedium(companySize)) {
      productIds = ['xl-satu-biz', 'google-workspace'];
    } else if (companySize === 'large_sme') {
      productIds = ['internet-corporate', 'managed-it-and-security'];
    } else {
      productIds = ['internet-corporate', 'sdwan-plus'];
    }
  }

  // Apply suppression rules
  productIds = applySuppression(productIds, companySize);

  // Also suppress enterprise-only products for SMEs
  if (SME_SIZES.has(companySize)) {
    productIds = productIds.filter((id) => !['vpn-mpls', 'private-network'].includes(id) || industry === 'oil_gas' || industry === 'banking_finance' || industry === 'insurance');
  }

  // Take top 2
  const topIds = productIds.slice(0, 2);
  const products = topIds.map((id) => getProductById(id)).filter((p): p is Product => p !== undefined);

  const recommendations: Recommendation[] = products.map((p) =>
    buildRec(
      p,
      req.primaryNeedsLabels.length > 0
        ? `${p.name} sangat cocok untuk bisnis ${req.industryLabel} dengan ukuran ${req.companySizeLabel} berdasarkan kebutuhan ${req.primaryNeedsLabels.join(' dan ')}.`
        : `${p.name} sangat cocok untuk bisnis ${req.industryLabel} dengan ukuran ${req.companySizeLabel}.`,
    ),
  );

  const summary = req.primaryNeedsLabels.length > 0
    ? `Untuk bisnis Anda di sektor ${req.industryLabel} dengan ${req.companySizeLabel}, kami merekomendasikan solusi XLSMART yang paling sesuai dengan kebutuhan ${req.primaryNeedsLabels.join(' dan ')}.`
    : `Untuk bisnis Anda di sektor ${req.industryLabel} dengan ${req.companySizeLabel}, kami merekomendasikan solusi XLSMART berikut.`;

  return { recommendations, summary, fallback: true };
}
