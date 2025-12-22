import { Customer, Employee, Service, Appointment, GalleryImage } from './types';
import { generateGalleryPhotos } from './utils/generateGalleryPhotos';

export const STORE_NAME = 'LuxeNail';
export const PHONE_NUMBER = '(555) 012-3456';
export const CONTACT_EMAIL = `concierge@${STORE_NAME.toLowerCase()}.com`;
export const ADDRESS_STREET = '123 Design Blvd, Suite 400';
export const ADDRESS_CITY = 'Los Angeles, CA 90210';

export const NAV_LINKS = [
  { name: 'Collections', path: '/gallery' },
  { name: 'The Atelier', path: '/about' },
  { name: 'Services', path: '/book' },
];

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
    id: 'm1_cc', 
    name: 'Color Change (Mani)', 
    duration: 15, 
    price: 15,
    pointsEarned: 15,
    pointsPrice: 525,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Color change for regular polish application. ($15 add-on for gel polish application; $5 add-on for Gel & $10 for Dip removal; $15 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
  },
  { 
    id: 'm2_cc', 
    name: 'Color change (Acrylic/Gel X/Builder/TAP)', 
    duration: 20, 
    price: 25,
    pointsEarned: 25,
    pointsPrice: 875,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Specialized color refresh for advanced nail systems.'
  },
  { 
    id: 'm1', 
    name: 'Regular Manicure', 
    duration: 30, 
    price: 27,
    pointsEarned: 27,
    pointsPrice: 945,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Cut, file, shape, buffer, cuticle treatment, hand massage, hot towel & regular polish application. ($15 add-on for gel polish application; $5 add-on for Gel & $10 for Dip removal; $15 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
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
    description: 'Cut, file, shape, buffer, hot towel & regular polish application. ($15 add-on for gel polish application; $5 add-on for Gel & $10 for Dip removal; $15 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
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
    description: 'Cut, file, shape, buffer, cuticle treatment, hand massage, hot towel and gel polish application. ($10 add-on for Dip removal; $15 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
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
    description: '$10 add-on for Gel builder / Gel X / TAP Gel/ Acrylic removal'
  },
  { 
    id: 'm4_r', 
    name: 'Acrylic Refill', 
    duration: 45, 
    price: 60,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Maintenance for existing acrylic sets.'
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
    description: '1 dip add to $2 ($5 add-on for Dip removal; $10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
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
    description: '$10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal'
  },
  { 
    id: 'm6_r', 
    name: 'Gel X Refill', 
    duration: 45, 
    price: 60,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Maintenance for existing Gel X sets.'
  },
  { 
    id: 'm7', 
    name: 'Gel Builder', 
    duration: 60, 
    price: 70,
    pointsEarned: 70,
    pointsPrice: 2450,
    category: 'Manicure',
    type: 'MAIN',
    description: '$10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal'
  },
  { 
    id: 'm7_r', 
    name: 'Gel Builder (Refill)', 
    duration: 45, 
    price: 60,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Maintenance for existing Gel Builder sets.'
  },
  { 
    id: 'm8', 
    name: 'T.A.P Gel', 
    duration: 60, 
    price: 70,
    pointsEarned: 70,
    pointsPrice: 2450,
    category: 'Manicure',
    type: 'MAIN',
    description: '$10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal'
  },
  { 
    id: 'm8_r', 
    name: 'T.A.P Gel (Refill)', 
    duration: 45, 
    price: 60,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Manicure',
    type: 'MAIN',
    description: 'Maintenance for existing T.A.P Gel sets.'
  },

  // PEDICURE
  { 
    id: 'p_cc', 
    name: 'Color Change (Pedi)', 
    duration: 15, 
    price: 19,
    pointsEarned: 19,
    pointsPrice: 665,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'Cut, file, shape, buffer, & regular polish application ($5 charge for Gel removal; Gel builder / Gel X / TAP Gel/ Acrylic removal will be charged as per the Addition)'
  },
  { 
    id: 'p1', 
    name: 'Regular Pedicure', 
    duration: 35, 
    price: 42,
    pointsEarned: 42,
    pointsPrice: 1470,
    category: 'Pedicure',
    type: 'MAIN',
    description: "A classic care including a warm soak, cutting, gentle cuticle care, scrub, hot towel, 5' hot stone massage, & regular polish application ($5 charge for Gel removal; Gel builder / Gel X / TAP Gel/ Acrylic removal will be charged as per the Addition)"
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
    description: 'Cut, file, shape, buffer, cuticle treatment, & regular polish application ($15 add-on for gel polish; $5 add-on for Gel removal; $10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
  },
  { 
    id: 'p_fs', 
    name: 'Gel Builder/TAP/Acrylic Pedi Fullset', 
    duration: 60, 
    price: 90,
    pointsEarned: 90,
    pointsPrice: 3150,
    category: 'Pedicure',
    type: 'MAIN',
    description: '($10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
  },
  { 
    id: 'p_toes', 
    name: 'Gel Builder/TAP/Acrylic Toes', 
    duration: 30, 
    price: 60,
    pointsEarned: 75,
    pointsPrice: 2100,
    category: 'Pedicure',
    type: 'MAIN',
    description: 'Apply acrylic to toes ($10 add-on for Gel builder / Gel X /TAP Gel/ Acrylic removal)'
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
    description: 'Upgrade your pampering with our deluxe spa treatment with spa pedi products and 10’ hot stone massage ($5 charge for Gel removal; Gel builder/ Gel X / TAP Gel/ Acrylic removal will be charged as per the Addition)'
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
    description: "Indulge in luxury Pedi with Steamer Machine & Spa Candle therapy combined with collagen sock and an extended 20' massage ($5 charge for Gel removal; Gel builder/ Gel X / TAP Gel/ Acrylic removal will be charged as per the Addition)"
  },

  // KIDS
  { 
    id: 'k_p_cc', 
    name: 'Kid Color Change (Pedi)', 
    duration: 15, 
    price: 10,
    pointsEarned: 25,
    pointsPrice: 875,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: 'Quick color refresh for the feet.'
  },
  { 
    id: 'k_m_cc', 
    name: 'Kid Color Change (Mani)', 
    duration: 15, 
    price: 10,
    pointsEarned: 15,
    pointsPrice: 525,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: '$15 add-on for gel polish'
  },
  { 
    id: 'k_combo', 
    name: 'Kid Regular Mani/Pedi Combo', 
    duration: 45, 
    price: 40,
    pointsEarned: 40,
    pointsPrice: 1400,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: '$15 add-on for gel polish application on nails or toes'
  },
  { 
    id: 'k_mani', 
    name: 'Kid Regular Manicure', 
    duration: 25, 
    price: 17,
    pointsEarned: 17,
    pointsPrice: 595,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: 'A gentle and fun hand makeover just for little ones! Includes nail trimming, shaping, light buffing, and a colorful polish application of their choice. $15 add-on for gel polish application'
  },
  { 
    id: 'k_pedi', 
    name: 'Kid Regular Pedicure', 
    duration: 30, 
    price: 27,
    pointsEarned: 27,
    pointsPrice: 945,
    category: "Kid's Services (Under 11)",
    type: 'MAIN',
    description: 'Let their little feet feel fancy and fresh! Includes a gentle soak, nail trim, shaping, light buffing, and a fun polish color to finish. $15 add-on for gel polish application.'
  },

  // WAXING
  { 
    id: 'w_cn', 
    name: 'Waxing - Chin & Neck', 
    duration: 20, 
    price: 25,
    pointsEarned: 25,
    pointsPrice: 875,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Comprehensive facial hair removal for the lower face and neck area.'
  },
  { 
    id: 'w_es', 
    name: 'Eyebrow Shaping', 
    duration: 20, 
    price: 20,
    pointsEarned: 20,
    pointsPrice: 700,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Precise shaping and grooming to enhance your natural brow line, ensuring a polished and clean appearance.'
  },
  { 
    id: 'w_ec', 
    name: 'Eyebrow Cleaning', 
    duration: 15, 
    price: 15,
    pointsEarned: 15,
    pointsPrice: 525,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Quick maintenance cleaning for existing brow shapes.'
  },
  { 
    id: 'w_lip', 
    name: 'Waxing - Lip', 
    duration: 10, 
    price: 12,
    pointsEarned: 12,
    pointsPrice: 420,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Gently remove unwanted hair for a polished look with minimal discomfort.'
  },
  { 
    id: 'w_chin', 
    name: 'Waxing - Chin', 
    duration: 10, 
    price: 12,
    pointsEarned: 12,
    pointsPrice: 420,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Precise and effective solution for a clean and polished look while minimizing irritation.'
  },
  { 
    id: 'w_ff', 
    name: 'Waxing - Full Face', 
    duration: 40, 
    price: 45,
    pointsEarned: 45,
    pointsPrice: 1575,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Skilled aestheticians use high-quality wax for a gentle yet effective treatment across the entire face.'
  },
  { 
    id: 'w_toe', 
    name: 'Waxing - Toe', 
    duration: 10, 
    price: 10,
    pointsEarned: 10,
    pointsPrice: 350,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Clean hair removal for smooth toes.'
  },
  { 
    id: 'w_fin', 
    name: 'Waxing - Finger', 
    duration: 10, 
    price: 10,
    pointsEarned: 10,
    pointsPrice: 350,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Quick hair removal for smooth hands.'
  },
  { 
    id: 'w_sto', 
    name: 'Waxing - Stomach', 
    duration: 25, 
    price: 30,
    pointsEarned: 30,
    pointsPrice: 1050,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Smooth and hair-free finish for the abdominal area with long-lasting results.'
  },
  { 
    id: 'w_ua', 
    name: 'Waxing - Underarm', 
    duration: 20, 
    price: 30,
    pointsEarned: 30,
    pointsPrice: 1050,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Effectively removes unwanted hair leaving skin feeling soft and refreshed for weeks.'
  },
  { 
    id: 'w_ha', 
    name: 'Waxing - Half Arm', 
    duration: 25, 
    price: 30,
    pointsEarned: 30,
    pointsPrice: 1050,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Precise removal from the lower arms for long-lasting smoothness.'
  },
  { 
    id: 'w_fa', 
    name: 'Waxing - Full Arm', 
    duration: 40, 
    price: 45,
    pointsEarned: 45,
    pointsPrice: 1575,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Skilled technique using high-quality wax for a thorough and gentle arm treatment.'
  },
  { 
    id: 'w_fl', 
    name: 'Waxing - Full Legs', 
    duration: 60, 
    price: 82,
    pointsEarned: 82,
    pointsPrice: 2870,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Thorough waxing process leaving your skin feeling soft, rejuvenated, and hair-free.'
  },
  { 
    id: 'w_hl', 
    name: 'Waxing - Half Legs', 
    duration: 35, 
    price: 45,
    pointsEarned: 45,
    pointsPrice: 1575,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Polished look with long-lasting results while minimizing discomfort.'
  },
  { 
    id: 'w_che', 
    name: 'Waxing - Chest', 
    duration: 30, 
    price: 40,
    pointsEarned: 40,
    pointsPrice: 4900,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Effective hair removal for a comfortable and smooth chest appearance.'
  },
  { 
    id: 'w_fb', 
    name: 'Waxing - Full Back', 
    duration: 45, 
    price: 52,
    pointsEarned: 52,
    pointsPrice: 1820,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Professional removal for a refreshed and soft skin feeling.'
  },
  { 
    id: 'w_bik', 
    name: 'Waxing - Bikini', 
    duration: 30, 
    price: 40,
    pointsEarned: 40,
    pointsPrice: 1400,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Standard grooming for the bikini area.'
  },
  { 
    id: 'w_bra', 
    name: 'Waxing - Brazilian', 
    duration: 50, 
    price: 60,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Waxing',
    type: 'MAIN',
    description: 'Thorough and precise removal for the bikini area ensuring smooth skin and enhanced confidence.'
  },

  // EYELASH
  { 
    id: 'e1', 
    name: 'Cluster eyelash extension', 
    duration: 45, 
    price: 80,
    pointsEarned: 80,
    pointsPrice: 2800,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Custom cluster application for immediate impact.'
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
    description: 'A timeless one-to-one application for a natural enhancement.'
  },
  { 
    id: 'e3', 
    name: 'Classic (Refill)', 
    duration: 60, 
    price: 75,
    pointsEarned: 75,
    pointsPrice: 2625,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Maintenance for your classic set.'
  },
  { 
    id: 'e4', 
    name: 'Hybrid Set Full', 
    duration: 105, 
    price: 140,
    pointsEarned: 140,
    pointsPrice: 4900,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'A perfect mix of classic and volume techniques.'
  },
  { 
    id: 'e5', 
    name: 'Hybrid Set (Refill)', 
    duration: 60, 
    price: 75,
    pointsEarned: 75,
    pointsPrice: 2625,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Maintenance for your hybrid set.'
  },
  { 
    id: 'e6', 
    name: 'Volume Set Full', 
    duration: 120, 
    price: 165,
    pointsEarned: 165,
    pointsPrice: 5775,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Multiple lightweight extensions per lash for a fuller look.'
  },
  { 
    id: 'e7', 
    name: 'Volume Set Full (Refill)', 
    duration: 75, 
    price: 80,
    pointsEarned: 80,
    pointsPrice: 2800,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Maintenance for your volume set.'
  },
  { 
    id: 'e8', 
    name: 'Mega Volume Full', 
    duration: 150, 
    price: 200,
    pointsEarned: 200,
    pointsPrice: 7000,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Maximum density and drama for the boldest look.'
  },
  { 
    id: 'e9', 
    name: 'Mega Volume (Refill)', 
    duration: 90, 
    price: 90,
    pointsEarned: 90,
    pointsPrice: 5250,
    category: 'Eyelash',
    type: 'MAIN',
    description: 'Maintenance for your mega volume set.'
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
    description: 'Cleansing, exfoliation, extractions, mask, and moisturizer, leaving your skin refreshed and glowing'
  },
  { 
    id: 'f2', 
    name: 'Custom Facial', 
    duration: 60, 
    price: 110,
    pointsEarned: 60,
    pointsPrice: 2100,
    category: 'Facial',
    type: 'MAIN',
    description: 'Advanced products and techniques.'
  },
  { 
    id: 'f3', 
    name: 'Anti-Aging Facial', 
    duration: 75, 
    price: 145,
    pointsEarned: 145,
    pointsPrice: 5070,
    category: 'Facial',
    type: 'MAIN',
    description: 'Collagen boost and specialized serums.'
  },
  { 
    id: 'f4', 
    name: 'Teen Facial', 
    duration: 45, 
    price: 75,
    pointsEarned: 75,
    pointsPrice: 2625,
    category: 'Facial',
    type: 'MAIN',
    description: 'Cleansing, exfoliation, & hydration for preventing breakouts'
  },

  // OTHERS / ADDONS (Converted to MAIN to show full cards)
  { 
    id: 'a_trim', 
    name: 'Nail Trim', 
    duration: 15, 
    price: 15,
    pointsEarned: 10,
    pointsPrice: 350,
    category: 'Others',
    type: 'MAIN',
    description: 'Professional trimming and shaping of natural nails.'
  },
  { 
    id: 'a_design', 
    name: 'Nail Design', 
    duration: 15, 
    price: 5,
    pointsEarned: 5,
    category: 'Others',
    type: 'MAIN',
    description: 'Custom artistic accents for your manicure.'
  },
  { 
    id: 'a_oil', 
    name: 'Cuticle Oil', 
    duration: 5, 
    price: 5,
    pointsEarned: 5,
    pointsPrice: 175,
    category: 'Others',
    type: 'MAIN',
    description: 'Hydrating treatment to nourish and protect nail beds.'
  },
  { 
    id: 'a_lotion', 
    name: 'Lotion', 
    duration: 10, 
    price: 15,
    pointsEarned: 15,
    pointsPrice: 525,
    category: 'Others',
    type: 'MAIN',
    description: 'Available scents: Jasmine, Acacia, Tropical Citrus, Peach.'
  },
  { 
    id: 'a_rem_adv', 
    name: 'Adv. Removal (Gel X / Builder / TAP / Acrylic)', 
    duration: 30, 
    price: 20,
    pointsEarned: 20,
    pointsPrice: 700,
    category: 'Others',
    type: 'MAIN',
    description: 'Safe and professional removal of advanced nail systems.'
  },
  { 
    id: 'a_repair', 
    name: 'Nail Repair', 
    duration: 15, 
    price: 7,
    pointsEarned: 7,
    pointsPrice: 245,
    category: 'Others',
    type: 'MAIN',
    description: 'Expert fix for a broken or chipped nail.'
  },
  { 
    id: 'a_rem_gel', 
    name: 'Gel Removal', 
    duration: 20, 
    price: 10,
    pointsEarned: 10,
    pointsPrice: 350,
    category: 'Others',
    type: 'MAIN',
    description: 'Safely removing gel polish without causing damage, leaving nails healthy.'
  },
  { 
    id: 'a_rem_dip', 
    name: 'Dip Removal', 
    duration: 25, 
    price: 15,
    pointsEarned: 15,
    pointsPrice: 525,
    category: 'Others',
    type: 'MAIN',
    description: 'Damage-free elimination of gel or acrylic nail enhancements.'
  }
];

// Generate 500 gallery photos with metadata, sorted by newest first
export const GALLERY_IMAGES: GalleryImage[] = generateGalleryPhotos();

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