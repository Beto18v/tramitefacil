import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import { DocumentType } from '../types/documents';
import { generarTextoPlano } from './plainTextGenerator';

export async function exportDocx(
  docType: DocumentType,
  state: any,
  title: string,
  filename: string
): Promise<void> {
  const fullText = generarTextoPlano(docType, state);
  const lines = fullText.split('\n');

  // Convert plain text lines into formatted docx paragraphs
  const paragraphs: Paragraph[] = [
    // Formal header title
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300, before: 100 },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 28, // 14pt
          font: 'Calibri',
          color: '1E293B',
        }),
      ],
    }),
  ];

  // Process text lines
  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      paragraphs.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [],
        })
      );
      continue;
    }

    // Detect section headers (all caps or starting with Roman numeral or colon)
    const isHeader =
      /^[I|V|X]+\.\s/.test(trimmed) ||
      /^[A-ZÁÉÍÓÚÑ\s]{4,}:$/.test(trimmed) ||
      trimmed.startsWith('ASUNTO:') ||
      trimmed.startsWith('OBJETO:') ||
      trimmed.startsWith('VALOR:');

    if (isHeader) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 22, // 11pt
              font: 'Calibri',
              color: '0F172A',
            }),
          ],
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 276 },
          children: [
            new TextRun({
              text: line,
              size: 22, // 11pt
              font: 'Calibri',
              color: '334155',
            }),
          ],
        })
      );
    }
  }

  // Create docx Document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch (72pt * 20 = 1440 dxa)
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeFilename = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  saveAs(blob, safeFilename);
}
