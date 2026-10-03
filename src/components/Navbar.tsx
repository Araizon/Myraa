import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { PageTab } from '../types';

interface NavbarProps {
  currentPage: PageTab;
  onNavigate: (page: PageTab) => void;
  cartCount: number;
  onToggleCart: () => void;
}

export const LOGO_URL = 'https://i.ibb.co.com/SXwDnC5q/evoranlogo.jpg';

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onToggleCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageTab) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full glass z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 select-none group"
        >
          <img 
            src={LOGO_URL} 
            alt="EVORAN Logo" 
            className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-md border border-white/10 group-hover:border-red-600/50 transition-colors shadow-lg"
            onError={(e) => {
              // fallback if external link is slow
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase leading-none font-oswald block">
            EVO<span className="text-red-600 group-hover:text-white transition-colors duration-300">RAN</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`text-xs uppercase font-bold tracking-[0.2em] transition-all cursor-pointer px-4 py-2 rounded-full ${
              currentPage === 'home' 
                ? 'nav-link-active bg-red-600/10 border border-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('shop')} 
            className={`text-xs uppercase font-bold tracking-[0.2em] transition-all cursor-pointer px-4 py-2 rounded-full ${
              currentPage === 'shop' 
                ? 'nav-link-active bg-red-600/10 border border-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Collection
          </button>
          <button 
            onClick={() => handleNavClick('reviews')} 
            className={`text-xs uppercase font-bold tracking-[0.2em] transition-all cursor-pointer px-4 py-2 rounded-full ${
              currentPage === 'reviews' 
                ? 'nav-link-active bg-red-600/10 border border-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Reviews
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`text-xs uppercase font-bold tracking-[0.2em] transition-all cursor-pointer px-4 py-2 rounded-full ${
              currentPage === 'contact' 
                ? 'nav-link-active bg-red-600/10 border border-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact
          </button>
          <button 
            onClick={onToggleCart}
            className="relative flex items-center text-xs uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-all cursor-pointer group px-4 py-2 rounded-full hover:bg-white/5"
          >
            <span className="mr-1.5 group-hover:text-[#ff0000] transition-colors">Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#ff0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-5 text-center transition-all animate-pulse shadow-[0_0_12px_rgba(255,0,0,0.8)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Nav Icons */}
        <div className="md:hidden flex items-center gap-3 text-white">
          <button 
            onClick={onToggleCart}
            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff0000] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,0,0,0.8)]">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Compact & Positioned on the Right Side */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-16 right-4 w-52 bg-[#0c0c0c]/95 border border-white/15 p-3 rounded-2xl shadow-2xl flex flex-col space-y-1.5 animate-in slide-in-from-top-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] font-mono uppercase text-gray-500 tracking-widest text-right px-3 py-1 border-b border-white/5">
              Menu Navigation
            </div>
            <button 
              onClick={() => handleNavClick('home')} 
              className={`text-xs font-bold uppercase tracking-wider text-right font-oswald transition-all px-4 py-2.5 rounded-full ${
                currentPage === 'home' ? 'text-[#ff0000] bg-red-600/15 border border-red-500/30' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('shop')} 
              className={`text-xs font-bold uppercase tracking-wider text-right font-oswald transition-all px-4 py-2.5 rounded-full ${
                currentPage === 'shop' ? 'text-[#ff0000] bg-red-600/15 border border-red-500/30' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Collection
            </button>
            <button 
              onClick={() => handleNavClick('reviews')} 
              className={`text-xs font-bold uppercase tracking-wider text-right font-oswald transition-all px-4 py-2.5 rounded-full ${
                currentPage === 'reviews' ? 'text-[#ff0000] bg-red-600/15 border border-red-500/30' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className={`text-xs font-bold uppercase tracking-wider text-right font-oswald transition-all px-4 py-2.5 rounded-full ${
                currentPage === 'contact' ? 'text-[#ff0000] bg-red-600/15 border border-red-500/30' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
