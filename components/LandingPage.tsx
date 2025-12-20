import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Minus } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCFB] min-h-screen selection:bg-black selection:text-white">
      <Header variant="fixed" />

      {/* Hero: Split Screen Editorial */}
      <section className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 relative h-1/2 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-black/5">
          <img 
            src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200" 
            alt="The Look" 
            className="w-full h-full object-cover brightness-90 grayscale"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          <div className="absolute bottom-12 left-12">
            <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-4">SS 2024 Collection</p>
            <h2 className="text-white text-5xl md:text-7xl font-serif font-bold italic">The Ritual.</h2>
          </div>
        </div>
        <div className="flex-1 bg-black flex items-center justify-center p-12 lg:p-32 text-white">
          <div className="max-w-md reveal">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">Artistry for the <br/><span className="italic font-normal text-gray-400">Modern Soul.</span></h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-12 font-light tracking-wide">
              Experience nail care redefined. A sanctuary of precision where high-fashion aesthetics meet artisanal craftsmanship.
            </p>
            <Link to="/book" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em]">
              <span>Begin Your Journey</span>
              <div className="w-12 h-px bg-white group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* The Lookbook Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6">Curated Selection</p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold">The Portfolio.</h2>
          </div>
          <Link to="/gallery" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-2 mt-8 md:mt-0 hover:opacity-50 transition-all">View All Looks</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <div className="reveal space-y-8 group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1604654894610-df490c817265?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 editorial-img" alt="The Gilded Edge" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Look 01</p>
              <h3 className="text-2xl font-serif font-bold mt-2">The Gilded Edge</h3>
            </div>
          </div>

          <div className="reveal space-y-8 md:translate-y-24 group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 editorial-img" alt="Noir Luminescence" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Look 02</p>
              <h3 className="text-2xl font-serif font-bold mt-2">Noir Luminescence</h3>
            </div>
          </div>

          <div className="reveal space-y-8 group">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 editorial-img" alt="Atelier Nude" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">Look 03</p>
              <h3 className="text-2xl font-serif font-bold mt-2">Atelier Nude</h3>
            </div>
          </div>
        </div>
      </section>

      {/* The Atelier Section */}
      <section className="bg-black text-white py-32 px-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Scissors size={400} className="rotate-45" />
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10">The Atelier.</h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
              Beyond a salon, we are a collective of artisans dedicated to the architecture of the hand. Our studio in the Design District is a curated space of quiet luxury and uncompromising purity.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <Minus size={20} className="text-[#C4A484]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Medical Grade Purity</span>
              </div>
              <div className="flex items-center gap-6">
                <Minus size={20} className="text-[#C4A484]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Artisanal Precision</span>
              </div>
              <div className="flex items-center gap-6">
                <Minus size={20} className="text-[#C4A484]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Botanical Ingredients</span>
              </div>
            </div>
          </div>
          <div className="reveal group">
            <img 
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200" 
              className="rounded-t-[10rem] shadow-2xl editorial-img" 
              alt="Atelier Interior" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;