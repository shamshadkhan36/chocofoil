import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onClearCart }) {
  if (!isOpen || !checkoutData) return null;

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address) {
      alert('Please fill out all required delivery fields.');
      return;
    }
    const generatedId = 'CW-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
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
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
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

        {!orderComplete ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Truck size={24} color="var(--text-gold)" />
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Complete Your Order</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Enter your delivery details to dispatch your chocolate foils.</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Master Chocolatier Ramesh"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                    Pincode *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 400001"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '6px' }}>
                  Delivery Address *
                </label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Street, Bakery Name, Landmark, City"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(243, 198, 76, 0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'white', outline: 'none', resize: 'none' }}
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-gold)', display: 'block', marginBottom: '8px' }}>
                  Select Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { id: 'upi', name: 'UPI / GPay' },
                    { id: 'card', name: 'Credit/Debit Card' },
                    { id: 'cod', name: 'Cash on Delivery' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: method.id })}
                      style={{
                        background: form.paymentMethod === method.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255,255,255,0.04)',
                        border: form.paymentMethod === method.id ? '2px solid var(--text-gold)' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px',
                        color: form.paymentMethod === method.id ? 'var(--text-gold)' : 'var(--text-muted)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary Box */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Amount Payable</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-gold)' }}>₹{checkoutData.grandTotal}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                  <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  Secure 256-bit Encrypted
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Confirm & Place Order (₹{checkoutData.grandTotal})
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={36} color="#10b981" />
            </div>

            <div style={{ color: 'var(--text-gold)', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              <Sparkles size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Order Successfully Confirmed!
            </div>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Thank You, {form.fullName}!
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Your order ID is <strong style={{ color: 'var(--text-gold)' }}>{orderId}</strong>. We are preparing your foil wrappers for express dispatch.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Delivery Address:</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{form.address}, {form.pincode}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Contact: {form.phone}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-gold)', marginTop: '8px', fontWeight: 700 }}>Total Paid: ₹{checkoutData.grandTotal}</div>
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
