import React from 'react';
import { CheckCircle2, User } from 'lucide-react';
import { Employee } from '../../../types';

interface EmployeeStepProps {
  employees: Employee[];
  selectedEmployeeId: string | null;
  onEmployeeSelect: (employee: Employee) => void;
}

/**
 * Employee selection step component
 */
const EmployeeStep: React.FC<EmployeeStepProps> = ({
  employees,
  selectedEmployeeId,
  onEmployeeSelect,
}) => {
  return (
    <div className="space-y-16 relative">
      <div className="absolute top-0 left-0 pointer-events-none">
        <img src="/logo.png" alt="" className="h-24 w-auto opacity-10" />
      </div>
      <div className="text-center max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
          <h2 className="text-5xl font-serif font-bold text-black">The Specialists.</h2>
          <img src="/logo.png" alt="LuxeNail" className="h-8 w-auto" />
        </div>
        <p className="text-gray-600 text-sm font-light tracking-wide">
          Select an artisan to curate your session.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
        {employees.map(employee => (
          <button
            key={employee.id}
            onClick={() => onEmployeeSelect(employee)}
            className={`p-16 border-2 text-center transition-all duration-700 relative group ${
              selectedEmployeeId === employee.id
                ? 'border-black bg-white shadow-2xl'
                : 'border-black/5 hover:border-black/20'
            }`}
          >
            <div className="w-32 h-32 rounded-full border border-black/10 overflow-hidden mx-auto mb-8 grayscale group-hover:grayscale-0 transition-all flex items-center justify-center bg-gray-50">
              <User size={64} strokeWidth={0.5} className="text-gray-300" />
            </div>
            <h4 className="font-bold text-2xl tracking-tight text-black">{employee.name}</h4>
            {selectedEmployeeId === employee.id && (
              <div className="absolute top-8 right-8 text-black">
                <CheckCircle2 size={32} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeStep;

