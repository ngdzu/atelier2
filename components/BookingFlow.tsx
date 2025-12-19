
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, EMPLOYEES } from '../constants';
import { Service, Employee, Appointment } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  Scissors, 
  Calendar as CalendarIcon,
  ArrowRight,
  ChevronLeft,
  Check,
  Lock,
  Plus,
  Trash2,
  ShoppingBag,
  X
} from 'lucide-react';

interface BookingFlowProps {
  onComplete: (appt: Partial<Appointment>) => void;
}

type Step = 'SERVICE' | 'EMPLOYEE' | 'TIME' | 'DETAILS' | 'CONFIRM';

const BookingFlow: React.FC<BookingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('SERVICE');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [selectedMainServices, setSelectedMainServices] = useState<Record<string, Service>>({});
  const [selectedAddons, setSelectedAddons] = useState<Service[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const steps: { key: Step; label: string }[] = [
    { key: 'SERVICE', label: 'Service' },
    { key: 'EMPLOYEE', label: 'Professional' },
    { key: 'TIME', label: 'Schedule' },
    { key: 'DETAILS', label: 'Details' },
  ];

  const currentStepIdx = steps.findIndex(s => s.key === step);

  const totalPrice = useMemo(() => {
    const mainTotal = Object.values(selectedMainServices).reduce((sum, s) => sum + s.price, 0);
    const addonsTotal = selectedAddons.reduce((sum, s) => sum + s.price, 0);
    return mainTotal + addonsTotal;
  }, [selectedMainServices, selectedAddons]);

  const totalDuration = useMemo(() => {
    const mainTotal = Object.values(selectedMainServices).reduce((sum, s) => sum + s.duration, 0);
    const addonsTotal = selectedAddons.reduce((sum, s) => sum + s.duration, 0);
    return mainTotal + addonsTotal;
  }, [selectedMainServices, selectedAddons]);

  const servicesByCategory = useMemo(() => {
    const categories: Record<string, { main: Service[], addon: Service[] }> = {};
    SERVICES.forEach(s => {
      if (!categories[s.category]) {
        categories[s.category] = { main: [], addon: [] };
      }
      if (s.type === 'MAIN') {
        categories[s.category].main.push(s);
      } else {
        categories[s.category].addon.push(s);
      }
    });
    return categories;
  }, []);

  const selectMainService = (service: Service) => {
    setSelectedMainServices(prev => {
      if (prev[service.category]?.id === service.id) {
        const next = { ...prev };
        delete next[service.category];
        setSelectedAddons(current => current.filter(a => a.category !== service.category));
        return next;
      }
      return { ...prev, [service.category]: service };
    });
  };

  const toggleAddon = (service: Service) => {
    if (!selectedMainServices[service.category]) return;
    setSelectedAddons(prev => 
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const availableSlots = useMemo(() => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  }, []);

  const isStepValid = (checkStep: Step) => {
    if (checkStep === 'SERVICE') return Object.keys(selectedMainServices).length > 0;
    if (checkStep === 'EMPLOYEE') return !!selectedEmployee;
    if (checkStep === 'TIME') return !!selectedTime;
    if (checkStep === 'DETAILS') return customerInfo.name.trim() !== '' && customerInfo.email.trim() !== '' && customerInfo.phone.trim() !== '';
    return true;
  };

  const handleNext = () => {
    if (step === 'SERVICE') setStep('EMPLOYEE');
    else if (step === 'EMPLOYEE') setStep('TIME');
    else if (step === 'TIME') setStep('DETAILS');
    else if (step === 'DETAILS') setStep('CONFIRM');
    setIsSummaryOpen(false);
  };

  const goToStep = (targetStep: Step, targetIdx: number) => {
    const canNavigate = targetIdx <= currentStepIdx || steps.slice(0, targetIdx).every(s => isStepValid(s.key));
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
          <h3 className="text-3xl font-serif font-bold tracking-tight">Your Session</h3>
          <button onClick={() => setIsSummaryOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <X size={24} className="text-black" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12 space-y-12">
          {Object.keys(selectedMainServices).length > 0 ? (
            <div className="space-y-12">
              {Object.values(selectedMainServices).map(service => (
                <div key={service.id} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">{service.category}</p>
                      <button onClick={() => selectMainService(service)} className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-black text-lg tracking-tight">{service.name}</p>
                        <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest">{service.duration} MIN</p>
                      </div>
                      <span className="font-bold text-black text-lg">${service.price}</span>
                    </div>
                  </div>
                  {selectedAddons.filter(a => a.category === service.category).map(addon => (
                    <div key={addon.id} className="flex justify-between items-center text-[11px] pl-6 border-l border-black/10">
                      <p className="text-gray-500 font-medium">{addon.name}</p>
                      <span className="font-bold text-gray-400">${addon.price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 opacity-20">
              <ShoppingBag size={48} className="mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Cart Empty</p>
            </div>
          )}

          {(selectedEmployee || selectedTime) && (
            <div className="pt-12 border-t border-black/5 space-y-8">
              {selectedEmployee && (
                <div className="flex items-center gap-6">
                  <img src={`https://picsum.photos/seed/${selectedEmployee.id}/100/100`} className="w-16 h-16 rounded-full grayscale border border-black/5" alt="" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Specialist</p>
                    <p className="text-sm font-bold text-black mt-1">{selectedEmployee.name}</p>
                  </div>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white"><CalendarIcon size={24} /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Schedule</p>
                    <p className="text-sm font-bold text-black mt-1 uppercase">{selectedDate} — {selectedTime}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-12 border-t border-black/5 bg-gray-50/30 space-y-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">Subtotal</span>
            <span className="text-4xl font-serif font-bold text-black">${totalPrice}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={!isStepValid(step)}
            className="w-full flex items-center justify-center gap-4 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:opacity-80 transition-all disabled:opacity-20"
          >
            <span>{step === 'DETAILS' ? 'Complete Reservation' : 'Confirm'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-32 font-sans relative">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-black/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-serif font-bold tracking-widest uppercase">LUXENAIL</span>
        </Link>
        <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all">Exit Atelier</Link>
      </nav>

      <div className="max-w-4xl mx-auto py-24 px-6">
        <div className="flex items-center justify-between mb-32 max-w-2xl mx-auto">
          {steps.map((s, idx) => {
            const isClickable = (idx <= currentStepIdx || steps.slice(0, idx).every(step => isStepValid(step.key))) && step !== 'CONFIRM';
            return (
              <React.Fragment key={s.key}>
                <button 
                  onClick={() => goToStep(s.key, idx)}
                  disabled={!isClickable}
                  className={`flex flex-col items-center gap-4 group transition-all ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-30'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStepIdx >= idx ? 'bg-black border-black text-white' : 'border-black/5 text-gray-200'}`}>
                    {currentStepIdx > idx ? <CheckCircle2 size={20} /> : (idx + 1)}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-colors ${currentStepIdx >= idx ? 'text-black' : 'text-gray-300'}`}>
                    {s.label}
                  </span>
                </button>
                {idx < steps.length - 1 && <div className={`flex-1 h-px mx-6 mb-12 ${currentStepIdx > idx ? 'bg-black' : 'bg-black/5'}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="min-h-[600px] reveal">
          {step === 'SERVICE' && (
            <div className="space-y-32">
              {Object.entries(servicesByCategory).map(([category, { main, addon }]) => (
                <div key={category} className="space-y-16">
                  <div className="flex items-center gap-12">
                    <h3 className="text-4xl font-serif font-bold tracking-tight">{category}</h3>
                    <div className="h-px bg-black/5 flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {main.map(s => (
                      <div key={s.id} onClick={() => selectMainService(s)} className={`group relative p-10 border-2 transition-all duration-700 cursor-pointer ${selectedMainServices[category]?.id === s.id ? 'border-black bg-white shadow-2xl' : 'border-black/5 bg-transparent hover:border-black/20'}`}>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1 pr-6">
                            <h4 className="font-bold text-2xl tracking-tight">{s.name}</h4>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{s.duration} MIN</span>
                              <span className="text-[#C4A484] font-bold text-lg">${s.price}</span>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedMainServices[category]?.id === s.id ? 'bg-black border-black text-white' : 'border-black/10 group-hover:border-black/30'}`}>
                            {selectedMainServices[category]?.id === s.id && <Check size={18} />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-light tracking-wide">{s.description}</p>
                      </div>
                    ))}
                  </div>
                  {addon.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                      {addon.map(s => (
                        <div key={s.id} onClick={() => toggleAddon(s)} className={`p-6 border-2 transition-all cursor-pointer ${!selectedMainServices[category] ? 'opacity-20 pointer-events-none' : ''} ${selectedAddons.some(a => a.id === s.id) ? 'border-black bg-white' : 'border-black/5 hover:border-black/20'}`}>
                          <h4 className="font-bold text-sm tracking-tight">{s.name}</h4>
                          <p className="text-[#C4A484] font-bold text-[10px] uppercase tracking-widest mt-2">${s.price} • {s.duration}m</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 'EMPLOYEE' && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center max-w-xl mx-auto"><h2 className="text-5xl font-serif font-bold text-black mb-6">The Specialists.</h2><p className="text-gray-400 text-sm font-light tracking-wide">Select an artisan to curate your session.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                {EMPLOYEES.map(e => (
                  <button key={e.id} onClick={() => setSelectedEmployee(e)} className={`p-16 border-2 text-center transition-all duration-700 relative ${selectedEmployee?.id === e.id ? 'border-black bg-white shadow-2xl' : 'border-black/5 hover:border-black/20'}`}>
                    <div className="w-32 h-32 rounded-full border border-black/5 overflow-hidden mx-auto mb-8 grayscale group-hover:grayscale-0"><img src={`https://picsum.photos/seed/${e.id}/200/200`} alt="" className="w-full h-full object-cover" /></div>
                    <h4 className="font-bold text-2xl tracking-tight">{e.name}</h4>
                    <p className="text-[10px] text-[#C4A484] uppercase tracking-[0.3em] font-bold mt-4">{e.specialties[0]}</p>
                    {selectedEmployee?.id === e.id && <div className="absolute top-8 right-8 text-black"><CheckCircle2 size={32} /></div>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'TIME' && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center max-w-xl mx-auto"><h2 className="text-5xl font-serif font-bold text-black mb-6">The Schedule.</h2><p className="text-gray-400 text-sm font-light tracking-wide">Pick a moment of sanctuary.</p></div>
              <div className="max-w-md mx-auto space-y-12">
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-8 border-b-2 border-black/5 text-center text-2xl font-serif outline-none bg-transparent focus:border-black transition-all" />
                <div className="grid grid-cols-3 gap-4">
                  {availableSlots.map(time => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`py-6 border-2 text-[10px] font-bold uppercase tracking-widest transition-all ${selectedTime === time ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-black/5 hover:border-black/20'}`}>{time}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'DETAILS' && (
            <div className="space-y-16 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center"><h2 className="text-5xl font-serif font-bold text-black mb-6">The Ritual Details.</h2><p className="text-gray-400 text-sm font-light tracking-wide">Enter your identification.</p></div>
              <div className="space-y-12">
                <input type="text" placeholder="FULL NAME" value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} className="w-full p-8 border-b border-black/10 outline-none bg-transparent text-center font-bold tracking-[0.2em] placeholder:text-gray-300 uppercase focus:border-black transition-all" />
                <input type="email" placeholder="EMAIL ADDRESS" value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} className="w-full p-8 border-b border-black/10 outline-none bg-transparent text-center font-bold tracking-[0.2em] placeholder:text-gray-300 uppercase focus:border-black transition-all" />
                <input type="tel" placeholder="PHONE NUMBER" value={customerInfo.phone} onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} className="w-full p-8 border-b border-black/10 outline-none bg-transparent text-center font-bold tracking-[0.2em] placeholder:text-gray-300 uppercase focus:border-black transition-all" />
              </div>
            </div>
          )}

          {step === 'CONFIRM' && (
            <div className="flex flex-col items-center justify-center text-center py-24 space-y-12 reveal">
              <div className="w-40 h-40 bg-black text-white rounded-full flex items-center justify-center animate-pulse"><CheckCircle2 size={80} /></div>
              <h2 className="text-7xl font-serif font-bold text-black">Confirmed.</h2>
              <p className="text-gray-400 max-w-sm text-lg italic tracking-wide">The sanctuary awaits your arrival, {customerInfo.name}.</p>
              <Link to="/" className="px-16 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.5em] hover:opacity-80 transition-all shadow-2xl">Return to Home</Link>
            </div>
          )}

          {step !== 'CONFIRM' && (
            <div className="mt-32 flex justify-center pt-12 border-t border-black/5">
              <button
                onClick={() => setIsSummaryOpen(true)}
                className="flex items-center gap-6 px-16 py-6 border border-black text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-black hover:text-white transition-all shadow-lg"
              >
                <span>Review & Continue</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Summary Trigger: Minimalist */}
      {step !== 'CONFIRM' && (
        <button
          onClick={() => setIsSummaryOpen(true)}
          className={`fixed bottom-12 right-12 z-50 flex items-center gap-6 p-6 bg-black text-white shadow-2xl hover:scale-105 transition-all group border border-white/10`}
        >
          <ShoppingBag size={24} />
          <div className="pr-6 border-l border-white/20 pl-6 text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Session Total</p>
            <p className="text-2xl font-serif font-bold">${totalPrice}</p>
          </div>
        </button>
      )}

      {summaryDrawer}
    </div>
  );
};

export default BookingFlow;
