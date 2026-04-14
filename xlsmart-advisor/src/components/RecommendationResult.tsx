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
  const isPrimary = rank === 1;
  const isGsmPostpaid = rec.product_id === 'gsm-postpaid';

  return (
    <div
      className={[
        'rounded-2xl p-5 transition-all duration-300',
        isPrimary
          ? 'bg-white border-2 border-blue-500 shadow-lg shadow-blue-50'
          : 'bg-slate-50 border border-slate-200',
      ].join(' ')}
    >
      <div className="flex items-start justify-between mb-3">
        {isPrimary ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Rekomendasi Utama
          </span>
        ) : (
          <span className="inline-flex items-center text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Alternatif
          </span>
        )}
      </div>

      <h3 className={[
        'text-lg font-bold mb-1',
        isPrimary ? 'text-slate-900' : 'text-slate-800',
      ].join(' ')}>
        {rec.product_name}
      </h3>

      {isGsmPostpaid && (
        <p className="text-sm font-semibold text-blue-600 mb-2">
          Mulai IDR 65.000/bulan per line
        </p>
      )}

      <p className={[
        'text-sm leading-relaxed mb-4',
        isPrimary ? 'text-slate-600' : 'text-slate-500',
      ].join(' ')}>
        {rec.fit_reason}
      </p>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all',
          isPrimary
            ? 'btn-accent text-white'
            : 'btn-primary text-white',
        ].join(' ')}
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
    <div className="animate-fade-in-up">
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
        <p className="text-sm font-medium text-blue-800">
          Berdasarkan profil Anda: <strong>{industryLabel}</strong> &middot; <strong>{companySizeLabel}</strong>
        </p>
      </div>

      {result.summary && (
        <div className="mb-6 pl-4 border-l-3 border-blue-400">
          <p className="text-slate-600 text-sm leading-relaxed italic">{result.summary}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 mb-6">
        {result.recommendations.map((rec, idx) => (
          <ProductCard key={rec.product_id} rec={rec} rank={idx + 1} />
        ))}
      </div>

      {result.fallback && (
        <p className="text-xs text-slate-400 text-center mb-5">
          * Rekomendasi ini dihasilkan berdasarkan matriks keputusan.
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="w-full py-3 rounded-xl border border-slate-200 text-slate-500 font-medium text-sm hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 transition-all"
      >
        Mulai Ulang
      </button>
    </div>
  );
}
