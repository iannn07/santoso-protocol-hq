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
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((s, idx) => {
        const isActive = currentStep === s.step;
        const isCompleted = currentStep > s.step;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={s.step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                  isCompleted
                    ? 'text-white'
                    : isActive
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-400',
                ].join(' ')}
                style={
                  isCompleted || isActive
                    ? { backgroundColor: '#7B2FBE' }
                    : {}
                }
              >
                {isCompleted ? '✓' : s.step}
              </div>
              <span
                className={[
                  'mt-1 text-xs font-medium',
                  isActive ? '' : isCompleted ? 'text-gray-600' : 'text-gray-400',
                ].join(' ')}
                style={isActive ? { color: '#7B2FBE' } : {}}
              >
                {s.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={[
                  'w-16 h-0.5 mb-4 mx-1 transition-colors',
                  isCompleted ? '' : 'bg-gray-200',
                ].join(' ')}
                style={isCompleted ? { backgroundColor: '#7B2FBE' } : {}}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
