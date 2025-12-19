
import { Customer, Employee, Service, Appointment } from './types';

export const STORE_NAME = 'LuxeNail';

export const COLORS = {
  primary: '#000000',
  secondary: '#C4A484',
  accent: '#E6D5C3',
  background: '#FDFCFB',
  surface: '#FFFFFF',
};

export const SERVICES: Service[] = [
  // MANICURES
  { 
    id: 'm1', 
    name: 'Classic Manicure', 
    duration: 30, 
    price: 25,
    category: 'Manicures',
    type: 'MAIN',
    description: 'Includes nail shaping, cuticle grooming, a relaxing hand massage, and regular polish application.'
  },
  { 
    id: 'm2', 
    name: 'Gel Manicure', 
    duration: 45, 
    price: 40,
    category: 'Manicures',
    type: 'MAIN',
    description: 'A classic manicure finished with high-quality gel polish for long-lasting shine and durability (up to 2 weeks).'
  },
  { 
    id: 'm3', 
    name: 'Dazzle Dry Manicure', 
    duration: 35, 
    price: 35,
    category: 'Manicures',
    type: 'MAIN',
    description: 'Non-toxic, vegan polish that air-dries in 5 minutes with the longevity of gel but without the UV light.'
  },
  { 
    id: 'm4', 
    name: `${STORE_NAME} Signature Spa Manicure`, 
    duration: 50, 
    price: 45,
    category: 'Manicures',
    type: 'MAIN',
    description: 'Our premier hand ritual including sugar scrub exfoliation, hydrating mask, hot towel wrap, and luxury massage.'
  },

  // PEDICURES
  { 
    id: 'p1', 
    name: 'Classic Pedicure', 
    duration: 35, 
    price: 35,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'Includes foot soak, nail shaping, cuticle grooming, callus buffing, foot massage, and regular polish.'
  },
  { 
    id: 'p2', 
    name: 'Luxury Spa Pedicure', 
    duration: 50, 
    price: 50,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'Enhanced classic pedicure with sea salt soak, sugar scrub, mud mask, and extra massage time.'
  },
  { 
    id: 'p3', 
    name: 'Milk & Honey Pedicure', 
    duration: 60, 
    price: 65,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'A nourishing treatment using real milk and honey to soften skin, followed by a paraffin wax treatment.'
  },
  { 
    id: 'p4', 
    name: 'Jelly Pedicure', 
    duration: 65, 
    price: 75,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'Transform your foot soak into a gelatinous spa experience that retains heat 3x longer and deeply hydrates.'
  },
  { 
    id: 'p5', 
    name: `${STORE_NAME} Ultimate CBD Pedicure`, 
    duration: 75, 
    price: 95,
    category: 'Pedicures',
    type: 'MAIN',
    description: 'The pinnacle of relaxation. Uses premium CBD products to reduce inflammation, pain, and stress.'
  },

  // DIPPING POWDER
  { 
    id: 'd1', 
    name: 'Dip Powder (Natural Nail)', 
    duration: 45, 
    price: 50,
    category: 'Dipping Powder',
    type: 'MAIN',
    description: 'A durable, odor-free alternative to acrylics that strengthens the natural nail with infused vitamins.'
  },
  { 
    id: 'd2', 
    name: 'Dip Powder with Extensions', 
    duration: 60, 
    price: 60,
    category: 'Dipping Powder',
    type: 'MAIN',
    description: 'Adds length using tip extensions before applying dipping powder for a lightweight, strong finish.'
  },

  // ENHANCEMENTS
  { 
    id: 'e1', 
    name: 'Acrylic Full Set', 
    duration: 60, 
    price: 55,
    category: 'Enhancements',
    type: 'MAIN',
    description: 'Classic nail extensions for added length and strength. Includes regular polish.'
  },
  { 
    id: 'e2', 
    name: 'Gel-X Extensions', 
    duration: 75, 
    price: 75,
    category: 'Enhancements',
    type: 'MAIN',
    description: 'The world\'s first soak-off soft gel nail extension system. No dust, no odor, and no damage to natural nails.'
  },
  { 
    id: 'e3', 
    name: 'Liquid Gel Full Set', 
    duration: 75, 
    price: 70,
    category: 'Enhancements',
    type: 'MAIN',
    description: 'A clearer, more natural-looking extension option compared to acrylics, offering high flexibility and gloss.'
  },

  // ADD-ONS
  { 
    id: 'a1', 
    name: 'Artisan Nail Art (2 nails)', 
    duration: 15, 
    price: 15,
    category: 'Manicures',
    type: 'ADDON',
    description: 'Custom hand-painted designs, stickers, or basic patterns.'
  },
  { 
    id: 'a2', 
    name: 'Chrome / Holographic Finish', 
    duration: 15, 
    price: 15,
    category: 'Manicures',
    type: 'ADDON',
    description: 'Apply a metallic or prismatic mirror-like powder over your gel color.'
  },
  { 
    id: 'a3', 
    name: 'French Tip Polish', 
    duration: 15, 
    price: 10,
    category: 'Manicures',
    type: 'ADDON',
    description: 'Classic white or colored tips for a timeless, clean look.'
  },
  { 
    id: 'a4', 
    name: 'Paraffin Wax Treatment', 
    duration: 10, 
    price: 15,
    category: 'Manicures',
    type: 'ADDON',
    description: 'Deep moisturizing heat therapy for dry, cracked skin.'
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
  { id: 'e1', name: 'Elena Vance', email: `elena@${STORE_NAME.toLowerCase()}.com`, phone: '555-0101', role: 'EMPLOYEE', specialties: ['Dipping Powder', 'Gel-X Extensions'], color: '#F7F7F7' },
  { id: 'e2', name: 'Marcus Chen', email: `marcus@${STORE_NAME.toLowerCase()}.com`, phone: '555-0102', role: 'EMPLOYEE', specialties: ['Spa Pedicure', 'Nail Art'], color: '#F7F7F7' },
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
