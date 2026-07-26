import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Check, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);

  // Price multipliers based on selected size
  const sizeMultipliers = [1, 2.2, 4.0, 6.5];
  const currentPrice = Math.round(product.price * (sizeMultipliers[selectedSizeIndex] || 1));
  const currentOriginalPrice = Math.round(product.originalPrice * (sizeMultipliers[selectedSizeIndex] || 1));

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedSize: product.sizes[selectedSizeIndex],
      price: currentPrice
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Product Image Area */}
      <div 
        onClick={() => onQuickView(product)}
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '85%',
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />

        {/* Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {product.isBestSeller && (
            <span className="badge-tag badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="badge-tag badge-ruby">
              New Arrival
            </span>
          )}
        </div>

        {/* Category Tag */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(18, 11, 8, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          fontWeight: 700
        }}>
          {product.categoryLabel}
        </div>

        {/* Quick View Hover Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(18, 11, 8, 0.9)',
            border: '1px solid var(--text-gold)',
            color: 'var(--text-gold)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3
          }}
          className="quick-view-btn"
        >
          <Eye size={16} /> Quick Specs
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', color: 'var(--gold-glow)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onQuickView(product)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            marginBottom: '10px',
            lineHeight: 1.3,
            cursor: 'pointer',
            color: 'white',
            transition: 'color 0.2s ease'
          }}
        >
          {product.name}
        </h3>

        {/* Color Swatch Preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Colors:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {product.colors.slice(0, 5).map((color, idx) => (
              <span 
                key={idx}
                title={color.name}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: '1px solid rgba(255,255,255,0.4)',
                  display: 'inline-block'
                }}
              />
            ))}
            {product.colors.length > 5 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-gold)', fontWeight: 700 }}>
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Pack Size Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Pack Size:
          </label>
          <select 
            value={selectedSizeIndex}
            onChange={(e) => setSelectedSizeIndex(Number(e.target.value))}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(243, 198, 76, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
              color: 'white',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {product.sizes.map((size, idx) => (
              <option key={idx} value={idx} style={{ background: '#1a100c', color: 'white' }}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Action Row */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-gold)' }}>
              ₹{currentPrice}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{currentOriginalPrice}
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem'
            }}
          >
            {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}
