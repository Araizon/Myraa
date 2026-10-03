import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href="https://wa.me/8801604954097"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-[90] hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center group cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        {!imgError ? (
          <img
            src="https://i.ibb.co.com/1ttzKV9X/image.png"
            alt="WhatsApp"
            onError={() => setImgError(true)}
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center">
            <MessageCircle className="w-7 h-7 fill-white" />
          </div>
        )}

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-[11px] font-mono uppercase tracking-widest whitespace-nowrap rounded-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Order via WhatsApp
        </span>
      </div>
    </a>
  );
};
