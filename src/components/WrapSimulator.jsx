import React, { useState } from 'react';
import { Sparkles, Eye, RefreshCw, ShoppingCart, Check } from 'lucide-react';

const SHAPES = [
  { id: 'truffle', name: 'Sphere Truffle', icon: '🔴', borderRadius: '50%' },
  { id: 'square', name: 'Square Praline', icon: '⬛', borderRadius: '12px' },
  { id: 'heart', name: 'Heart Chocolates', icon: '❤️', borderRadius: '50% 50% 50% 0' },
  { id: 'bar', name: 'Rectangular Bar', icon: '🍫', borderRadius: '8px' }
];

const TEXTURES = [
  { id: 'line', name: 'Line Embossed', pattern: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 6px)' },
  { id: 'dots', name: 'Polka Dots', pattern: 'radial-gradient(rgba(255,255,255,0.6) 20%, transparent 20%) 0 0/12px 12px' },
  { id: 'stars', name: 'Star Embossed', pattern: 'radial-gradient(rgba(255,255,255,0.8) 15%, transparent 16%) 0 0/16px 16px' },
  { id: 'checks', name: 'Gingham Checks', pattern: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0 8px, transparent 8px 16px), repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 8px, transparent 8px 16px)' },
  { id: 'damask', name: 'Damask Floral', pattern: 'radial-gradient(circle, rgba(255,255,255,0.4) 10%, transparent 11%), radial-gradient(circle, rgba(255,255,255,0.4) 10%, transparent 11%) 10px 10px' },
  { id: 'prism', name: '3D Holographic Prism', pattern: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(255,255,255,0.6) 100%)' }
];

const COLORS = [
  { id: 'gold', name: 'Metallic Gold', gradient: 'linear-gradient(135deg, #ffe082 0%, #d4af37 50%, #856404 100%)', hex: '#d4af37' },
  { id: 'ruby', name: 'Ruby Red', gradient: 'linear-gradient(135deg, #ff6b81 0%, #e60026 50%, #800014 100%)', hex: '#e60026' },
  { id: 'emerald', name: 'Emerald Green', gradient: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 50%, #044e37 100%)', hex: '#10b981' },
  { id: 'blue', name: 'Royal Blue', gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1e3a8a 100%)', hex: '#2563eb' },
  { id: 'purple', name: 'Velvet Purple', gradient: 'linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #4c1d95 100%)', hex: '#9333ea' },
  { id: 'silver', name: 'Bright Silver', gradient: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #475569 100%)', hex: '#cbd5e1' },
  { id: 'copper', name: 'Copper Bronze', gradient: 'linear-gradient(135deg, #fed7aa 0%, #f97316 50%, #7c2d12 100%)', hex: '#f97316' }
];

export default function WrapSimulator({ onAddToCartByCustomSpec }) {
  const [selectedShape, setSelectedShape] = useState(SHAPES[0]);
  const [selectedTexture, setSelectedTexture] = useState(TEXTURES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [added, setAdded] = useState(false);

  const handleAddCustom = () => {
    onAddToCartByCustomSpec({
      id: `custom-${selectedShape.id}-${selectedTexture.id}-${selectedColor.id}`,
      name: `Custom ${selectedColor.name} ${selectedTexture.name} Foil`,
      price: 380,
      image: '/products/line-embossed.jpeg',
      selectedColor: selectedColor.name,
      selectedShape: selectedShape.name,
      selectedTexture: selectedTexture.name
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="simulator" style={{
      maxWidth: '1280px',
      margin: '60px auto',
      padding: '0 24px'
    }}>
      <div className="glass-card" style={{
        padding: '40px 32px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(145deg, rgba(28, 17, 13, 0.95) 0%, rgba(15, 9, 6, 0.98) 100%)',
        border: '1px solid var(--border-glow)'
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-gold)',
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Sparkles size={16} /> Interactive Studio
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Interactive <span className="gold-text">3D Chocolate Wrap Simulator</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginTop: '6px' }}>
            Experiment with different chocolate shapes, metallic foil colors, and foil textures in real-time!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Controls Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Choose Shape */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                1. Select Chocolate Shape
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShape(shape)}
                    style={{
                      background: selectedShape.id === shape.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedShape.id === shape.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      color: selectedShape.id === shape.id ? 'var(--text-gold)' : 'white',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{shape.icon}</span> {shape.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Texture */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                2. Select Embossed Texture
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {TEXTURES.map((texture) => (
                  <button
                    key={texture.id}
                    onClick={() => setSelectedTexture(texture)}
                    style={{
                      background: selectedTexture.id === texture.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedTexture.id === texture.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 12px',
                      color: selectedTexture.id === texture.id ? 'var(--text-gold)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {texture.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Choose Metallic Color */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                3. Select Metallic Color Swatch
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: c.gradient,
                      border: selectedColor.id === c.id ? '3px solid #ffffff' : '2px solid transparent',
                      boxShadow: selectedColor.id === c.id ? '0 0 16px ' + c.hex : 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      transform: selectedColor.id === c.id ? 'scale(1.15)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive 3D Preview Canvas */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 24px',
            border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Eye size={14} color="var(--text-gold)" /> LIVE PREVIEW
            </div>

            {/* Render Simulated Wrapped Chocolate */}
            <div style={{
              width: selectedShape.id === 'bar' ? '220px' : '180px',
              height: selectedShape.id === 'bar' ? '120px' : '180px',
              borderRadius: selectedShape.borderRadius,
              background: selectedColor.gradient,
              boxShadow: `0 20px 40px rgba(0,0,0,0.8), 0 0 30px ${selectedColor.hex}44`,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: selectedShape.id === 'heart' ? 'rotate(-45deg)' : 'none',
              margin: '30px 0'
            }}>
              {/* Pattern Texture Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: selectedTexture.pattern,
                mixBlendMode: 'overlay',
                opacity: 0.85
              }} />

              {/* Shimmer Light Reflection */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'foilShimmer 4s infinite linear',
                pointerEvents: 'none'
              }} />

              <div style={{
                position: 'relative',
                zIndex: 2,
                color: 'rgba(0,0,0,0.7)',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transform: selectedShape.id === 'heart' ? 'rotate(45deg)' : 'none',
                textAlign: 'center',
                padding: '8px',
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(4px)',
                borderRadius: '8px'
              }}>
                CHOCOWRAP
              </div>
            </div>

            {/* Spec details summary */}
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>
                {selectedColor.name} - {selectedTexture.name}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Ideal for {selectedShape.name} • 100 Pack Sheets (10x10 cm)
              </div>
            </div>

            <button
              onClick={handleAddCustom}
              className="btn-primary"
              style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
            >
              {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Order Custom Specification (₹380)</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
