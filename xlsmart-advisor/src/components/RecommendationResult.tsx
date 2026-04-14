'use client';

import type { RecommendationResponse, Recommendation } from '@/lib/types';

interface RecommendationResultProps {
  result: RecommendationResponse;
  industryLabel: string;
  companySizeLabel: string;
  onReset: () => void;
}

const TELEGRAM_URL = 'https://t.me/xlsmart_sales';

function ProductCard({ rec, rank }: { rec: Recommendation; rank: number }) {
  const isGsmPostpaid = rec.product_id === 'gsm-postpaid';

  return (
    <div className="rounded-2xl border-2 p-5 bg-white" style={{ borderColor: rank === 1 ? '#7B2FBE' : '#e5e7eb' }}>
      {rank === 1 && (
        <span
          className="inline-block text-xs font-bold text-white px-2 py-0.5 rounded-full mb-3"
          style={{ backgroundColor: '#7B2FBE' }}
        >
          Rekomendasi Utama
        </span>
      )}
      {rank === 2 && (
        <span className="inline-block text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-3">
          Alternatif
        </span>
      )}

      <h3 className="text-lg font-bold text-gray-900 mb-1">{rec.product_name}</h3>

      {isGsmPostpaid && (
        <p className="text-sm font-semibold mb-2" style={{ color: '#7B2FBE' }}>
          Mulai IDR 65.000/bulan per line
        </p>
      )}

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{rec.fit_reason}</p>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90',
          rank === 1 ? 'text-white' : 'text-white',
        ].join(' ')}
        style={{ backgroundColor: rank === 1 ? '#7B2FBE' : '#5c2090' }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm5.562 8.247l-2.012 9.485c-.148.672-.543.836-1.101.52l-3.028-2.232-1.46 1.404c-.16.16-.298.298-.613.298l.218-3.087 5.622-5.08c.245-.217-.053-.338-.38-.12L6.93 14.54l-2.978-.93c-.647-.2-.66-.648.135-.96l11.624-4.48c.54-.196 1.012.13.85.077z" />
        </svg>
        Konsultasi Sekarang
      </a>
    </div>
  );
}

export function RecommendationResult({ result, industryLabel, companySizeLabel, onReset }: RecommendationResultProps) {
  return (
    <div>
      <div className="mb-5 p-4 rounded-2xl" style={{ backgroundColor: '#f5eeff' }}>
        <p className="text-sm font-medium" style={{ color: '#5c2090' }}>
          Berdasarkan profil Anda: <strong>{industryLabel}</strong> · <strong>{companySizeLabel}</strong>
        </p>
      </div>

      {result.summary && (
        <p className="text-gray-700 text-sm leading-relaxed mb-5">{result.summary}</p>
      )}

      <div className="flex flex-col gap-4 mb-6">
        {result.recommendations.map((rec, idx) => (
          <ProductCard key={rec.product_id} rec={rec} rank={idx + 1} />
        ))}
      </div>

      {result.fallback && (
        <p className="text-xs text-gray-400 text-center mb-4">
          * Rekomendasi ini dihasilkan berdasarkan matriks keputusan.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-colors"
      >
        Mulai Ulang
      </button>
    </div>
  );
}
