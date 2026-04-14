'use client';

import { getIndustryOptions } from '@/lib/questions';

interface IndustrySelectorProps {
  selectedIndustry: string;
  onSelect: (value: string, label: string) => void;
  onNext: () => void;
}

const INDUSTRY_OPTIONS = getIndustryOptions();

const ICON_MAP: Record<string, string> = {
  agriculture: '🌾',
  banking_finance: '🏦',
  construction: '🏗️',
  consulting_professional: '💼',
  ecommerce: '🛒',
  education: '🎓',
  energy_utilities: '⚡',
  events: '🎪',
  fnb: '🍽️',
  fmcg: '📦',
  government: '🏛️',
  healthcare: '🏥',
  hospitality: '🏨',
  insurance: '🛡️',
  logistics_transportation: '🚛',
  manufacturing: '🏭',
  media_advertising: '📺',
  mining: '⛏️',
  oil_gas: '🛢️',
  retail: '🛍️',
  technology: '💻',
  other: '🔷',
};

export function IndustrySelector({ selectedIndustry, onSelect, onNext }: IndustrySelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Apa industri bisnis Anda?</h2>
      <p className="text-sm text-gray-500 mb-5">Pilih industri yang paling sesuai.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {INDUSTRY_OPTIONS.map((opt) => {
          const isSelected = selectedIndustry === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value, opt.label_en)}
              className={[
                'flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-xl border-2 text-sm font-medium transition-all text-center cursor-pointer',
                isSelected
                  ? 'border-purple-600 bg-purple-50 text-purple-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
              style={isSelected ? { borderColor: '#7B2FBE', backgroundColor: '#f5eeff', color: '#5c2090' } : {}}
            >
              <span className="text-xl">{ICON_MAP[opt.value] ?? '🔷'}</span>
              <span className="leading-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!selectedIndustry}
        className="w-full py-3 rounded-xl text-white font-semibold text-base transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#7B2FBE' }}
      >
        Lanjutkan →
      </button>
    </div>
  );
}
