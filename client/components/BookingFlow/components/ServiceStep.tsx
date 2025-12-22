import React from 'react';
import { Sparkles } from 'lucide-react';
import { Service } from '../../../types';
import ServiceCard from './ServiceCard';
import ServiceIndexNav from './ServiceIndexNav';

interface ServiceStepProps {
  services: Service[];
  servicesByCategory: Record<string, Service[]>;
  loading: boolean;
  activeCategory: string;
  categoryRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  indexScrollRef: React.RefObject<HTMLDivElement>;
  getQuantity: (serviceId: string) => number;
  onQuantityChange: (service: Service, delta: number) => void;
  onCategoryClick: (category: string) => void;
  onScrollStart: (direction: 'left' | 'right') => void;
  onScrollStop: () => void;
}

/**
 * Service selection step component
 */
const ServiceStep: React.FC<ServiceStepProps> = ({
  services,
  servicesByCategory,
  loading,
  activeCategory,
  categoryRefs,
  indexScrollRef,
  getQuantity,
  onQuantityChange,
  onCategoryClick,
  onScrollStart,
  onScrollStop,
}) => {
  return (
    <div className="space-y-32">
      <div className="text-center max-w-xl mx-auto relative">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <img src="/logo.png" alt="" className="h-16 w-auto" />
        </div>
        <h2 className="text-5xl font-serif font-bold text-black mb-6 text-center">The Selection.</h2>
        <p className="text-gray-600 text-sm font-light tracking-wide mb-12">
          Select artisanal treatments for yourself and your collective.
        </p>
        <div className="bg-[#C4A484]/5 border border-[#C4A484]/10 rounded-2xl p-6 flex items-center justify-center gap-4 reveal animate-in fade-in slide-in-from-top-4 duration-1000">
          <Sparkles size={16} className="text-[#C4A484]" />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C4A484]">
            Atelier Note: For the best experience, please book separately for each customer.
          </p>
        </div>
      </div>

      <ServiceIndexNav
        categories={Object.keys(servicesByCategory)}
        activeCategory={activeCategory}
        indexScrollRef={indexScrollRef}
        onCategoryClick={onCategoryClick}
        onScrollStart={onScrollStart}
        onScrollStop={onScrollStop}
      />

      {loading ? (
        <div className="py-20 text-center text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">
          Loading Atelier Menu...
        </div>
      ) : (
        (Object.entries(servicesByCategory) as [string, Service[]][]).map(([category, categoryServices]) => (
          <div
            key={category}
            id={category}
            ref={(el) => {
              categoryRefs.current[category] = el;
            }}
            className="space-y-16 pt-8"
          >
            <div className="flex items-center gap-6">
              <div className="h-px bg-black/10 flex-1" />
              <img src="/logo.png" alt="" className="h-6 w-auto" />
              <h3 className="text-4xl font-serif font-bold tracking-tight text-black">{category}</h3>
              <img src="/logo.png" alt="" className="h-6 w-auto" />
              <div className="h-px bg-black/10 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryServices.map(service => {
                const qty = getQuantity(service.id);
                const isSelected = qty > 0;
                return (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    quantity={qty}
                    isSelected={isSelected}
                    onQuantityChange={onQuantityChange}
                  />
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceStep;

