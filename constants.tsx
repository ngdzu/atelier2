
import { Customer, Employee, Service, Appointment } from './types';

export const COLORS = {
  primary: '#000000',
  secondary: '#C4A484',
  accent: '#E6D5C3',
  background: '#FDFCFB',
  surface: '#FFFFFF',
};

export const SERVICES: Service[] = [
  { 
    id: 'm1', 
    name: 'The Signature Ritual', 
    duration: 60, 
    price: 85,
    category: 'Manicures',
    type: 'MAIN',
    description: 'A deep restorative ceremony for the hands. Cold-pressed oils, botanical scrubs, and architectural nail shaping.'
  },
  { 
    id: 'm2', 
    name: 'Mineral Gel Polish', 
    duration: 45, 
    price: 65,
    category: 'Manicures',
    type: 'MAIN',
    description: 'High-pigment mineral gels cured for longevity and unparalleled gloss. A contemporary classic.'
  },
  { 
    id: 'm3', 
    name: 'Architectural Sculpt', 
    duration: 120, 
    price: 150,
    category: 'Manicures',
    type: 'MAIN',
    description: 'Hand-sculpted extensions designed to elongate and enhance the natural silhouette of the hand.'
  },
  { 
    id: 'ma1', 
    name: 'Artisan Detail', 
    duration: 30, 
    price: 45,
    category: 'Manicures',
    type: 'ADDON',
    description: 'Hand-painted minimalist accents or seasonal textures.'
  },
  { 
    id: 'p1', 
    name: 'The Luxe Pedicure', 
    duration: 75, 
    price: 110,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'A curated journey for the feet. Sea salt minerals, thermal stones, and precision grooming.'
  },
];

export const GALLERY_IMAGES = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1604654894610-df490651e61c?q=80&w=1200', category: 'Look 01', title: 'The Gilded Edge' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200', category: 'Look 02', title: 'Rouge Precision' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=1200', category: 'Look 03', title: 'Noir Marble' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200', category: 'Look 04', title: 'Pearl Luminescence' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200', category: 'Look 05', title: 'Atelier Nude' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?q=80&w=1200', category: 'Look 06', title: 'Shadow Velvet' },
];

export const EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Elena Vance', email: 'elena@luxenail.com', phone: '555-0101', role: 'EMPLOYEE', specialties: ['Artisan Detail', 'Sculpt'], color: '#F7F7F7' },
  { id: 'e2', name: 'Marcus Chen', email: 'marcus@luxenail.com', phone: '555-0102', role: 'EMPLOYEE', specialties: ['Ritual', 'Manicure'], color: '#F7F7F7' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Jessica Alba', email: 'jess@example.com', phone: '555-1234', role: 'CUSTOMER', totalSpent: 450, lastVisit: '2023-10-25' },
];

const today = new Date();
today.setHours(9, 0, 0, 0);

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    customerId: 'c1',
    employeeId: 'e1',
    serviceId: 'm1',
    startTime: new Date(today.getTime() + 1 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    status: 'SCHEDULED'
  }
];
