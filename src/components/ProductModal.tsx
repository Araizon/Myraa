import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, ShieldAlert, Star, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Quick review form state inside modal
  const [quickRating, setQuickRating] = useState<number>(5);
  const [quickName, setQuickName] = useState<string>('');
  const [quickComment, setQuickComment] = useState<string>('');
  const [quickSent, setQuickSent] = useState<boolean>(false);

  useEffect(() => {
    setQuantity(1);
    setSelectedSize('L');
    setActiveTab('details');
    setQuickSent(false);
  }, [product]);

  if (!product) return null;

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const totalPrice = product.price * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    onClose();
  };

  const handleQuickReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickComment.trim()) return;
    setQuickSent(true);
    setTimeout(() => {
      setQuickComment('');
      setQuickName('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#090909] text-white w-full max-h-[92vh] md:max-w-5xl border border-white/10 overflow-y-auto md:overflow-hidden rounded-2xl flex flex-col md:flex-row z-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/70 hover:text-white p-2.5 rounded-full bg-black/70 hover:bg-black border border-white/10 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 h-72 sm:h-80 md:h-[640px] bg-neutral-900 overflow-hidden relative group shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4">
            <span className="bg-[#ff0000] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              EXCLUSIVE DROP
            </span>
          </div>
        </div>

        {/* Product Details & Review Panels */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#090909] overflow-y-auto">
          <div>
            {/* Top Navigation Tabs: Details vs Reviews */}
            <div className="flex items-center gap-2 mb-4 p-1 bg-white/5 border border-white/10 rounded-full max-w-fit">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#ff0000] text-white shadow-[0_0_12px_rgba(255,0,0,0.6)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-[#ff0000] text-white shadow-[0_0_12px_rgba(255,0,0,0.6)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Reviews (4.9★)</span>
              </button>
            </div>

            {/* TAB 1: PRODUCT DETAILS */}
            {activeTab === 'details' && (
              <div className="animate-in fade-in duration-200">
                <span className="text-[#ff0000] font-mono font-bold tracking-[0.3em] text-[11px] mb-2 block">
                  EVORAN ARCHIVE // {product.category.toUpperCase()}
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 uppercase leading-tight font-oswald text-white">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-5">
                  <p className="text-2xl md:text-3xl text-white font-mono font-bold">
                    ৳{product.price.toLocaleString()}
                  </p>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                    [TAX INCL. // BDT]
                  </span>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed font-sans">
                  {product.description ||
                    "Engineered with premium heavyweight cotton knit, custom hardware trims, and precision tailored drop-shoulder silhouette."}
                </p>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-300 font-bold flex items-center gap-2">
                      <span>Select Size:</span>
                      <span className="text-[#ff0000] font-mono">{selectedSize}</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono underline cursor-pointer hover:text-white">
                      Size Guide (Oversized)
                    </span>
                  </div>

                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {AVAILABLE_SIZES.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-11 rounded-full text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#ff0000] text-white border border-[#ff0000] shadow-[0_0_15px_rgba(255,0,0,0.7)] scale-105'
                              : 'bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizing & Material Assurance */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-[11px] font-mono text-gray-400">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Silhouette</span>
                    <span className="text-gray-200">Boxy Drop-Shoulder</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Fabric Weight</span>
                    <span className="text-gray-200">Heavyweight 400+ GSM</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-400">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-white/15 bg-black/60 rounded-full px-2 py-1">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm font-mono text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: REVIEW OPTIONS */}
            {activeTab === 'reviews' && (
              <div className="animate-in fade-in duration-200 py-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#ff0000]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-[#ff0000]" />
                    ))}
                  </div>
                  <span className="font-mono text-sm font-bold text-white">4.9 / 5.0</span>
                  <span className="text-xs text-gray-500 font-mono">(98 verified ratings)</span>
                </div>

                {/* Existing review previews */}
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
                  <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white uppercase font-oswald">Farhan S. (Size L)</span>
                      <span className="text-[10px] text-gray-500 font-mono">2 days ago</span>
                    </div>
                    <p className="text-gray-300 text-xs italic">
                      "Unbelievable fabric feel. Heavyweight, does not shrink after washing. Fits boxy just as pictured."
                    </p>
                  </div>
                  <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white uppercase font-oswald">Zubair K. (Size XL)</span>
                      <span className="text-[10px] text-gray-500 font-mono">1 week ago</span>
                    </div>
                    <p className="text-gray-300 text-xs italic">
                      "Clean stitches and premium hardware. Highly recommended for street fashion enthusiasts."
                    </p>
                  </div>
                </div>

                {/* Submit quick review */}
                <form onSubmit={handleQuickReviewSubmit} className="space-y-3 p-4 bg-black/60 border border-white/10 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-oswald text-gray-300">
                    Write a Quick Review
                  </h4>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setQuickRating(val)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            val <= quickRating ? 'fill-[#ff0000] text-[#ff0000]' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="YOUR NAME"
                    className="w-full form-input p-2.5 text-white text-xs rounded-lg uppercase"
                  />
                  <textarea
                    rows={2}
                    required
                    value={quickComment}
                    onChange={(e) => setQuickComment(e.target.value)}
                    placeholder="SHARE SIZING & FABRIC FEEDBACK..."
                    className="w-full form-input p-2.5 text-white text-xs rounded-lg resize-none"
                  />
                  {quickSent ? (
                    <p className="text-green-400 text-xs font-mono">Feedback logged for verification!</p>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full border border-red-500/50 bg-red-600/20 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-4 border-t border-white/10 mt-4">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-red-600 to-[#ff0000] hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-oswald shadow-[0_0_25px_rgba(255,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,0,0,0.85)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart [{selectedSize}] — ৳{totalPrice.toLocaleString()}</span>
            </button>

            <p className="text-[10px] text-gray-500 font-mono text-center mt-3 flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-[#ff0000]" />
              Limited batch piece. Fast nationwide dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
