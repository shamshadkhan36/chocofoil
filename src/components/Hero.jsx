import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Layers, Award, Flame } from 'lucide-react';

export default function Hero({ onExploreCatalog, onOpenSimulator, onOpenWholesale }) {
  return (
    <section style={{
      position: 'relative',
      padding: '70px 24px 60px',
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
      alignItems: 'center'
    }}>
      {/* Left Text Column */}
      <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(243, 198, 76, 0.12)',
          border: '1px solid rgba(243, 198, 76, 0.3)',
          color: 'var(--text-gold)',
          fontSize: '0.84rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          <Flame size={16} /> #1 Premium Food-Grade Chocolate Foils in India
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '20px'
        }}>
          Elevate Your Chocolates into <br />
          <span className="gold-text">Vibrant Works of Art</span>
        </h1>

        <p style={{
          fontSize: '1.08rem',
          color: 'var(--text-muted)',
          marginBottom: '32px',
          maxWidth: '540px',
          lineHeight: 1.6
        }}>
          Transform ordinary truffles and bars with our exquisite <strong style={{ color: '#fff' }}>Line Embossed</strong>, <strong style={{ color: '#fff' }}>3D Holographic</strong>, <strong style={{ color: '#fff' }}>Damask</strong>, and <strong style={{ color: '#fff' }}>Floral Decorative Foils</strong>. Perfect for artisan chocolatiers, festive hampers, and luxury confectioners.
        </p>

        {/* Action CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <button onClick={onExploreCatalog} className="btn-primary">
            Explore 18+ Collections <ArrowRight size={18} />
          </button>
          <button onClick={onOpenSimulator} className="btn-secondary">
            <Sparkles size={18} color="var(--text-gold)" /> Try 3D Wrap Simulator
          </button>
        </div>

        {/* Feature Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} color="var(--text-gold)" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>100% Food Safe</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FDA & FSSAI Grade</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={24} color="#34d399" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Ultra Deadfold</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>No Tape Needed</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="#f472b6" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Bespoke Cuts</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sheets & Rolls</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Visual Card Showcase */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        animation: 'floatAnim 6s ease-in-out infinite'
      }}>
        <div className="glass-card" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          background: 'linear-gradient(145deg, rgba(40, 25, 18, 0.9) 0%, rgba(20, 12, 8, 0.95) 100%)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(243, 198, 76, 0.2)'
        }}>
          {/* Main Display Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <img 
              src="/products/WhatsApp Image 2026-07-20 at 1.59.14 PM.jpeg" 
              alt="Line Embossed Foil Collection"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(18, 11, 8, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-gold)',
              fontSize: '0.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} /> SPOTLIGHT COLLECTION
            </div>
          </div>

          {/* Mini Swatch Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                Line Embossed Metallic Foils
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Available in 9 Brilliant Metallic Jewel Colors
              </p>
            </div>
            <button 
              onClick={onExploreCatalog}
              style={{
                background: 'var(--gold-gradient)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ArrowRight size={18} color="#120b08" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
