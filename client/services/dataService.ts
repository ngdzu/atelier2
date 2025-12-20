import { SERVICES, EMPLOYEES, MOCK_CUSTOMERS, MOCK_APPOINTMENTS } from '../constants';
import { Service, Employee, Customer, Appointment, IDataProvider } from '../types';

/**
 * IMPLEMENTATION A: MOCK DATA PROVIDER
 * Uses local constants and simulated delays.
 */
class MockDataProvider implements IDataProvider {
  async getServices(): Promise<Service[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...SERVICES]), 300);
    });
  }

  async getEmployees(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...EMPLOYEES]), 200);
    });
  }

  async getCustomers(): Promise<Customer[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_CUSTOMERS]), 400);
    });
  }

  async getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_APPOINTMENTS]), 250);
    });
  }

  async addAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
    const newAppt: Appointment = {
      id: `appt_${Math.random().toString(36).substr(2, 9)}`,
      customerId: appointment.customerId || 'anon',
      employeeId: appointment.employeeId || '',
      serviceId: appointment.serviceId || '',
      startTime: appointment.startTime || new Date().toISOString(),
      endTime: appointment.endTime || new Date().toISOString(),
      status: 'SCHEDULED',
      ...appointment
    } as Appointment;

    console.log('Mock Persistence: Appointment saved locally', newAppt);
    return newAppt;
  }

  async getDailyStats(): Promise<any[]> {
    return [
      { name: 'Mon', revenue: 1200, appts: 12 },
      { name: 'Tue', revenue: 1500, appts: 15 },
      { name: 'Wed', revenue: 1800, appts: 18 },
      { name: 'Thu', revenue: 1400, appts: 14 },
      { name: 'Fri', revenue: 2500, appts: 22 },
      { name: 'Sat', revenue: 3200, appts: 28 },
      { name: 'Sun', revenue: 2100, appts: 18 },
    ];
  }
}

/**
 * IMPLEMENTATION B: DATABASE DATA PROVIDER (SKELETON)
 * Future implementation for Real Database (e.g. Firebase, Supabase, etc.)
 */
class DatabaseDataProvider implements IDataProvider {
  async getServices(): Promise<Service[]> {
    // TODO: fetch('/api/services')
    throw new Error('DatabaseDataProvider.getServices not implemented.');
  }

  async getEmployees(): Promise<Employee[]> {
    // TODO: fetch('/api/employees')
    throw new Error('DatabaseDataProvider.getEmployees not implemented.');
  }

  async getCustomers(): Promise<Customer[]> {
    throw new Error('DatabaseDataProvider.getCustomers not implemented.');
  }

  async getAppointments(): Promise<Appointment[]> {
    throw new Error('DatabaseDataProvider.getAppointments not implemented.');
  }

  async addAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
    throw new Error('DatabaseDataProvider.addAppointment not implemented.');
  }

  async getDailyStats(): Promise<any[]> {
    throw new Error('DatabaseDataProvider.getDailyStats not implemented.');
  }
}

/**
 * SERVICE EXPORT (The Switch)
 * Change this single line to new DatabaseDataProvider() when ready to swap.
 */
export const dataService: IDataProvider = new MockDataProvider();