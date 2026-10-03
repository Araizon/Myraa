import React from 'react';
import { Youtube, Facebook, ArrowUp } from 'lucide-react';
import { LOGO_URL } from './Navbar';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-12 px-6 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Brand Logo */}
        <div className="relative mb-6 group cursor-pointer" onClick={scrollToTop}>
          <img
            src={LOGO_URL}
            alt="EVORAN Logo"
            className="w-16 h-16 object-contain rounded-lg border border-white/10 group-hover:border-red-600 transition-colors shadow-2xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Large Aesthetic Watermark */}
        <h2 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter mb-8 select-none cursor-default font-oswald leading-none transition-all duration-500 group">
          <span className="text-white/5 group-hover:text-white transition-colors duration-500">
            EVO
          </span>
          <span className="text-white/5 group-hover:text-[#e60000] transition-colors duration-500">
            RAN
          </span>
        </h2>

        {/* Social Links */}
        <div className="flex gap-6 mb-10">
          <a
            href="https://www.youtube.com/@Evoran-r2c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="EVORAN YouTube Channel"
            className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all duration-300"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61581798921211"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="EVORAN Facebook Page"
            className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase font-mono text-gray-400 mb-8">
          <span>High Fashion</span>
          <span>•</span>
          <span>Raw Streetwear</span>
          <span>•</span>
          <span>Worldwide Shipping</span>
          <span>•</span>
          <span>Dhaka HQ</span>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-8 border-t border-white/5 text-gray-600 text-xs font-mono gap-4">
          <p>© 2026 EVORAN. Premium Streetwear. All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white uppercase tracking-widest text-[11px] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
