import React, { useRef, useState, useEffect } from 'react';
import { useDesignerStore } from '../../store/useDesignerStore';
import { getTextureBackgroundStyle, getPatternBackgroundStyle } from '../../utils/textureTemplates';
import { SVG_SHAPE_TEMPLATES } from '../../utils/shapeTemplates';
import { 
  ZoomIn, ZoomOut, RotateCcw, 
  Grid, Sparkles, Box, Layers as LayersIcon, Trash2, Copy, Move, RotateCw
} from 'lucide-react';

export default function DesignerCanvas({ previewContainerRef }) {
  const {
    selectedShape,
    selectedColor,
    selectedTexture,
    selectedPattern,
    patternScale,
    patternOpacity,
    elements,
    selectedElementId,
    setSelectedElementId,
    updateElement,
    removeElement,
    duplicateElement,
    viewMode,
    setViewMode,
    canvasZoom,
    setCanvasZoom,
    gridSnap,
    setGridSnap,
    shimmerEffect,
    setShimmerEffect,
    undo,
    redo,
    historyIndex
  } = useDesignerStore();

  const [threeDRotation, setThreeDRotation] = useState({ x: 15, y: -25 });
  const [isDragging3D, setIsDragging3D] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Mouse Dragging state for elements in 2D mode
  const [draggingElementId, setDraggingElementId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Keyboard Shortcuts (Undo, Redo, Delete, Duplicate)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId) removeElement(selectedElementId);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selectedElementId) duplicateElement(selectedElementId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, undo, redo, removeElement, duplicateElement]);

  const activeShapeTemplate = SVG_SHAPE_TEMPLATES[selectedShape.id] || SVG_SHAPE_TEMPLATES.square;
  const textureStyle = getTextureBackgroundStyle(selectedTexture.patternType);
  const patternStyle = getPatternBackgroundStyle(selectedPattern.id, patternScale, patternOpacity);

  // Element Mouse Interaction Handlers
  const handleElementMouseDown = (e, el) => {
    e.stopPropagation();
    setSelectedElementId(el.id);
    setDraggingElementId(el.id);
    setDragOffset({
      x: e.clientX - el.x,
      y: e.clientY - el.y
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (draggingElementId && viewMode === '2d') {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      updateElement(draggingElementId, { x: newX, y: newY });
    } else if (isDragging3D && viewMode === '3d') {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      setThreeDRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setDraggingElementId(null);
    setIsDragging3D(false);
  };

  const handle3DMouseDown = (e) => {
    setIsDragging3D(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const selectedElem = elements.find(el => el.id === selectedElementId);

  return (
    <div 
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: '#0d0705',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-glass)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Top Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'rgba(28, 17, 13, 0.95)',
        borderBottom: '1px solid rgba(243, 198, 76, 0.15)',
        zIndex: 20
      }}>
        {/* Left Toolbar: View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setViewMode('2d')}
            style={{
              background: viewMode === '2d' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.06)',
              color: viewMode === '2d' ? '#120b08' : 'white',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LayersIcon size={14} /> Flat Foil Sheet (2D)
          </button>
          <button
            onClick={() => setViewMode('3d')}
            style={{
              background: viewMode === '3d' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.06)',
              color: viewMode === '3d' ? '#120b08' : 'white',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Box size={14} /> 3D Wrapped Mockup
          </button>
        </div>

        {/* Right Toolbar: Undo, Redo, Zoom & Shimmer Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: historyIndex > 0 ? 'white' : 'gray',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              cursor: historyIndex > 0 ? 'pointer' : 'default'
            }}
          >
            <RotateCcw size={14} />
          </button>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

          <button
            onClick={() => setCanvasZoom(canvasZoom - 0.1)}
            title="Zoom Out"
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '6px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
          >
            <ZoomOut size={14} />
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-gold)', fontWeight: 700, minWidth: '45px', textAlign: 'center' }}>
            {Math.round(canvasZoom * 100)}%
          </span>
          <button
            onClick={() => setCanvasZoom(canvasZoom + 0.1)}
            title="Zoom In"
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '6px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
          >
            <ZoomIn size={14} />
          </button>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />

          <button
            onClick={() => setGridSnap(!gridSnap)}
            title="Grid Alignment Snap"
            style={{
              background: gridSnap ? 'rgba(243, 198, 76, 0.2)' : 'rgba(255,255,255,0.05)',
              border: gridSnap ? '1px solid var(--text-gold)' : 'none',
              color: gridSnap ? 'var(--text-gold)' : 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            <Grid size={14} />
          </button>

          <button
            onClick={() => setShimmerEffect(!shimmerEffect)}
            title="Toggle Metallic Foil Light Reflection"
            style={{
              background: shimmerEffect ? 'rgba(243, 198, 76, 0.2)' : 'rgba(255,255,255,0.05)',
              border: shimmerEffect ? '1px solid var(--text-gold)' : 'none',
              color: shimmerEffect ? 'var(--text-gold)' : 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            <Sparkles size={14} />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div 
        ref={previewContainerRef}
        onClick={() => setSelectedElementId(null)}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: gridSnap ? 'radial-gradient(rgba(243, 198, 76, 0.15) 1px, transparent 1px)' : 'none',
          backgroundSize: '24px 24px',
          cursor: viewMode === '3d' ? (isDragging3D ? 'grabbing' : 'grab') : 'default'
        }}
        onMouseDown={viewMode === '3d' ? handle3DMouseDown : undefined}
      >
        {/* Selected Layer Floating Control Quickbar */}
        {selectedElementId && viewMode === '2d' && (
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(18, 11, 8, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--text-gold)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--text-gold)', fontWeight: 700 }}>Active Element</span>
            <button
              onClick={() => duplicateElement(selectedElementId)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
            >
              <Copy size={13} /> Duplicate
            </button>
            
            {selectedElem && (
              <button
                onClick={() => updateElement(selectedElementId, { rotation: (selectedElem.rotation || 0) + 45 })}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}
              >
                <RotateCw size={13} /> Rotate 45°
              </button>
            )}

            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
            <button
              onClick={() => removeElement(selectedElementId)}
              style={{ background: 'none', border: 'none', color: '#ff4d6d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 700 }}
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        )}

        {/* VIEW MODE 1: 2D FLAT FOIL SHEET PREVIEW */}
        {viewMode === '2d' ? (
          <div style={{
            transform: `scale(${canvasZoom})`,
            transition: 'transform 0.2s ease',
            position: 'relative',
            width: `${activeShapeTemplate.width}px`,
            height: `${activeShapeTemplate.height}px`
          }}>
            {/* SVG Mask Container */}
            <div id="foil-export-target" style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(243, 198, 76, 0.2)',
              borderRadius: selectedShape.id === 'circle' ? '50%' : '16px',
              overflow: 'hidden'
            }}>
              {/* Layer 1: Base Metallic Color Gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: selectedColor.gradient
              }} />

              {/* Layer 2: Texture Pattern Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                ...textureStyle
              }} />

              {/* Layer 3: Tiling Decorative Pattern Overlay */}
              {selectedPattern.id !== 'none' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  ...patternStyle
                }} />
              )}

              {/* Layer 4: Interactive User Artwork & Text Elements */}
              <div style={{ position: 'absolute', inset: 0 }}>
                {elements.filter(el => !el.isHidden).map((el) => {
                  const isSelected = el.id === selectedElementId;
                  const formattedText = el.transformCase === 'uppercase'
                    ? el.text?.toUpperCase()
                    : el.transformCase === 'lowercase'
                    ? el.text?.toLowerCase()
                    : el.text;

                  return (
                    <div
                      key={el.id}
                      onMouseDown={(e) => handleElementMouseDown(e, el)}
                      style={{
                        position: 'absolute',
                        left: `${el.x}px`,
                        top: `${el.y}px`,
                        transform: `rotate(${el.rotation || 0}deg) scale(${el.scaleX || 1})`,
                        transformOrigin: 'center center',
                        cursor: 'move',
                        userSelect: 'none',
                        outline: isSelected ? '2px dashed var(--text-gold)' : 'none',
                        outlineOffset: '4px',
                        padding: '4px',
                        borderRadius: '4px',
                        opacity: el.opacity !== undefined ? el.opacity : 1
                      }}
                    >
                      {el.type === 'text' ? (
                        <div style={{
                          fontFamily: el.font || 'Outfit, sans-serif',
                          fontSize: `${el.fontSize || 24}px`,
                          color: el.color || '#ffffff',
                          fontWeight: el.isBold ? 'bold' : 'normal',
                          fontStyle: el.isItalic ? 'italic' : 'normal',
                          letterSpacing: `${el.letterSpacing || 0}px`,
                          lineHeight: el.lineSpacing || 1.2,
                          whiteSpace: 'nowrap',
                          textShadow: el.shadowBlur ? `3px 3px ${el.shadowBlur}px ${el.shadowColor || 'rgba(0,0,0,0.6)'}` : 'none',
                          WebkitTextStroke: el.outlineWidth ? `${el.outlineWidth}px ${el.outlineColor}` : 'none'
                        }}>
                          {formattedText}
                        </div>
                      ) : (
                        <img 
                          src={el.src} 
                          alt={el.name || 'Uploaded Art'}
                          draggable={false}
                          style={{
                            width: `${el.width || 100}px`,
                            height: `${el.height || 100}px`,
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Edge Shadow */}
              <div style={{
                position: 'absolute',
                inset: 0,
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4)',
                pointerEvents: 'none',
                borderRadius: selectedShape.id === 'circle' ? '50%' : '16px'
              }} />
            </div>
          </div>
        ) : (
          /* VIEW MODE 2: 3D WRAPPED CHOCOLATE MOCKUP PROJECTION */
          <div style={{
            perspective: '1000px',
            transform: `scale(${canvasZoom})`,
            userSelect: 'none'
          }}>
            <div style={{
              width: '260px',
              height: selectedShape.id === 'rectangle' ? '160px' : '260px',
              borderRadius: selectedShape.id === 'circle' ? '50%' : selectedShape.id === 'heart' ? '50% 50% 50% 0' : '24px',
              background: selectedColor.gradient,
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${threeDRotation.x}deg) rotateY(${threeDRotation.y}deg)`,
              boxShadow: `0 30px 60px rgba(0,0,0,0.9), 0 0 50px ${selectedColor.hex}55`,
              transition: isDragging3D ? 'none' : 'transform 0.1s ease-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {/* Texture on 3D Mold */}
              <div style={{ position: 'absolute', inset: 0, ...textureStyle }} />
              {selectedPattern.id !== 'none' && <div style={{ position: 'absolute', inset: 0, ...patternStyle }} />}

              {/* Shimmer on 3D */}
              {shimmerEffect && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)',
                  mixBlendMode: 'overlay'
                }} />
              )}

              {/* 3D Wrapper Fold Details */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)'
              }} />

              {/* Logo / Text overlay projection */}
              <div style={{
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
                padding: '16px',
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.4)'
              }}>
                <div style={{ fontSize: '0.7rem', color: '#120b08', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  CHOCOWRAP DELUXE
                </div>
                <div style={{ fontSize: '0.95rem', color: '#120b08', fontWeight: 800, marginTop: '2px' }}>
                  {selectedColor.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#333', marginTop: '2px' }}>
                  {selectedTexture.name}
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '0.8rem',
              color: 'var(--text-gold)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <Move size={14} /> Click & Drag to Rotate 3D Wrapped Chocolate Mockup
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
