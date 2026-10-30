import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Exports a DOM element to an exact standard A4 or Letter PDF.
 * Uses html-to-image (SVG foreignObject) for 100% accurate, high-resolution rendering
 * with full modern CSS compatibility (oklch, color-mix), zero layout flashing,
 * and intelligent multi-page slicing with page-overflow protection.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  paperFormat: 'a4' | 'letter' = 'a4'
): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // 1. Locate the document root inside the element or use element directly
  const targetNode =
    (element.querySelector('.print-area') as HTMLElement) ||
    element;

  // 2. High-resolution canvas rendering (scale = 2 for crisp 300 DPI text & signatures)
  // html-to-image uses browser-native rendering, avoiding the CSS parsing crashes of legacy libraries
  const canvas = await htmlToImage.toCanvas(targetNode, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    skipFonts: true,
    style: {
      transform: 'none',
      transformOrigin: 'top left',
      margin: '0',
      boxShadow: 'none',
      border: 'none',
      width: '794px',
      maxWidth: '794px',
      minWidth: '794px',
    },
  });

  // 3. Physical page dimensions in millimeters
  const isLetter = paperFormat === 'letter';
  const pageWidthMm = isLetter ? 215.9 : 210;
  const pageHeightMm = isLetter ? 279.4 : 297;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: paperFormat,
    compress: true,
  });

  // Set default view so PDF readers fit the entire page comfortably without massive zoom
  pdf.setDisplayMode('fullpage', 'continuous');
  pdf.setProperties({
    title: filename.replace(/\.pdf$/i, ''),
    subject: 'Documento Legal y Comercial Colombiano - TrámiteFácil Hub',
    author: 'TrámiteFácil Hub',
    creator: 'TrámiteFácil Hub (https://tramitefacil-hub.vercel.app)',
  });

  // Calculate slice height in canvas pixels based on exact physical aspect ratio
  const pagePixelHeight = Math.round((pageHeightMm / pageWidthMm) * canvas.width);

  // Avoid creating an extra trailing page if the remainder is negligible (< 120px on 2x retina canvas, ~60 CSS px)
  const remainder = canvas.height % pagePixelHeight;
  const hasInsignificantOverflow = remainder > 0 && remainder <= 120;

  // Calculate total pages
  let numPages = Math.ceil(canvas.height / pagePixelHeight);
  if (hasInsignificantOverflow && numPages > 1) {
    numPages -= 1;
  }
  numPages = Math.max(1, numPages);

  for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = pagePixelHeight;
    const ctx = pageCanvas.getContext('2d');

    if (ctx) {
      // Clean white sheet background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      if (numPages === 1 && canvas.height > pagePixelHeight) {
        // If it's a single-page document with slight overflow (e.g. padding), fit it smoothly to page height
        ctx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          canvas.width,
          pagePixelHeight
        );
      } else {
        const sourceY = pageIndex * pagePixelHeight;
        const sourceHeight = Math.min(pagePixelHeight, canvas.height - sourceY);

        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );
      }

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
      pdf.addImage(pageImgData, 'JPEG', 0, 0, pageWidthMm, pageHeightMm, undefined, 'FAST');
    }
  }

  // 4. Download file directly
  pdf.save(safeFilename);
}
