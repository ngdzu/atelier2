import { describe, it, expect } from 'vitest';
import { isStepValid } from '../validation';
import { Step } from '../types';
import { mockService, mockEmployee } from '../../tests/utils/mocks';

describe('validation', () => {
  describe('isStepValid', () => {
    const selectedServices = [
      { service: mockService, quantity: 1 },
    ];

    it('should return true for SERVICE step when services are selected', () => {
      expect(isStepValid('SERVICE', selectedServices, null, null, { name: '', email: '', phone: '' })).toBe(true);
    });

    it('should return false for SERVICE step when no services are selected', () => {
      expect(isStepValid('SERVICE', [], null, null, { name: '', email: '', phone: '' })).toBe(false);
    });

    it('should return true for EMPLOYEE step when employee is selected', () => {
      expect(isStepValid('EMPLOYEE', selectedServices, mockEmployee, null, { name: '', email: '', phone: '' })).toBe(true);
    });

    it('should return false for EMPLOYEE step when no employee is selected', () => {
      expect(isStepValid('EMPLOYEE', selectedServices, null, null, { name: '', email: '', phone: '' })).toBe(false);
    });

    it('should return true for TIME step when time is selected', () => {
      expect(isStepValid('TIME', selectedServices, mockEmployee, '10:00', { name: '', email: '', phone: '' })).toBe(true);
    });

    it('should return false for TIME step when no time is selected', () => {
      expect(isStepValid('TIME', selectedServices, mockEmployee, null, { name: '', email: '', phone: '' })).toBe(false);
    });

    it('should return true for DETAILS step when all customer info is provided', () => {
      expect(isStepValid('DETAILS', selectedServices, mockEmployee, '10:00', {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
      })).toBe(true);
    });

    it('should return false for DETAILS step when name is missing', () => {
      expect(isStepValid('DETAILS', selectedServices, mockEmployee, '10:00', {
        name: '',
        email: 'john@example.com',
        phone: '555-1234',
      })).toBe(false);
    });

    it('should return false for DETAILS step when email is missing', () => {
      expect(isStepValid('DETAILS', selectedServices, mockEmployee, '10:00', {
        name: 'John Doe',
        email: '',
        phone: '555-1234',
      })).toBe(false);
    });

    it('should return false for DETAILS step when phone is missing', () => {
      expect(isStepValid('DETAILS', selectedServices, mockEmployee, '10:00', {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
      })).toBe(false);
    });

    it('should return false for DETAILS step when name has only whitespace', () => {
      expect(isStepValid('DETAILS', selectedServices, mockEmployee, '10:00', {
        name: '   ',
        email: 'john@example.com',
        phone: '555-1234',
      })).toBe(false);
    });

    it('should return true for CONFIRM step', () => {
      expect(isStepValid('CONFIRM', selectedServices, mockEmployee, '10:00', {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-1234',
      })).toBe(true);
    });
  });
});

