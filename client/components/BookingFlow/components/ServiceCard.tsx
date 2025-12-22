import React from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { Service } from '../../../types';

interface ServiceCardProps {
  service: Service;
  quantity: number;
  isSelected: boolean;
  onQuantityChange: (service: Service, delta: number) => void;
}

/**
 * Individual service card component
 */
const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  quantity,
  isSelected,
  onQuantityChange,
}) => {
  return (
    <div
      onClick={() => !isSelected && onQuantityChange(service, 1)}
      className={`group relative p-10 border-2 transition-all duration-700 cursor-pointer ${
        isSelected
          ? 'border-black bg-white shadow-2xl'
          : 'border-black/5 bg-transparent hover:border-black/20'
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-6">
          <h4 className="font-bold text-2xl tracking-tight text-black">{service.name}</h4>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {service.duration} MIN
            </span>
            <span className="text-[#C4A484] font-bold text-lg">${service.price}</span>
          </div>
          {service.pointsPrice && (
            <div className="flex items-center gap-2 mt-2 text-[#C4A484]">
              <Sparkles size={10} />
              <span className="text-[9px] font-bold uppercase tracking-[0.1em]">
                {service.pointsPrice} Reward Points Required
              </span>
            </div>
          )}
        </div>

        <div
          className={`h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'bg-black border-black text-white px-4 min-w-[100px] shadow-lg'
              : 'w-10 border-black/10 group-hover:border-black/40 text-black hover:bg-black hover:text-white'
          }`}
        >
          {isSelected ? (
            <div className="flex items-center justify-between w-full animate-in zoom-in-95 duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuantityChange(service, -1);
                }}
                className="p-1 hover:text-[#C4A484] transition-colors"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="text-xs font-black tabular-nums">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuantityChange(service, 1);
                }}
                className="p-1 hover:text-[#C4A484] transition-colors"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <Plus size={20} />
          )}
        </div>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed font-light tracking-wide">
        {service.description}
      </p>

      <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">
          Earn with session:
        </span>
        <span className="text-[10px] font-bold text-black">
          +{service.pointsEarned || 0} PTS
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;

