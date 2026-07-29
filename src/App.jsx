import React, { useState, Suspense, Component } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WrapSimulator from './components/WrapSimulator';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WholesaleModal from './components/WholesaleModal';
import AdminPanel from './components/admin/AdminPanel';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import { useDesignerStore } from './store/useDesignerStore';

// Lazy load ProductDesigner studio for maximum initial load performance
const ProductDesigner = React.lazy(() => import('./components/designer/ProductDesigner'));

// Error Boundary component to prevent blank screen crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary Caught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#120b08',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-gold)', marginBottom: '12px' }}>
            ChocoWrap Studio Initialized
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            Something went wrong while rendering. Click below to reload.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reload Studio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  
  // Customizer Studio & Admin states
  const [designerOpen, setDesignerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const { setActiveProduct } = useDesignerStore();

  // Cart total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Open Designer for specific product or blank custom canvas
  const handleOpenDesigner = (product = null) => {
    setActiveProduct(product);
    setDesignerOpen(true);
  };

  // Add item to cart
  const handleAddToCart = (productWithDetails) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === productWithDetails.id && 
                item.selectedSize === productWithDetails.selectedSize &&
                item.selectedColor === productWithDetails.selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += (productWithDetails.quantity || 1);
        return updated;
      } else {
        return [...prevItems, {
          ...productWithDetails,
          quantity: productWithDetails.quantity || 1
        }];
      }
    });
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Remove item from cart
  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Scroll smooth helper
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <Navbar 
          cartCount={cartCount}
          onOpenCart={() => setCartDrawerOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenWholesale={() => setWholesaleModalOpen(true)}
          onScrollToSection={handleScrollToSection}
          onOpenDesigner={() => handleOpenDesigner()}
        />

        {/* Hero Showcase */}
        <div id="hero">
          <Hero 
            onExploreCatalog={() => handleScrollToSection('catalog')}
            onOpenSimulator={() => handleScrollToSection('simulator')}
            onOpenWholesale={() => setWholesaleModalOpen(true)}
            onOpenDesigner={() => handleOpenDesigner()}
          />
        </div>

        {/* Interactive 3D Wrap Simulator */}
        <WrapSimulator 
          onAddToCartByCustomSpec={handleAddToCart}
          onOpenDesigner={() => handleOpenDesigner()}
        />

        {/* Product Catalog Grid */}
        <Catalog 
          products={PRODUCTS}
          searchQuery={searchQuery}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={handleAddToCart}
          onCustomize={(prod) => handleOpenDesigner(prod)}
        />

        {/* Footer */}
        <Footer 
          onOpenWholesale={() => setWholesaleModalOpen(true)}
        />

        {/* Modals & Fullscreen Studio Views */}
        {designerOpen && (
          <Suspense fallback={
            <div style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: '#120b08',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-gold)',
              fontSize: '1.2rem',
              fontWeight: 700
            }}>
              Loading Chocolate Foil Customization Studio...
            </div>
          }>
            <ProductDesigner 
              onClose={() => setDesignerOpen(false)}
              onAddToCartCustom={(customItem) => {
                handleAddToCart(customItem);
                setCartDrawerOpen(true);
              }}
              onOpenAdmin={() => setAdminOpen(true)}
            />
          </Suspense>
        )}

        <ProductModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onCustomize={(prod) => handleOpenDesigner(prod)}
        />

        <CartDrawer 
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={(data) => setCheckoutData(data)}
        />

        <CheckoutModal 
          isOpen={Boolean(checkoutData)}
          onClose={() => setCheckoutData(null)}
          checkoutData={checkoutData}
          onClearCart={() => setCartItems([])}
        />

        <WholesaleModal 
          isOpen={wholesaleModalOpen}
          onClose={() => setWholesaleModalOpen(false)}
        />

        <AdminPanel 
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
