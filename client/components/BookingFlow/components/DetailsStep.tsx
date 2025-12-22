import React from 'react';
import { CustomerInfo } from '../types';

interface DetailsStepProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

/**
 * Customer details form step component
 */
const DetailsStep: React.FC<DetailsStepProps> = ({ customerInfo, onCustomerInfoChange }) => {
  const handleChange = (field: keyof CustomerInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCustomerInfoChange({ ...customerInfo, [field]: e.target.value });
  };

  return (
    <div className="space-y-16 max-w-md mx-auto relative">
      <div className="absolute -left-32 top-0 pointer-events-none hidden lg:block">
        <img src="/logo.png" alt="" className="h-20 w-auto opacity-10" />
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
          <h2 className="text-5xl font-serif font-bold text-black">Final Details.</h2>
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
        </div>
        <p className="text-gray-600 text-sm font-light tracking-wide">
          Enter your identification to finalize the reservation.
        </p>
      </div>
      <div className="space-y-12">
        <div className="space-y-4">
          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Full Name
          </label>
          <input
            type="text"
            placeholder="E.G. JULIA ROBERTS"
            value={customerInfo.name}
            onChange={handleChange('name')}
            className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            placeholder="NAME@ATELIER.COM"
            value={customerInfo.email}
            onChange={handleChange('email')}
            className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={customerInfo.phone}
            onChange={handleChange('phone')}
            className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;

