import { SelectedServiceItem } from './types';

/**
 * Calculate total price from selected services
 */
export const calculateTotalPrice = (selectedServices: SelectedServiceItem[]): number => {
  return selectedServices.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
};

/**
 * Calculate total loyalty points from selected services
 */
export const calculateTotalPoints = (selectedServices: SelectedServiceItem[]): number => {
  return selectedServices.reduce((sum, item) => sum + ((item.service.pointsEarned || 0) * item.quantity), 0);
};

/**
 * Calculate total items count from selected services
 */
export const calculateTotalItemsCount = (selectedServices: SelectedServiceItem[]): number => {
  return selectedServices.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Group services by category
 */
export const groupServicesByCategory = <T extends { category: string }>(services: T[]): Record<string, T[]> => {
  const categories: Record<string, T[]> = {};
  services.forEach(service => {
    if (!categories[service.category]) {
      categories[service.category] = [];
    }
    categories[service.category].push(service);
  });
  return categories;
};

/**
 * Generate time slots by hour
 */
export const generateTimeSlotsByHour = (
  startHour: number,
  endHour: number,
  intervalMinutes: number
): Array<{ label: number; slots: string[] }> => {
  const hours: Array<{ label: number; slots: string[] }> = [];
  
  for (let h = startHour; h <= endHour; h++) {
    const hourSlots: string[] = [];
    for (let m = 0; m < 60; m += intervalMinutes) {
      hourSlots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
    hours.push({ label: h, slots: hourSlots });
  }
  
  return hours;
};

