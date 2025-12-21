import { vi } from 'vitest';

// Mock types/data (define first so they can be used in mock implementations)
export const mockService = {
  id: 'test-service-1',
  name: 'Test Service',
  duration: 30,
  price: 50,
  pointsEarned: 50,
  pointsPrice: 1750,
  category: 'Manicure',
  type: 'MAIN' as const,
  description: 'Test service description',
};

export const mockEmployee = {
  id: 'test-employee-1',
  name: 'Test Employee',
  email: 'test@example.com',
  phone: '555-0101',
  role: 'EMPLOYEE' as const,
  specialties: ['Test Specialty'],
  color: '#F7F7F7',
};

export const mockCustomer = {
  id: 'test-customer-1',
  name: 'Test Customer',
  email: 'customer@example.com',
  phone: '555-1234',
  role: 'CUSTOMER' as const,
  totalSpent: 100,
  lastVisit: '2024-01-01',
};

export const mockAppointment = {
  id: 'test-appointment-1',
  customerId: 'test-customer-1',
  employeeId: 'test-employee-1',
  serviceId: 'test-service-1',
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  status: 'SCHEDULED' as const,
};

// Mock dataService
export const mockDataService = {
  getServices: vi.fn(),
  getEmployees: vi.fn(),
  getCustomers: vi.fn(),
  getAppointments: vi.fn(),
  addAppointment: vi.fn(),
  getDailyStats: vi.fn(),
};

// Mock geminiService
export const mockGeminiService = {
  generatePromotion: vi.fn(),
  crawlCompetitorData: vi.fn(),
  analyzeBusinessPerformance: vi.fn(),
};

// Setup default mock implementations (after mock data is defined)
mockDataService.getServices.mockResolvedValue([mockService]);
mockDataService.getEmployees.mockResolvedValue([mockEmployee]);
mockDataService.getCustomers.mockResolvedValue([mockCustomer]);
mockDataService.getAppointments.mockResolvedValue([mockAppointment]);
mockDataService.addAppointment.mockResolvedValue(mockAppointment);
mockDataService.getDailyStats.mockResolvedValue([]);

mockGeminiService.generatePromotion.mockResolvedValue('Mocked promotion text');
mockGeminiService.crawlCompetitorData.mockResolvedValue({ text: 'Mocked research', sources: [] });
mockGeminiService.analyzeBusinessPerformance.mockResolvedValue('Mocked analysis');

// Mock constants
export const mockConstants = {
  STORE_NAME: 'LuxeNail',
  PHONE_NUMBER: '(555) 012-3456',
  CONTACT_EMAIL: 'concierge@luxenail.com',
  ADDRESS_STREET: '123 Design Blvd, Suite 400',
  ADDRESS_CITY: 'Los Angeles, CA 90210',
  NAV_LINKS: [
    { name: 'Collections', path: '/gallery' },
    { name: 'The Atelier', path: '/about' },
    { name: 'Services', path: '/book' },
  ],
};

