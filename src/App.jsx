import React, { useState } from 'react';
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
import { OurStory } from './components/OurStory';
import { OurPromise } from './components/OurPromise';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { AppointmentModal } from './components/AppointmentModal';
import { SizingModal } from './components/SizingModal';
import { SearchModal } from './components/SearchModal';
import { LogoGuideModal } from './components/LogoGuideModal';

import { PRODUCTS_DATA } from './data/products';

export function App() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentSubject, setAppointmentSubject] = useState('');
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const [isLogoGuideOpen, setIsLogoGuideOpen] = useState(false);

  const handleOpenAppointment = (subject = '') => {
    setAppointmentSubject(subject);
    setIsAppointmentOpen(true);
  };

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="site-wrapper">
            {/* 1. Announcement Bar (Soft Peach #FFF3E3 with Wine #55142A text) */}
            <AnnouncementBar />

            {/* 2. Solid Wine Header (Matching Image 1 & 2) */}
            <Header
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
            />

            {/* 3. Hero Section (Matching Image 1) */}
            <HeroSlider />

            {/* 4. SHOP BY CATEGORY (Matching Image 2: Rounded Velvet Cards) */}
            <ShopByCategory />

            {/* 5. BESTSELLERS (Matching Image 3: 4 Rings with Metal Purity & Color Dots) */}
            <Bestsellers onQuickView={setQuickViewProduct} />

            {/* 6. SHOP BY SHAPE (Matching Image 4: 8 Diamond Cuts) */}
            <ShopByShape />

            {/* 7. FEATURED COLLECTIONS (Matching Image 4 Bottom) */}
            <FeaturedCollections />

            {/* 8. OUR STORY (Matching Image 5 Top) */}
            <OurStory onOpenLogoGuide={() => setIsLogoGuideOpen(true)} />

            {/* 9. OUR PROMISE (Matching Image 5 Middle: Soft Peach Banner with 5 Columns) */}
            <OurPromise />

            {/* 10. Frequently asked questions (Matching Image 5 Bottom) */}
            <FAQSection />

            {/* 11. Footer (Wine Red #55142A with Peach #FFF3E3 Links) */}
            <Footer
              onOpenSizing={() => setIsSizingOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenLogoGuide={() => setIsLogoGuideOpen(true)}
            />

            {/* 12. Floating Widgets: Gift "Join Now" & WhatsApp (Matching Screenshots) */}
            <FloatingWidgets onOpenAppointment={() => handleOpenAppointment()} />

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
              products={PRODUCTS_DATA}
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
