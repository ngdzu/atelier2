import React from 'react';
import { GalleryImage } from '../../types';
import { useResponsiveColumns } from './hooks/useResponsiveColumns';

interface MasonryGridProps {
  images: GalleryImage[];
  filter?: string;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, filter = 'All' }) => {
  const columns = useResponsiveColumns();
  
  // Filter images by category if filter is not 'All'
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div 
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 0, // No gaps between photos
      }}
    >
      {filteredImages.map((img) => (
        <div
          key={img.id}
          className="relative w-full"
          style={{
            aspectRatio: '1 / 1', // Square aspect ratio
            overflow: 'hidden',
          }}
        >
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Hide broken images instead of showing broken image icon
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

