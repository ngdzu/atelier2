import { GalleryImage } from '../types';
import { GALLERY_FILENAMES } from './galleryFileList';

/**
 * Generates gallery photos with metadata for the gallery page.
 * Uses actual filenames from resources/gallery/ directory.
 * Photos are distributed across categories and sorted by newest first.
 */
export function generateGalleryPhotos(): GalleryImage[] {
  const photos: GalleryImage[] = [];
  const now = new Date();
  
  // Category distribution - percentages for proportional distribution
  // All photos will be distributed across these categories
  const categories = [
    { name: 'Manicure', percentage: 0.30, keywords: ['manicure', 'nail', 'polish', 'hand', 'beauty'] },
    { name: 'Nail Art', percentage: 0.30, keywords: ['nail art', 'design', 'creative', 'artistic', 'beauty'] },
    { name: 'Pedicure', percentage: 0.20, keywords: ['pedicure', 'foot', 'toes', 'spa', 'beauty'] },
    { name: 'Waxing', percentage: 0.06, keywords: ['waxing', 'beauty', 'smooth', 'spa'] },
    { name: 'Eyelash', percentage: 0.06, keywords: ['eyelash', 'lashes', 'extension', 'beauty'] },
    { name: 'Facial', percentage: 0.08, keywords: ['facial', 'skincare', 'treatment', 'beauty'] },
  ];

  // Photo titles for variety
  const titleTemplates = {
    'Manicure': [
      'Classic French Manicure', 'Gel Polish Perfection', 'Elegant Nude Manicure',
      'Bold Color Statement', 'Minimalist Design', 'Luxury Spa Manicure',
      'Professional Finish', 'Trendy Nail Style', 'Timeless Elegance', 'Modern Classic',
      'Chic Nail Design', 'Sophisticated Manicure', 'Artisan Nail Work', 'Premium Polish',
      'Refined Nail Art', 'Elegant Hand Care', 'Luxury Manicure', 'Designer Nails'
    ],
    'Nail Art': [
      'Abstract Art Design', 'Floral Nail Art', 'Geometric Patterns',
      'Marble Effect', 'Ombre Gradient', 'Metallic Accents', '3D Nail Art',
      'Hand-Painted Design', 'Crystal Embellishments', 'Artistic Expression',
      'Creative Nail Design', 'Bold Patterns', 'Intricate Details', 'Unique Artwork',
      'Stylish Nail Art', 'Modern Design', 'Artistic Flair', 'Designer Patterns'
    ],
    'Pedicure': [
      'Relaxing Spa Pedicure', 'Classic Pedicure', 'Luxury Foot Treatment',
      'Gel Pedicure', 'French Pedicure', 'Colorful Toes', 'Elegant Pedicure',
      'Professional Care', 'Spa Experience', 'Perfect Finish',
      'Refreshing Treatment', 'Luxury Foot Care', 'Premium Pedicure', 'Spa Pedicure',
      'Relaxing Treatment', 'Professional Service', 'Elegant Care', 'Luxury Experience'
    ],
    'Waxing': [
      'Smooth Results', 'Professional Waxing', 'Beauty Treatment',
      'Expert Service', 'Quality Care', 'Luxury Waxing', 'Spa Treatment'
    ],
    'Eyelash': [
      'Volume Lashes', 'Classic Extensions', 'Natural Look',
      'Full Set Lashes', 'Luxury Lashes', 'Professional Extensions', 'Beautiful Lashes'
    ],
    'Facial': [
      'Rejuvenating Facial', 'Deep Cleansing', 'Hydrating Treatment',
      'Anti-Aging Facial', 'Custom Facial Care', 'Luxury Facial', 'Spa Treatment'
    ],
  };

  // Use ALL photos from the gallery folder, distributed across categories
  // This ensures all downloaded photos are displayed
  const totalPhotos = GALLERY_FILENAMES.length;
  
  let photoIndex = 0;
  
  // Distribute all photos across categories proportionally
  categories.forEach((category, catIndex) => {
    const titles = titleTemplates[category.name as keyof typeof titleTemplates] || titleTemplates['Manicure'];
    
    // Calculate how many photos this category should get based on percentage
    const photosForCategory = Math.floor(totalPhotos * category.percentage);
    
    // Use remaining photos for the last category to ensure all photos are included
    const actualCount = catIndex === categories.length - 1 
      ? totalPhotos - photoIndex 
      : Math.min(photosForCategory, totalPhotos - photoIndex);
    
    for (let i = 0; i < actualCount && photoIndex < GALLERY_FILENAMES.length; i++) {
      const filename = GALLERY_FILENAMES[photoIndex];
      const titleIndex = i % titles.length;
      const title = `${titles[titleIndex]}${i >= titles.length ? ` #${Math.floor(i / titles.length) + 1}` : ''}`;
      
      // Generate uploadedAt date - spread over last 12 months, more recent = more photos
      let monthsAgo: number;
      const rand = Math.random();
      if (rand < 0.4) {
        // Last 2 months
        monthsAgo = Math.random() * 2;
      } else if (rand < 0.75) {
        // 2-6 months ago
        monthsAgo = 2 + Math.random() * 4;
      } else {
        // 6-12 months ago
        monthsAgo = 6 + Math.random() * 6;
      }
      
      const uploadedDate = new Date(now);
      uploadedDate.setMonth(uploadedDate.getMonth() - monthsAgo);
      uploadedDate.setDate(uploadedDate.getDate() - Math.floor(Math.random() * 28));
      uploadedDate.setHours(Math.floor(Math.random() * 24));
      uploadedDate.setMinutes(Math.floor(Math.random() * 60));
      
      // Files are in public/gallery/, so accessible at /gallery/filename
      const url = `/gallery/${filename}`;
      
      photos.push({
        id: `g${photoIndex + 1}`,
        url,
        category: category.name,
        title,
        uploadedAt: uploadedDate.toISOString(),
        alt: `${title} - ${category.name} service at nail salon`,
      });
      
      photoIndex++;
    }
  });

  // Sort by uploadedAt descending (newest first)
  photos.sort((a, b) => {
    const dateA = new Date(a.uploadedAt).getTime();
    const dateB = new Date(b.uploadedAt).getTime();
    return dateB - dateA; // Descending order
  });

  // Re-assign IDs after sorting to maintain sequential IDs
  photos.forEach((photo, index) => {
    photo.id = `g${index + 1}`;
  });

  return photos;
}
