import { create } from 'zustand';

// Initial Swatches & Templates
export const FOIL_COLORS = [
  { id: 'gold', name: 'Metallic Gold', hex: '#D4AF37', gradient: 'linear-gradient(135deg, #ffe082 0%, #d4af37 50%, #856404 100%)', metallicType: 'gold', multiplier: 1.0 },
  { id: 'silver', name: 'Bright Silver', hex: '#C0C0C0', gradient: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #475569 100%)', metallicType: 'silver', multiplier: 1.0 },
  { id: 'rose-gold', name: 'Rose Gold', hex: '#E0A96D', gradient: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 50%, #db2777 100%)', metallicType: 'rose-gold', multiplier: 1.15 },
  { id: 'copper', name: 'Copper Bronze', hex: '#B87333', gradient: 'linear-gradient(135deg, #fed7aa 0%, #f97316 50%, #7c2d12 100%)', metallicType: 'copper', multiplier: 1.05 },
  { id: 'holographic', name: 'Holographic Rainbow', hex: '#A855F7', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #a1c4fd 50%, #c2e9fb 75%, #e0c3fc 100%)', metallicType: 'holographic', multiplier: 1.35 },
  { id: 'blue', name: 'Royal Blue', hex: '#2563EB', gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1e3a8a 100%)', metallicType: 'blue', multiplier: 1.1 },
  { id: 'emerald', name: 'Emerald Green', hex: '#10B981', gradient: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 50%, #044e37 100%)', metallicType: 'emerald', multiplier: 1.1 },
  { id: 'ruby', name: 'Ruby Red', hex: '#E60026', gradient: 'linear-gradient(135deg, #ff6b81 0%, #e60026 50%, #800014 100%)', metallicType: 'ruby', multiplier: 1.1 },
  { id: 'purple', name: 'Velvet Purple', hex: '#9333EA', gradient: 'linear-gradient(135deg, #c084fc 0%, #9333ea 50%, #4c1d95 100%)', metallicType: 'purple', multiplier: 1.1 },
  { id: 'black', name: 'Matte Onyx Black', hex: '#1A1A1A', gradient: 'linear-gradient(135deg, #333333 0%, #1a1a1a 50%, #000000 100%)', metallicType: 'black', multiplier: 1.05 },
  { id: 'white', name: 'Gloss Pearl White', hex: '#F8FAFC', gradient: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%)', metallicType: 'white', multiplier: 1.05 },
  { id: 'pink', name: 'Blush Pink', hex: '#EC4899', gradient: 'linear-gradient(135deg, #fef08a 0%, #f472b6 50%, #be185d 100%)', metallicType: 'pink', multiplier: 1.1 }
];

export const FOIL_TEXTURES = [
  { id: 'line', name: 'Line Embossed', patternType: 'line', price: 20 },
  { id: 'dots', name: 'Polka Dots', patternType: 'dots', price: 25 },
  { id: 'stars', name: 'Star Embossed', patternType: 'stars', price: 30 },
  { id: 'checks', name: 'Gingham Checks', patternType: 'checks', price: 25 },
  { id: 'damask', name: 'Damask Floral', patternType: 'damask', price: 40 },
  { id: 'prism', name: '3D Prismatic', patternType: 'prism', price: 50 },
  { id: 'leather', name: 'Pebbled Wine', patternType: 'leather', price: 20 },
  { id: 'matte', name: 'Satin Matte', patternType: 'matte', price: 0 },
  { id: 'gloss', name: 'High Gloss', patternType: 'gloss', price: 0 }
];

export const PATTERNS = [
  { id: 'none', name: 'Solid Metallic (No Pattern)' },
  { id: 'hearts', name: 'Mini Love Hearts' },
  { id: 'floral', name: 'Vintage Floral' },
  { id: 'stars', name: 'Celestial Stars' },
  { id: 'dots', name: 'Confetti Dots' },
  { id: 'snowflakes', name: 'Festive Snowflakes' },
  { id: 'stripes', name: 'Pinstripe Luxe' }
];

export const SHAPES = [
  { id: 'heart', name: 'Heart Mold', icon: '❤️', ratio: 1, path: 'M 100,30 C 100,30 80,0 40,0 C 15,0 0,20 0,45 C 0,75 30,105 100,160 C 170,105 200,75 200,45 C 200,20 185,0 160,0 C 120,0 100,30 100,30 Z' },
  { id: 'square', name: 'Square Praline', icon: '⬛', ratio: 1, path: 'M 15,0 L 185,0 Q 200,0 200,15 L 200,185 Q 200,200 185,200 L 15,200 Q 0,200 0,185 L 0,15 Q 0,0 15,0 Z' },
  { id: 'rectangle', name: 'Bar Rectangle', icon: '🍫', ratio: 1.5, path: 'M 15,0 L 285,0 Q 300,0 300,15 L 300,185 Q 300,200 285,200 L 15,200 Q 0,200 0,185 L 0,15 Q 0,0 15,0 Z' },
  { id: 'circle', name: 'Sphere Truffle', icon: '🔴', ratio: 1, path: 'M 100,0 A 100,100 0 1,1 99.9,0 Z' },
  { id: 'flower', name: 'Petal Flower', icon: '🌸', ratio: 1, path: 'M 100,10 C 115,0 135,0 145,15 C 160,10 180,20 180,38 C 195,45 200,65 190,80 C 200,95 195,115 180,122 C 180,140 160,150 145,145 C 135,160 115,160 100,150 C 85,160 65,160 55,145 C 40,150 20,140 20,122 C 5,115 0,95 10,80 C 0,65 5,45 20,38 C 20,20 40,10 55,15 C 65,0 85,0 100,10 Z' },
  { id: 'oval', name: 'Oval Medallion', icon: '🥚', ratio: 1.3, path: 'M 130,0 C 200,0 260,45 260,100 C 260,155 200,200 130,200 C 60,200 0,155 0,100 C 0,45 60,0 130,0 Z' },
  { id: 'diamond', name: 'Gem Diamond', icon: '🔷', ratio: 1, path: 'M 100,0 L 200,100 L 100,200 L 0,100 Z' },
  { id: 'star', name: 'Royale Star', icon: '⭐', ratio: 1, path: 'M 100,0 L 125,65 L 195,65 L 140,105 L 160,175 L 100,135 L 40,175 L 60,105 L 5,65 L 75,65 Z' }
];

export const QUANTITY_OPTIONS = [
  { count: 100, multiplier: 1.0, label: '100 Sheets (Sample)' },
  { count: 250, multiplier: 2.2, label: '250 Sheets (Boutique)' },
  { count: 500, multiplier: 4.0, label: '500 Sheets (Standard)' },
  { count: 1000, multiplier: 7.2, label: '1,000 Sheets (Popular)' },
  { count: 5000, multiplier: 32.0, label: '5,000 Sheets (Bulk Enterprise)' }
];

const getInitialSavedDesigns = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('chocowrap_saved_designs');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const safeSaveDesigns = (designs) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('chocowrap_saved_designs', JSON.stringify(designs));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }
};

export const useDesignerStore = create((set, get) => ({
  // State
  activeProduct: null,
  selectedShape: SHAPES[0],
  selectedColor: FOIL_COLORS[0],
  selectedTexture: FOIL_TEXTURES[0],
  selectedPattern: PATTERNS[0],
  patternScale: 1.0,
  patternOpacity: 0.75,
  
  elements: [],
  selectedElementId: null,
  
  quantity: 500,
  rushOrder: false,
  customNotes: '',
  
  viewMode: '2d', // '2d' or '3d'
  canvasZoom: 1.0,
  gridSnap: true,
  shimmerEffect: false,
  
  // History for Undo/Redo
  history: [],
  historyIndex: -1,
  
  // Saved Designs
  savedDesigns: getInitialSavedDesigns(),
  
  // Custom Admin Templates
  adminShapes: [...SHAPES],
  adminTextures: [...FOIL_TEXTURES],
  adminPatterns: [...PATTERNS],
  adminColors: [...FOIL_COLORS],
  basePricePer100: 350,

  // Actions: Intelligent Product Auto-Configuration
  setActiveProduct: (prod) => {
    if (!prod) {
      set({ activeProduct: null });
      return;
    }

    const titleStr = `${prod.name || ''} ${prod.categoryLabel || ''} ${prod.category || ''}`.toLowerCase();
    
    // 1. Detect Shape matching product
    let targetShape = SHAPES.find(s => s.id === 'square');
    if (titleStr.includes('heart')) targetShape = SHAPES.find(s => s.id === 'heart');
    else if (titleStr.includes('bar') || titleStr.includes('rectangular') || titleStr.includes('slab')) targetShape = SHAPES.find(s => s.id === 'rectangle');
    else if (titleStr.includes('truffle') || titleStr.includes('sphere') || titleStr.includes('football') || titleStr.includes('ball')) targetShape = SHAPES.find(s => s.id === 'circle');
    else if (titleStr.includes('star')) targetShape = SHAPES.find(s => s.id === 'star');
    else if (titleStr.includes('floral') || titleStr.includes('vine') || titleStr.includes('flower')) targetShape = SHAPES.find(s => s.id === 'flower');
    else if (titleStr.includes('triangle') || titleStr.includes('diamond') || titleStr.includes('prism')) targetShape = SHAPES.find(s => s.id === 'diamond');

    // 2. Detect Texture matching product
    let targetTexture = FOIL_TEXTURES.find(t => t.id === 'line');
    if (titleStr.includes('dots') || titleStr.includes('polka')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'dots');
    else if (titleStr.includes('star')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'stars');
    else if (titleStr.includes('check') || titleStr.includes('gingham')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'checks');
    else if (titleStr.includes('damask') || titleStr.includes('mandala') || titleStr.includes('floral')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'damask');
    else if (titleStr.includes('holographic') || titleStr.includes('prism') || titleStr.includes('3d')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'prism');
    else if (titleStr.includes('wine') || titleStr.includes('leather')) targetTexture = FOIL_TEXTURES.find(t => t.id === 'leather');

    // 3. Detect Pattern
    let targetPattern = PATTERNS.find(p => p.id === 'none');
    if (titleStr.includes('heart')) targetPattern = PATTERNS.find(p => p.id === 'hearts');
    else if (titleStr.includes('floral') || titleStr.includes('vine')) targetPattern = PATTERNS.find(p => p.id === 'floral');
    else if (titleStr.includes('star')) targetPattern = PATTERNS.find(p => p.id === 'stars');
    else if (titleStr.includes('dot')) targetPattern = PATTERNS.find(p => p.id === 'dots');

    // 4. Detect Color
    let targetColor = FOIL_COLORS[0];
    if (prod.colors && prod.colors.length > 0) {
      const matchColor = FOIL_COLORS.find(c => c.name.toLowerCase().includes(prod.colors[0].name.toLowerCase()));
      if (matchColor) targetColor = matchColor;
    }

    set({
      activeProduct: prod,
      selectedShape: targetShape || SHAPES[0],
      selectedTexture: targetTexture || FOIL_TEXTURES[0],
      selectedPattern: targetPattern || PATTERNS[0],
      selectedColor: targetColor
    });
  },
  
  setSelectedShape: (shape) => {
    set({ selectedShape: shape });
    get().saveHistoryState();
  },

  setSelectedColor: (color) => {
    set({ selectedColor: color });
    get().saveHistoryState();
  },

  setSelectedTexture: (texture) => {
    set({ selectedTexture: texture });
    get().saveHistoryState();
  },

  setSelectedPattern: (pattern) => {
    set({ selectedPattern: pattern });
    get().saveHistoryState();
  },

  setPatternScale: (scale) => set({ patternScale: scale }),
  setPatternOpacity: (opacity) => set({ patternOpacity: opacity }),

  // Elements (Text / Logo / Uploads)
  addElement: (element) => {
    const id = 'elem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newElem = {
      id,
      x: 150,
      y: 150,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      isLocked: false,
      isHidden: false,
      ...element
    };
    set((state) => ({
      elements: [...state.elements, newElem],
      selectedElementId: id
    }));
    get().saveHistoryState();
  },

  updateElement: (id, newAttrs) => {
    set((state) => ({
      elements: state.elements.map((el) => el.id === id ? { ...el, ...newAttrs } : el)
    }));
    get().saveHistoryState();
  },

  removeElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
    }));
    get().saveHistoryState();
  },

  duplicateElement: (id) => {
    const elem = get().elements.find(el => el.id === id);
    if (elem) {
      const dup = {
        ...elem,
        id: 'elem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        x: elem.x + 20,
        y: elem.y + 20
      };
      set(state => ({
        elements: [...state.elements, dup],
        selectedElementId: dup.id
      }));
      get().saveHistoryState();
    }
  },

  reorderLayer: (id, direction) => {
    set((state) => {
      const index = state.elements.findIndex(el => el.id === id);
      if (index === -1) return state;

      const newElements = [...state.elements];
      if (direction === 'up' && index < newElements.length - 1) {
        const temp = newElements[index];
        newElements[index] = newElements[index + 1];
        newElements[index + 1] = temp;
      } else if (direction === 'down' && index > 0) {
        const temp = newElements[index];
        newElements[index] = newElements[index - 1];
        newElements[index - 1] = temp;
      } else if (direction === 'top') {
        const [item] = newElements.splice(index, 1);
        newElements.push(item);
      } else if (direction === 'bottom') {
        const [item] = newElements.splice(index, 1);
        newElements.unshift(item);
      }
      return { elements: newElements };
    });
    get().saveHistoryState();
  },

  setSelectedElementId: (id) => set({ selectedElementId: id }),

  // Canvas Settings
  setViewMode: (mode) => set({ viewMode: mode }),
  setCanvasZoom: (zoom) => set({ canvasZoom: Math.max(0.5, Math.min(2.5, zoom)) }),
  setGridSnap: (snap) => set({ gridSnap: snap }),
  setShimmerEffect: (shimmer) => set({ shimmerEffect: shimmer }),

  // Order Details
  setQuantity: (qty) => set({ quantity: Math.max(50, qty) }),
  setRushOrder: (rush) => set({ rushOrder: rush }),
  setCustomNotes: (notes) => set({ customNotes: notes }),

  // Undo / Redo History
  saveHistoryState: () => {
    const state = get();
    const currentState = {
      shape: state.selectedShape,
      color: state.selectedColor,
      texture: state.selectedTexture,
      pattern: state.selectedPattern,
      patternScale: state.patternScale,
      patternOpacity: state.patternOpacity,
      elements: JSON.parse(JSON.stringify(state.elements))
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(currentState);
    
    if (newHistory.length > 30) newHistory.shift();

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      set({
        selectedShape: prev.shape,
        selectedColor: prev.color,
        selectedTexture: prev.texture,
        selectedPattern: prev.pattern,
        patternScale: prev.patternScale,
        patternOpacity: prev.patternOpacity,
        elements: prev.elements,
        historyIndex: historyIndex - 1
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      set({
        selectedShape: next.shape,
        selectedColor: next.color,
        selectedTexture: next.texture,
        selectedPattern: next.pattern,
        patternScale: next.patternScale,
        patternOpacity: next.patternOpacity,
        elements: next.elements,
        historyIndex: historyIndex + 1
      });
    }
  },

  clearCanvas: () => {
    set({
      elements: [],
      selectedElementId: null
    });
    get().saveHistoryState();
  },

  // Save / Load Designs
  saveCurrentDesign: (name = 'My Chocolate Foil Design') => {
    const state = get();
    const designObj = {
      id: 'design_' + Date.now(),
      name,
      createdAt: new Date().toISOString(),
      shape: state.selectedShape,
      color: state.selectedColor,
      texture: state.selectedTexture,
      pattern: state.selectedPattern,
      patternScale: state.patternScale,
      patternOpacity: state.patternOpacity,
      elements: state.elements,
      quantity: state.quantity,
      price: get().calculatePrice()
    };
    const updated = [designObj, ...state.savedDesigns];
    safeSaveDesigns(updated);
    set({ savedDesigns: updated });
    return designObj;
  },

  loadDesign: (designObj) => {
    set({
      selectedShape: designObj.shape,
      selectedColor: designObj.color,
      selectedTexture: designObj.texture,
      selectedPattern: designObj.pattern,
      patternScale: designObj.patternScale || 1,
      patternOpacity: designObj.patternOpacity || 0.75,
      elements: designObj.elements || [],
      quantity: designObj.quantity || 500,
      selectedElementId: null
    });
    get().saveHistoryState();
  },

  deleteSavedDesign: (id) => {
    const state = get();
    const updated = state.savedDesigns.filter(d => d.id !== id);
    safeSaveDesigns(updated);
    set({ savedDesigns: updated });
  },

  // Admin Management Actions
  addAdminShape: (shape) => set((s) => ({ adminShapes: [...s.adminShapes, shape] })),
  addAdminTexture: (texture) => set((s) => ({ adminTextures: [...s.adminTextures, texture] })),
  addAdminPattern: (pattern) => set((s) => ({ adminPatterns: [...s.adminPatterns, pattern] })),
  addAdminColor: (color) => set((s) => ({ adminColors: [...s.adminColors, color] })),

  // Pricing Engine Calculation
  calculatePrice: () => {
    const state = get();
    const baseUnit = state.basePricePer100;
    const colorMult = state.selectedColor?.multiplier || 1.0;
    const textureFee = state.selectedTexture?.price || 0;
    const patternFee = state.selectedPattern?.id !== 'none' ? 25 : 0;
    const printingFee = state.elements.length * 35;

    const pricePer100 = Math.round((baseUnit * colorMult) + textureFee + patternFee + printingFee);
    const count = state.quantity;
    let qtyMultiplier = count / 100;
    if (count >= 5000) qtyMultiplier *= 0.64;
    else if (count >= 1000) qtyMultiplier *= 0.72;
    else if (count >= 500) qtyMultiplier *= 0.80;
    else if (count >= 250) qtyMultiplier *= 0.88;

    let subtotal = Math.round((pricePer100 / 100) * count * (qtyMultiplier / (count / 100)));

    if (subtotal < 350) subtotal = 350;
    if (state.rushOrder) {
      subtotal = Math.round(subtotal * 1.2);
    }
    return subtotal;
  }
}));
