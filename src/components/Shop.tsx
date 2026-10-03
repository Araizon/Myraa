import React, { useState } from 'react';
import { Eye, SlidersHorizontal } from 'lucide-react';
import { Category, Product } from '../types';

interface ShopProps {
  products: Product[];
  categories: Category[];
  onSelectProduct: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({
  products,
  categories,
  onSelectProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 sm:px-6 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-300">
              ARCHIVE 2026 // DROPS
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase mb-6 tracking-tighter font-oswald">
            Collection
          </h1>

          {/* Category Filter Buttons */}
          <div className="flex justify-center gap-2 md:gap-3 flex-wrap max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer rounded-full backdrop-blur-md ${
                selectedCategory === 'all'
                  ? 'border border-[#ff0000] bg-[#ff0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.6)]'
                  : 'border border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-white/5'
              }`}
            >
              All Pieces ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter(p => p.category?.toLowerCase() === cat.id?.toLowerCase() || p.category?.toLowerCase() === cat.name?.toLowerCase()).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer rounded-full backdrop-blur-md ${
                    selectedCategory === cat.id
                      ? 'border border-[#ff0000] bg-[#ff0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.6)]'
                      : 'border border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-white/5'
                  }`}
                >
                  {cat.name} {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Indicator */}
        <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-8 text-xs font-mono text-gray-500 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
            <span>SHOWING: {filteredProducts.length} ITEMS</span>
          </div>
          <span>CURRENCY: BDT (৳)</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-gray-400 font-mono uppercase tracking-widest text-sm mb-3">
              NO PIECES FOUND IN THIS CATEGORY
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-5 py-2 rounded-full border border-red-500 text-xs uppercase font-bold text-red-500 hover:bg-red-600 hover:text-white transition-colors"
            >
              RESET TO ALL PIECES
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-neutral-900 mb-3.5 overflow-hidden rounded-md border border-white/10 group-hover:border-red-500/40 transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-105"
                    loading="lazy"
                  />

                  {product.featured && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-[#ff0000] text-white text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full font-bold shadow-[0_0_8px_rgba(255,0,0,0.8)]">
                        FEATURED
                      </span>
                    </div>
                  )}

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                    <span className="rounded-full border border-white/20 hover:border-red-500 text-white px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md bg-black/70 flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5 text-red-500" />
                      View Details
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold uppercase text-xs sm:text-sm md:text-base leading-snug truncate group-hover:text-red-500 transition-colors font-oswald">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-[10px] md:text-xs tracking-wider uppercase font-mono mt-0.5 truncate">
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
        )}
      </div>
    </div>
  );
};
