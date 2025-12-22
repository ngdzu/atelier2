import React from 'react';
import { Check } from 'lucide-react';
import { Step, StepConfig } from '../types';

interface StepNavigationProps {
  steps: StepConfig[];
  currentStep: Step;
  currentStepIdx: number;
  isStepValid: (step: Step) => boolean;
  onStepClick: (step: Step, idx: number) => void;
}

/**
 * Step navigation indicator component
 */
const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  currentStepIdx,
  isStepValid,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-between mb-32 max-w-2xl mx-auto">
      {steps.map((s, idx) => {
        const isClickable =
          idx <= currentStepIdx || steps.slice(0, idx).every(step => isStepValid(step.key));
        
        return (
          <React.Fragment key={s.key}>
            <button
              onClick={() => onStepClick(s.key, idx)}
              disabled={!isClickable}
              className={`flex flex-col items-center gap-4 group transition-all ${
                isClickable ? 'cursor-pointer' : 'cursor-default opacity-30'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  currentStepIdx >= idx
                    ? 'bg-black border-black text-white'
                    : 'border-black/10 text-gray-300'
                }`}
              >
                {currentStepIdx > idx ? <Check size={20} /> : idx + 1}
              </div>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${
                  currentStepIdx >= idx ? 'text-black' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-6 mb-12 ${
                  currentStepIdx > idx ? 'bg-black' : 'bg-black/10'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepNavigation;

