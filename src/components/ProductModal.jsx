import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Sparkles, PhoneCall, Award, Layers, Ruler } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard Gold', hex: '#d4af37' });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const sizeMultipliers = [1, 2.2, 4.0, 6.5];
  const unitPrice = Math.round(product.price * (sizeMultipliers[selectedSizeIndex] || 1));
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize: product.sizes[selectedSizeIndex],
      selectedColor: selectedColor.name,
      quantity: quantity,
      price: unitPrice
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ChocoWrap! I am interested in inquiring about:\n` +
      `Product: ${product.name}\n` +
      `Size: ${product.sizes[selectedSizeIndex]}\n` +
      `Color: ${selectedColor.name}\n` +
      `Quantity: ${quantity} pack(s)\n` +
      `Total Price: ₹${totalPrice}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(10, 6, 4, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, rgba(28, 17, 13, 0.98) 0%, rgba(16, 9, 6, 0.99) 100%)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '32px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(243, 198, 76, 0.25)',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'white',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '36px'
        }}>
          {/* Left Column: Image Display */}
          <div>
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '16px'
            }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Badges Bar */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-tag badge-gold">
                <ShieldCheck size={12} style={{ marginRight: 4 }} /> FDA Food Safe
              </span>
              <span className="badge-tag badge-emerald">
                <Layers size={12} style={{ marginRight: 4 }} /> {product.thickness}
              </span>
              <span className="badge-tag badge-ruby">
                <Award size={12} style={{ marginRight: 4 }} /> Soft Deadfold
              </span>
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              {product.categoryLabel}
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px', lineHeight: 1.2 }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: 'var(--gold-glow)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{product.rating}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>({product.reviews} customer reviews)</span>
            </div>

            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
              {product.description}
            </p>

            {/* Technical Specifications Table */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              fontSize: '0.82rem'
            }}>
              <div><strong style={{ color: 'var(--text-gold)' }}>Thickness:</strong> {product.thickness}</div>
              <div><strong style={{ color: 'var(--text-gold)' }}>Material:</strong> Pure Aluminum</div>
              <div><strong style={{ color: 'var(--text-gold)' }}>Fold Hold:</strong> Deadfold Memory</div>
              <div><strong style={{ color: 'var(--text-gold)' }}>Heat Safety:</strong> Up to 220°C</div>
            </div>

            {/* Color Swatch Picker */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white', display: 'block', marginBottom: '8px' }}>
                Select Color: <span style={{ color: 'var(--text-gold)' }}>{selectedColor.name}</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: selectedColor.name === c.name ? '3px solid #ffffff' : '2px solid transparent',
                      boxShadow: selectedColor.name === c.name ? '0 0 12px ' + c.hex : 'none',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white', display: 'block', marginBottom: '8px' }}>
                Select Cut Dimension / Pack:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSizeIndex(idx)}
                    style={{
                      background: selectedSizeIndex === idx ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedSizeIndex === idx ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      color: selectedSizeIndex === idx ? 'var(--text-gold)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Pricing */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Price</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-gold)' }}>
                  ₹{totalPrice}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-full)', padding: '4px 8px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', color: 'white', width: '28px', height: '28px', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontWeight: 800, width: '24px', textAlign: 'center' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', color: 'white', width: '28px', height: '28px', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={handleAddToCart} className="btn-primary" style={{ justifyContent: 'center' }}>
                {added ? <><Check size={18} /> Added to Shopping Cart!</> : <><ShoppingBag size={18} /> Add to Cart (₹{totalPrice})</>}
              </button>

              <button onClick={handleWhatsAppInquiry} className="btn-whatsapp" style={{ justifyContent: 'center' }}>
                <PhoneCall size={18} /> Quick Order / Inquiry on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
