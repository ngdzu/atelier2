import { Service, Employee, Appointment } from '../../types';

export type Step = 'SERVICE' | 'EMPLOYEE' | 'TIME' | 'DETAILS' | 'CONFIRM';

export interface BookingFlowProps {
  onComplete: (appt: Partial<Appointment>) => void;
}

export interface SelectedServiceItem {
  service: Service;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface StepConfig {
  key: Step;
  label: string;
  nextLabel: string;
}

export interface TimeSlotHour {
  label: number;
  slots: string[];
}

