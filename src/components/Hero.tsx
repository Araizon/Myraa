import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { PageTab } from '../types';

interface HeroProps {
  onExplore: (tab: PageTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  // Ultra-stylish, dark aesthetic editorial streetwear visual (replacing the video)
  const heroImage = "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black pt-16">
      {/* Background Image Container with dark gradient scrims and gentle cinematic zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt="EVORAN Streetwear Aesthetic"
          className="w-full h-full object-cover object-center hero-bg-anim opacity-65 filter contrast-125 brightness-90"
        />
        {/* Layered cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/75 z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-[#050505] z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Big Signature Typography */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 leading-none select-none font-oswald drop-shadow-2xl">
          EVO<span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>RAN</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl font-light tracking-[0.35em] text-gray-300 mb-10 max-w-2xl uppercase">
          DEFINE YOUR LEGACY
        </p>

        {/* Interactive CTA with rounded transparent glassmorphic aesthetic */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onExplore('shop')}
            className="group px-8 py-3.5 md:px-10 md:py-4 rounded-full bg-red-600/20 hover:bg-red-600/90 text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm border border-red-500/60 hover:border-red-500 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,0,0.35)] hover:shadow-[0_0_35px_rgba(255,0,0,0.8)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Explore Collection</span>
            <ArrowDownRight className="w-4 h-4 text-red-400 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={() => onExplore('reviews')}
            className="px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white uppercase tracking-[0.2em] text-xs font-mono border border-white/15 hover:border-white/40 backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            Community Voices
          </button>
        </div>
      </div>

      {/* Decorative Cyber Coordinates */}
      <div className="hidden lg:flex absolute bottom-8 left-8 z-20 items-center gap-3 text-gray-500 font-mono text-[11px] tracking-widest uppercase">
        <span className="text-red-500">SYS.LOC:</span> 23.8103° N, 90.4125° E // DHAKA METROPOLIS
      </div>
      <div className="hidden lg:flex absolute bottom-8 right-8 z-20 items-center gap-3 text-gray-500 font-mono text-[11px] tracking-widest uppercase">
        <span>STATUS:</span> <span className="text-white">ONLINE</span> // HIGH-DENSITY WEAVE
      </div>
    </div>
  );
};
