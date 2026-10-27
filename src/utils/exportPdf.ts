import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string,
  paperFormat: 'a4' | 'letter' = 'a4'
): Promise<void> {
  const safeFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  try {
    // 1. Capture high-resolution image of the simulated A4 paper sheet
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth,
    });

    // 2. Compute proportions for A4 / Letter in mm
    const isLetter = paperFormat === 'letter';
    const pageWidth = isLetter ? 215.9 : 210;
    const pageHeight = isLetter ? 279.4 : 297;
    const margin = 10; // mm

    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;

    const imgWidth = printableWidth;
    const imgHeight = (canvas.height * printableWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: paperFormat,
      compress: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // 3. Render single or multi-page PDF
    if (imgHeight <= printableHeight) {
      pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= printableHeight;

      while (heightLeft > 0) {
        position = margin - (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= printableHeight;
      }
    }

    // 4. Create direct typed Blob and trigger download via invisible <a> element
    const pdfBlob = pdf.output('blob');
    const blob = new Blob([pdfBlob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = safeFilename;
    link.rel = 'noopener';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke object URL after delay
    setTimeout(() => {
      try {
        window.URL.revokeObjectURL(blobUrl);
      } catch (_) {
        // Ignored
      }
    }, 60000);
  } catch (error) {
    console.warn(
      'Direct PDF Blob generation failed or was blocked by sandbox iframe policy. Falling back to native print dialog:',
      error
    );
    // Automatic fallback to native print dialog
    window.print();
  }
}
