export type Role = 'ADMIN' | 'OWNER' | 'EMPLOYEE' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
}

export interface Customer extends User {
  lastVisit?: string;
  totalSpent: number;
  notes?: string;
}

export interface Employee extends User {
  specialties: string[];
  color: string; // For calendar identification
}

export type ServiceType = 'MAIN' | 'ADDON';

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  pointsEarned?: number;
  pointsPrice?: number;
  description?: string;
  category: string;
  type: ServiceType;
}

export interface Appointment {
  id: string;
  customerId: string;
  employeeId: string;
  serviceId: string;
  addonIds?: string[];
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface DailyStats {
  date: string;
  revenue: number;
  appointments: number;
  newCustomers: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  uploadedAt: string; // ISO 8601 date string
  alt: string;
}

/**
 * Data Provider Interface (The Abstraction)
 * Implementations will handle either Mock/Constants or Real Database
 */
export interface IDataProvider {
  getServices(): Promise<Service[]>;
  getEmployees(): Promise<Employee[]>;
  getCustomers(): Promise<Customer[]>;
  getAppointments(): Promise<Appointment[]>;
  addAppointment(appointment: Partial<Appointment>): Promise<Appointment>;
  getDailyStats(): Promise<any[]>;
}