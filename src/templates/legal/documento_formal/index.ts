import React from 'react';
import { DocumentoFormalData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: DocumentoFormalData): string {
  const factsText = (data.facts || []).map((f) => `- ${f}`).join('\n');
  const legalText = (data.legalBasis || []).map((l) => `- ${l}`).join('\n');
  const petitionsText = (data.petitions || []).map((p) => `- ${p}`).join('\n');
  const firstSig = data.signatures?.[0] || { name: '', idNumber: '', role: '' };

  return `${data.title || 'OFICIO FORMAL'}
${data.cityAndDate || ''}

Señores:
${data.recipient?.name || 'A QUIEN CORRESPONDA'}
${data.recipient?.titleOrCompany || ''}
${data.recipient?.address || ''}

${data.subject || ''}

${data.openingGreeting || 'Respetado(a) señor(a):'}

HECHOS:
${factsText}

FUNDAMENTOS DE DERECHO:
${legalText}

PETICIONES:
${petitionsText}

${data.closing || 'Atentamente,'}

_____________________________
${firstSig.name || 'FIRMA'}
${firstSig.idNumber || ''}
${firstSig.role || ''}
${firstSig.phone ? `Tel: ${firstSig.phone}` : ''}
${firstSig.email ? `Email: ${firstSig.email}` : ''}`;
}

export function calculateCompletion(data: DocumentoFormalData): number {
  const fieldsToCheck = [
    data.title,
    data.cityAndDate,
    data.subject,
    data.recipient?.name,
    data.facts?.length,
    data.petitions?.length,
    data.signatures?.[0]?.name,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export function getFilename(data: DocumentoFormalData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = (data.title || 'Oficio_Formal').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  const person = (data.signatures?.[0]?.name || 'Firmante').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const documentoFormalDefinition: DocumentDefinition<DocumentoFormalData> = {
  getFilename,
  meta,
  defaultData,
  sampleData,
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
};

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';

