import React from 'react';
import CustomCalendar from '../CustomCalendar';
import { TimeSlotHour } from '../types';

interface TimeStepProps {
  selectedDate: string;
  selectedTime: string | null;
  availableSlotsByHour: TimeSlotHour[];
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

/**
 * Time selection step component
 */
const TimeStep: React.FC<TimeStepProps> = ({
  selectedDate,
  selectedTime,
  availableSlotsByHour,
  onDateSelect,
  onTimeSelect,
}) => {
  return (
    <div className="space-y-24 relative">
      <div className="absolute top-0 right-0 pointer-events-none">
        <img src="/logo.png" alt="" className="h-24 w-auto opacity-10" />
      </div>
      <div className="text-center max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
          <h2 className="text-5xl font-serif font-bold text-black">The Schedule.</h2>
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
        </div>
        <p className="text-gray-600 text-sm font-light tracking-wide">
          Select your date and a 15-minute sanctuary moment.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <CustomCalendar selectedDate={selectedDate} onSelectDate={onDateSelect} />
        <div className="space-y-10">
          <div className="grid grid-cols-4 gap-4 px-4">
            {[':00', ':15', ':30', ':45'].map(m => (
              <span
                key={m}
                className="text-[9px] font-black text-gray-300 uppercase tracking-widest text-center"
              >
                {m}
              </span>
            ))}
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {availableSlotsByHour.map(hour => (
              <div key={hour.label} className="flex items-center gap-6">
                <span className="w-12 text-xs font-black text-black tabular-nums">
                  {hour.label > 12 ? hour.label - 12 : hour.label}{' '}
                  <span className="text-[8px] opacity-20">
                    {hour.label >= 12 ? 'PM' : 'AM'}
                  </span>
                </span>
                <div className="flex-1 grid grid-cols-4 gap-3">
                  {hour.slots.map(time => (
                    <button
                      key={time}
                      onClick={() => onTimeSelect(time)}
                      className={`py-4 border-2 rounded-xl text-[9px] font-bold uppercase transition-all ${
                        selectedTime === time
                          ? 'bg-black text-white border-black shadow-lg scale-105 z-10'
                          : 'bg-transparent text-gray-400 border-black/5 hover:border-black/20'
                      }`}
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
  );
};

export default TimeStep;

