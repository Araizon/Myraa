import React from 'react';
import { ShieldCheck, Scissors, Gem, Zap, Fingerprint, Globe } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-950/5 skew-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-4 sm:gap-8 md:gap-16 items-start relative z-10">
        {/* Left Visual Column - 5 cols on mobile and desktop */}
        <div className="col-span-5 md:col-span-5">
          {/* Image perfectly aligned with MANIFESTO // CHAPTER 01 */}
          <div className="relative group overflow-hidden border border-white/10 rounded-xl mb-3 sm:mb-4 shadow-2xl shadow-red-950/20">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
              alt="EVORAN Streetwear Philosophy"
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 aspect-[3/4] sm:aspect-[4/5]"
            />
          </div>

          {/* Text part positioned cleanly under the image */}
          <div className="border border-white/10 p-3 sm:p-5 rounded-xl bg-black/60 backdrop-blur-md space-y-3">
            <div>
              <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-red-500 block mb-0.5">
                BRAND ARCHIVE
              </span>
              <h4 className="text-white font-oswald text-xs sm:text-base uppercase tracking-wider font-bold leading-snug">
                Raw Texture • Heavyweight Silhouette
              </h4>
            </div>

            <div className="pt-2.5 border-t border-white/10">
              <h3 className="text-white font-bold uppercase tracking-widest text-[11px] sm:text-sm mb-1 font-oswald">
                The EVORAN Standard
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs font-mono leading-relaxed">
                No compromise. No shortcuts. Just pure aesthetic dominance and garments engineered to outlast cycles of hype.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content Column - 7 cols on mobile and desktop */}
        <div className="col-span-7 md:col-span-7">
          <span className="text-red-500 font-mono tracking-[0.3em] text-[10px] sm:text-xs uppercase font-bold block mb-2 sm:mb-3">
            MANIFESTO // CHAPTER 01
          </span>
          <h2 className="text-2xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-8 leading-[0.95] uppercase font-oswald tracking-tight">
            NOT JUST CLOTHING.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-400">
              IT'S A REVOLUTION.
            </span>
          </h2>

          <div className="mb-6 sm:mb-12 border-l-2 border-red-600 pl-3 sm:pl-6 py-1 sm:py-2 bg-gradient-to-r from-red-950/20 to-transparent">
            <p className="text-gray-300 text-xs sm:text-lg md:text-xl leading-relaxed font-light italic">
              "Born in the shadows of the concrete jungle, EVORAN merges high-fashion aesthetics with raw street culture. We do not follow trends; we forge the path for the few who dare to define their own legacy."
            </p>
          </div>

          {/* 6 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-10">
            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-red-500 transition-colors">
                  Authentic Quality
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  Crafted with 450+ GSM French Terry and dense ring-spun cotton for durability.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-white transition-colors">
                  Precision Tailoring
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  Cut and sewn with structured, commanding drop-shoulder drape.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-white transition-colors">
                  Limited Exclusivity
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  Zero mass production. Each drop is strictly numbered to preserve rarity.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-white transition-colors">
                  Avant-Garde Design
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  Merging cyber-dystopian glyphs with minimalistic industrial grunge declarations.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-white transition-colors">
                  Unapologetic Identity
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  Tailored for creators carving their own rules in an echo-chamber world.
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 sm:gap-4 items-start group">
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-lg border border-white/10 bg-black flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-black" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold mb-0.5 sm:mb-1 uppercase tracking-wider font-oswald group-hover:text-white transition-colors">
                  Global Movement
                </h3>
                <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed font-sans">
                  From Dhaka streets to the international underground collective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
