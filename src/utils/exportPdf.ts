// @ts-ignore
import html2pdf from 'html2pdf.js';

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  paperFormat: 'a4' | 'letter' = 'a4'
): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // Options optimized for sharp text rendering and proper pagination
  const opt = {
    margin: [10, 12, 10, 12] as [number, number, number, number], // mm
    filename: safeFilename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: 'mm' as const,
      format: paperFormat,
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF with html2pdf:', error);
    // Fallback to native print if needed
    window.print();
  }
}
