import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { EditorialHero } from './components/EditorialHero';
import { ShopByCategory } from './components/ShopByCategory';
import { Bestsellers } from './components/Bestsellers';
import { ShopByShape } from './components/ShopByShape';
import { CatalogSection } from './components/CatalogSection';
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
import { ProductPage } from './components/ProductPage';

import { PRODUCTS_DATA, PRIMARY_PRODUCT } from './data/products';

export function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('product')) {
      return 'product';
    }
    return 'home';
  });
  const [selectedProduct, setSelectedProduct] = useState(PRIMARY_PRODUCT);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentSubject, setAppointmentSubject] = useState('');
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const [isLogoGuideOpen, setIsLogoGuideOpen] = useState(false);

  // Catalog filtering state
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogShape, setCatalogShape] = useState('All');

  React.useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined') {
        if (window.location.hash.includes('product')) {
          setCurrentView('product');
        } else if (window.location.hash.includes('home')) {
          setCurrentView('home');
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenAppointment = (subject = '') => {
    setAppointmentSubject(subject);
    setIsAppointmentOpen(true);
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod || PRIMARY_PRODUCT);
    setCurrentView('product');
    if (typeof window !== 'undefined') {
      window.location.hash = 'product';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      window.location.hash = 'home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (catId) => {
    setCatalogCategory(catId);
    setCatalogShape('All');
    if (currentView === 'product') {
      handleGoHome();
    }
    setTimeout(() => {
      const elem = document.getElementById('collection');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShapeNav = (shapeName) => {
    setCatalogShape(shapeName);
    if (currentView === 'product') {
      handleGoHome();
    }
    setTimeout(() => {
      const elem = document.getElementById('collection');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="site-wrapper">
            {/* 1. Announcement Bar (Soft Peach #FFF3E3 with Wine #55142A text) */}
            <AnnouncementBar
              currentView={currentView}
              onToggleView={() => (currentView === 'product' ? handleGoHome() : handleSelectProduct(PRIMARY_PRODUCT))}
            />

            {/* 2. Solid Wine Header (The Carat Theory Logo) */}
            <Header
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
              onNavigateHome={handleGoHome}
              onSelectCategory={handleCategoryNav}
            />

            {currentView === 'product' ? (
              /* Product Detail Page (PDP - Matching Reference Screenshots) */
              <ProductPage
                product={selectedProduct}
                onOpenSizing={() => setIsSizingOpen(true)}
                onOpenAppointment={() => handleOpenAppointment('Lifetime Care & Dedicated Service Consultation')}
                onSelectProduct={handleSelectProduct}
              />
            ) : (
              <>
                {/* 3. High-Fashion Editorial Hero (Christian Siriano for Rare Carat Theme) */}
                <EditorialHero
                  onShopRings={() => handleCategoryNav('rings')}
                  onShopJewelry={() => handleCategoryNav('all')}
                  onSelectProduct={handleSelectProduct}
                />

                {/* 4. SHOP BY CATEGORY (Rounded Velvet Cards) */}
                <ShopByCategory onSelectCategory={handleCategoryNav} />

                {/* 5. BESTSELLERS Spotlight (4 Rings with Metal Purity & Color Dots) */}
                <Bestsellers
                  onQuickView={setQuickViewProduct}
                  onSelectProduct={handleSelectProduct}
                />

                {/* 6. SHOP BY SHAPE (8 Diamond Cuts) */}
                <ShopByShape onSelectShape={handleShapeNav} />

                {/* 7. ALL 242 CREATIONS CATALOG SECTION */}
                <CatalogSection
                  selectedCategory={catalogCategory}
                  onSelectCategory={setCatalogCategory}
                  selectedShape={catalogShape}
                  onSelectShape={setCatalogShape}
                  onSelectProduct={handleSelectProduct}
                  onQuickView={setQuickViewProduct}
                />

                {/* 8. FEATURED COLLECTIONS */}
                <FeaturedCollections />

                {/* 9. OUR STORY */}
                <OurStory onOpenLogoGuide={() => setIsLogoGuideOpen(true)} />

                {/* 10. OUR PROMISE */}
                <OurPromise />

                {/* 11. Frequently asked questions */}
                <FAQSection />
              </>
            )}

            {/* 12. Rare Carat Midnight Navy Accordion Footer (Matching Screenshot 2) */}
            <Footer
              onOpenSizing={() => setIsSizingOpen(true)}
              onOpenAppointment={() => handleOpenAppointment()}
              onOpenLogoGuide={() => setIsLogoGuideOpen(true)}
              onSelectCategory={handleCategoryNav}
              onSelectShape={handleShapeNav}
            />

            {/* 13. Floating Blue Concierge Chat Widget with Online Dot (Matching Screenshots 1 & 2) */}
            <FloatingWidgets onOpenAppointment={() => handleOpenAppointment()} />

            {/* Drawers & Modals */}
            <CartDrawer />
            <WishlistDrawer />
            <QuickViewModal
              product={quickViewProduct}
              onClose={() => setQuickViewProduct(null)}
              onSelectProduct={handleSelectProduct}
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
              onSelectProduct={handleSelectProduct}
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
