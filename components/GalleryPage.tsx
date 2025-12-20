import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';
import Header from './Header';
import Footer from './Footer';

const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Manicure', 'Nail Art', 'Pedicure'];

  return (
    <div className="bg-[#FDFCFB] min-h-screen selection:bg-black selection:text-white">
      <Header />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-8 pt-32 pb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C4A484] mb-8 reveal">The Portfolio</p>
        <h1 className="text-6xl md:text-9xl font-serif font-bold text-black mb-12 reveal">
          The <span className="italic font-normal italic">Lookbook.</span>
        </h1>
        <div className="flex gap-8 border-t border-black/10 pt-8 reveal">
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

      {/* Grid: Large Lookbook Style */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={img.id} className={`reveal group space-y-8 ${idx % 2 === 1 ? 'md:mt-32' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden bg-gray-50 border border-black/5">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 editorial-img"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">{img.category}</p>
                  <h4 className="text-3xl font-serif font-bold mt-2">{img.title}</h4>
                </div>
                <Link to="/book" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
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