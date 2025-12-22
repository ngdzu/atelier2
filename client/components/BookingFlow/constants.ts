import { StepConfig } from './types';

export const BOOKING_STEPS: StepConfig[] = [
  { key: 'SERVICE', label: 'Service', nextLabel: 'Choose Professional' },
  { key: 'EMPLOYEE', label: 'Professional', nextLabel: 'Schedule Time' },
  { key: 'TIME', label: 'Schedule', nextLabel: 'Your Details' },
  { key: 'DETAILS', label: 'Details', nextLabel: 'Complete Reservation' },
];

export const TIME_SLOT_CONFIG = {
  START_HOUR: 9,
  END_HOUR: 18,
  INTERVAL_MINUTES: 15,
} as const;

export const SCROLL_SPY_CONFIG = {
  ROOT_MARGIN: '-150px 0px -60% 0px',
  Y_OFFSET: -120,
} as const;

export const SCROLL_SPEED = 10;
export const SCROLL_INTERVAL_MS = 16;

