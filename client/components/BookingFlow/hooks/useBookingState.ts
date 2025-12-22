import { useState, useMemo } from 'react';
import { Service, Employee } from '../../../types';
import { SelectedServiceItem, CustomerInfo, Step } from '../types';
import { calculateTotalPrice, calculateTotalPoints, calculateTotalItemsCount, groupServicesByCategory } from '../utils';

/**
 * Hook to manage booking flow state
 */
export const useBookingState = () => {
  const [step, setStep] = useState<Step>('SERVICE');
  const [selectedServices, setSelectedServices] = useState<SelectedServiceItem[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  });

  const totalPrice = useMemo(() => calculateTotalPrice(selectedServices), [selectedServices]);
  const totalPoints = useMemo(() => calculateTotalPoints(selectedServices), [selectedServices]);
  const totalItemsCount = useMemo(() => calculateTotalItemsCount(selectedServices), [selectedServices]);

  const updateQuantity = (service: Service, delta: number) => {
    setSelectedServices(prev => {
      const existing = prev.find(item => item.service.id === service.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter(item => item.service.id !== service.id);
        }
        return prev.map(item =>
          item.service.id === service.id ? { ...item, quantity: newQty } : item
        );
      } else if (delta > 0) {
        return [...prev, { service, quantity: 1 }];
      }
      return prev;
    });
  };

  const getQuantity = (serviceId: string): number => {
    return selectedServices.find(item => item.service.id === serviceId)?.quantity || 0;
  };

  return {
    step,
    setStep,
    selectedServices,
    setSelectedServices,
    selectedEmployee,
    setSelectedEmployee,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    customerInfo,
    setCustomerInfo,
    totalPrice,
    totalPoints,
    totalItemsCount,
    updateQuantity,
    getQuantity,
  };
};

/**
 * Hook to group services by category
 */
export const useServicesByCategory = (services: Service[]) => {
  return useMemo(() => groupServicesByCategory(services), [services]);
};

