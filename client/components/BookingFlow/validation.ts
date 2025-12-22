import { Step, SelectedServiceItem, CustomerInfo } from './types';
import { Employee } from '../../types';

/**
 * Validate if a step has valid data to proceed
 */
export const isStepValid = (
  checkStep: Step,
  selectedServices: SelectedServiceItem[],
  selectedEmployee: Employee | null,
  selectedTime: string | null,
  customerInfo: CustomerInfo
): boolean => {
  switch (checkStep) {
    case 'SERVICE':
      return selectedServices.length > 0;
    case 'EMPLOYEE':
      return !!selectedEmployee;
    case 'TIME':
      return !!selectedTime;
    case 'DETAILS':
      return (
        customerInfo.name.trim() !== '' &&
        customerInfo.email.trim() !== '' &&
        customerInfo.phone.trim() !== ''
      );
    default:
      return true;
  }
};

