
import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, ArrowRight, Minus } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FDFCFB] min-h-screen selection:bg-black selection:text-white">
      {/* Editorial Header */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-black/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-serif font-bold tracking-widest uppercase">LUXENAIL</span>
        </Link>
        <div className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          <Link to="/gallery" className="hover:opacity-60 transition-opacity">Collections</Link>
          <Link to="/about" className="text-black border-b border-black">The Atelier</Link>
          <Link to="/book" className="hover:opacity-60 transition-opacity">Services</Link>
        </div>
        <Link to="/book" className="px-6 py-2 border border-black text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all">
          Reserve
        </Link>
      </nav>

      {/* Hero Section: Editorial Focus */}
      <section className="pt-32 pb-64 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="reveal">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C4A484] mb-12">The Atelier Manifest</p>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-12">
              Beyond the <br/><span className="italic font-normal text-gray-400">Surface.</span>
            </h1>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-12 max-w-lg">
              LuxeNail is a collective of artisans dedicated to the architecture of the hand. Founded in 2018, we have redefined nail care from a commodity into a curative ritual of self-appreciation.
            </p>
            <div className="h-px w-24 bg-black/10"></div>
          </div>
          <div className="reveal mt-20 lg:mt-40">
            <div className="relative aspect-[3/4] overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200" 
                alt="The Sanctuary" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
              />
            </div>
            <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 italic text-right">Look 05 — Atelier Nude</p>
          </div>
        </div>
      </section>

      {/* Values Section: Structured Minimalist */}
      <section className="bg-black text-white py-64 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-32">
          <div className="reveal">
            <h3 className="text-2xl font-serif font-bold mb-8">Uncompromising Purity.</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              We adhere to medical-grade sterilization standards. Our atelier is a clean sanctuary where health and safety are woven into the very fabric of our operation.
            </p>
          </div>
          <div className="reveal delay-150">
            <h3 className="text-2xl font-serif font-bold mb-8">Architectural Design.</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Every curve, every silhouette is hand-sculpted. We don't just apply color; we design the architecture of your hand to reflect your individual personality.
            </p>
          </div>
          <div className="reveal delay-300">
            <h3 className="text-2xl font-serif font-bold mb-8">Botanical Rituals.</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              We prioritize non-toxic, vegan, and cruelty-free ingredients. Our rituals are as kind to the planet as they are restorative to your skin.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section: Immersive */}
      <section className="py-64 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-end">
          <div className="lg:col-span-2 reveal">
            <div className="aspect-[16/9] overflow-hidden border border-black/5 bg-gray-50 mb-12">
              <img 
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1600" 
                alt="Studio Interior" 
                className="w-full h-full object-cover grayscale brightness-75 hover:scale-105 transition-all duration-[2s]"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold">The Sanctuary.</h2>
          </div>
          <div className="reveal space-y-12 pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C4A484] mb-4">Location</p>
              <p className="text-sm font-bold text-black uppercase tracking-widest leading-relaxed">
                123 Design Blvd, Suite 400<br/>Los Angeles, CA 90210
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C4A484] mb-4">Connect</p>
              <p className="text-sm font-bold text-black uppercase tracking-widest leading-relaxed">
                (555) 012-3456<br/>concierge@luxenail.com
              </p>
            </div>
            <Link to="/book" className="inline-flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] group">
              <span>Enter the Atelier</span>
              <div className="w-12 h-px bg-black group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="py-20 text-center border-t border-black/5 text-[10px] font-bold tracking-[0.3em] text-gray-300">
        © 2024 LUXENAIL ATELIER — LOS ANGELES
      </footer>
    </div>
  );
};

export default AboutPage;
