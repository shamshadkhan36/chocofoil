import React, { useState } from 'react';
import { X, Award, CheckCircle, Package, Send, PhoneCall } from 'lucide-react';

export default function WholesaleModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    requestType: 'sample-book', // sample-book or custom-rolls
    estimatedMonthlyQty: '1000-5000',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
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
          maxWidth: '620px',
          width: '100%',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.08)', border: 'none', color: 'white', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={24} color="#120b08" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Wholesale & Sample Kit Request</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Get a physical foil swatch book or custom bulk size quotation.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                  Business / Chocolatier Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Royal Confectionery Co."
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                    Contact Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contact person"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                    Phone / WhatsApp *
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                  What do you need?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, requestType: 'sample-book' })}
                    style={{
                      background: formData.requestType === 'sample-book' ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: formData.requestType === 'sample-book' ? '2px solid var(--text-gold)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      color: formData.requestType === 'sample-book' ? 'var(--text-gold)' : 'white',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    📦 Sample Swatch Book
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, requestType: 'custom-rolls' })}
                    style={{
                      background: formData.requestType === 'custom-rolls' ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: formData.requestType === 'custom-rolls' ? '2px solid var(--text-gold)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      color: formData.requestType === 'custom-rolls' ? 'var(--text-gold)' : 'white',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    ⚙️ Custom Rolls / Cuts Quote
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                  Special Customization Notes (Optional)
                </label>
                <textarea 
                  rows={3}
                  placeholder="Specify custom sheet sizes (e.g., 20x20 cm), logo embossing, or monthly volume requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none', resize: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                <Send size={16} /> Request Sample Kit & Wholesale Price List
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              Request Received!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Our wholesale packaging expert will reach out to <strong>{formData.phone}</strong> shortly with your sample kit details.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
