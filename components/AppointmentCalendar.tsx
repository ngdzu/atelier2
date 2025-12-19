import React, { useState } from 'react';
import { Appointment } from '../types';
import { EMPLOYEES, MOCK_CUSTOMERS, SERVICES } from '../constants';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  User,
  Check,
  ChevronDown
} from 'lucide-react';

const START_HOUR = 9;
const END_HOUR = 19;
const MINUTE_INCREMENTS = [0, 15, 30, 45];

/**
 * Shared Mini Calendar Widget
 */
const MiniCalendar = ({ selectedDate, onSelectDate }: { selectedDate: Date, onSelectDate: (d: Date) => void }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleMonthChange = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-black text-black uppercase tracking-widest">{monthName}</span>
        <div className="flex gap-1">
          <button onClick={() => handleMonthChange(-1)} className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"><ChevronLeft size={14} /></button>
          <button onClick={() => handleMonthChange(1)} className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"><ChevronRight size={14} /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <span key={d} className="text-[9px] font-black text-gray-300 py-1">{d}</span>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map(d => {
          const dateObj = new Date(currentYear, currentMonth, d);
          const isSelected = selectedDate.toDateString() === dateObj.toDateString();
          const isToday = new Date().toDateString() === dateObj.toDateString();
          
          return (
            <button
              key={d}
              onClick={() => onSelectDate(dateObj)}
              className={`text-[10px] py-2.5 rounded-xl transition-all relative ${
                isSelected 
                  ? 'bg-black text-white font-black shadow-md scale-105 z-10' 
                  : 'hover:bg-gray-50 text-gray-600 font-medium'
              }`}
            >
              {d}
              {isToday && !isSelected && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface Props {
  appointments: Appointment[];
  onUpdateAppointment: (appt: Appointment) => void;
}

const AppointmentCalendar: React.FC<Props> = ({ appointments, onUpdateAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSpecialistId, setActiveSpecialistId] = useState<string>(EMPLOYEES[0].id);

  // Helper: Find customer/service info
  const getCustomer = (id: string) => MOCK_CUSTOMERS.find(c => c.id === id);
  const getService = (id: string) => SERVICES.find(s => s.id === id);

  const getAppointmentsForSlot = (empId: string, hour: number, minute: number) => {
    return appointments.find(appt => {
      const start = new Date(appt.startTime);
      const isSameDate = start.toDateString() === selectedDate.toDateString();
      return appt.employeeId === empId && 
             isSameDate && 
             start.getHours() === hour && 
             start.getMinutes() === minute;
    });
  };

  const activeSpecialist = EMPLOYEES.find(e => e.id === activeSpecialistId) || EMPLOYEES[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[700px]">
      {/* LEFT SIDEBAR */}
      <aside className="w-full lg:w-72 flex flex-col gap-6">
        <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        
        <div className="bg-black rounded-[2rem] p-6 text-white shadow-xl">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4A484] mb-2">Session Load</p>
          <div className="flex items-end justify-between mb-4">
             <span className="text-3xl font-serif font-bold italic">High</span>
             <span className="text-[10px] font-black opacity-50">85% Full</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-[#C4A484] w-[85%]" />
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-5 bg-[#F7F7F7] border border-gray-100 text-black rounded-[1.5rem] hover:bg-white hover:border-black transition-all group">
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Add Client</span>
        </button>
      </aside>

      {/* MAIN SCHEDULE AREA */}
      <section className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Top bar with Switcher */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-black shadow-inner">
              <User size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Viewing Artist</p>
              <div className="flex items-center gap-2 cursor-pointer group">
                <h3 className="text-md font-black text-black">{activeSpecialist.name}</h3>
                <ChevronDown size={12} className="text-[#C4A484] group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          <div className="flex bg-gray-50 p-1 rounded-xl">
            {EMPLOYEES.map(e => (
              <button 
                key={e.id}
                onClick={() => setActiveSpecialistId(e.id)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeSpecialistId === e.id ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-black'}`}
              >
                {e.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 15-Minute Succession Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex items-center mb-6 pl-20">
            <div className="flex-1 grid grid-cols-4 gap-4 text-center">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">:00</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">:15</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">:30</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">:45</span>
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i).map(hour => {
              const displayHour = hour > 12 ? hour - 12 : hour;
              const ampm = hour >= 12 ? 'PM' : 'AM';
              
              return (
                <div key={hour} className="flex items-center group/row">
                  <div className="w-20 shrink-0">
                    <p className="text-xs font-black text-black tabular-nums">
                      {displayHour.toString().padStart(2, '0')}
                      <span className="text-[9px] text-gray-300 ml-1 font-bold">{ampm}</span>
                    </p>
                  </div>

                  <div className="flex-1 grid grid-cols-4 gap-4">
                    {MINUTE_INCREMENTS.map(min => {
                      const appt = getAppointmentsForSlot(activeSpecialist.id, hour, min);
                      const customer = appt ? getCustomer(appt.customerId) : null;
                      const service = appt ? getService(appt.serviceId) : null;

                      return (
                        <div 
                          key={`${hour}-${min}`}
                          className={`h-24 rounded-[1.5rem] border-2 transition-all cursor-pointer p-4 flex flex-col justify-center relative group/slot
                            ${appt 
                              ? 'bg-black border-black text-white shadow-lg scale-[1.02] z-10' 
                              : 'bg-gray-50 border-transparent hover:border-black/5 hover:bg-white hover:shadow-sm'
                            }`}
                        >
                          {!appt ? (
                            <div className="flex flex-col items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-all translate-y-1 group-hover/slot:translate-y-0">
                              <Plus size={14} className="text-[#C4A484]" />
                              <span className="text-[8px] font-black text-gray-400 mt-1 uppercase tracking-widest">Free</span>
                            </div>
                          ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-[9px] font-black uppercase tracking-tight truncate pr-2">{customer?.name}</span>
                                <Check size={10} className="text-[#C4A484]" />
                              </div>
                              <p className="text-[8px] font-bold text-[#C4A484] uppercase tracking-widest truncate">{service?.name}</p>
                              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between opacity-30">
                                <span className="text-[7px] font-black tracking-widest uppercase">{appt.status}</span>
                                <Clock size={8} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentCalendar;