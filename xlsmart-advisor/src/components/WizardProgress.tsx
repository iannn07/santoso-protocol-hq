'use client';

const STEPS = [
  { label: 'Industri', step: 1 },
  { label: 'Profil Bisnis', step: 2 },
  { label: 'Rekomendasi', step: 3 },
];

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-between max-w-xs mx-auto mb-8">
      {STEPS.map((s, idx) => {
        const isActive = currentStep === s.step;
        const isCompleted = currentStep > s.step;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={s.step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                  isCompleted
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200'
                    : isActive
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200 ring-4 ring-blue-100'
                    : 'bg-slate-100 text-slate-400',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.step
                )}
              </div>
              <span
                className={[
                  'mt-2 text-[11px] font-medium tracking-wide',
                  isActive
                    ? 'text-blue-600'
                    : isCompleted
                    ? 'text-slate-600'
                    : 'text-slate-400',
                ].join(' ')}
              >
                {s.label}
              </span>
            </div>
            {!isLast && (
              <div className="flex-1 mx-2 mb-5">
                <div className="h-0.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
