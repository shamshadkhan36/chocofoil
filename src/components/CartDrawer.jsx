import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, PhoneCall, Check } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 70;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CHOCO10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert('Invalid coupon code. Try CHOCO10 for 10% off!');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    let message = `🛒 *New Order Inquiry from ChocoWrap Website*\n\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Size: ${item.selectedSize || 'Standard'}\n`;
      message += `   • Color: ${item.selectedColor || 'Gold'}\n`;
      message += `   • Qty: ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}\n\n`;
    });
    message += `Subtotal: ₹${subtotal}\n`;
    if (discountAmount > 0) message += `Discount (CHOCO10): -₹${discountAmount}\n`;
    message += `Shipping: ${shippingFee === 0 ? 'FREE' : '₹' + shippingFee}\n`;
    message += `*Grand Total: ₹${grandTotal}*\n\n`;
    message += `Please confirm availability and dispatch details!`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'linear-gradient(180deg, #1a100c 0%, #120b08 100%)',
          borderLeft: '1px solid var(--border-glow)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--text-gold)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Your Shopping Cart</h3>
            <span style={{
              background: 'rgba(243, 198, 76, 0.2)',
              color: 'var(--text-gold)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {cartItems.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  gap: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                        {item.name}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.selectedSize || 'Standard'} • {item.selectedColor || 'Gold'}
                      </div>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(index)}
                      style={{ background: 'none', border: 'none', color: '#ff4d6d', cursor: 'pointer', padding: '2px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-gold)' }}>
                      ₹{item.price * item.quantity}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-full)', padding: '2px 6px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '20px', height: '20px' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '20px', height: '20px' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} color="rgba(243, 198, 76, 0.3)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>Your cart is currently empty</p>
              <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>Add some luxury foil wrappers to get started!</p>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.4)'
          }}>
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder="Promo code (e.g. CHOCO10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(243, 198, 76, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
              <button 
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.78rem' }}
              >
                {promoApplied ? <Check size={14} color="#34d399" /> : 'Apply'}
              </button>
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ color: 'white' }}>₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                  <span>Discount (10% OFF)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping Fee</span>
                <span style={{ color: shippingFee === 0 ? '#34d399' : 'white' }}>
                  {shippingFee === 0 ? 'FREE (Orders > ₹999)' : '₹' + shippingFee}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-gold)', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => { onClose(); onProceedToCheckout({ cartItems, subtotal, discountAmount, shippingFee, grandTotal }); }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              <button 
                onClick={handleWhatsAppCheckout}
                className="btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <PhoneCall size={16} /> Quick Order on WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
