import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../constants';
import Header from './Header';
import Footer from './Footer';
import MasonryGrid from './GalleryPage/MasonryGrid';

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  // Get unique categories from images
  const categories = ['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];

  return (
    <div className="bg-[#FDFCFB] min-h-screen selection:bg-black selection:text-white">
      <Header />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C4A484] mb-8 reveal">The Portfolio</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 reveal">
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-black">
            The <span className="italic font-normal italic">Lookbook.</span>
          </h1>

          {/* Subtle brand mark */}
          <div className="flex items-center gap-4 md:gap-6 self-start md:self-end">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-black/10 overflow-hidden bg-white/80 shadow-sm shadow-black/5">
              <img
                src="/logo.png"
                alt="LuxeNail logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/50">
                LuxeNail
              </span>
              <span className="text-xs md:text-sm text-black/40">
                Atelier Gallery
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-8 border-t border-black/10 pt-8 mt-10 reveal">
           {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${
                filter === cat ? 'text-black' : 'text-gray-300 hover:text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Instagram-style Masonry Grid */}
      <section className="w-full pb-32">
        <MasonryGrid images={GALLERY_IMAGES} filter={filter} />
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="mt-64 text-center reveal">
          <h3 className="text-4xl md:text-6xl font-serif font-bold mb-12">Curate Your Image.</h3>
          <Link 
            to="/book" 
            className="inline-block px-12 py-6 bg-black text-white text-[10px] uppercase font-bold tracking-[0.4em] hover:opacity-80 transition-all"
          >
            Start Your Session
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;