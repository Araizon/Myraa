import React from 'react';

export const Marquee: React.FC = () => {
  return (
    <div className="bg-red-600 py-3.5 md:py-4 overflow-hidden -rotate-1 transform scale-[1.02] md:scale-105 z-20 relative border-y-4 border-black select-none shadow-2xl">
      <div className="whitespace-nowrap flex gap-8 animate-marquee">
        <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-black font-oswald flex items-center gap-6">
          <span>New Season Drop</span>
          <span>•</span>
          <span>Premium Heavyweight Quality</span>
          <span>•</span>
          <span>Streetwear Redefined</span>
          <span>•</span>
          <span>EVORAN 2026</span>
          <span>•</span>
          <span>Limited Batches Only</span>
          <span>•</span>
        </span>
        <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-black font-oswald flex items-center gap-6">
          <span>New Season Drop</span>
          <span>•</span>
          <span>Premium Heavyweight Quality</span>
          <span>•</span>
          <span>Streetwear Redefined</span>
          <span>•</span>
          <span>EVORAN 2026</span>
          <span>•</span>
          <span>Limited Batches Only</span>
          <span>•</span>
        </span>
      </div>
    </div>
  );
};
