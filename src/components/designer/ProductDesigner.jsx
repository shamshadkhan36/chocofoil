import React, { useRef, useState } from 'react';
import { useDesignerStore } from '../../store/useDesignerStore';
import LeftSidebar from './LeftSidebar';
import DesignerCanvas from './DesignerCanvas';
import RightPanel from './RightPanel';
import { ArrowLeft, Sparkles, SlidersHorizontal, ShoppingBag, X } from 'lucide-react';

export default function ProductDesigner({ onClose, onAddToCartCustom, onOpenAdmin }) {
  const { activeProduct, selectedColor, selectedShape } = useDesignerStore();
  const previewElementRef = useRef(null);

  // Mobile Bottom Sheet state
  const [mobileTab, setMobileTab] = useState('canvas'); // 'canvas' | 'controls' | 'summary'

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 500,
      background: '#120b08',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Studio Header Bar */}
      <div style={{
        height: '64px',
        padding: '0 24px',
        background: 'linear-gradient(90deg, #1a100c 0%, #120b08 100%)',
        borderBottom: '1px solid var(--border-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        {/* Back Button & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} /> Exit Studio
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-tag badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                <Sparkles size={10} style={{ marginRight: 4 }} /> Customizer Studio
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {activeProduct ? activeProduct.name : 'Custom Chocolate Foil Designer'}
              </h2>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Canva & VistaPrint-Level Chocolate Wrapper Customization Engine
            </div>
          </div>
        </div>

        {/* Right Action: Admin Access & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'rgba(243, 198, 76, 0.15)',
                border: '1px solid rgba(243, 198, 76, 0.3)',
                color: 'var(--text-gold)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Admin Config
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Studio Viewport */}
      {/* Desktop 3-Column Layout */}
      <div className="desktop-designer-layout" style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '380px 1fr 340px',
        overflow: 'hidden'
      }}>
        {/* Left Sidebar Controls */}
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <LeftSidebar />
        </div>

        {/* Center Live Canvas Preview */}
        <div style={{ padding: '16px', height: '100%', overflow: 'hidden' }}>
          <DesignerCanvas previewContainerRef={previewElementRef} />
        </div>

        {/* Right Summary & Pricing */}
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <RightPanel 
            onAddToCartCustom={onAddToCartCustom} 
            previewElementRef={previewElementRef} 
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar & Sheet Drawers */}
      <div className="mobile-designer-toolbar" style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#160d09',
        borderTop: '1px solid var(--border-glow)',
        padding: '10px 16px',
        justifyContent: 'space-around',
        zIndex: 550
      }}>
        <button
          onClick={() => setMobileTab('controls')}
          style={{
            background: mobileTab === 'controls' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.06)',
            color: mobileTab === 'controls' ? '#120b08' : 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <SlidersHorizontal size={16} /> Customize Controls
        </button>

        <button
          onClick={() => setMobileTab('summary')}
          style={{
            background: mobileTab === 'summary' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.06)',
            color: mobileTab === 'summary' ? '#120b08' : 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ShoppingBag size={16} /> Price & Order
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-designer-layout {
            display: flex !important;
            flex-direction: column !important;
            grid-template-columns: none !important;
            overflow-y: auto !important;
          }
          .mobile-designer-toolbar {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
