import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Employee } from '../../../types';

interface ConfirmStepProps {
  customerName: string;
  selectedDate: string;
  selectedTime: string | null;
  selectedEmployee: Employee | null;
  totalItemsCount: number;
}

/**
 * Booking confirmation step component
 */
const ConfirmStep: React.FC<ConfirmStepProps> = ({
  customerName,
  selectedDate,
  selectedTime,
  selectedEmployee,
  totalItemsCount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 space-y-12 reveal relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <img src="/logo.png" alt="" className="h-40 w-auto opacity-10" />
      </div>
      <div className="w-40 h-40 bg-black text-white rounded-full flex items-center justify-center shadow-2xl relative">
        <CheckCircle2 size={80} />
        <img src="/logo.png" alt="LuxeNail" className="absolute h-12 w-auto opacity-20" />
      </div>
      <div className="flex items-center justify-center gap-6">
        <img src="/logo.png" alt="LuxeNail" className="h-12 w-auto" />
        <h2 className="text-7xl font-serif font-bold text-black">Confirmed.</h2>
        <img src="/logo.png" alt="LuxeNail" className="h-12 w-auto" />
      </div>
      <div className="space-y-4 max-w-sm">
        <p className="text-gray-600 text-lg italic tracking-wide">
          The sanctuary awaits your arrival, {customerName}.
        </p>
        <div className="p-6 bg-black/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] space-y-2">
          <div className="flex justify-between">
            <span>Date</span>
            <span>{selectedDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Professional</span>
            <span>{selectedEmployee?.name}</span>
          </div>
          <div className="flex justify-between border-t border-black/5 pt-2">
            <span>Total Items</span>
            <span>{totalItemsCount} Sessions</span>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="px-16 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.5em] hover:bg-gray-900 transition-all shadow-2xl"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ConfirmStep;

