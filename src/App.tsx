import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { FeaturedDrops } from './components/FeaturedDrops';
import { Philosophy } from './components/Philosophy';
import { Shop } from './components/Shop';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartSidebar } from './components/CartSidebar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotificationToast } from './components/NotificationToast';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { CartItem, Category, PageTab, Product, Review } from './types';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, DEFAULT_REVIEWS } from './lib/defaultData';
import { fetchCategories, fetchProducts, subscribeReviews } from './lib/firebase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('evoran_cart_premium');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [showPreloader, setShowPreloader] = useState(true);

  // Synchronize cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('evoran_cart_premium', JSON.stringify(cart));
    } catch (e) {
      console.error("Cart save error", e);
    }
  }, [cart]);

  // Initial load from Firebase
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        if (isMounted) {
          if (cats && cats.length > 0) setCategories(cats);
          if (prods && prods.length > 0) setProducts(prods);
        }
      } catch (err) {
        console.warn("Using offline fallback data:", err);
      }
    }

    loadInitialData();

    // Subscribe to real-time reviews from Firebase
    const unsubscribeReviews = subscribeReviews((data) => {
      if (isMounted && data) {
        setReviews(data);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeReviews();
    };
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, size = 'L') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, size }];
    });

    setNotification(`[+1] ${product.name} [Size: ${size}] added to cart`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setNotification('Item removed from cart');
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} [Size: ${item.size || 'L'}] (x${item.quantity}) - ৳${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const fullMessage = `Hello EVORAN Studio,\nI would like to place an order:\n\n${itemsText}\n\n*Total Amount: ৳${total.toLocaleString()}*\n\nPlease confirm availability and payment details.`;
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/8801604954097?text=${encoded}`, '_blank');
  };

  const handleNavigate = (page: PageTab) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative selection:bg-red-600 selection:text-white flex flex-col font-sans">
      {/* Noise background */}
      <div className="noise-overlay" />

      {/* Custom Mouse Cursor for Desktop */}
      <CustomCursor />

      {/* Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Notification Toast */}
      <NotificationToast
        message={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onToggleCart={() => setIsCartOpen((prev) => !prev)}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Hero onExplore={handleNavigate} />
            <Marquee />
            <FeaturedDrops
              products={products}
              onSelectProduct={(p) => setModalProduct(p)}
              onViewAll={() => handleNavigate('shop')}
            />
            <Philosophy />
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-in fade-in duration-300">
            <Shop
              products={products}
              categories={categories}
              onSelectProduct={(p) => setModalProduct(p)}
            />
          </div>
        )}

        {currentPage === 'reviews' && (
          <div className="animate-in fade-in duration-300">
            <Reviews
              reviews={reviews}
              onReviewAdded={(msg) => setNotification(msg)}
            />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <Contact onNotify={(msg) => setNotification(msg)} />
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Sliding Cart Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleWhatsAppCheckout}
      />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
