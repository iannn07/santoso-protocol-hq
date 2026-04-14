'use client';

import { useState } from 'react';
import { getCompanySizeOptions, getPrimaryNeedOptions } from '@/lib/questions';

interface BusinessProfileProps {
  onSubmit: (
    companySize: string,
    companySizeLabel: string,
    primaryNeeds: string[],
    primaryNeedsLabels: string[],
  ) => void;
  onBack: () => void;
  loading: boolean;
  error: string | null;
  initialCompanySize?: string;
  initialNeeds?: string[];
}

const SIZE_OPTIONS = getCompanySizeOptions();
const NEED_OPTIONS = getPrimaryNeedOptions();
const MAX_NEEDS = 2;

export function BusinessProfile({ onSubmit, onBack, loading, error, initialCompanySize = '', initialNeeds = [] }: BusinessProfileProps) {
  const [companySize, setCompanySize] = useState(initialCompanySize);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(initialNeeds);

  function toggleNeed(value: string) {
    setSelectedNeeds((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= MAX_NEEDS) return prev;
      return [...prev, value];
    });
  }

  const canSubmit = companySize && !loading;

  function handleSubmit() {
    const sizeOpt = SIZE_OPTIONS.find((o) => o.value === companySize);
    const needOpts = NEED_OPTIONS.filter((o) => selectedNeeds.includes(o.value));
    if (!sizeOpt) return;
    onSubmit(
      companySize,
      sizeOpt.label_en,
      selectedNeeds,
      needOpts.map((o) => o.label_en),
    );
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Profil Bisnis Anda</h2>
      <p className="text-sm text-slate-500 mb-6">Bantu kami memahami skala dan kebutuhan bisnis Anda.</p>

      <fieldset className="mb-7">
        <legend className="text-sm font-semibold text-slate-700 mb-3">
          Ukuran Perusahaan <span className="text-red-400">*</span>
        </legend>
        <div className="flex flex-col gap-2">
          {SIZE_OPTIONS.map((opt) => {
            const isSelected = companySize === opt.value;
            return (
              <label
                key={opt.value}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="company_size"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => setCompanySize(opt.value)}
                  className="sr-only"
                />
                <div
                  className={[
                    'w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors',
                    isSelected ? 'border-blue-500' : 'border-slate-300',
                  ].join(' ')}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className={[
                  'text-sm font-medium',
                  isSelected ? 'text-blue-700' : 'text-slate-700',
                ].join(' ')}>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mb-7">
        <legend className="text-sm font-semibold text-slate-700 mb-1">
          Kebutuhan Utama <span className="text-slate-400 text-xs font-normal">(opsional)</span>
        </legend>
        <p className="text-xs text-slate-400 mb-3">Pilih maksimal 2 kebutuhan utama.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NEED_OPTIONS.map((opt) => {
            const isSelected = selectedNeeds.includes(opt.value);
            const isDisabled = !isSelected && selectedNeeds.length >= MAX_NEEDS;
            return (
              <label
                key={opt.value}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200',
                  isDisabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100'
                    : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => toggleNeed(opt.value)}
                  className="sr-only"
                />
                <div
                  className={[
                    'w-[18px] h-[18px] rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors',
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300',
                  ].join(' ')}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={[
                  'text-sm font-medium',
                  isSelected ? 'text-blue-700' : 'text-slate-700',
                ].join(' ')}>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-[15px] transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-[2] btn-accent py-3.5 rounded-xl text-white font-semibold text-[15px] disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Memproses...
            </span>
          ) : (
            'Dapatkan Rekomendasi'
          )}
        </button>
      </div>
    </div>
  );
}
