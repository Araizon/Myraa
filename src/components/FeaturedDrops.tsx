import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { Product } from '../types';

interface FeaturedDropsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedDrops: React.FC<FeaturedDropsProps> = ({
  products,
  onSelectProduct,
  onViewAll
}) => {
  const featured = products.filter(p => p.featured).slice(0, 4);
  const displayItems = featured.length > 0 ? featured : products.slice(0, 4);

  return (
    <section className="bg-black py-24 md:py-32 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-14 md:mb-20 px-2">
          <div>
            <span className="text-[#ff0000] tracking-[0.35em] text-xs sm:text-sm font-bold block mb-2 font-mono">
              CURATED ARCHIVE
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white font-oswald leading-[0.9] tracking-tight">
              Featured<br />
              <span className="text-gray-600">Drops</span>
            </h2>
          </div>
          <button
            onClick={onViewAll}
            className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-red-500/50 backdrop-blur-md transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {displayItems.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-neutral-900 mb-3 overflow-hidden rounded-md border border-white/10 group-hover:border-red-500/40 transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-black/80 backdrop-blur-md text-[9px] uppercase font-mono tracking-widest text-red-500 px-2 py-0.5 rounded-full border border-red-500/30">
                    DROP 01
                  </span>
                </div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                  <span className="rounded-full border border-white/20 hover:border-red-500 text-white px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md bg-black/70 flex items-center gap-1.5 shadow-xl">
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    Quick View
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start gap-1.5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold uppercase text-xs sm:text-sm md:text-base leading-snug mb-0.5 group-hover:text-red-500 transition-colors font-oswald truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs tracking-wider uppercase font-mono truncate">
                    {product.category}
                  </p>
                </div>
                <span className="text-white font-bold text-xs sm:text-sm md:text-base font-mono whitespace-nowrap">
                  ৳{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All button */}
        <div className="text-center mt-10 md:hidden">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-white hover:text-red-400 transition-colors uppercase tracking-[0.2em] text-xs font-bold px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md w-full justify-center"
          >
            <span>View All Collection</span>
            <ArrowRight className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
