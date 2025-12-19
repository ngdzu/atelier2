import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, EMPLOYEES, COLORS } from '../constants';
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
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight
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
    window.scrollTo(0, 0);
    if ((window as any).refreshReveals) (window as any).refreshReveals();
  }, [step]);

  const steps: { key: Step; label: string; nextLabel: string }[] = [
    { key: 'SERVICE', label: 'Service', nextLabel: 'Choose Professional' },
    { key: 'EMPLOYEE', label: 'Professional', nextLabel: 'Schedule Time' },
    { key: 'TIME', label: 'Schedule', nextLabel: 'Your Details' },
    { key: 'DETAILS', label: 'Details', nextLabel: 'Complete Reservation' },
  ];

  const currentStepIdx = steps.findIndex(s => s.key === step);
  const currentStep = steps[currentStepIdx];

  const totalPrice = useMemo(() => {
    const mainTotal = (Object.values(selectedMainServices) as Service[]).reduce((sum, s) => sum + s.price, 0);
    const addonsTotal = selectedAddons.reduce((sum, s) => sum + s.price, 0);
    return mainTotal + addonsTotal;
  }, [selectedMainServices, selectedAddons]);

  const totalPoints = useMemo(() => {
    const mainTotal = (Object.values(selectedMainServices) as Service[]).reduce((sum, s) => sum + (s.pointsEarned || 0), 0);
    const addonsTotal = selectedAddons.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);
    return mainTotal + addonsTotal;
  }, [selectedMainServices, selectedAddons]);

  const servicesByCategory = useMemo<Record<string, { main: Service[], addon: Service[] }>>(() => {
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
    else if (step === 'DETAILS') {
      onComplete({
        customerId: 'new',
        employeeId: selectedEmployee?.id || '',
        serviceId: (Object.values(selectedMainServices) as Service[])[0]?.id || '',
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
          {Object.keys(selectedMainServices).length > 0 ? (
            <div className="space-y-12">
              {(Object.values(selectedMainServices) as Service[]).map((service: Service) => (
                <div key={service.id} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C4A484]">{service.category}</p>
                      <button onClick={() => selectMainService(service)} className="text-red-600 hover:text-red-800"><Trash2 size={12} /></button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-black text-lg tracking-tight">{service.name}</p>
                        <p className="text-[10px] text-gray-500 mt-2 uppercase font-bold tracking-widest">{service.duration} MIN</p>
                      </div>
                      <div className="text-right">
                         <p className="font-bold text-black text-lg">${service.price}</p>
                         {service.pointsPrice && <p className="text-[10px] text-[#C4A484] font-bold uppercase mt-1">{service.pointsPrice} PTS</p>}
                      </div>
                    </div>
                  </div>
                  {selectedAddons.filter((a: Service) => a.category === service.category).map((addon: Service) => (
                    <div key={addon.id} className="flex justify-between items-center text-[11px] pl-6 border-l border-black/20">
                      <p className="text-gray-700 font-medium">{addon.name}</p>
                      <span className="font-bold text-gray-500">${addon.price}</span>
                    </div>
                  ))}
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
              <span className="text-4xl font-serif font-bold text-black">${totalPrice}</span>
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
                <p className="text-gray-600 text-sm font-light tracking-wide">Curate your session from our artisanal offerings.</p>
              </div>
              {(Object.entries(servicesByCategory) as [string, { main: Service[], addon: Service[] }][]).map(([category, { main, addon }]) => (
                <div key={category} className="space-y-16">
                  <div className="flex items-center gap-12">
                    <h3 className="text-4xl font-serif font-bold tracking-tight text-black">{category}</h3>
                    <div className="h-px bg-black/10 flex-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {main.map(s => (
                      <div 
                        key={s.id} 
                        onClick={() => selectMainService(s)} 
                        className={`group relative p-10 border-2 transition-all duration-700 cursor-pointer ${selectedMainServices[category]?.id === s.id ? 'border-black bg-white shadow-2xl' : 'border-black/5 bg-transparent hover:border-black/20'}`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex-1 pr-6">
                            <h4 className="font-bold text-2xl tracking-tight text-black">{s.name}</h4>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{s.duration} MIN</span>
                              <span className="text-[#C4A484] font-bold text-lg">${s.price}</span>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${selectedMainServices[category]?.id === s.id ? 'bg-black border-black text-white' : 'border-black/20 group-hover:border-black/40'}`}>
                            {selectedMainServices[category]?.id === s.id && <Check size={18} />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-light tracking-wide">{s.description}</p>
                      </div>
                    ))}
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
              </div>
            </div>
          )}

          {step === 'CONFIRM' && (
            <div className="flex flex-col items-center justify-center text-center py-24 space-y-12 reveal">
              <div className="w-40 h-40 bg-black text-white rounded-full flex items-center justify-center shadow-2xl"><CheckCircle2 size={80} /></div>
              <h2 className="text-7xl font-serif font-bold text-black">Confirmed.</h2>
              <div className="space-y-4 max-w-sm">
                <p className="text-gray-600 text-lg italic tracking-wide">The sanctuary awaits your arrival, {customerInfo.name}.</p>
                <div className="p-6 bg-black/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] space-y-2">
                  <div className="flex justify-between"><span>Date</span><span>{selectedDate}</span></div>
                  <div className="flex justify-between"><span>Time</span><span>{selectedTime}</span></div>
                  <div className="flex justify-between"><span>Professional</span><span>{selectedEmployee?.name}</span></div>
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

      {step !== 'CONFIRM' && (
        <button
          onClick={() => setIsSummaryOpen(true)}
          className={`fixed bottom-12 right-12 z-50 flex items-center gap-6 p-6 bg-white text-black shadow-2xl hover:scale-110 transition-all group border border-black/5 rounded-full`}
        >
          <div className="relative">
            <ShoppingBag size={24} />
            {Object.keys(selectedMainServices).length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C4A484] text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                {Object.keys(selectedMainServices).length}
              </span>
            )}
          </div>
          <div className="pr-6 border-l border-black/10 pl-6 text-left hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Atelier Bag</p>
            <p className="text-xl font-serif font-bold text-black">${totalPrice}</p>
          </div>
        </button>
      )}

      {summaryDrawer}
    </div>
  );
};

export default BookingFlow;