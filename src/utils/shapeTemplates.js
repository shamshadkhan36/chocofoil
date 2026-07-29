export const SVG_SHAPE_TEMPLATES = {
  heart: {
    name: 'Heart Mold',
    viewBox: '0 0 200 200',
    path: 'M 100,30 C 100,30 80,0 40,0 C 15,0 0,20 0,45 C 0,75 30,105 100,160 C 170,105 200,75 200,45 C 200,20 185,0 160,0 C 120,0 100,30 100,30 Z',
    width: 300,
    height: 300
  },
  square: {
    name: 'Square Praline',
    viewBox: '0 0 200 200',
    path: 'M 15,0 L 185,0 Q 200,0 200,15 L 200,185 Q 200,200 185,200 L 15,200 Q 0,200 0,185 L 0,15 Q 0,0 15,0 Z',
    width: 300,
    height: 300
  },
  rectangle: {
    name: 'Bar Rectangle',
    viewBox: '0 0 300 200',
    path: 'M 15,0 L 285,0 Q 300,0 300,15 L 300,185 Q 300,200 285,200 L 15,200 Q 0,200 0,185 L 0,15 Q 0,0 15,0 Z',
    width: 360,
    height: 240
  },
  circle: {
    name: 'Sphere Truffle',
    viewBox: '0 0 200 200',
    path: 'M 100,0 A 100,100 0 1,1 99.9,0 Z',
    width: 300,
    height: 300
  },
  flower: {
    name: 'Petal Flower',
    viewBox: '0 0 200 200',
    path: 'M 100,10 C 115,0 135,0 145,15 C 160,10 180,20 180,38 C 195,45 200,65 190,80 C 200,95 195,115 180,122 C 180,140 160,150 145,145 C 135,160 115,160 100,150 C 85,160 65,160 55,145 C 40,150 20,140 20,122 C 5,115 0,95 10,80 C 0,65 5,45 20,38 C 20,20 40,10 55,15 C 65,0 85,0 100,10 Z',
    width: 300,
    height: 300
  },
  oval: {
    name: 'Oval Medallion',
    viewBox: '0 0 260 200',
    path: 'M 130,0 C 200,0 260,45 260,100 C 260,155 200,200 130,200 C 60,200 0,155 0,100 C 0,45 60,0 130,0 Z',
    width: 340,
    height: 260
  },
  diamond: {
    name: 'Gem Diamond',
    viewBox: '0 0 200 200',
    path: 'M 100,0 L 200,100 L 100,200 L 0,100 Z',
    width: 300,
    height: 300
  },
  star: {
    name: 'Royale Star',
    viewBox: '0 0 200 200',
    path: 'M 100,0 L 125,65 L 195,65 L 140,105 L 160,175 L 100,135 L 40,175 L 60,105 L 5,65 L 75,65 Z',
    width: 300,
    height: 300
  }
};

export const getShapeSvgMarkup = (shapeId, colorGradient, texturePatternSvg, width = 300, height = 300) => {
  const shape = SVG_SHAPE_TEMPLATES[shapeId] || SVG_SHAPE_TEMPLATES.square;
  const clipId = `shape-clip-${shapeId}`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${shape.viewBox}" width="${width}" height="${height}">
      <defs>
        <clipPath id="${clipId}">
          <path d="${shape.path}" />
        </clipPath>
      </defs>
      <g clip-path="url(#${clipId})">
        ${texturePatternSvg}
      </g>
    </svg>
  `;
};
