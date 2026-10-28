import React from 'react';
import { PoderAutorizacionData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: PoderAutorizacionData): string {
  const facultadesTexto = (data.facultadesEspecificas || [])
    .filter((f: string) => f.trim() !== '')
    .map((f: string, i: number) => `${i + 1}. ${f}`)
    .join('\n');

  return `PODER ESPECIAL AMPLIO Y SUFICIENTE
Autorización Formal para Gestión y Trámite Específico

${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.entidadTramite || 'A QUIEN CORRESPONDA / ENTIDAD COMPETENTE'}
${data.ciudad || ''}

Yo, ${data.nombreOtorgante || '[NOMBRE OTORGANTE]'}, mayor de edad, identificado(a) con ${data.tipoDocOtorgante} N° ${data.numDocOtorgante || '____________'}${data.expedicionOtorgante ? ` expedida en ${data.expedicionOtorgante}` : ''}, domiciliado(a) en ${data.domicilioOtorgante || 'esta ciudad'}${data.telefonoOtorgante ? `, teléfono ${data.telefonoOtorgante}` : ''}, por medio del presente documento manifiesto que confiero PODER ESPECIAL, AMPLIO Y SUFICIENTE a:

${data.nombreApoderado || '[NOMBRE APODERADO]'}, mayor de edad, identificado(a) con ${data.tipoDocApoderado} N° ${data.numDocApoderado || '____________'}${data.expedicionApoderado ? ` expedida en ${data.expedicionApoderado}` : ''}${data.telefonoApoderado ? `, teléfono ${data.telefonoApoderado}` : ''}.

OBJETO DEL TRÁMITE AUTORIZADO:
${data.objetoAutorizacion || ''}

${facultadesTexto ? `FACULTADES EXPRESAS:\n${facultadesTexto}\n` : ''}
${data.vigenciaTexto ? `VIGENCIA:\n${data.vigenciaTexto}\n` : ''}
${data.notaLegal ? `NOTA LEGAL:\n${data.notaLegal}\n` : ''}

_____________________________               _____________________________
OTORGANTE (PODERDANTE)                       APODERADO (ACEPTA EL PODER)
${data.nombreOtorgante || ''}               ${data.nombreApoderado || ''}
${data.tipoDocOtorgante} ${data.numDocOtorgante || ''}  ${data.tipoDocApoderado} ${data.numDocApoderado || ''}`;
}

export function calculateCompletion(data: PoderAutorizacionData): number {
  const fieldsToCheck = [
    data.nombreOtorgante,
    data.numDocOtorgante,
    data.nombreApoderado,
    data.numDocApoderado,
    data.entidadTramite,
    data.objetoAutorizacion,
    data.ciudad,
    data.fecha,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const poderAutorizacionDefinition: DocumentDefinition<PoderAutorizacionData> = {
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

