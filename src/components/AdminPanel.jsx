import React, { useState, useEffect, useMemo } from 'react';
import {
  getStoredProducts,
  saveProductsCatalog,
  resetProductsCatalog,
  getStoredOrders,
  saveOrders,
  clearAllOrders,
  getStoredAppointments,
  saveAppointments,
  clearAllAppointments,
  getStoredSettings,
  saveSettings
} from '../services/adminStore';

export const AdminPanel = ({ onBackToStorefront, onSelectProduct }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tct_admin_session') === 'active';
    }
    return false;
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'overview' | 'products' | 'orders' | 'appointments' | 'settings'
  const [activeTab, setActiveTab] = useState('overview');

  // Stored Data State
  const [products, setProducts] = useState(getStoredProducts);
  const [orders, setOrders] = useState(getStoredOrders);
  const [appointments, setAppointments] = useState(getStoredAppointments);
  const [settings, setSettings] = useState(getStoredSettings);

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    const handleOrders = () => setOrders(getStoredOrders());
    const handleApts = () => setAppointments(getStoredAppointments());
    const handleProds = () => setProducts(getStoredProducts());

    window.addEventListener('tct:orders-updated', handleOrders);
    window.addEventListener('tct:appointments-updated', handleApts);
    window.addEventListener('tct:catalog-updated', handleProds);

    return () => {
      window.removeEventListener('tct:orders-updated', handleOrders);
      window.removeEventListener('tct:appointments-updated', handleApts);
      window.removeEventListener('tct:catalog-updated', handleProds);
    };
  }, []);

  const handleClearOrders = () => {
    if (window.confirm('Are you sure you want to clear all orders? This will remove all placed client commissions.')) {
      const remaining = clearAllOrders();
      setOrders(remaining);
      showToast('✓ All client orders cleared.');
    }
  };

  const handleClearAppointments = () => {
    if (window.confirm('Are you sure you want to clear all appointments?')) {
      const remaining = clearAllAppointments();
      setAppointments(remaining);
      showToast('✓ All consultations cleared.');
    }
  };

  // Product Filter State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productShapeFilter, setProductShapeFilter] = useState('all');
  const [productPage, setProductPage] = useState(1);
  const productsPerPage = 15;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'rings',
    categoryLabel: 'Rings',
    shape: 'Round',
    priceUSD: 940,
    price925: 240,
    price9K: 580,
    price14K: 770,
    price18K: 940,
    image: '/assets/products/tct-three-stone-yellow.jpg',
    description: ''
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.toLowerCase() === 'atelier') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tct_admin_session', 'active');
      setAuthError('');
    } else {
      setAuthError('Invalid Master Passcode. Use default: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tct_admin_session');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.shape && p.shape.toLowerCase().includes(productSearch.toLowerCase()));
      const matchCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;
      const matchShape =
        productShapeFilter === 'all' || (p.shape && p.shape.toLowerCase() === productShapeFilter.toLowerCase());
      return matchSearch && matchCategory && matchShape;
    });
  }, [products, productSearch, productCategoryFilter, productShapeFilter]);

  const totalProductPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (productPage - 1) * productsPerPage,
    productPage * productsPerPage
  );

  // Product CRUD
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;

    const handle = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = {
      id: `custom-${Date.now()}-${handle}`,
      name: newProd.name.trim(),
      handle: handle,
      sku: `TCT-${handle.slice(0, 8).toUpperCase()}`,
      category: newProd.category,
      categoryLabel: newProd.categoryLabel || 'Fine Jewellery',
      shape: newProd.shape,
      rating: 5.0,
      reviewsCount: 1,
      priceUSD: Number(newProd.price18K) || Number(newProd.priceUSD) || 940,
      pricesByPurity: {
        '925 Silver': Number(newProd.price925) || 240,
        '9K': Number(newProd.price9K) || 580,
        '14K': Number(newProd.price14K) || 770,
        '18K': Number(newProd.price18K) || Number(newProd.priceUSD) || 940
      },
      metals: ['925 Silver', '9K', '14K', '18K'],
      colors: [
        { id: 'yellow', name: 'Yellow Gold', hex: '#F2C94C', imageIndex: 0 },
        { id: 'white', name: 'White Gold', hex: '#C4C4C4', imageIndex: 0 },
        { id: 'rose', name: 'Rose Gold', hex: '#E08E88', imageIndex: 0 }
      ],
      image: newProd.image || '/assets/products/tct-three-stone-yellow.jpg',
      images: [
        {
          src: newProd.image || '/assets/products/tct-three-stone-yellow.jpg',
          alt: newProd.name,
          isVideo: false
        }
      ],
      description: newProd.description || `${newProd.name} handcrafted with certified DEF/VVS lab-grown diamonds. Backed by our Lifetime Care & Service Guarantee.`,
      details: [
        { label: 'Metal Purity', value: '18K Solid Gold / 14K / 9K / 925 Sterling Silver' },
        { label: 'Diamond Cut & Shape', value: `${newProd.shape} Cut · Excellent / Ideal (Hearts & Arrows)` },
        { label: 'Diamond Color & Clarity', value: 'DEF Color · VVS-VS Clarity' },
        { label: 'Certification', value: 'IGI / GIA Authenticated Laser Inscribed' },
        { label: 'Warranty & Care', value: 'Lifetime Care & Service Guarantee' }
      ],
      priceBreakup: [
        { item: 'Gold & Precious Metal Value', amount: `$${Math.round((newProd.price18K || 940) * 0.32)}` },
        { item: 'Certified Lab Diamonds (DEF / VVS)', amount: `$${Math.round((newProd.price18K || 940) * 0.58)}` },
        { item: 'Master Hand-Setting & Craftsmanship', amount: `$${Math.round((newProd.price18K || 940) * 0.07)}` },
        { item: 'Insured Armored Express Courier', amount: '$25' },
        { item: 'Total Selling Price', amount: `$${newProd.price18K || 940}`, highlight: true }
      ],
      shippingInfo: 'Complimentary insured express delivery in 3-5 business days worldwide. Odd ring sizes (e.g. 6.5) and bespoke orders are crafted exclusively to order with no cancellations. Covered by our Lifetime Care & Service Guarantee.'
    };

    const updated = [created, ...products];
    setProducts(updated);
    saveProductsCatalog(updated);
    setIsAddModalOpen(false);
    showToast(`✓ Created "${created.name}" successfully!`);
    setNewProd({
      name: '',
      category: 'rings',
      categoryLabel: 'Rings',
      shape: 'Round',
      priceUSD: 940,
      price925: 240,
      price9K: 580,
      price14K: 770,
      price18K: 940,
      image: '/assets/products/tct-three-stone-yellow.jpg',
      description: ''
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated = products.map((p) => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: editingProduct.name,
          category: editingProduct.category,
          categoryLabel: editingProduct.category.charAt(0).toUpperCase() + editingProduct.category.slice(1),
          shape: editingProduct.shape,
          priceUSD: Number(editingProduct.priceUSD),
          pricesByPurity: {
            ...p.pricesByPurity,
            '18K': Number(editingProduct.priceUSD)
          },
          image: editingProduct.image || p.image,
          description: editingProduct.description || p.description
        };
      }
      return p;
    });

    setProducts(updated);
    saveProductsCatalog(updated);
    setEditingProduct(null);
    showToast(`✓ Updated product "${editingProduct.name}"!`);
  };

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}" from the catalog?`)) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      saveProductsCatalog(updated);
      showToast(`Deleted "${productName}".`);
    }
  };

  const handleResetCatalog = () => {
    if (
      window.confirm(
        'Reset catalog to original 242 Pure Promise / The Carat Theory creations? Custom changes will be restored to defaults.'
      )
    ) {
      const restored = resetProductsCatalog();
      setProducts(restored);
      showToast('✓ Restored default catalog (242 creations).');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `thecarattheory_catalog_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('✓ Catalog JSON exported.');
  };

  // Order Status Update
  const handleOrderStatusChange = (orderId, newStatus) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (targetOrder?.isNonCancellable && newStatus === 'Cancelled') {
      alert('POLICY ALERT: This order includes Odd Ring Sizes (e.g. 6.5) or Bespoke Crafting. Under The Carat Theory T&C, bespoke orders cannot be cancelled.');
      return;
    }

    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    saveOrders(updated);
    showToast(`Order ${orderId} status set to "${newStatus}".`);
  };

  // Appointment Status Update
  const handleAppointmentStatusChange = (aptId, newStatus) => {
    const updated = appointments.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    saveAppointments(updated);
    showToast(`Appointment ${aptId} status set to "${newStatus}".`);
  };

  // Settings Save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveSettings(settings);
    showToast('✓ Store policies and atelier settings saved.');
  };

  // Total Revenue Calculation
  const totalRevenueUSD = orders.reduce((acc, curr) => acc + (curr.totalAmountUSD || 0), 0);

  /* --- Render Login Screen If Not Authenticated --- */
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              src="/assets/logo/the-carat-theory-gold.svg"
              alt="The Carat Theory"
              style={{ height: '48px', margin: '0 auto 1rem' }}
            />
            <h2 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.12em', color: '#FFFFFF', fontSize: '1.4rem', textTransform: 'uppercase' }}>
              Atelier Executive Console
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
              Secure administrative access for master gemologists &amp; atelier managers
            </p>
          </div>

          {authError && (
            <div style={{ background: '#7F1D1D', color: '#FECACA', padding: '0.75rem', borderRadius: '4px', fontSize: '0.82rem', marginBottom: '1.25rem', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#E2E8F0', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
                Master Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: admin123)"
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: '#0B1824',
                  border: '1px solid #1E374D',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.9rem', marginBottom: '1rem' }}
            >
              Enter Atelier Console
            </button>

            <button
              type="button"
              onClick={() => {
                setPasscode('admin123');
                setIsAuthenticated(true);
                sessionStorage.setItem('tct_admin_session', 'active');
              }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#93C5FD',
                border: '1px solid rgba(147, 197, 253, 0.25)',
                padding: '0.65rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              ⚡ Quick Demo Login (admin123)
            </button>
          </form>

          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            <button
              onClick={onBackToStorefront}
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              &larr; Return to The Carat Theory Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* --- Render Authenticated Admin Dashboard --- */
  return (
    <div className="admin-portal-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          {toastMessage}
        </div>
      )}

      {/* Admin Top Header Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <img
            src="/assets/logo/the-carat-theory-white.svg"
            alt="The Carat Theory"
            style={{ height: '32px' }}
          />
          <span className="admin-badge">ATELIER CONSOLE</span>
          <span className="admin-status-pill">● System Online · USD ($)</span>
        </div>

        <div className="admin-topbar-right">
          <button
            onClick={onBackToStorefront}
            className="admin-btn-secondary"
            title="Switch to customer storefront view"
          >
            &larr; View Storefront
          </button>
          <button onClick={handleLogout} className="admin-btn-logout">
            Log Out
          </button>
        </div>
      </header>

      {/* Main Admin Layout: Sidebar Tabs + Content Area */}
      <div className="admin-body-layout">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-section">
            <span className="admin-sidebar-heading">MAIN MENU</span>
            <button
              className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              <span>Dashboard Overview</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
              <span>Products &amp; Catalog</span>
              <span className="admin-count-pill">{products.length}</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <span>Orders &amp; Bespoke</span>
              <span className="admin-count-pill">{orders.length}</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <span>Consultations</span>
              <span className="admin-count-pill">{appointments.length}</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              <span>Policies &amp; Pricing</span>
            </button>
          </div>

          {/* Quick Policy Notice */}
          <div className="admin-sidebar-policy-box">
            <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
              ✦ ACTIVE ATELIER RULES
            </span>
            <p style={{ margin: 0, fontSize: '0.76rem', color: '#94A3B8', lineHeight: '1.45' }}>
              Odd ring sizes (e.g. 6.5) &amp; custom commissions strictly non-cancellable. Pricing locked to USD ($). Zero buyback references.
            </p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="admin-main-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-page-title">Executive Atelier Dashboard</h2>
                  <p className="admin-page-sub">Real-time atelier metrics, customer commissions, and lab diamond catalog health.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}>
                    + New Diamond Creation
                  </button>
                </div>
              </div>

              {/* KPI Stat Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Gross Atelier Volume</span>
                  <div className="admin-kpi-value">${totalRevenueUSD.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>USD</span></div>
                  <span className="admin-kpi-trend positive">&uarr; +18.4% this month</span>
                </div>

                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Active Commissions</span>
                  <div className="admin-kpi-value">{orders.length}</div>
                  <span className="admin-kpi-trend neutral">2 in atelier handcrafting</span>
                </div>

                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Catalog Creations</span>
                  <div className="admin-kpi-value">{products.length}</div>
                  <span className="admin-kpi-trend positive">100% indexed in USD</span>
                </div>

                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">VIP Consultations</span>
                  <div className="admin-kpi-value">{appointments.length}</div>
                  <span className="admin-kpi-trend positive">1 scheduled today</span>
                </div>
              </div>

              {/* Critical Policy Banner */}
              <div className="admin-policy-alert-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.92rem', color: '#FDE68A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Bespoke Order &amp; Odd Size Protection Enforced
                    </h4>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#FEF3C7' }}>
                      Orders containing odd ring sizes (e.g. 6.5) are tagged with non-cancellation flags. Cancellation attempts will be intercepted.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  style={{ background: '#78350F', border: '1px solid #B45309', color: '#FEF3C7', padding: '0.4rem 0.85rem', borderRadius: '4px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Inspect Orders &rarr;
                </button>
              </div>

              {/* Recent Orders Overview */}
              <div className="admin-card-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#FFFFFF', margin: 0 }}>
                    Recent Atelier Commissions
                  </h3>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: '#93C5FD', fontSize: '0.82rem', cursor: 'pointer' }}>
                    View all {orders.length} orders &rarr;
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#0B1824', borderRadius: '8px', border: '1px dashed #1E374D' }}>
                    <div style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>💎</div>
                    <h4 style={{ color: '#F1F5F9', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                      No Customer Commissions Yet
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', maxWidth: '440px', margin: '0 auto 1.25rem', lineHeight: '1.5' }}>
                      All dummy orders have been cleared. Client orders placed through the boutique bag or checkout will appear here automatically with odd-size non-cancellation validation.
                    </p>
                    <button onClick={onBackToStorefront} className="admin-btn-secondary" style={{ fontSize: '0.82rem' }}>
                      &larr; Return to Storefront
                    </button>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Creation &amp; Size</th>
                        <th>Amount (USD)</th>
                        <th>Status</th>
                        <th>Policy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id}>
                          <td><strong>{ord.id}</strong></td>
                          <td>
                            <div>{ord.customerName}</div>
                            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{ord.customerEmail}</span>
                          </td>
                          <td>
                            {ord.items.map((i, idx) => (
                              <div key={idx}>
                                <span>{i.name} ({i.purity})</span>
                                <div style={{ fontSize: '0.72rem', color: i.isOddSize ? '#F59E0B' : '#94A3B8', fontWeight: i.isOddSize ? 600 : 400 }}>
                                  Size: {i.size} {i.isOddSize && '✦ Odd Size'}
                                </div>
                              </div>
                            ))}
                          </td>
                          <td><strong style={{ color: '#F3E8FF' }}>${ord.totalAmountUSD.toLocaleString()}</strong></td>
                          <td>
                            <span className={`admin-status-badge ${ord.status.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td>
                            {ord.isNonCancellable ? (
                              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                                NON-CANCELLABLE
                              </span>
                            ) : (
                              <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>Standard Delivery</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & CATALOG */}
          {activeTab === 'products' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-page-title">Products &amp; Catalog Management</h2>
                  <p className="admin-page-sub">
                    Managing <strong>{products.length}</strong> creations imported from Pure Promise Diamonds and customized for The Carat Theory.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleExportJSON} className="admin-btn-secondary" style={{ fontSize: '0.82rem' }}>
                    Export JSON
                  </button>
                  <button onClick={handleResetCatalog} className="admin-btn-secondary" style={{ fontSize: '0.82rem', color: '#FCA5A5' }} title="Restore default 242 products">
                    Reset Catalog
                  </button>
                  <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}>
                    + Add New Product
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="admin-filters-bar">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setProductPage(1);
                  }}
                  placeholder="Search by title, shape, category..."
                  className="admin-search-input"
                />

                <select
                  value={productCategoryFilter}
                  onChange={(e) => {
                    setProductCategoryFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="admin-select"
                >
                  <option value="all">All Categories ({products.length})</option>
                  <option value="rings">Rings</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="pendants">Pendants</option>
                  <option value="nosepins">Nose Pins</option>
                  <option value="necklaces">Necklaces</option>
                </select>

                <select
                  value={productShapeFilter}
                  onChange={(e) => {
                    setProductShapeFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="admin-select"
                >
                  <option value="all">All Shapes</option>
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Cushion">Cushion</option>
                  <option value="Pear">Pear</option>
                  <option value="Princess">Princess</option>
                  <option value="Marquise">Marquise</option>
                  <option value="Heart">Heart</option>
                </select>

                <span style={{ color: '#94A3B8', fontSize: '0.82rem', marginLeft: 'auto' }}>
                  Showing {paginatedProducts.length} of {filteredProducts.length} creations
                </span>
              </div>

              {/* Products Table */}
              <div className="admin-card-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>Image</th>
                      <th>Creation Title</th>
                      <th>Category</th>
                      <th>Shape</th>
                      <th>18K Gold (USD)</th>
                      <th>Purities Available</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <img
                            src={prod.image || (prod.images && prod.images[0]?.src) || '/assets/products/tct-three-stone-yellow.jpg'}
                            alt={prod.name}
                            className="admin-table-thumb"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/assets/products/tct-three-stone-yellow.jpg';
                            }}
                          />
                        </td>
                        <td>
                          <strong style={{ color: '#FFFFFF', display: 'block' }}>{prod.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>SKU: {prod.sku || prod.id}</span>
                        </td>
                        <td>
                          <span style={{ textTransform: 'capitalize' }}>{prod.categoryLabel || prod.category}</span>
                        </td>
                        <td>
                          <span className="admin-shape-badge">{prod.shape || 'Round'}</span>
                        </td>
                        <td>
                          <strong style={{ color: '#F2C94C', fontSize: '0.95rem' }}>
                            ${(prod.pricesByPurity?.['18K'] || prod.priceUSD || 940).toLocaleString()}
                          </strong>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                            {['925 Silver', '9K', '14K', '18K'].map((m) => (
                              <span key={m} style={{ fontSize: '0.65rem', background: '#0B1824', padding: '0.15rem 0.35rem', borderRadius: '2px', border: '1px solid #1E374D', color: '#CBD5E1' }}>
                                {m}: ${prod.pricesByPurity?.[m] || Math.round(prod.priceUSD * 0.5)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="admin-action-btn edit"
                            title="Edit Product"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (onSelectProduct) onSelectProduct(prod);
                            }}
                            className="admin-action-btn preview"
                            title="Preview on Live Storefront"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="admin-action-btn delete"
                            title="Delete Creation"
                          >
                            &times;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="admin-pagination-bar">
                  <button
                    disabled={productPage <= 1}
                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                    className="admin-page-btn"
                  >
                    &larr; Previous
                  </button>
                  <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    Page {productPage} of {totalProductPages}
                  </span>
                  <button
                    disabled={productPage >= totalProductPages}
                    onClick={() => setProductPage((p) => Math.min(totalProductPages, p + 1))}
                    className="admin-page-btn"
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS & BESPOKE COMMISSIONS */}
          {activeTab === 'orders' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-page-title">Client Commissions &amp; Orders</h2>
                  <p className="admin-page-sub">
                    Direct oversight of lab-grown diamond orders with non-cancellation odd-size compliance tracking.
                  </p>
                </div>
                {orders.length > 0 && (
                  <button onClick={handleClearOrders} className="admin-btn-secondary" style={{ fontSize: '0.82rem', color: '#FCA5A5' }}>
                    Clear All Orders
                  </button>
                )}
              </div>

              <div className="admin-card-container">
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: '#94A3B8' }}>
                    <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>💍</div>
                    <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      No Customer Orders Placed Yet
                    </h3>
                    <p style={{ fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
                      All dummy orders have been cleared. As clients place real commissions or configure creations in the storefront, their orders will appear here immediately.
                    </p>
                    <button onClick={onBackToStorefront} className="btn btn-primary" style={{ padding: '0.65rem 1.75rem', fontSize: '0.85rem' }}>
                      &larr; Browse Storefront &amp; Place Order
                    </button>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID &amp; Date</th>
                        <th>Client Details</th>
                        <th>Jewellery Specification</th>
                        <th>Amount (USD)</th>
                        <th>Order Status</th>
                        <th>Policy Check</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id}>
                          <td>
                            <strong style={{ color: '#FFFFFF', display: 'block' }}>{ord.id}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{ord.date}</span>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{ord.customerName}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{ord.customerEmail}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{ord.shippingAddress}</div>
                          </td>
                          <td>
                            {ord.items.map((i, idx) => (
                              <div key={idx} style={{ marginBottom: '0.35rem' }}>
                                <strong style={{ color: '#F3E8FF' }}>{i.name}</strong>
                                <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                                  Metal: {i.purity} &middot; Color: {i.color}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: i.isOddSize ? '#F59E0B' : '#94A3B8', fontWeight: i.isOddSize ? 700 : 400 }}>
                                  Ring Size: {i.size} {i.isOddSize && '✦ Odd Size (No Cancellations)'}
                                </div>
                              </div>
                            ))}
                          </td>
                          <td>
                            <strong style={{ fontSize: '1.05rem', color: '#F2C94C' }}>
                              ${ord.totalAmountUSD.toLocaleString()}
                            </strong>
                            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{ord.paymentStatus}</div>
                          </td>
                          <td>
                            <select
                              value={ord.status}
                              onChange={(e) => handleOrderStatusChange(ord.id, e.target.value)}
                              className="admin-select"
                              style={{ fontSize: '0.8rem', padding: '0.35rem 0.5rem' }}
                            >
                              <option value="Pending Review">Pending Review</option>
                              <option value="In Atelier Crafting">In Atelier Crafting</option>
                              <option value="Insured Armored Transit">Insured Armored Transit</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            {ord.isNonCancellable ? (
                              <span style={{ background: '#7F1D1D', color: '#FECACA', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, display: 'inline-block' }}>
                                ODD SIZE PROTECTED
                              </span>
                            ) : (
                              <span style={{ background: '#1E293B', color: '#94A3B8', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                                Standard Care
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-page-title">Virtual Atelier Consultations</h2>
                  <p className="admin-page-sub">
                    Direct appointments booked by clients seeking solitaire customization, sizing guidance, and diamond education.
                  </p>
                </div>
                {appointments.length > 0 && (
                  <button onClick={handleClearAppointments} className="admin-btn-secondary" style={{ fontSize: '0.82rem', color: '#FCA5A5' }}>
                    Clear All Consultations
                  </button>
                )}
              </div>

              <div className="admin-card-container">
                {appointments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: '#94A3B8' }}>
                    <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>🗓</div>
                    <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      No Consultations Scheduled Yet
                    </h3>
                    <p style={{ fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: '1.5' }}>
                      All dummy bookings have been cleared. As clients reserve VIP appointments or video consultations on the storefront, they will be listed here live.
                    </p>
                    <button onClick={onBackToStorefront} className="btn btn-primary" style={{ padding: '0.65rem 1.75rem', fontSize: '0.85rem' }}>
                      &larr; Return to Storefront
                    </button>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ref &amp; Date</th>
                        <th>Client Name &amp; Contact</th>
                        <th>Consultation Subject</th>
                        <th>Notes &amp; Focus</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((apt) => (
                        <tr key={apt.id}>
                          <td>
                            <strong style={{ color: '#FFFFFF' }}>{apt.id}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#93C5FD' }}>{apt.date} at {apt.time}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{apt.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{apt.email}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{apt.phone}</div>
                          </td>
                          <td>
                            <strong style={{ color: '#FDE68A' }}>{apt.subject}</strong>
                          </td>
                          <td>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#CBD5E1', maxWidth: '300px' }}>
                              {apt.notes}
                            </p>
                          </td>
                          <td>
                            <select
                              value={apt.status}
                              onChange={(e) => handleAppointmentStatusChange(apt.id, e.target.value)}
                              className="admin-select"
                              style={{ fontSize: '0.8rem', padding: '0.35rem 0.5rem' }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: POLICIES & SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-page-title">Atelier Policies &amp; Global Pricing</h2>
                  <p className="admin-page-sub">
                    Global compliance configuration for USD pricing, odd ring size non-cancellation terms, and lifetime care.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="admin-card-container" style={{ maxWidth: '800px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '1.5rem', borderBottom: '1px solid #1E374D', paddingBottom: '0.75rem' }}>
                  Policy Enforcement (Strict Compliance)
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={settings.oddSizePolicyEnforced}
                      onChange={(e) => setSettings({ ...settings, oddSizePolicyEnforced: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#2563EB' }}
                    />
                    <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>
                      Enforce Strict Non-Cancellation for Odd Ring Sizes (e.g. 6.5) &amp; Bespoke Commissions
                    </strong>
                  </label>
                  <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: '0 0 0.5rem 2rem' }}>
                    Standard ring size is 6.5. When enabled, any orders for size 6.5 or custom specifications are permanently marked non-cancellable in cart and checkout.
                  </p>
                  <textarea
                    value={settings.oddSizeNotice}
                    onChange={(e) => setSettings({ ...settings, oddSizeNotice: e.target.value })}
                    rows={2}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFFFFF', borderRadius: '4px', fontSize: '0.82rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={settings.lifetimeCarePolicyEnforced}
                      onChange={(e) => setSettings({ ...settings, lifetimeCarePolicyEnforced: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: '#2563EB' }}
                    />
                    <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>
                      Enforce Lifetime Care &amp; Service Guarantee (Purge Buyback)
                    </strong>
                  </label>
                  <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: '0 0 0.5rem 2rem' }}>
                    Guarantees complimentary lifetime prong inspection, ultrasonic cleaning, and rhodium replating. Eliminates all buyback references.
                  </p>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFFFFF', margin: '2rem 0 1.25rem', borderBottom: '1px solid #1E374D', paddingBottom: '0.75rem' }}>
                  Currency &amp; Atelier Contact Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Pricing Currency
                    </label>
                    <input
                      type="text"
                      value={settings.currency}
                      disabled
                      style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#93C5FD', borderRadius: '4px', fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                      Concierge Direct Line
                    </label>
                    <input
                      type="text"
                      value={settings.conciergePhone}
                      onChange={(e) => setSettings({ ...settings, conciergePhone: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFFFFF', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Headquarters Address
                  </label>
                  <input
                    type="text"
                    value={settings.headquartersAddress}
                    onChange={(e) => setSettings({ ...settings, headquartersAddress: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFFFFF', borderRadius: '4px' }}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Atelier Locations
                  </label>
                  <input
                    type="text"
                    value={settings.atelierAddresses}
                    onChange={(e) => setSettings({ ...settings, atelierAddresses: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFFFFF', borderRadius: '4px' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                  Save All Atelier Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD NEW CREATION */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', background: '#102231', color: '#FFFFFF', border: '1px solid #1E374D' }}>
            <button className="modal-close-corner" onClick={() => setIsAddModalOpen(false)} style={{ color: '#FFFFFF' }}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Add New Lab-Grown Diamond Creation
            </h3>

            <form onSubmit={handleCreateProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Cushion Diamond Ring"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value, categoryLabel: e.target.options[e.target.selectedIndex].text })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  >
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="pendants">Pendants</option>
                    <option value="nosepins">Nose Pins</option>
                    <option value="necklaces">Necklaces</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Diamond Cut / Shape</label>
                  <select
                    value={newProd.shape}
                    onChange={(e) => setNewProd({ ...newProd, shape: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  >
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Pear">Pear</option>
                    <option value="Princess">Princess</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Heart">Heart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0' }}>18K Gold ($)</label>
                  <input
                    type="number"
                    value={newProd.price18K}
                    onChange={(e) => setNewProd({ ...newProd, price18K: e.target.value, priceUSD: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0' }}>14K Gold ($)</label>
                  <input
                    type="number"
                    value={newProd.price14K}
                    onChange={(e) => setNewProd({ ...newProd, price14K: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0' }}>9K Gold ($)</label>
                  <input
                    type="number"
                    value={newProd.price9K}
                    onChange={(e) => setNewProd({ ...newProd, price9K: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#E2E8F0' }}>925 Silver ($)</label>
                  <input
                    type="number"
                    value={newProd.price925}
                    onChange={(e) => setNewProd({ ...newProd, price925: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Image CDN URL</label>
                <input
                  type="text"
                  placeholder="https://cdn.shopify.com/... or /assets/products/..."
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Product Description</label>
                <textarea
                  rows={2}
                  placeholder="Handcrafted in solid gold with DEF/VVS lab diamonds..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                  Save Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', background: '#102231', color: '#FFFFFF', border: '1px solid #1E374D' }}>
            <button className="modal-close-corner" onClick={() => setEditingProduct(null)} style={{ color: '#FFFFFF' }}>&times;</button>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Edit Creation: {editingProduct.name}
            </h3>

            <form onSubmit={handleUpdateProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  >
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="pendants">Pendants</option>
                    <option value="nosepins">Nose Pins</option>
                    <option value="necklaces">Necklaces</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Shape</label>
                  <select
                    value={editingProduct.shape || 'Round'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shape: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                  >
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Cushion">Cushion</option>
                    <option value="Pear">Pear</option>
                    <option value="Princess">Princess</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Heart">Heart</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>18K Gold Price (USD $)</label>
                <input
                  type="number"
                  value={editingProduct.priceUSD}
                  onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#E2E8F0', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: '#0B1824', border: '1px solid #1E374D', color: '#FFF', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingProduct(null)} className="admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
