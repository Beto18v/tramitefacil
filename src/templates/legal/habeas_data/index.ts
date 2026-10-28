import React from 'react';
import { HabeasDataData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: HabeasDataData): string {
  const anexosTexto = (data.anexosDocumentales || [])
    .filter((a: string) => a.trim() !== '')
    .map((a: string) => `- ${a}`)
    .join('\n');

  return `SOLICITUD DE HABEAS DATA FINANCIERO
(Leyes Estatutarias 1266 de 2008 y 2157 de 2021)

${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.centralDeRiesgo || 'CENTRAL DE INFORMACIÓN FINANCIERA'}
${data.entidadReportante ? `Entidad Fuente Vinculada: ${data.entidadReportante}\n` : ''}Área de Reclamaciones y Habeas Data

ASUNTO: Ejercicio del derecho fundamental de Habeas Data
${data.numeroObligacion ? `Obligación / Producto objeto de reclamación: ${data.numeroObligacion}\n` : ''}
Yo, ${data.nombreTitular || '[NOMBRE DEL TITULAR]'}, mayor de edad, identificado(a) con ${data.tipoDocTitular} N° ${data.numDocTitular || '____________'}${data.expedicionTitular ? ` expedida en ${data.expedicionTitular}` : ''}, acudo a ustedes en ejercicio de la garantía constitucional de Habeas Data consagrada en el artículo 15 de la Constitución Política, la Ley 1266 de 2008 y la Ley 2157 de 2021, para formular la siguiente reclamación:

CAUSAL: ${data.causalSolicitud}

1. HECHOS Y ANTECEDENTES:
${data.hechosDetallados || ''}

2. PRETENSIÓN CONCRETA:
${data.pretensionConcreta || ''}

${anexosTexto ? `3. PRUEBAS Y ANEXOS:\n${anexosTexto}\n` : ''}
NOTIFICACIONES:
Dirección: ${data.direccionNotificacion || ''}
Correo: ${data.correoTitular || ''} | Teléfono: ${data.telefonoTitular || ''}

Atentamente,

_____________________________
${data.nombreTitular || 'FIRMA DEL TITULAR'}
${data.tipoDocTitular}: ${data.numDocTitular || '________________'}`;
}

export function calculateCompletion(data: HabeasDataData): number {
  const fieldsToCheck = [
    data.centralDeRiesgo,
    data.entidadReportante,
    data.numeroObligacion,
    data.hechosDetallados,
    data.pretensionConcreta,
    data.nombreTitular,
    data.numDocTitular,
    data.correoTitular,
    data.direccionNotificacion,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const habeasDataDefinition: DocumentDefinition<HabeasDataData> = {
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

