import React from 'react';
import { ContratoPrestacionData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: ContratoPrestacionData): string {
  const obligacionesTexto = (data.obligacionesContratista || [])
    .filter((o: string) => o.trim() !== '')
    .map((o: string, i: number) => `${i + 1}. ${o}`)
    .join('\n');

  return `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Entre los suscritos a saber:
CONTRATANTE: ${data.nombreContratante || 'CONTRATANTE'}, identificado con ${data.tipoDocContratante} N° ${data.numDocContratante}, con domicilio en ${data.domicilioContratante}; y
CONTRATISTA: ${data.nombreContratista || 'CONTRATISTA'}, identificado con ${data.tipoDocContratista} N° ${data.numDocContratista}, con domicilio en ${data.domicilioContratista}, hemos acordado celebrar el presente contrato regido por las siguientes cláusulas:

PRIMERA. OBJETO:
${data.objetoContrato || ''}

SEGUNDA. OBLIGACIONES DEL CONTRATISTA:
${obligacionesTexto}

TERCERA. VALOR Y FORMA DE PAGO:
${formatearMoneda(data.valorContrato || 0)} (${numeroALetras(data.valorContrato || 0)}), pagaderos así: ${data.formaPago || ''}.

CUARTA. DURACIÓN:
Desde el ${data.fechaInicio || ''} hasta el ${data.fechaTerminacion || ''}. Lugar de ejecución: ${data.lugarEjecucion || ''}.
${data.clausulaIndependencia ? '\nQUINTA. INDEPENDENCIA: El contratista actuará con plena autonomía técnica y directiva, sin subordinación laboral.' : ''}
${data.incluirConfidencialidad ? '\nSEXTA. CONFIDENCIALIDAD: La información técnica y comercial suministrada es confidencial y de reserva estricta.' : ''}
${data.clausulaPenalMonto ? `\nSÉPTIMA. CLÁUSULA PENAL: ${formatearMoneda(data.clausulaPenalMonto)}.` : ''}

En constancia se firma por las partes:

_____________________________
CONTRATANTE: ${data.nombreContratante || ''}
${data.tipoDocContratante || 'NIT'} ${data.numDocContratante || ''}

_____________________________
CONTRATISTA: ${data.nombreContratista || ''}
${data.tipoDocContratista || 'C.C.'} ${data.numDocContratista || ''}`;
}

export function calculateCompletion(data: ContratoPrestacionData): number {
  const fieldsToCheck = [
    data.nombreContratante,
    data.numDocContratante,
    data.nombreContratista,
    data.numDocContratista,
    data.objetoContrato,
    data.valorContrato,
    data.fechaInicio,
    data.fechaTerminacion,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const contratoPrestacionDefinition: DocumentDefinition<ContratoPrestacionData> = {
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

