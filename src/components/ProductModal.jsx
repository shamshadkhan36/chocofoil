import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Check, Sparkles, PhoneCall, Award, Layers, Type, Upload, Palette } from 'lucide-react';
import { useDesignerStore } from '../store/useDesignerStore';

export default function ProductModal({ product, onClose, onAddToCart, onCustomize }) {
  if (!product) return null;

  const { setActiveProduct, addElement } = useDesignerStore();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard Gold', hex: '#d4af37' });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Quick In-Modal Customization Fields
  const [customText, setCustomText] = useState('');
  const [uploadedLogo, setUploadedLogo] = useState(null);

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
    }
  }, [product]);

  const sizeMultipliers = [1, 2.2, 4.0, 6.5];
  const unitPrice = Math.round(product.price * (sizeMultipliers[selectedSizeIndex] || 1));
  const totalPrice = unitPrice * quantity + (customText || uploadedLogo ? 50 : 0);

  // Detect mold shape name for badge
  const titleLower = `${product.name} ${product.categoryLabel}`.toLowerCase();
  let moldShapeName = 'Square Praline';
  let moldShapeIcon = '⬛';
  if (titleLower.includes('heart')) { moldShapeName = 'Heart Mold'; moldShapeIcon = '❤️'; }
  else if (titleLower.includes('bar') || titleLower.includes('slab')) { moldShapeName = 'Bar Rectangle'; moldShapeIcon = '🍫'; }
  else if (titleLower.includes('truffle') || titleLower.includes('football')) { moldShapeName = 'Sphere Truffle'; moldShapeIcon = '🔴'; }
  else if (titleLower.includes('star')) { moldShapeName = 'Royale Star'; moldShapeIcon = '⭐'; }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize: product.sizes[selectedSizeIndex],
      selectedColor: selectedColor.name,
      quantity: quantity,
      price: unitPrice,
      customText: customText,
      uploadedLogo: uploadedLogo
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleLaunchFullStudio = () => {
    if (customText) {
      addElement({
        type: 'text',
        text: customText,
        color: '#ffffff',
        fontSize: 26,
        isBold: true,
        x: 80,
        y: 120
      });
    }
    if (uploadedLogo) {
      addElement({
        type: 'image',
        src: uploadedLogo,
        width: 100,
        height: 100,
        x: 100,
        y: 80
      });
    }
    if (onCustomize) {
      onCustomize(product);
      onClose();
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello ChocoWrap! I am interested in inquiring about:\n` +
      `Product: ${product.name}\n` +
      `Mold Shape: ${moldShapeName}\n` +
      `Custom Text: ${customText || 'None'}\n` +
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
      background: 'rgba(10, 6, 4, 0.88)',
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
          maxWidth: '960px',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px'
        }}>
          {/* Left Column: Image Display with Live Text Overlay */}
          <div>
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(243, 198, 76, 0.3)',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <img 
                src={product.image} 
                alt={product.name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />

              {/* Live Overlay of Customizer Text or Logo */}
              {(customText || uploadedLogo) && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(18, 11, 8, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--text-gold)',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)'
                }}>
                  {uploadedLogo && (
                    <img src={uploadedLogo} alt="Logo" style={{ maxHeight: '50px', margin: '0 auto 6px', display: 'block' }} />
                  )}
                  {customText && (
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-gold)', fontFamily: 'Playfair Display, serif' }}>
                      {customText}
                    </div>
                  )}
                </div>
              )}

              {/* Floating Customizer Badge over Image */}
              <button
                onClick={handleLaunchFullStudio}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(18, 11, 8, 0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--text-gold)',
                  color: 'var(--text-gold)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
                }}
              >
                <Sparkles size={16} /> Open Full 3D Studio Canvas
              </button>
            </div>

            {/* Badges Bar */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-tag badge-gold">
                {moldShapeIcon} {moldShapeName} Vector Mask
              </span>
              <span className="badge-tag badge-emerald">
                <Layers size={12} style={{ marginRight: 4 }} /> {product.thickness}
              </span>
              <span className="badge-tag badge-ruby">
                <ShieldCheck size={12} style={{ marginRight: 4 }} /> FDA Food Safe
              </span>
            </div>
          </div>

          {/* Right Column: Details & Quick In-Modal Customizer */}
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

            {/* QUICK IN-MODAL CUSTOMIZATION SECTION */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(243, 198, 76, 0.15) 0%, rgba(34, 22, 17, 0.95) 100%)',
              border: '1px solid var(--text-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '20px',
              boxShadow: '0 0 20px rgba(243, 198, 76, 0.15)'
            }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-gold)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={16} /> Customize This Specific Product
              </div>

              {/* 1. Add Custom Text */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', color: 'white', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Add Brand Name / Event Message to Foil:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Happy Anniversary / ChocoBrand" 
                  value={customText} 
                  onChange={(e) => setCustomText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(243, 198, 76, 0.4)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* 2. Upload Brand Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <label style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px dashed var(--text-gold)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  <Upload size={14} color="var(--text-gold)" />
                  {uploadedLogo ? 'Logo Uploaded ✓' : 'Upload Logo (PNG/SVG)'}
                  <input type="file" accept="image/*,.svg" onChange={handleLogoUpload} style={{ display: 'none' }} />
                </label>

                <button
                  onClick={handleLaunchFullStudio}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Full Canvas Studio &gt;
                </button>
              </div>
            </div>

            {/* Color Swatch Picker */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white', display: 'block', marginBottom: '8px' }}>
                Select Metallic Color: <span style={{ color: 'var(--text-gold)' }}>{selectedColor.name}</span>
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
            <div style={{ marginBottom: '16px' }}>
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
              marginBottom: '20px',
              paddingTop: '14px',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleAddToCart} 
                className="btn-primary" 
                style={{ 
                  justifyContent: 'center', 
                  padding: '14px',
                  fontSize: '0.95rem',
                  boxShadow: '0 0 25px rgba(243, 198, 76, 0.4)'
                }}
              >
                {added ? <><Check size={18} /> Added Customized Order to Cart!</> : <><ShoppingBag size={18} /> Order Customized Foil (₹{totalPrice})</>}
              </button>

              <button onClick={handleLaunchFullStudio} className="btn-secondary" style={{ justifyContent: 'center' }}>
                <Sparkles size={18} color="var(--text-gold)" /> Open Full Canva-Style 3D Studio Canvas
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
