
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, EMPLOYEES } from '../constants';
import { Service, Employee, Appointment } from '../types';
import { 
  CheckCircle2, 
  Calendar as CalendarIcon,
  ArrowRight,
  Check,
  Trash2,
  ShoppingBag,
  X,
  User,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Header from './Header';

/**
 * Custom Mini Calendar for Booking Flow
 */
const CustomCalendar = ({ selectedDate, onSelectDate }: { selectedDate: string, onSelectDate: (d: string) => void }) => {
  const currentSelected = new Date(selectedDate);
  const [viewDate, setViewDate] = useState(new Date(currentSelected));

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleMonthChange = (offset: number) => {
    const next = new Date(viewDate);
    next.setMonth(next.getMonth() + offset);
    setViewDate(next);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-[3rem] p-10 border border-black/5 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">{monthName}</h4>
        <div className="flex gap-2">
          <button onClick={() => handleMonthChange(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronLeft size={16} /></button>
          <button onClick={() => handleMonthChange(1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <span key={d} className="text-[9px] font-black text-gray-300 py-2">{d}</span>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map(d => {
          const dateObj = new Date(currentYear, currentMonth, d);
          const dateStr = dateObj.toISOString().split('T')[0];
          const isSelected = selectedDate === dateStr;
          const isToday = new Date().toDateString() === dateObj.toDateString();
          
          return (
            <button
              key={d}
              onClick={() => onSelectDate(dateStr)}
              className={`text-xs py-4 rounded-2xl transition-all relative font-bold ${
                isSelected 
                  ? 'bg-black text-white shadow-xl scale-110 z-10' 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {d}
              {isToday && !isSelected && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface BookingFlowProps {
  onComplete: (appt: Partial<Appointment>) => void;
}

type Step = 'SERVICE' | 'EMPLOYEE' | 'TIME' | 'DETAILS' | 'CONFIRM';

interface SelectedServiceItem {
  service: Service;
  quantity: number;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('SERVICE');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('');
  
  // Cart-based selection for quantities
  const [selectedServices, setSelectedServices] = useState<SelectedServiceItem[]>([]);
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const indexScrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).refreshReveals) (window as any).refreshReveals();
  }, [step]);

  // Scroll spy logic to update activeCategory based on page scroll
  useEffect(() => {
    if (step !== 'SERVICE') return;

    const options = {
      root: null,
      rootMargin: '-150px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    }, options);

    (Object.values(categoryRefs.current) as (HTMLDivElement | null)[]).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [step]);

  // Effect to automatically scroll the index bar horizontally when activeCategory changes
  useEffect(() => {
    if (activeCategory && indexScrollRef.current) {
      const activeButton = indexScrollRef.current.querySelector(`[data-category="${activeCategory}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeCategory]);

  // Hover-to-scroll logic for manual horizontal exploration
  const startScrolling = (direction: 'left' | 'right') => {
    if (scrollIntervalRef.current) return;
    scrollIntervalRef.current = window.setInterval(() => {
      if (indexScrollRef.current) {
        const speed = direction === 'left' ? -10 : 10;
        indexScrollRef.current.scrollLeft += speed;
      }
    }, 16);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const steps: { key: Step; label: string; nextLabel: string }[] = [
    { key: 'SERVICE', label: 'Service', nextLabel: 'Choose Professional' },
    { key: 'EMPLOYEE', label: 'Professional', nextLabel: 'Schedule Time' },
    { key: 'TIME', label: 'Schedule', nextLabel: 'Your Details' },
    { key: 'DETAILS', label: 'Details', nextLabel: 'Complete Reservation' },
  ];

  const currentStepIdx = steps.findIndex(s => s.key === step);
  const currentStep = steps[currentStepIdx];

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
  }, [selectedServices]);

  const totalPoints = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + ((item.service.pointsEarned || 0) * item.quantity), 0);
  }, [selectedServices]);

  const totalItemsCount = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedServices]);

  const servicesByCategory = useMemo<Record<string, Service[]>>(() => {
    const categories: Record<string, Service[]> = {};
    SERVICES.forEach(s => {
      if (!categories[s.category]) categories[s.category] = [];
      categories[s.category].push(s);
    });
    return categories;
  }, []);

  const updateQuantity = (service: Service, delta: number) => {
    setSelectedServices(prev => {
      const existing = prev.find(item => item.service.id === service.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter(item => item.service.id !== service.id);
        }
        return prev.map(item => item.service.id === service.id ? { ...item, quantity: newQty } : item);
      } else if (delta > 0) {
        return [...prev, { service, quantity: 1 }];
      }
      return prev;
    });
  };

  const getQuantity = (serviceId: string) => {
    return selectedServices.find(item => item.service.id === serviceId)?.quantity || 0;
  };

  const scrollToCategory = (category: string) => {
    const el = categoryRefs.current[category];
    if (el) {
      const yOffset = -120; // Account for sticky nav
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  /**
   * STRICT 15-MINUTE SUCCESSION GRID GENERATOR
   */
  const availableSlotsByHour = useMemo(() => {
    const hours = [];
    const startHour = 9;
    const endHour = 18;
    for (let h = startHour; h <= endHour; h++) {
      const hourSlots = [];
      for (let m = 0; m < 60; m += 15) {
        hourSlots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
      hours.push({ label: h, slots: hourSlots });
    }
    return hours;
  }, []);

  const isStepValid = (checkStep: Step) => {
    if (checkStep === 'SERVICE') return selectedServices.length > 0;
    if (checkStep === 'EMPLOYEE') return !!selectedEmployee;
    if (checkStep === 'TIME') return !!selectedTime;
    if (checkStep === 'DETAILS') return customerInfo.name.trim() !== '' && customerInfo.email.trim() !== '' && customerInfo.phone.trim() !== '';
    return true;
  };

  const handleNext = () => {
    if (step === 'SERVICE') setStep('EMPLOYEE');
    else if (step === 'EMPLOYEE') setStep('TIME');
    else if (step === 'TIME') setStep('DETAILS');
    else if (step === 'DETAILS') {
      onComplete({
        customerId: 'new',
        employeeId: selectedEmployee?.id || '',
        serviceId: selectedServices[0]?.service.id || '', // simplified for mock
        startTime: `${selectedDate}T${selectedTime}:00`,
        status: 'SCHEDULED'
      });
      setStep('CONFIRM');
    }
    setIsSummaryOpen(false);
  };

  const goToStep = (targetStep: Step, targetIdx: number) => {
    const canNavigate = targetIdx <= currentStepIdx || steps.slice(0, targetIdx).every((s: { key: Step }) => isStepValid(s.key));
    if (canNavigate && step !== 'CONFIRM') {
      setStep(targetStep);
      setIsSummaryOpen(false);
    }
  };

  const summaryDrawer = (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isSummaryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSummaryOpen(false)} />
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isSummaryOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-12 border-b border-black/5 flex items-center justify-between">
          <h3 className="text-3xl font-serif font-bold tracking-tight text-black">Your Session</h3>
          <button onClick={() => setIsSummaryOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
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
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">{item.service.category}</p>
                      <button onClick={() => updateQuantity(item.service, -item.quantity)} className="text-gray-300 hover:text-red-600 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <p className="font-bold text-black text-lg tracking-tight leading-tight">
                          {item.service.name}
                        </p>
                        
                        {/* Interactive Quantity Control in Drawer */}
                        <div className="flex items-center gap-4 mt-4">
                           <div className="flex items-center gap-4 border border-black/5 bg-gray-50 px-3 py-1.5 rounded-full">
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.service, -1); }}
                                className="p-0.5 hover:text-[#C4A484] transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-black w-4 text-center tabular-nums">{item.quantity}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateQuantity(item.service, 1); }}
                                className="p-0.5 hover:text-[#C4A484] transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                           </div>
                           <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.service.duration * item.quantity} MIN TOTAL</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-black text-lg">${item.service.price * item.quantity}</p>
                         <p className="text-[9px] text-gray-400 mt-1 font-bold italic tracking-tight">${item.service.price} ea.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 opacity-30">
              <ShoppingBag size={48} className="mx-auto text-black" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">Atelier Bag Empty</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Specialist</p>
                    <p className="text-sm font-bold text-black mt-1">{selectedEmployee.name}</p>
                  </div>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white"><CalendarIcon size={24} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Schedule</p>
                    <p className="text-sm font-bold text-black mt-1 uppercase">{selectedDate} — {selectedTime}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-12 border-t border-black/5 bg-gray-50/50 space-y-8">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Subtotal</span>
              <span className="text-4xl font-serif font-bold text-black tabular-nums">${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center text-[#C4A484]">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Estimated Loyalty Earn</span>
              <span className="text-sm font-bold">+{totalPoints} Points</span>
            </div>
          </div>
          {step !== 'CONFIRM' && (
            <button
              onClick={handleNext}
              disabled={!isStepValid(step)}
              className="w-full flex items-center justify-center gap-4 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-gray-900 transition-all disabled:opacity-20"
            >
              <span>{currentStep?.nextLabel || 'Continue'}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-32 selection:bg-black selection:text-white">
      <Header />

      <style>{`
        .atelier-index-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .atelier-index-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-6xl mx-auto py-24 px-6">
        {step !== 'CONFIRM' && (
          <div className="flex items-center justify-between mb-32 max-w-2xl mx-auto">
            {steps.map((s, idx) => {
              const isClickable = (idx <= currentStepIdx || steps.slice(0, idx).every(step => isStepValid(step.key)));
              return (
                <React.Fragment key={s.key}>
                  <button 
                    onClick={() => goToStep(s.key, idx)}
                    disabled={!isClickable}
                    className={`flex flex-col items-center gap-4 group transition-all ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-30'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStepIdx >= idx ? 'bg-black border-black text-white' : 'border-black/10 text-gray-300'}`}>
                      {currentStepIdx > idx ? <Check size={20} /> : (idx + 1)}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${currentStepIdx >= idx ? 'text-black' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                  </button>
                  {idx < steps.length - 1 && <div className={`flex-1 h-px mx-6 mb-12 ${currentStepIdx > idx ? 'bg-black' : 'bg-black/10'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="min-h-[600px] reveal">
          {step === 'SERVICE' && (
            <div className="space-y-32">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-5xl font-serif font-bold text-black mb-6">The Selection.</h2>
                <p className="text-gray-600 text-sm font-light tracking-wide mb-12">Select artisanal treatments for yourself and your collective.</p>
                
                {/* Advisory Note for Best Experience */}
                <div className="bg-[#C4A484]/5 border border-[#C4A484]/10 rounded-2xl p-6 flex items-center justify-center gap-4 reveal animate-in fade-in slide-in-from-top-4 duration-1000">
                  <Sparkles size={16} className="text-[#C4A484]" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C4A484]">
                    Atelier Note: For the best experience, please book separately for each customer.
                  </p>
                </div>
              </div>

              {/* FLOATING ATELIER INDEX - Clean, minimalist version */}
              <div className="sticky top-4 z-40 px-4 -mx-4 md:px-0 md:-mx-0 group/index">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-2xl border border-black/5 rounded-full p-1 shadow-2xl shadow-black/5 flex items-center relative overflow-hidden">
                  
                  {/* Hover Scroll Areas */}
                  <div 
                    onMouseEnter={() => startScrolling('left')} 
                    onMouseLeave={stopScrolling}
                    className="absolute left-0 top-0 bottom-0 w-20 z-10 cursor-w-resize" 
                  />
                  <div 
                    onMouseEnter={() => startScrolling('right')} 
                    onMouseLeave={stopScrolling}
                    className="absolute right-0 top-0 bottom-0 w-20 z-10 cursor-e-resize" 
                  />

                  <div 
                    ref={indexScrollRef}
                    className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth atelier-index-container px-6"
                  >
                    {(Object.keys(servicesByCategory)).map(cat => (
                      <button
                        key={cat}
                        onClick={() => scrollToCategory(cat)}
                        data-category={cat}
                        className={`px-8 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap ${
                          activeCategory === cat 
                            ? 'bg-black text-white shadow-xl' 
                            : 'text-gray-400 hover:text-black hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {(Object.entries(servicesByCategory) as [string, Service[]][]).map(([category, services]) => (
                <div 
                  key={category} 
                  id={category} 
                  // Fixed: Wrapped assignment in braces to ensure the ref callback returns void.
                  ref={(el) => { categoryRefs.current[category] = el; }}
                  className="space-y-16 pt-8"
                >
                  <div className="flex items-center gap-12">
                    <h3 className="text-4xl font-serif font-bold tracking-tight text-black">{category}</h3>
                    <div className="h-px bg-black/10 flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map(s => {
                      const qty = getQuantity(s.id);
                      const isSelected = qty > 0;
                      return (
                        <div 
                          key={s.id} 
                          onClick={() => !isSelected && updateQuantity(s, 1)} 
                          className={`group relative p-10 border-2 transition-all duration-700 cursor-pointer ${isSelected ? 'border-black bg-white shadow-2xl' : 'border-black/5 bg-transparent hover:border-black/20'}`}
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 pr-6">
                              <h4 className="font-bold text-2xl tracking-tight text-black">{s.name}</h4>
                              <div className="flex items-center gap-4 mt-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{s.duration} MIN</span>
                                <span className="text-[#C4A484] font-bold text-lg">${s.price}</span>
                              </div>
                            </div>
                            
                            {/* Quantity Selector or Checkbox */}
                            <div className="flex items-center gap-3">
                              {isSelected ? (
                                <div className="flex items-center gap-4 bg-black text-white p-2 rounded-full animate-in zoom-in-50 duration-300">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(s, -1); }}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="text-xs font-black min-w-[1ch] text-center">{qty}</span>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); updateQuantity(s, 1); }}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-full border-2 border-black/10 flex items-center justify-center transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                                  <Plus size={18} />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-light tracking-wide">{s.description}</p>
                          {isSelected && (
                             <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center animate-in slide-in-from-top-2">
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Friend Multiplier</span>
                                <span className="text-[10px] font-black text-black">Line Total: ${s.price * qty}</span>
                             </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 'EMPLOYEE' && (
            <div className="space-y-16">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-5xl font-serif font-bold text-black mb-6">The Specialists.</h2>
                <p className="text-gray-600 text-sm font-light tracking-wide">Select an artisan to curate your session.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                {EMPLOYEES.map(e => (
                  <button 
                    key={e.id} 
                    onClick={() => setSelectedEmployee(e)} 
                    className={`p-16 border-2 text-center transition-all duration-700 relative group ${selectedEmployee?.id === e.id ? 'border-black bg-white shadow-2xl' : 'border-black/5 hover:border-black/20'}`}
                  >
                    <div className="w-32 h-32 rounded-full border border-black/10 overflow-hidden mx-auto mb-8 grayscale group-hover:grayscale-0 transition-all flex items-center justify-center bg-gray-50">
                       <User size={64} strokeWidth={0.5} className="text-gray-300" />
                    </div>
                    <h4 className="font-bold text-2xl tracking-tight text-black">{e.name}</h4>
                    {selectedEmployee?.id === e.id && <div className="absolute top-8 right-8 text-black"><CheckCircle2 size={32} /></div>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'TIME' && (
            <div className="space-y-24">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-5xl font-serif font-bold text-black mb-6">The Schedule.</h2>
                <p className="text-gray-600 text-sm font-light tracking-wide">Select your date and a 15-minute sanctuary moment.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Custom Date Picker */}
                <CustomCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

                {/* 15-Minute Succession Grid */}
                <div className="space-y-10">
                   <div className="grid grid-cols-4 gap-4 px-4">
                     {[':00', ':15', ':30', ':45'].map(m => (
                       <span key={m} className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-center">{m}</span>
                     ))}
                   </div>
                   <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                     {availableSlotsByHour.map(hour => (
                       <div key={hour.label} className="flex items-center gap-6">
                         <span className="w-12 text-xs font-black text-black tabular-nums">{hour.label > 12 ? hour.label - 12 : hour.label} <span className="text-[8px] opacity-20">{hour.label >= 12 ? 'PM' : 'AM'}</span></span>
                         <div className="flex-1 grid grid-cols-4 gap-3">
                           {hour.slots.map(time => (
                             <button 
                               key={time} 
                               onClick={() => setSelectedTime(time)} 
                               className={`py-4 border-2 rounded-xl text-[9px] font-bold uppercase transition-all ${selectedTime === time ? 'bg-black text-white border-black shadow-lg scale-105 z-10' : 'bg-transparent text-gray-400 border-black/5 hover:border-black/20'}`}
                             >
                               {time.split(':')[1]}
                             </button>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          )}

          {step === 'DETAILS' && (
            <div className="space-y-16 max-w-md mx-auto">
              <div className="text-center">
                <h2 className="text-5xl font-serif font-bold text-black mb-6">Final Details.</h2>
                <p className="text-gray-600 text-sm font-light tracking-wide">Enter your identification to finalize the reservation.</p>
              </div>
              <div className="space-y-12">
                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="E.G. JULIA ROBERTS" 
                    value={customerInfo.name} 
                    onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} 
                    className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="NAME@ATELIER.COM" 
                    value={customerInfo.email} 
                    onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} 
                    className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    value={customerInfo.phone} 
                    onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} 
                    className="w-full p-6 border-b border-black/10 outline-none bg-transparent font-bold tracking-[0.2em] placeholder:text-gray-200 uppercase text-black focus:border-black transition-all" 
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'CONFIRM' && (
            <div className="flex flex-col items-center justify-center text-center py-24 space-y-12 reveal">
              <div className="w-40 h-40 bg-black text-white rounded-full flex items-center justify-center shadow-2xl"><CheckCircle2 size={80} /></div>
              <h2 className="text-7xl font-serif font-bold text-black">Confirmed.</h2>
              <div className="space-y-4 max-sm">
                <p className="text-gray-600 text-lg italic tracking-wide">The sanctuary awaits your arrival, {customerInfo.name}.</p>
                <div className="p-6 bg-black/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] space-y-2">
                  <div className="flex justify-between"><span>Date</span><span>{selectedDate}</span></div>
                  <div className="flex justify-between"><span>Time</span><span>{selectedTime}</span></div>
                  <div className="flex justify-between"><span>Professional</span><span>{selectedEmployee?.name}</span></div>
                  <div className="flex justify-between border-t border-black/5 pt-2"><span>Total Items</span><span>{totalItemsCount} Sessions</span></div>
                </div>
              </div>
              <Link to="/" className="px-16 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.5em] hover:bg-gray-900 transition-all shadow-2xl">Return to Home</Link>
            </div>
          )}

          {step !== 'CONFIRM' && (
            <div className="mt-32 flex justify-center pt-12 border-t border-black/10">
              <button
                onClick={handleNext}
                disabled={!isStepValid(step)}
                className="flex items-center gap-8 px-20 py-8 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:scale-105 transition-all shadow-2xl disabled:opacity-20 disabled:scale-100"
              >
                <span>{currentStep?.nextLabel || 'Continue'}</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FLOATING ACTION OVERLAYS */}
      {step === 'SERVICE' && selectedServices.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-500">
          <button
            onClick={handleNext}
            className="flex items-center gap-6 px-12 py-6 bg-black text-white rounded-full shadow-2xl shadow-black/20 hover:scale-105 transition-all active:scale-95 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Continue to Professional</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {step !== 'CONFIRM' && (
        <button
          onClick={() => setIsSummaryOpen(true)}
          className={`fixed bottom-12 right-12 z-50 flex items-center gap-6 p-6 bg-white text-black shadow-2xl hover:scale-110 transition-all group border border-black/5 rounded-full`}
        >
          <div className="relative">
            <ShoppingBag size={24} />
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C4A484] text-white text-[8px] flex items-center justify-center rounded-full font-bold animate-in zoom-in">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div className="pr-6 border-l border-black/10 pl-6 text-left hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Atelier Bag</p>
            <p className="text-xl font-serif font-bold text-black tabular-nums">${totalPrice}</p>
          </div>
        </button>
      )}

      {summaryDrawer}
    </div>
  );
};

export default BookingFlow;
