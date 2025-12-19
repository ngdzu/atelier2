
import React, { useState } from 'react';
import { Appointment, Employee, Customer } from '../types';
import { EMPLOYEES, MOCK_CUSTOMERS, SERVICES } from '../constants';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

const HOURS = Array.from({ length: 11 }, (_, i) => i + 9); // 9 AM to 7 PM

interface Props {
  appointments: Appointment[];
  onUpdateAppointment: (appt: Appointment) => void;
}

const AppointmentCalendar: React.FC<Props> = ({ appointments, onUpdateAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [draggedAppt, setDraggedAppt] = useState<Appointment | null>(null);

  const getCustomer = (id: string) => MOCK_CUSTOMERS.find(c => c.id === id);
  const getService = (id: string) => SERVICES.find(s => s.id === id);

  const handleDragStart = (appt: Appointment) => {
    setDraggedAppt(appt);
  };

  const handleDrop = (employeeId: string, hour: number) => {
    if (!draggedAppt) return;
    
    const newStart = new Date(selectedDate);
    newStart.setHours(hour, 0, 0, 0);
    
    const durationMs = new Date(draggedAppt.endTime).getTime() - new Date(draggedAppt.startTime).getTime();
    const newEnd = new Date(newStart.getTime() + durationMs);

    onUpdateAppointment({
      ...draggedAppt,
      employeeId,
      startTime: newStart.toISOString(),
      endTime: newEnd.toISOString()
    });
    setDraggedAppt(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[800px]">
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-serif font-bold text-gray-900">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button className="p-2 hover:bg-gray-50 border-r border-gray-200"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-gray-50"><ChevronRight size={20} /></button>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#2D2926] text-white rounded-full hover:bg-black transition-colors">
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto relative">
        <div className="flex">
          {/* Time Gutter */}
          <div className="w-20 sticky left-0 bg-white z-20 border-r border-gray-100">
            <div className="h-16 border-b border-gray-100 bg-gray-50"></div>
            {HOURS.map(hour => (
              <div key={hour} className="h-24 text-center py-2 text-xs font-medium text-gray-400 border-b border-gray-100 border-dashed">
                {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Employee Columns */}
          <div className="flex-1 flex min-w-[800px]">
            {EMPLOYEES.map(emp => (
              <div key={emp.id} className="flex-1 border-r border-gray-100 relative">
                {/* Employee Header */}
                <div className="h-16 flex flex-col items-center justify-center border-b border-gray-100 sticky top-0 bg-white z-10">
                  <span className="font-semibold text-gray-800">{emp.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{emp.specialties[0]}</span>
                </div>

                {/* Slots */}
                {HOURS.map(hour => (
                  <div 
                    key={hour} 
                    className="h-24 border-b border-gray-100 border-dashed hover:bg-gray-50/50 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(emp.id, hour)}
                  ></div>
                ))}

                {/* Placed Appointments */}
                {appointments.filter(a => a.employeeId === emp.id).map(appt => {
                  const start = new Date(appt.startTime);
                  const hour = start.getHours();
                  const mins = start.getMinutes();
                  const durationMinutes = (new Date(appt.endTime).getTime() - start.getTime()) / (1000 * 60);
                  
                  // Simple positioning logic
                  const topOffset = (hour - HOURS[0]) * 96 + (mins / 60) * 96;
                  const height = (durationMinutes / 60) * 96;
                  const customer = getCustomer(appt.customerId);
                  const service = getService(appt.serviceId);

                  return (
                    <div
                      key={appt.id}
                      draggable
                      onDragStart={() => handleDragStart(appt)}
                      className="absolute left-1 right-1 rounded-xl shadow-md border-l-4 p-3 overflow-hidden cursor-move transition-all group hover:z-20 hover:scale-[1.02]"
                      style={{
                        top: `${topOffset + 64}px`, // 64 is header height
                        height: `${height}px`,
                        backgroundColor: emp.color,
                        borderColor: '#2D2926'
                      }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs text-gray-900 truncate">{customer?.name}</span>
                        <Clock size={10} className="text-gray-500" />
                      </div>
                      <p className="text-[10px] text-gray-700 font-medium truncate">{service?.name}</p>
                      <p className="text-[9px] text-gray-500 mt-1">
                        {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
