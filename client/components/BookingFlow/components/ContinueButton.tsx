import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ContinueButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'floating';
}

/**
 * Continue/Next button component
 */
const ContinueButton: React.FC<ContinueButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'default',
}) => {
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-500">
        <button
          onClick={onClick}
          disabled={disabled}
          className="flex items-center gap-6 px-12 py-6 bg-black text-white rounded-full shadow-2xl shadow-black/20 hover:scale-105 transition-all active:scale-95 group disabled:opacity-20 disabled:scale-100"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{label}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-32 flex justify-center pt-12 border-t border-black/10">
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex items-center gap-8 px-20 py-8 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:scale-105 transition-all shadow-2xl disabled:opacity-20 disabled:scale-100"
      >
        <span>{label}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default ContinueButton;

