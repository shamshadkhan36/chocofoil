import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, PhoneCall, Menu, X, Award, Palette } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery, 
  onOpenWholesale,
  onScrollToSection,
  onOpenDesigner
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(18, 11, 8, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(243, 198, 76, 0.15)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => onScrollToSection('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gold-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(243, 198, 76, 0.4)'
          }}>
            <Sparkles size={24} color="#120b08" />
          </div>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 900, 
              fontSize: '1.4rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              background: 'var(--gold-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              CHOCOWRAP
            </div>
            <div style={{ 
              fontSize: '0.68rem', 
              color: 'var(--text-muted)', 
              letterSpacing: '0.18em', 
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Luxury Foils & Packaging
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          flex: '1',
          maxWidth: '360px',
          position: 'relative'
        }} className="desktop-search">
          <Search size={18} color="var(--text-muted)" style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input 
            type="text" 
            placeholder="Search line embossed, 3D prism, floral foils..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(243, 198, 76, 0.2)',
              borderRadius: 'var(--radius-full)',
              padding: '10px 16px 10px 42px',
              color: 'white',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--text-gold)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(243, 198, 76, 0.2)'}
          />
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          <button 
            onClick={() => onScrollToSection('catalog')} 
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Catalog
          </button>
          
          <button 
            onClick={onOpenDesigner} 
            style={{ 
              background: 'rgba(243, 198, 76, 0.15)', 
              border: '1px solid var(--text-gold)', 
              color: 'var(--text-gold)', 
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem', 
              fontWeight: 800, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              boxShadow: '0 0 16px rgba(243, 198, 76, 0.2)'
            }}
          >
            <Sparkles size={16} /> Customizer Studio
          </button>

          <button 
            onClick={() => onScrollToSection('simulator')} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer' }}
          >
            3D Wrap Simulator
          </button>
          
          <button 
            onClick={onOpenWholesale} 
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Award size={16} color="var(--text-gold)" /> Wholesale
          </button>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Cart Trigger */}
          <button 
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'rgba(243, 198, 76, 0.1)',
              border: '1px solid rgba(243, 198, 76, 0.3)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-gold)',
              transition: 'all 0.3s ease'
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--ruby-gradient)',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 800,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(230, 0, 38, 0.5)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(18, 11, 8, 0.98)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <button 
            onClick={() => { onOpenDesigner(); setMobileMenuOpen(false); }} 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Sparkles size={18} /> Open Customizer Studio
          </button>
          <button onClick={() => { onScrollToSection('catalog'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'white', fontSize: '1rem', fontWeight: 600, padding: '8px 0' }}>Browse Catalog</button>
          <button onClick={() => { onScrollToSection('simulator'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-gold)', fontSize: '1rem', fontWeight: 700, padding: '8px 0' }}>3D Wrap Simulator</button>
          <button onClick={() => { onOpenWholesale(); setMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'white', fontSize: '1rem', fontWeight: 600, padding: '8px 0' }}>Wholesale & Sample Kits</button>
        </div>
      )}
    </header>
  );
}
