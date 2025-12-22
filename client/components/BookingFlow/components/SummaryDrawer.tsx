import React from 'react';
import { X, ArrowRight, Trash2, ShoppingBag, Plus, Minus, Calendar as CalendarIcon, User } from 'lucide-react';
import { Employee } from '../../../types';
import { SelectedServiceItem, Step } from '../types';

interface SummaryDrawerProps {
  isOpen: boolean;
  step: Step;
  selectedServices: SelectedServiceItem[];
  selectedEmployee: Employee | null;
  selectedDate: string;
  selectedTime: string | null;
  totalPrice: number;
  totalPoints: number;
  currentStepNextLabel: string;
  isValid: boolean;
  onClose: () => void;
  onQuantityUpdate: (service: { id: string }, delta: number) => void;
  onNext: () => void;
}

/**
 * Summary drawer component showing booking details
 */
const SummaryDrawer: React.FC<SummaryDrawerProps> = ({
  isOpen,
  step,
  selectedServices,
  selectedEmployee,
  selectedDate,
  selectedTime,
  totalPrice,
  totalPoints,
  currentStepNextLabel,
  isValid,
  onClose,
  onQuantityUpdate,
  onNext,
}) => {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="p-12 border-b border-black/5 flex items-center justify-between">
          <h3 className="text-3xl font-serif font-bold tracking-tight text-black">Your Session</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X size={24} className="text-black" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-12">
          {selectedServices.length > 0 ? (
            <div className="space-y-12">
              {selectedServices.map((item) => (
                <div key={item.service.id} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">
                          {item.service.category}
                        </p>
                        {item.service.pointsEarned && (
                          <span className="text-[7px] font-black bg-[#C4A484]/10 text-[#C4A484] px-1.5 py-0.5 rounded-sm tracking-widest">
                            +{item.service.pointsEarned * item.quantity} PTS
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onQuantityUpdate(item.service, -item.quantity)}
                        className="text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-black text-lg tracking-tight leading-tight">
                          {item.service.name}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-4 border border-black/5 bg-gray-50 px-3 py-1.5 rounded-full">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuantityUpdate(item.service, -1);
                              }}
                              className="p-0.5 hover:text-[#C4A484] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-black w-4 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuantityUpdate(item.service, 1);
                              }}
                              className="p-0.5 hover:text-[#C4A484] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                            {item.service.duration * item.quantity} MIN TOTAL
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black text-lg">
                          ${item.service.price * item.quantity}
                        </p>
                        <p className="text-[9px] text-gray-400 mt-1 font-bold italic tracking-tight">
                          ${item.service.price} ea.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 opacity-30">
              <ShoppingBag size={48} className="mx-auto text-black" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">
                Atelier Bag Empty
              </p>
            </div>
          )}

          {(selectedEmployee || selectedTime) && (
            <div className="pt-12 border-t border-black/5 space-y-8">
              {selectedEmployee && (
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-black border border-black/10 overflow-hidden">
                    <User size={32} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                      Specialist
                    </p>
                    <p className="text-sm font-bold text-black mt-1">{selectedEmployee.name}</p>
                  </div>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white">
                    <CalendarIcon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                      Schedule
                    </p>
                    <p className="text-sm font-bold text-black mt-1 uppercase">
                      {selectedDate} — {selectedTime}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-12 border-t border-black/5 bg-gray-50/50 space-y-8">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">
                Subtotal
              </span>
              <span className="text-4xl font-serif font-bold text-black tabular-nums">
                ${totalPrice}
              </span>
            </div>
            <div className="flex justify-between items-center text-[#C4A484]">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
                Estimated Loyalty Earn
              </span>
              <span className="text-sm font-bold">+{totalPoints} Points</span>
            </div>
          </div>
          {step !== 'CONFIRM' && (
            <button
              onClick={onNext}
              disabled={!isValid}
              className="w-full flex items-center justify-center gap-4 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-gray-900 transition-all disabled:opacity-20"
            >
              <span>{currentStepNextLabel || 'Continue'}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryDrawer;

