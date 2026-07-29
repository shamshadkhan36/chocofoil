// SVG / CSS Texture Pattern Generators for Foil Effects (Cross-Browser & HTML2Canvas Export Compatible)

export const getTextureBackgroundStyle = (textureId) => {
  switch (textureId) {
    case 'line':
      return {
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 2px, transparent 2px, transparent 8px)',
        backgroundSize: '16px 16px',
        opacity: 0.85
      };
    case 'dots':
      return {
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 20%, transparent 20%)',
        backgroundSize: '14px 14px',
        opacity: 0.8
      };
    case 'stars':
      return {
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 15%, transparent 16%)',
        backgroundSize: '18px 18px',
        opacity: 0.85
      };
    case 'checks':
      return {
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 8px, transparent 8px 16px), repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 8px, transparent 8px 16px)',
        opacity: 0.75
      };
    case 'damask':
      return {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 11%), radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 11%) 12px 12px',
        backgroundSize: '24px 24px',
        opacity: 0.85
      };
    case 'prism':
      return {
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.35) 100%)',
        backgroundSize: '200% 200%',
        opacity: 0.9
      };
    case 'leather':
      return {
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)',
        backgroundSize: '6px 6px',
        backgroundPosition: '0 0, 3px 3px',
        opacity: 0.7
      };
    case 'matte':
      return {
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        opacity: 0.3
      };
    case 'gloss':
      return {
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 60%)',
        opacity: 0.8
      };
    default:
      return {};
  }
};

export const getPatternBackgroundStyle = (patternId, scale = 1, opacity = 0.75) => {
  const baseSize = 24 * scale;

  switch (patternId) {
    case 'hearts':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='rgba(255,255,255,0.35)'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
        backgroundSize: `${baseSize}px ${baseSize}px`,
        opacity: opacity
      };
    case 'floral':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='rgba(255,255,255,0.35)'%3E%3Ccircle cx='16' cy='16' r='4'/%3E%3Ccircle cx='16' cy='8' r='3'/%3E%3Ccircle cx='16' cy='24' r='3'/%3E%3Ccircle cx='8' cy='16' r='3'/%3E%3Ccircle cx='24' cy='16' r='3'/%3E%3C/svg%3E")`,
        backgroundSize: `${baseSize * 1.3}px ${baseSize * 1.3}px`,
        opacity: opacity
      };
    case 'stars':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='rgba(255,255,255,0.4)'%3E%3Cpolygon points='12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9'/%3E%3C/svg%3E")`,
        backgroundSize: `${baseSize}px ${baseSize}px`,
        opacity: opacity
      };
    case 'dots':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='rgba(255,255,255,0.35)'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3C/svg%3E")`,
        backgroundSize: `${baseSize * 0.8}px ${baseSize * 0.8}px`,
        opacity: opacity
      };
    case 'snowflakes':
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)' stroke-width='2' fill='none'%3E%3Cline x1='12' y1='2' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cline x1='4.93' y1='4.93' x2='19.07' y2='19.07'/%3E%3Cline x1='4.93' y1='19.07' x2='19.07' y2='4.93'/%3E%3C/svg%3E")`,
        backgroundSize: `${baseSize * 1.2}px ${baseSize * 1.2}px`,
        opacity: opacity
      };
    case 'stripes':
      return {
        backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 4px, transparent 4px, transparent 16px)`,
        backgroundSize: `${baseSize}px ${baseSize}px`,
        opacity: opacity
      };
    default:
      return {};
  }
};
