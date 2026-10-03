import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-[#070707] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-black">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest font-oswald text-white">
              Cart
            </h2>
            <span className="text-xs font-mono bg-red-600/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
              {totalCount} ITEMS
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-gray-600 mb-4">
                <X className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold uppercase font-oswald text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500 font-mono max-w-xs mb-6">
                Explore the latest streetwear drops and select your size to proceed.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-white text-white uppercase tracking-widest text-xs font-mono transition-colors hover:bg-white/5"
              >
                Back to Archive
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-neutral-900 shrink-0 border border-white/5"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs md:text-sm font-oswald leading-tight truncate">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-gray-400 font-mono">
                          ৳{item.price.toLocaleString()} each
                        </span>
                        {item.size && (
                          <span className="text-[9px] font-mono font-bold text-white bg-red-600/20 border border-red-500/40 px-2 py-0.5 rounded-full">
                            SIZE: {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/15 bg-black/60 rounded-full px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-white">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 md:p-8 border-t border-white/10 bg-black">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-mono text-xs uppercase text-gray-400">Subtotal</span>
              <span className="text-xl md:text-2xl font-bold font-mono text-white">
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono mb-6">
              Standard courier dispatch across Bangladesh & global shipping calculated upon transmission.
            </p>

            <button
              onClick={onCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-oswald shadow-lg shadow-green-950/40 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Checkout on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
