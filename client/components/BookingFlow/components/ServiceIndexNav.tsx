import React from 'react';

interface ServiceIndexNavProps {
  categories: string[];
  activeCategory: string;
  indexScrollRef: React.RefObject<HTMLDivElement>;
  onCategoryClick: (category: string) => void;
  onScrollStart: (direction: 'left' | 'right') => void;
  onScrollStop: () => void;
}

/**
 * Sticky category index navigation component
 */
const ServiceIndexNav: React.FC<ServiceIndexNavProps> = ({
  categories,
  activeCategory,
  indexScrollRef,
  onCategoryClick,
  onScrollStart,
  onScrollStop,
}) => {
  return (
    <div className="sticky top-4 z-40 px-4 -mx-4 md:px-0 md:-mx-0 group/index">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-2xl border border-black/5 rounded-full p-1 shadow-2xl shadow-black/5 flex items-center relative overflow-hidden">
        <div
          onMouseEnter={() => onScrollStart('left')}
          onMouseLeave={onScrollStop}
          className="absolute left-0 top-0 bottom-0 w-20 z-10 cursor-w-resize"
        />
        <div
          onMouseEnter={() => onScrollStart('right')}
          onMouseLeave={onScrollStop}
          className="absolute right-0 top-0 bottom-0 w-20 z-10 cursor-e-resize"
        />
        <img src="/logo.png" alt="" className="h-6 w-auto ml-4 flex-shrink-0" />
        <div
          ref={indexScrollRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth atelier-index-container px-6"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              data-category={cat}
              className={`px-8 py-4 rounded-full text-[8px] font-black uppercase tracking-[0.4em] transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-black text-white shadow-xl'
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <img src="/logo.png" alt="" className="h-6 w-auto mr-4 flex-shrink-0" />
      </div>
    </div>
  );
};

export default ServiceIndexNav;

