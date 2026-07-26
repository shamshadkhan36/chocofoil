import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WrapSimulator from './components/WrapSimulator';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WholesaleModal from './components/WholesaleModal';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);

  // Cart total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar 
        cartCount={cartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenWholesale={() => setWholesaleModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Showcase */}
      <div id="hero">
        <Hero 
          onExploreCatalog={() => handleScrollToSection('catalog')}
          onOpenSimulator={() => handleScrollToSection('simulator')}
          onOpenWholesale={() => setWholesaleModalOpen(true)}
        />
      </div>

      {/* Interactive 3D Wrap Simulator */}
      <WrapSimulator 
        onAddToCartByCustomSpec={handleAddToCart}
      />

      {/* Product Catalog Grid */}
      <Catalog 
        products={PRODUCTS}
        searchQuery={searchQuery}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer 
        onOpenWholesale={() => setWholesaleModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
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
    </div>
  );
}
