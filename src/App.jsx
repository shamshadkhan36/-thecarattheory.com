import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Bestsellers } from './components/Bestsellers';
import { ShopByShape } from './components/ShopByShape';
import { FeaturedCollections } from './components/FeaturedCollections';
import { DesignWithUs } from './components/DesignWithUs';
import { BookAppointment } from './components/BookAppointment';
import { OurStory } from './components/OurStory';
import { OurPromise } from './components/OurPromise';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AppointmentModal } from './components/AppointmentModal';
import { SizingModal } from './components/SizingModal';
import { SearchModal } from './components/SearchModal';
import { LogoGuideModal } from './components/LogoGuideModal';

import { PRODUCTS_DATA } from './data/products';

export function App() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentSubject, setAppointmentSubject] = useState('');
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const [isLogoGuideOpen, setIsLogoGuideOpen] = useState(false);

  useEffect(() => {
    // Attempt fetch from Node.js Express backend
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch(() => {
        // Fallback to static PRODUCTS_DATA
      });
  }, []);

  const handleOpenAppointment = (subject = '') => {
    setAppointmentSubject(subject);
    setIsAppointmentOpen(true);
  };

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="site-wrapper">
            {/* 1. Announcement Bar (Color Scheme 5: Peach & Wine) */}
            <AnnouncementBar />

            {/* 2. Main Header */}
            <Header
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenLogoGuide={() => setIsLogoGuideOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
            />

            {/* 3. Hero Slideshow ("Lifetime Promises") */}
            <HeroSlider onOpenAppointment={handleOpenAppointment} />

            {/* 4. SHOP BY CATEGORY */}
            <ShopByCategory />

            {/* 5. BESTSELLERS */}
            <Bestsellers
              products={products}
              onQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* 6. SHOP BY SHAPE */}
            <ShopByShape />

            {/* 7. FEATURED COLLECTIONS */}
            <FeaturedCollections />

            {/* 8. DESIGN WITH US */}
            <DesignWithUs onOpenAppointment={handleOpenAppointment} />

            {/* 9. BOOK AN APPOINTMENT */}
            <BookAppointment onOpenAppointment={handleOpenAppointment} />

            {/* 10. OUR STORY */}
            <OurStory onOpenLogoGuide={() => setIsLogoGuideOpen(true)} />

            {/* 11. OUR PROMISE (5 Pillars) */}
            <OurPromise />

            {/* 12. Frequently asked questions */}
            <FAQSection />

            {/* 13. Footer */}
            <Footer
              onOpenSizing={() => setIsSizingOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenLogoGuide={() => setIsLogoGuideOpen(true)}
            />

            {/* Drawers & Modals */}
            <CartDrawer />
            <WishlistDrawer />
            <QuickViewModal
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
            />
            <AppointmentModal
              isOpen={isAppointmentOpen}
              onClose={() => setIsAppointmentOpen(false)}
              initialSubject={appointmentSubject}
            />
            <SizingModal
              isOpen={isSizingOpen}
              onClose={() => setIsSizingOpen(false)}
            />
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              products={products}
              onSelectProduct={(p) => setQuickViewProduct(p)}
            />
            <LogoGuideModal
              isOpen={isLogoGuideOpen}
              onClose={() => setIsLogoGuideOpen(false)}
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
