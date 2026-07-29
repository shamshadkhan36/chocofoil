import React, { useState } from 'react';
import { useDesignerStore } from '../../store/useDesignerStore';
import { 
  X, Shield, Plus, Trash2, Save, Layers, Palette, Grid, 
  Sparkles, DollarSign, Download, Check, FileJson, Package
} from 'lucide-react';

export default function AdminPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeAdminTab, setActiveAdminTab] = useState('shapes');

  const {
    adminShapes,
    addAdminShape,
    adminColors,
    addAdminColor,
    adminTextures,
    addAdminTexture,
    adminPatterns,
    addAdminPattern,
    basePricePer100
  } = useDesignerStore();

  // Form states for creating new items
  const [newShapeName, setNewShapeName] = useState('');
  const [newShapeIcon, setNewShapeIcon] = useState('⭐');
  const [newShapePath, setNewShapePath] = useState('');

  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#D4AF37');
  const [newColorMultiplier, setNewColorMultiplier] = useState(1.1);

  const [newTextureName, setNewTextureName] = useState('');
  const [newTexturePrice, setNewTexturePrice] = useState(30);

  const [savedSuccess, setSavedSuccess] = useState('');

  const handleCreateShape = (e) => {
    e.preventDefault();
    if (!newShapeName) return;
    addAdminShape({
      id: 'custom_shape_' + Date.now(),
      name: newShapeName,
      icon: newShapeIcon || '⭐',
      path: newShapePath || 'M 100,0 L 200,100 L 100,200 L 0,100 Z',
      ratio: 1
    });
    setNewShapeName('');
    setNewShapePath('');
    setSavedSuccess('New shape template created!');
    setTimeout(() => setSavedSuccess(''), 2000);
  };

  const handleCreateColor = (e) => {
    e.preventDefault();
    if (!newColorName) return;
    addAdminColor({
      id: 'custom_color_' + Date.now(),
      name: newColorName,
      hex: newColorHex,
      gradient: `linear-gradient(135deg, ${newColorHex} 0%, #1a1a1a 100%)`,
      metallicType: 'custom',
      multiplier: parseFloat(newColorMultiplier)
    });
    setNewColorName('');
    setSavedSuccess('New metallic swatch created!');
    setTimeout(() => setSavedSuccess(''), 2000);
  };

  const handleCreateTexture = (e) => {
    e.preventDefault();
    if (!newTextureName) return;
    addAdminTexture({
      id: 'custom_texture_' + Date.now(),
      name: newTextureName,
      patternType: 'dots',
      price: parseInt(newTexturePrice)
    });
    setNewTextureName('');
    setSavedSuccess('New embossing texture created!');
    setTimeout(() => setSavedSuccess(''), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 600,
      background: 'rgba(10, 6, 4, 0.88)',
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
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '32px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 40px rgba(243, 198, 76, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={24} color="var(--text-gold)" />
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>ChocoWrap Admin Config Portal</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Manage Shapes, Patterns, Textures, Foils & Pricing Rules without code edits.
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {savedSuccess && (
          <div style={{ padding: '10px 16px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.88rem', fontWeight: 700 }}>
            <Check size={16} style={{ display: 'inline', marginRight: 6 }} /> {savedSuccess}
          </div>
        )}

        {/* Admin Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
          {[
            { id: 'shapes', label: 'Shapes (SVG)', icon: Layers },
            { id: 'colors', label: 'Metallic Foils', icon: Palette },
            { id: 'textures', label: 'Embossing', icon: Grid },
            { id: 'pricing', label: 'Pricing Rules', icon: DollarSign }
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveAdminTab(t.id)}
                style={{
                  background: activeAdminTab === t.id ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                  color: activeAdminTab === t.id ? '#120b08' : 'white',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SHAPES */}
        {activeAdminTab === 'shapes' && (
          <div>
            <h4 style={{ color: 'var(--text-gold)', marginBottom: '12px' }}>Existing Mold Shapes ({adminShapes.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {adminShapes.map(s => (
                <div key={s.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {s.id}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateShape} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(243, 198, 76, 0.2)' }}>
              <h5 style={{ color: 'white', marginBottom: '10px' }}>Upload / Add New Shape Mask Template</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '10px', marginBottom: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Shape Name (e.g. Hexagon Box)" 
                  value={newShapeName} 
                  onChange={e => setNewShapeName(e.target.value)} 
                  style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', outline: 'none' }}
                />
                <input 
                  type="text" 
                  placeholder="Emoji" 
                  value={newShapeIcon} 
                  onChange={e => setNewShapeIcon(e.target.value)} 
                  style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}
                />
              </div>
              <textarea 
                placeholder="SVG Path Data d='M 100,0 L 200,100...'" 
                value={newShapePath} 
                onChange={e => setNewShapePath(e.target.value)} 
                rows="2"
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)', outline: 'none', marginBottom: '10px' }}
              />
              <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                <Plus size={14} /> Add Shape Template
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: FOILS */}
        {activeAdminTab === 'colors' && (
          <div>
            <h4 style={{ color: 'var(--text-gold)', marginBottom: '12px' }}>Metallic Foil Swatches ({adminColors.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {adminColors.map(c => (
                <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: c.gradient, display: 'inline-block' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{c.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-gold)' }}>Multiplier: {c.multiplier}x</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateColor} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(243, 198, 76, 0.2)' }}>
              <h5 style={{ color: 'white', marginBottom: '10px' }}>Add New Foil Metallic Swatch</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 100px', gap: '10px', marginBottom: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Color Name (e.g. Platinum Titanium)" 
                  value={newColorName} 
                  onChange={e => setNewColorName(e.target.value)} 
                  style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                />
                <input 
                  type="color" 
                  value={newColorHex} 
                  onChange={e => setNewColorHex(e.target.value)} 
                  style={{ width: '100%', height: '36px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input 
                  type="number" 
                  step="0.05"
                  placeholder="Mult" 
                  value={newColorMultiplier} 
                  onChange={e => setNewColorMultiplier(e.target.value)} 
                  style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                <Plus size={14} /> Add Foil Swatch
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: TEXTURES */}
        {activeAdminTab === 'textures' && (
          <div>
            <h4 style={{ color: 'var(--text-gold)', marginBottom: '12px' }}>Embossing & Texture Presets ({adminTextures.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {adminTextures.map(t => (
                <div key={t.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{t.name}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700 }}>+₹{t.price}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleCreateTexture} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(243, 198, 76, 0.2)' }}>
              <h5 style={{ color: 'white', marginBottom: '10px' }}>Add New Texture Preset</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '10px', marginBottom: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Texture Name (e.g. Velvet Micro-Pebble)" 
                  value={newTextureName} 
                  onChange={e => setNewTextureName(e.target.value)} 
                  style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                />
                <input 
                  type="number" 
                  placeholder="Price Addon" 
                  value={newTexturePrice} 
                  onChange={e => setNewTexturePrice(e.target.value)} 
                  style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
                <Plus size={14} /> Add Texture Preset
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PRICING RULES */}
        {activeAdminTab === 'pricing' && (
          <div>
            <h4 style={{ color: 'var(--text-gold)', marginBottom: '12px' }}>Base Pricing & Slab Rules</h4>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '14px' }}>
                <strong style={{ color: 'white' }}>Base Rate per 100 Sheets:</strong> ₹{basePricePer100}
              </div>
              <div style={{ marginBottom: '14px' }}>
                <strong style={{ color: 'white' }}>Rush Processing Surcharge:</strong> +20% Express Air Dispatch
              </div>
              <div>
                <strong style={{ color: 'white' }}>Wholesale Slab Discounts:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', color: 'var(--text-muted)' }}>
                  <li>500 Sheets: 20% discount</li>
                  <li>1,000 Sheets: 28% discount</li>
                  <li>5,000+ Sheets: 36% bulk enterprise discount</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
