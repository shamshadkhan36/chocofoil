import React, { useState } from 'react';
import { useDesignerStore } from '../../store/useDesignerStore';
import { exportCanvasAsImage, generatePdfProof, triggerConfetti } from '../../utils/exportHelpers';
import { 
  ShoppingBag, Bookmark, Download, FileText, Check, 
  Sparkles, ShieldCheck, Truck, RefreshCw
} from 'lucide-react';

export default function RightPanel({ onAddToCartCustom, previewElementRef }) {
  const {
    selectedShape,
    selectedColor,
    selectedTexture,
    selectedPattern,
    elements,
    quantity,
    rushOrder,
    customNotes,
    calculatePrice,
    saveCurrentDesign
  } = useDesignerStore();

  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const finalPrice = calculatePrice();
  const unitPrice = (finalPrice / quantity).toFixed(2);

  // Add to Cart Action
  const handleAddToCart = async () => {
    let previewImg = '';
    if (previewElementRef?.current) {
      previewImg = await exportCanvasAsImage(previewElementRef.current, 'thumbnail.png');
    }

    const customCartItem = {
      id: `custom_foil_${Date.now()}`,
      name: `Custom ${selectedColor.name} (${selectedShape.name})`,
      categoryLabel: 'Custom Foil Design',
      image: previewImg || '/products/line-embossed.jpeg',
      price: finalPrice,
      selectedColor: selectedColor.name,
      selectedShape: selectedShape.name,
      selectedTexture: selectedTexture.name,
      selectedPattern: selectedPattern.name,
      selectedSize: `${quantity} Sheets Pack`,
      quantity: 1,
      isCustomDesign: true,
      customSpec: {
        shape: selectedShape,
        color: selectedColor,
        texture: selectedTexture,
        pattern: selectedPattern,
        elementsCount: elements.length,
        notes: customNotes,
        quantity: quantity
      }
    };

    onAddToCartCustom(customCartItem);
    setAdded(true);
    triggerConfetti();
    setTimeout(() => setAdded(false), 2000);
  };

  // Save Design
  const handleSave = () => {
    saveCurrentDesign(`My ${selectedColor.name} ${selectedShape.name} Design`);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Download PNG Preview
  const handleDownloadPng = async () => {
    if (!previewElementRef?.current) return;
    setExporting(true);
    await exportCanvasAsImage(previewElementRef.current, `ChocoWrap_${selectedColor.name}_${selectedShape.name}.png`);
    setExporting(false);
  };

  // Download PDF Proof
  const handleDownloadPdf = async () => {
    setExporting(true);
    await generatePdfProof(useDesignerStore.getState(), previewElementRef?.current);
    setExporting(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      background: '#160d09',
      borderLeft: '1px solid var(--border-glass)',
      padding: '24px 20px',
      overflowY: 'auto',
      gap: '20px'
    }}>
      {/* Header Title */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-gold)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Sparkles size={14} /> Live Spec Summary
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>Order & Pricing Breakdown</h3>
      </div>

      {/* Specifications Card */}
      <div style={{
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Mold Shape:</span>
          <strong style={{ color: 'white' }}>{selectedShape.name}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)' }}>Foil Metallic Color:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: selectedColor.gradient, display: 'inline-block' }} />
            <strong style={{ color: 'var(--text-gold)' }}>{selectedColor.name}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Texture Embossing:</span>
          <strong style={{ color: 'white' }}>{selectedTexture.name}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Tiling Pattern:</span>
          <strong style={{ color: 'white' }}>{selectedPattern.name}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Artwork Layers:</span>
          <strong style={{ color: 'white' }}>{elements.length} layer(s)</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Order Quantity:</span>
          <strong style={{ color: 'var(--text-gold)' }}>{quantity} Sheets</strong>
        </div>

        {rushOrder && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ff4d6d', fontWeight: 700 }}>
            <span>Processing Speed:</span>
            <span>Priority Rush Dispatch</span>
          </div>
        )}
      </div>

      {/* Animated Pricing Counter Box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(243, 198, 76, 0.12) 0%, rgba(34, 22, 17, 0.9) 100%)',
        border: '1px solid var(--border-glow)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Estimated Total (Tax Included)
        </div>
        
        <div style={{
          fontSize: '2.4rem',
          fontWeight: 900,
          color: 'var(--text-gold)',
          margin: '4px 0',
          letterSpacing: '-0.02em',
          transition: 'all 0.3s ease'
        }}>
          ₹{finalPrice.toLocaleString('en-IN')}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          ≈ ₹{unitPrice} per sheet sheet cost
        </div>
      </div>

      {/* Action Buttons Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem' }}
        >
          {added ? <><Check size={18} /> Added Custom Design to Cart!</> : <><ShoppingBag size={18} /> Add Custom Design to Cart</>}
        </button>

        <button
          onClick={handleSave}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.85rem' }}
        >
          {saved ? <><Check size={16} /> Saved to Local Studio</> : <><Bookmark size={16} /> Save Design for Later</>}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <button
            onClick={handleDownloadPng}
            disabled={exporting}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              color: 'white',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} color="var(--text-gold)" /> Download PNG
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={exporting}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              color: 'white',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} color="var(--text-gold)" /> PDF Proof
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '14px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={14} color="#10b981" /> Food Safe</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Truck size={14} color="#60a5fa" /> India Express</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><RefreshCw size={14} color="var(--text-gold)" /> Soft Deadfold</span>
      </div>
    </div>
  );
}
