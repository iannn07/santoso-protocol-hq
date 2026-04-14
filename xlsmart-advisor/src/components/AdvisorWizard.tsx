'use client';

import { useState } from 'react';
import { WizardProgress } from './WizardProgress';
import { IndustrySelector } from './IndustrySelector';
import { BusinessProfile } from './BusinessProfile';
import { RecommendationResult } from './RecommendationResult';
import type { RecommendationResponse } from '@/lib/types';

type WizardStep = 1 | 2 | 3;

interface WizardState {
  industry: string;
  industryLabel: string;
  companySize: string;
  companySizeLabel: string;
  primaryNeeds: string[];
  primaryNeedsLabels: string[];
}

const EMPTY_STATE: WizardState = {
  industry: '',
  industryLabel: '',
  companySize: '',
  companySizeLabel: '',
  primaryNeeds: [],
  primaryNeedsLabels: [],
};

export function AdvisorWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [formState, setFormState] = useState<WizardState>(EMPTY_STATE);
  const [result, setResult] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleIndustrySelect(value: string, label: string) {
    setFormState((prev) => ({ ...prev, industry: value, industryLabel: label }));
  }

  function handleNext() {
    if (step < 3) setStep((s) => (s + 1) as WizardStep);
  }

  function handleBack() {
    if (step > 1) {
      setStep((s) => (s - 1) as WizardStep);
      setResult(null);
      setError(null);
    }
  }

  async function handleSubmit(companySize: string, companySizeLabel: string, primaryNeeds: string[], primaryNeedsLabels: string[]) {
    const state = { ...formState, companySize, companySizeLabel, primaryNeeds, primaryNeedsLabels };
    setFormState(state);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as RecommendationResponse;
      setResult(data);
      setStep(3);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setStep(1);
    setFormState(EMPTY_STATE);
    setResult(null);
    setError(null);
  }

  return (
    <div className="w-full">
      <WizardProgress currentStep={step} />

      <div className="mt-6">
        {step === 1 && (
          <IndustrySelector
            selectedIndustry={formState.industry}
            onSelect={handleIndustrySelect}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <BusinessProfile
            onSubmit={handleSubmit}
            onBack={handleBack}
            loading={loading}
            error={error}
            initialCompanySize={formState.companySize}
            initialNeeds={formState.primaryNeeds}
          />
        )}

        {step === 3 && result && (
          <RecommendationResult
            result={result}
            industryLabel={formState.industryLabel}
            companySizeLabel={formState.companySizeLabel}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
