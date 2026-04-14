'use client';

import { getIndustryOptions } from '@/lib/questions';

interface IndustrySelectorProps {
  selectedIndustry: string;
  onSelect: (value: string, label: string) => void;
  onNext: () => void;
}

const INDUSTRY_OPTIONS = getIndustryOptions();

const ICON_MAP: Record<string, string> = {
  agriculture: '\u{1F33E}',
  banking_finance: '\u{1F3E6}',
  construction: '\u{1F3D7}',
  consulting_professional: '\u{1F4BC}',
  ecommerce: '\u{1F6D2}',
  education: '\u{1F393}',
  energy_utilities: '\u{26A1}',
  events: '\u{1F3AA}',
  fnb: '\u{1F37D}',
  fmcg: '\u{1F4E6}',
  government: '\u{1F3DB}',
  healthcare: '\u{1F3E5}',
  hospitality: '\u{1F3E8}',
  insurance: '\u{1F6E1}',
  logistics_transportation: '\u{1F69B}',
  manufacturing: '\u{1F3ED}',
  media_advertising: '\u{1F4FA}',
  mining: '\u{26CF}',
  oil_gas: '\u{1F6E2}',
  retail: '\u{1F6CD}',
  technology: '\u{1F4BB}',
  other: '\u{1F537}',
};

export function IndustrySelector({ selectedIndustry, onSelect, onNext }: IndustrySelectorProps) {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Apa industri bisnis Anda?</h2>
      <p className="text-sm text-slate-500 mb-6">Pilih industri yang paling sesuai.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
        {INDUSTRY_OPTIONS.map((opt) => {
          const isSelected = selectedIndustry === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value, opt.label_en)}
              className={[
                'industry-card flex flex-col items-center justify-center gap-1.5 px-3 py-3.5 rounded-xl border text-sm font-medium text-center cursor-pointer',
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/40',
              ].join(' ')}
            >
              <span className="text-xl leading-none">{ICON_MAP[opt.value] ?? '\u{1F537}'}</span>
              <span className="leading-tight text-[13px]">{opt.label}</span>
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!selectedIndustry}
        className="btn-primary w-full py-3.5 rounded-xl text-white font-semibold text-[15px] disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Lanjutkan
      </button>
    </div>
  );
}
