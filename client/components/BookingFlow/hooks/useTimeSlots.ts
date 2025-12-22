import { useMemo } from 'react';
import { TimeSlotHour } from '../types';
import { generateTimeSlotsByHour } from '../utils';
import { TIME_SLOT_CONFIG } from '../constants';

/**
 * Hook to generate available time slots
 */
export const useTimeSlots = (): TimeSlotHour[] => {
  return useMemo(() => {
    return generateTimeSlotsByHour(
      TIME_SLOT_CONFIG.START_HOUR,
      TIME_SLOT_CONFIG.END_HOUR,
      TIME_SLOT_CONFIG.INTERVAL_MINUTES
    );
  }, []);
};

