import React, { useState } from 'react';
import { useDesignerStore } from '../../store/useDesignerStore';
import { 
  Shapes, Palette, Grid, Image, Type, Layers, Package, 
  Upload, Plus, Trash2, ArrowUp, ArrowDown, Lock, Eye, 
  Sparkles, Check, Sliders, FileText, ChevronRight
} from 'lucide-react';

const FONTS = [
  { name: 'Outfit (Modern)', value: 'Outfit, sans-serif' },
  { name: 'Playfair Display (Luxury Serif)', value: 'Playfair Display, serif' },
  { name: 'Great Vibes (Elegant Script)', value: 'Great Vibes, cursive' },
  { name: 'Cinzel (Royal Vintage)', value: 'Cinzel, serif' },
  { name: 'Plus Jakarta Sans (Clean)', value: 'Plus Jakarta Sans, sans-serif' }
];

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState('shapes');
  const [textInput, setTextInput] = useState('YOUR BRAND');
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(28);

  const {
    adminShapes,
    selectedShape,
    setSelectedShape,
    adminColors,
    selectedColor,
    setSelectedColor,
    adminTextures,
    selectedTexture,
    setSelectedTexture,
    adminPatterns,
    selectedPattern,
    setSelectedPattern,
    patternScale,
    setPatternScale,
    patternOpacity,
    setPatternOpacity,
    addElement,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    reorderLayer,
    quantity,
    setQuantity,
    rushOrder,
    setRushOrder,
    customNotes,
    setCustomNotes
  } = useDesignerStore();

  // Handle Logo Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addElement({
          type: 'image',
          name: file.name,
          src: event.target.result,
          width: 120,
          height: 120,
          x: 90,
          y: 90
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add Text
  const handleAddText = () => {
    if (!textInput.trim()) return;
    addElement({
      type: 'text',
      text: textInput,
      font: selectedFont,
      color: textColor,
      fontSize: fontSize,
      isBold: true,
      x: 70,
      y: 130
    });
    setTextInput('');
  };

  const tabs = [
    { id: 'shapes', label: 'Shapes', icon: Shapes },
    { id: 'colors', label: 'Foils', icon: Palette },
    { id: 'textures', label: 'Textures', icon: Grid },
    { id: 'patterns', label: 'Patterns', icon: Sparkles },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'layers', label: 'Layers', icon: Layers },
    { id: 'quantity', label: 'Quantity', icon: Package }
  ];

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      background: '#160d09',
      borderRight: '1px solid var(--border-glass)',
      overflow: 'hidden'
    }}>
      {/* Icon Navigation Column */}
      <div style={{
        width: '76px',
        background: '#100906',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 0',
        gap: '8px',
        borderRight: '1px solid rgba(255,255,255,0.06)'
      }}>
        {tabs.map((t) => {
          const IconComponent = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                width: '60px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'rgba(243, 198, 76, 0.15)' : 'transparent',
                border: isActive ? '1px solid var(--text-gold)' : 'none',
                color: isActive ? 'var(--text-gold)' : 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <IconComponent size={18} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Panel */}
      <div style={{
        flex: 1,
        padding: '24px 20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* 1. SHAPES TAB */}
        {activeTab === 'shapes' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Select Chocolate Shape</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Choose your chocolate mold geometry. The metallic foil will wrap to this precise vector mask.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {adminShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(shape)}
                  style={{
                    background: selectedShape.id === shape.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedShape.id === shape.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 10px',
                    color: selectedShape.id === shape.id ? 'var(--text-gold)' : 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '1.6rem' }}>{shape.icon}</span>
                  {shape.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. FOIL COLORS TAB */}
        {activeTab === 'colors' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Metallic Foil Swatches</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Premium food-safe metallic foil colors with high deadfold memory.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {adminColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    background: selectedColor.id === color.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedColor.id === color.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: color.gradient,
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    display: 'inline-block',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: selectedColor.id === color.id ? 'var(--text-gold)' : 'white' }}>
                      {color.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {color.multiplier > 1.0 ? `+${Math.round((color.multiplier - 1) * 100)}% premium` : 'Standard rate'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. TEXTURES TAB */}
        {activeTab === 'textures' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Embossing & Texture</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              3D pressed textures that catch light and enhance tactile luxury.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px' }}>
              {adminTextures.map((texture) => (
                <button
                  key={texture.id}
                  onClick={() => setSelectedTexture(texture)}
                  style={{
                    background: selectedTexture.id === texture.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedTexture.id === texture.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Grid size={18} color="var(--text-gold)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: selectedTexture.id === texture.id ? 'var(--text-gold)' : 'white' }}>
                      {texture.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700 }}>
                    {texture.price > 0 ? `+₹${texture.price}` : 'Free'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. PATTERNS TAB */}
        {activeTab === 'patterns' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Tiling Patterns</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Auto-tiling decorative motifs printed across the foil wrapper.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {adminPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  style={{
                    background: selectedPattern.id === pattern.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedPattern.id === pattern.id ? '2px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    textAlign: 'left',
                    color: selectedPattern.id === pattern.id ? 'var(--text-gold)' : 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {pattern.name}
                </button>
              ))}
            </div>

            {selectedPattern.id !== 'none' && (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Pattern Scale: {patternScale.toFixed(1)}x
                </label>
                <input 
                  type="range" 
                  min="0.4" 
                  max="2.5" 
                  step="0.1" 
                  value={patternScale} 
                  onChange={(e) => setPatternScale(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--text-gold)', marginBottom: '12px' }}
                />

                <label style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Pattern Opacity: {Math.round(patternOpacity * 100)}%
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.05" 
                  value={patternOpacity} 
                  onChange={(e) => setPatternOpacity(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--text-gold)' }}
                />
              </div>
            )}
          </div>
        )}

        {/* 5. UPLOAD TAB */}
        {activeTab === 'upload' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Upload Brand Artwork</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Upload your company logo, monogram, or custom vector graphics (PNG, SVG, PDF).
            </p>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px 16px',
              border: '2px dashed var(--text-gold)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(243, 198, 76, 0.04)',
              cursor: 'pointer',
              marginBottom: '20px'
            }}>
              <Upload size={32} color="var(--text-gold)" style={{ marginBottom: '10px' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>Click to Upload File</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, SVG, JPEG up to 10MB</span>
              <input type="file" accept="image/*,.svg" onChange={handleLogoUpload} style={{ display: 'none' }} />
            </label>
          </div>
        )}

        {/* 6. TEXT STUDIO TAB */}
        {activeTab === 'text' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Text Studio</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Add personalized names, event dates, messages, or brand slogans.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Enter text (e.g. Happy Birthday)" 
                value={textInput} 
                onChange={(e) => setTextInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(243, 198, 76, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'white',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Typography Font:</label>
                <select 
                  value={selectedFont} 
                  onChange={(e) => setSelectedFont(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#1a100c',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    fontSize: '0.82rem'
                  }}
                >
                  {FONTS.map(f => (
                    <option key={f.value} value={f.value}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Text Color & Size:</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: '40px', height: '36px', border: 'none', background: 'none', cursor: 'pointer' }} 
                  />
                  <input 
                    type="range" 
                    min="14" 
                    max="60" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--text-gold)' }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 700 }}>{fontSize}px</span>
                </div>
              </div>

              <button 
                onClick={handleAddText} 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                <Plus size={16} /> Add Text Layer to Foil
              </button>
            </div>
          </div>
        )}

        {/* 7. LAYERS MANAGER TAB */}
        {activeTab === 'layers' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Layers Manager</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Re-order, hide, lock, or delete individual design elements.
            </p>

            {elements.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {elements.map((el, idx) => (
                  <div 
                    key={el.id}
                    onClick={() => setSelectedElementId(el.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: selectedElementId === el.id ? 'rgba(243, 198, 76, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedElementId === el.id ? '1px solid var(--text-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {el.type === 'text' ? <Type size={16} color="var(--text-gold)" /> : <Image size={16} color="#60a5fa" />}
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>
                        {el.type === 'text' ? `Text: "${el.text}"` : (el.name || 'Image Layer')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={(e) => { e.stopPropagation(); reorderLayer(el.id, 'up'); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowUp size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); reorderLayer(el.id, 'down'); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowDown size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }} style={{ background: 'none', border: 'none', color: '#ff4d6d', cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                No custom artwork or text layers added yet. Use the Upload or Text tab to add elements!
              </div>
            )}
          </div>
        )}

        {/* 8. QUANTITY & SPECS TAB */}
        {activeTab === 'quantity' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>Order Quantity & Notes</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Select sheet count. Higher quantities automatically unlock wholesale discounts!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[100, 250, 500, 1000, 5000].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  style={{
                    background: quantity === qty ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.04)',
                    color: quantity === qty ? '#120b08' : 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    border: quantity === qty ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {qty} Sheets
                </button>
              ))}
            </div>

            <label style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              Custom Sheet Quantity: {quantity}
            </label>
            <input 
              type="range" 
              min="50" 
              max="5000" 
              step="50" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--text-gold)', marginBottom: '16px' }}
            />

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              marginBottom: '16px'
            }}>
              <input 
                type="checkbox" 
                checked={rushOrder} 
                onChange={(e) => setRushOrder(e.target.checked)} 
                style={{ width: '16px', height: '16px', accentColor: 'var(--text-gold)' }}
              />
              <span style={{ fontSize: '0.82rem', color: 'white', fontWeight: 700 }}>Rush Processing (+20% Express Air Dispatch)</span>
            </label>

            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Custom Production Notes / Instruction:
            </label>
            <textarea
              rows="3"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Gold foil embossing on front, extra soft deadfold..."
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-sm)',
                color: 'white',
                fontSize: '0.82rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
