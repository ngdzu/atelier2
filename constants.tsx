
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
  // MANICURE
  { 
    id: 'm1', 
    name: 'Regular Manicure', 
    duration: 30, 
    price: 27,
    pointsEarned: 27,
    pointsPrice: 945,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Cut, file, shape, buffer, cuticle treatment, hand massage, hot towel & regular polish application.'
  },
  { 
    id: 'm2', 
    name: 'Gel Manicure', 
    duration: 45, 
    price: 40,
    pointsEarned: 40,
    pointsPrice: 1400,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Cut, file, shape, buffer, cuticle treatment, hand massage, hot towel and gel polish application.'
  },
  { 
    id: 'm3', 
    name: 'Express Manicure', 
    duration: 20, 
    price: 22,
    pointsEarned: 22,
    pointsPrice: 770,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Cut, file, shape, buffer, hot towel & regular polish application.'
  },
  { 
    id: 'm4', 
    name: 'Acrylic Fullset', 
    duration: 60, 
    price: 65,
    pointsEarned: 65,
    pointsPrice: 2275,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Professional acrylic nail extensions.'
  },
  { 
    id: 'm5', 
    name: 'Dip Manicure', 
    duration: 45, 
    price: 50,
    pointsEarned: 50,
    pointsPrice: 1750,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Healthy alternative to acrylic using dipping powder technique.'
  },
  { 
    id: 'm6', 
    name: 'Gel X Full set', 
    duration: 60, 
    price: 75,
    pointsEarned: 75,
    pointsPrice: 2625,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Aprés Gel-X architectural extensions.'
  },
  { 
    id: 'm7', 
    name: 'Gel Builder Fullset', 
    duration: 60, 
    price: 70,
    pointsEarned: 70,
    pointsPrice: 2450,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Structural reinforcement using high-viscosity builder gel.'
  },
  { 
    id: 'm8', 
    name: 'T.A.P Gel Fullset', 
    duration: 60, 
    price: 70,
    pointsEarned: 70,
    pointsPrice: 2450,
    category: 'Manicure',
    type: 'MAIN',
    description: 'The latest technique in hybrid gel application.'
  },

  // PEDICURE
  { 
    id: 'p1', 
    name: 'Regular Pedicure', 
    duration: 35, 
    price: 42,
    pointsEarned: 42,
    pointsPrice: 1470,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'A classic care including a warm soak, cutting, gentle cuticle care, scrub, hot towel, and stone massage.'
  },
  { 
    id: 'p2', 
    name: 'Express Pedicure', 
    duration: 25, 
    price: 30,
    pointsEarned: 30,
    pointsPrice: 1050,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'Quick refresh including nail shaping and regular polish.'
  },
  { 
    id: 'p3', 
    name: 'Deluxe Spa Pedicure', 
    duration: 50, 
    price: 65,
    pointsEarned: 65,
    pointsPrice: 2275,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'Upgrade your pampering with deluxe spa products and 10’ hot stone massage.'
  },
  { 
    id: 'p4', 
    name: `${STORE_NAME} Signature Spa Pedicure`, 
    duration: 75, 
    price: 93,
    pointsEarned: 93,
    pointsPrice: 3430,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'Indulge in luxury with Steamer Machine & Spa Candle therapy combined with collagen socks.'
  },

  // EYELASH
  { 
    id: 'e1', 
    name: 'Cluster Eyelash Extension', 
    duration: 45, 
    price: 80,
    pointsEarned: 80,
    pointsPrice: 2800,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Instant volume with cluster lash clusters.'
  },
  { 
    id: 'e2', 
    name: 'Classic Full Set', 
    duration: 90, 
    price: 125,
    pointsEarned: 125,
    pointsPrice: 4370,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'One-to-one individual lash application for a natural look.'
  },
  { 
    id: 'e3', 
    name: 'Volume Set Full', 
    duration: 120, 
    price: 165,
    pointsEarned: 165,
    pointsPrice: 5775,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Multiple lightweight extensions per natural lash for maximum drama.'
  },

  // FACIAL
  { 
    id: 'f1', 
    name: 'Classic Facial', 
    duration: 60, 
    price: 75,
    pointsEarned: 75,
    pointsPrice: 2625,
    category: 'Facial',
    type: 'MAIN',
    description: 'Cleansing, exfoliation, extractions, and hydration for refreshed skin.'
  },
  { 
    id: 'f2', 
    name: 'Anti-Aging Facial', 
    duration: 75, 
    price: 145,
    pointsEarned: 145,
    pointsPrice: 5070,
    category: 'Facial',
    type: 'MAIN',
    description: 'Collagen boost and specialized serums for youthful radiance.'
  },

  // KIDS
  { 
    id: 'k1', 
    name: 'Kid Regular Manicure', 
    duration: 20, 
    price: 17,
    pointsEarned: 17,
    pointsPrice: 595,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: 'Gentle hand makeover including trimming, shaping, and colorful polish.'
  },
  { 
    id: 'k2', 
    name: 'Kid Regular Mani/Pedi Combo', 
    duration: 45, 
    price: 40,
    pointsEarned: 40,
    pointsPrice: 1400,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: 'The ultimate treat for your little one.'
  },

  // OTHERS / ADDONS
  { 
    id: 'a1', 
    name: 'Color Change (Mani)', 
    duration: 15, 
    price: 15,
    pointsEarned: 15,
    pointsPrice: 525,
    category: 'Others',
    type: 'ADDON',
    description: 'Polish refresh for the hands.'
  },
  { 
    id: 'a2', 
    name: 'Gel Removal', 
    duration: 15, 
    price: 10,
    pointsEarned: 10,
    pointsPrice: 350,
    category: 'Others',
    type: 'ADDON',
    description: 'Safe and gentle soak-off for gel polish.'
  },
  { 
    id: 'a3', 
    name: 'Nail Repair', 
    duration: 10, 
    price: 7,
    pointsEarned: 7,
    pointsPrice: 245,
    category: 'Others',
    type: 'ADDON',
    description: 'Professional fix for a broken or chipped nail.'
  },
  { 
    id: 'a4', 
    name: 'Eyebrow Shaping', 
    duration: 15, 
    price: 20,
    pointsEarned: 20,
    pointsPrice: 700,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Precise grooming to enhance your natural brow line.'
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
