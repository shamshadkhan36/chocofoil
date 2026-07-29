import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    console.log('Confetti effect triggered');
  }
};

export const exportCanvasAsImage = async (elementRef, filename = 'custom-chocolate-foil-design.png') => {
  try {
    // Target exact foil sheet element or fallback to elementRef
    const targetElement = document.getElementById('foil-export-target') || elementRef;
    if (!targetElement) return;

    const canvas = await html2canvas(targetElement, {
      backgroundColor: null,
      scale: 3, // High DPI rendering
      useCORS: true,
      logging: false,
      allowTaint: true,
      onclone: (clonedDoc) => {
        // Fix mixBlendMode darkening bug in html2canvas by converting blend modes to normal in clone
        const elementsWithBlend = clonedDoc.querySelectorAll('*');
        elementsWithBlend.forEach(el => {
          const computed = window.getComputedStyle(el);
          if (computed.mixBlendMode && computed.mixBlendMode !== 'normal') {
            el.style.mixBlendMode = 'normal';
          }
        });
      }
    });

    const image = canvas.toDataURL('image/png');
    
    // Download link trigger
    const link = document.createElement('a');
    link.href = image;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return image;
  } catch (err) {
    console.error('Failed to export canvas image:', err);
  }
};

export const generatePdfProof = async (designerState, previewElementRef) => {
  try {
    const targetElement = document.getElementById('foil-export-target') || previewElementRef;
    let previewImgData = '';

    if (targetElement) {
      const canvas = await html2canvas(targetElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        onclone: (clonedDoc) => {
          const elementsWithBlend = clonedDoc.querySelectorAll('*');
          elementsWithBlend.forEach(el => {
            const computed = window.getComputedStyle(el);
            if (computed.mixBlendMode && computed.mixBlendMode !== 'normal') {
              el.style.mixBlendMode = 'normal';
            }
          });
        }
      });
      previewImgData = canvas.toDataURL('image/png');
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Dark Gold Header Banner
    doc.setFillColor(18, 11, 8);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(243, 198, 76);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('CHOCOWRAP DELUXE STUDIO', 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text('CUSTOM CHOCOLATE FOIL PRINTING PROOF & PRODUCTION SPECIFICATION', 14, 28);
    doc.text(`Proof Date: ${new Date().toLocaleDateString('en-IN')}`, 140, 28);

    // Divider Line
    doc.setDrawColor(243, 198, 76);
    doc.setLineWidth(0.8);
    doc.line(14, 38, 196, 38);

    // Section 1: Customer & Specification Details
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('TECHNICAL SPECIFICATIONS', 14, 52);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const specs = [
      ['Chocolate Mold Shape:', designerState.selectedShape?.name || 'Heart Mold'],
      ['Metallic Foil Swatch:', designerState.selectedColor?.name || 'Metallic Gold'],
      ['Embossed Texture:', designerState.selectedTexture?.name || 'Line Embossed'],
      ['Tiling Pattern:', designerState.selectedPattern?.name || 'None'],
      ['Order Quantity:', `${designerState.quantity} Sheets`],
      ['Thickness & Material:', '14 Microns Food-Grade Pure Aluminum Foil'],
      ['Deadfold Memory:', 'High Precision Soft Deadfold'],
      ['Rush Processing:', designerState.rushOrder ? 'Yes (Priority Printing)' : 'Standard (3-5 Days)']
    ];

    let startY = 60;
    specs.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 14, startY);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 65, startY);
      startY += 7;
    });

    // Embedded Preview Image
    if (previewImgData) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('LIVE CUSTOMIZED DESIGN PREVIEW', 14, 125);
      doc.addImage(previewImgData, 'PNG', 14, 130, 100, 100);
    }

    // Right Box: Price & Production Breakdown
    doc.setFillColor(248, 246, 240);
    doc.roundedRect(120, 130, 76, 100, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(18, 11, 8);
    doc.text('ORDER ESTIMATE', 125, 142);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Base Rate / 100 Sheets:`, 125, 154);
    doc.text(`₹${designerState.basePricePer100 || 350}`, 175, 154);

    doc.text(`Foil Color Multiplier:`, 125, 164);
    doc.text(`${designerState.selectedColor?.multiplier || 1.0}x`, 175, 164);

    doc.text(`Embossing Texture:`, 125, 174);
    doc.text(`+₹${designerState.selectedTexture?.price || 0}`, 175, 174);

    doc.text(`Custom Layers:`, 125, 184);
    doc.text(`${designerState.elements?.length || 0} artwork layer(s)`, 165, 184);

    doc.setDrawColor(200, 200, 200);
    doc.line(125, 192, 190, 192);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 120, 0);
    doc.text(`TOTAL PRICE:`, 125, 204);
    doc.text(`₹${designerState.calculatePrice ? designerState.calculatePrice() : 0}`, 160, 204);

    if (designerState.customNotes) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50);
      doc.text('Special Printing Notes:', 14, 242);
      doc.setFont('helvetica', 'italic');
      doc.text(designerState.customNotes, 14, 248);
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text('ChocoWrap Deluxe Studio • India\'s Premier Chocolate Foil Customization Platform • Support: contact@chocowrap.in', 14, 285);

    doc.save(`ChocoWrap_Proof_${Date.now()}.pdf`);
    triggerConfetti();
  } catch (err) {
    console.error('Error building PDF proof:', err);
  }
};

export const exportDesignJson = (designerState) => {
  const payload = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    shape: designerState.selectedShape,
    color: designerState.selectedColor,
    texture: designerState.selectedTexture,
    pattern: designerState.selectedPattern,
    patternScale: designerState.patternScale,
    patternOpacity: designerState.patternOpacity,
    elements: designerState.elements,
    quantity: designerState.quantity,
    rushOrder: designerState.rushOrder,
    customNotes: designerState.customNotes,
    finalPrice: designerState.calculatePrice()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `chocowrap_design_spec_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
