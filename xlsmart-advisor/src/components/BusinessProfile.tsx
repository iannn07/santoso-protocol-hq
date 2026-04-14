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
}

const SIZE_OPTIONS = getCompanySizeOptions();
const NEED_OPTIONS = getPrimaryNeedOptions();
const MAX_NEEDS = 2;

export function BusinessProfile({ onSubmit, onBack, loading, error }: BusinessProfileProps) {
  const [companySize, setCompanySize] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  function toggleNeed(value: string) {
    setSelectedNeeds((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= MAX_NEEDS) return prev;
      return [...prev, value];
    });
  }

  const canSubmit = companySize && selectedNeeds.length > 0 && !loading;

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
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Profil Bisnis Anda</h2>
      <p className="text-sm text-gray-500 mb-5">Bantu kami memahami skala dan kebutuhan bisnis Anda.</p>

      {/* Company Size */}
      <fieldset className="mb-6">
        <legend className="text-sm font-semibold text-gray-700 mb-3">
          Ukuran Perusahaan <span className="text-red-400">*</span>
        </legend>
        <div className="flex flex-col gap-2">
          {SIZE_OPTIONS.map((opt) => {
            const isSelected = companySize === opt.value;
            return (
              <label
                key={opt.value}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all',
                  isSelected
                    ? 'bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                ].join(' ')}
                style={isSelected ? { borderColor: '#7B2FBE', backgroundColor: '#f5eeff' } : {}}
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
                    'w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                  ].join(' ')}
                  style={isSelected ? { borderColor: '#7B2FBE' } : { borderColor: '#d1d5db' }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7B2FBE' }} />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Primary Needs */}
      <fieldset className="mb-6">
        <legend className="text-sm font-semibold text-gray-700 mb-1">
          Kebutuhan Utama <span className="text-red-400">*</span>
        </legend>
        <p className="text-xs text-gray-400 mb-3">Pilih maksimal 2 kebutuhan utama.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NEED_OPTIONS.map((opt) => {
            const isSelected = selectedNeeds.includes(opt.value);
            const isDisabled = !isSelected && selectedNeeds.length >= MAX_NEEDS;
            return (
              <label
                key={opt.value}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all',
                  isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                  isSelected ? 'bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300',
                ].join(' ')}
                style={isSelected ? { borderColor: '#7B2FBE', backgroundColor: '#f5eeff' } : {}}
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
                    'w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center',
                  ].join(' ')}
                  style={
                    isSelected
                      ? { borderColor: '#7B2FBE', backgroundColor: '#7B2FBE' }
                      : { borderColor: '#d1d5db' }
                  }
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-800">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-base transition-colors hover:border-gray-300 disabled:opacity-40"
        >
          ← Kembali
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-2 flex-1 py-3 rounded-xl text-white font-semibold text-base transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#7B2FBE' }}
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
            'Dapatkan Rekomendasi →'
          )}
        </button>
      </div>
    </div>
  );
}
