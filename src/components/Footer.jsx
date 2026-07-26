import React, { useState } from 'react';
import { ShieldCheck, Sparkles, ChevronDown, ChevronUp, Phone, Mail, MapPin, Award } from 'lucide-react';

const FAQS = [
  {
    q: "Are your aluminum foils 100% food grade safe for direct contact with chocolate?",
    a: "Yes! All ChocoWrap foils are manufactured from premium 100% virgin food-grade aluminum foil compliant with FDA and FSSAI international safety standards. They are completely odorless, non-toxic, and safe for direct wrapping of dark, milk, and white chocolates."
  },
  {
    q: "What sheet size should I order for standard chocolate truffles or pralines?",
    a: "For standard round truffles (2-3 cm diameter), our 8x8 cm or 10x10 cm square sheets are ideal. For larger artisanal truffles or heart-shaped molds, 10x10 cm or 12x12 cm provides full coverage."
  },
  {
    q: "Do I need tape or glue to seal the wrapped chocolates?",
    a: "No tape needed! Our foils feature specialized ultra-soft 'deadfold' memory technology. When you fold or twist the foil around your chocolate, it holds its shape securely without springing open."
  },
  {
    q: "Can I request custom sizes, custom logo embossing, or wholesale rolls?",
    a: "Absolutely! We supply artisan bakeries, chocolatiers, and corporate gift manufacturers. Click the 'Wholesale & Samples' button at the top to request custom roll dimensions or bespoke logo embossing."
  }
];

export default function Footer({ onOpenWholesale }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #120b08 0%, #0a0604 100%)',
      borderTop: '1px solid rgba(243, 198, 76, 0.15)',
      paddingTop: '60px',
      color: 'var(--text-muted)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Trust Badges Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          padding: '30px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(243, 198, 76, 0.15)',
          marginBottom: '60px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <ShieldCheck size={32} color="var(--text-gold)" />
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.94rem' }}>100% Food Grade</div>
              <div style={{ fontSize: '0.78rem' }}>FDA & FSSAI Compliant Pure Aluminum</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Award size={32} color="#34d399" />
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.94rem' }}>Deadfold Memory</div>
              <div style={{ fontSize: '0.78rem' }}>Stays folded cleanly without springing</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Sparkles size={32} color="#f472b6" />
            <div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.94rem' }}>Vibrant Patterns</div>
              <div style={{ fontSize: '0.78rem' }}>Line, 3D, Damask & Floral Embossed</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>
              Frequently Asked <span className="gold-text">Questions</span>
            </h3>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {faq.q}
                  {openFaq === index ? <ChevronUp size={18} color="var(--text-gold)" /> : <ChevronDown size={18} />}
                </button>

                {openFaq === index && (
                  <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-muted)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '50px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-gold)', marginBottom: '12px' }}>
              CHOCOWRAP
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '16px' }}>
              India's premier manufacturer and supplier of luxury food-grade aluminum wrapping foils for artisanal chocolates, truffles, pralines, and bakery treats.
            </p>
            <button onClick={onOpenWholesale} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Request Wholesale Catalog
            </button>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Foil Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
              <li>Line Embossed Foils</li>
              <li>3D Holographic Prism Foils</li>
              <li>Royal Damask & Mandala Wraps</li>
              <li>Floral Vintage Embossed Sheets</li>
              <li>Special Occasion (Hearts & Football)</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Customer Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--text-gold)" /> +91 98765 43210
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--text-gold)" /> support@chocowrap.in
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--text-gold)" /> Industrial Packaging Hub, India
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ padding: '24px 0', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          © {new Date().getFullYear()} ChocoWrap Luxury Foils. All product images copyright of ChocoWrap. Crafted for excellence.
        </div>
      </div>
    </footer>
  );
}
