import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

/**
 * Custom Mini Calendar for Booking Flow
 */
const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onSelectDate }) => {
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
          <button
            onClick={() => handleMonthChange(-1)}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleMonthChange(1)}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
          <span key={`day-${idx}-${d}`} className="text-[9px] font-black text-gray-300 py-2">{d}</span>
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
              {isToday && !isSelected && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;

