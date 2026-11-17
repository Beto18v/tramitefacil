import React from 'react';
import { OtrosiLaboralData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: OtrosiLaboralData): string {
  return `${data.numeroOtrosi ? data.numeroOtrosi.toUpperCase() : 'OTROSÍ MODIFICATORIO'} AL CONTRATO DE TRABAJO
Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

PARTES INTERVINIENTES:
EMPLEADOR: ${data.nombreEmpresa || 'EMPLEADOR'} (NIT: ${data.nitEmpresa || ''}), representado por ${data.nombreRepresentanteLegal || ''} (${data.tipoDocRepresentante || 'C.C.'} ${data.numDocRepresentante || ''})
TRABAJADOR: ${data.nombreTrabajador || 'TRABAJADOR'} (${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}), en calidad de ${data.cargoTrabajador || 'Trabajador'}

CONSIDERANDOS:
1. Que entre las partes se encuentra vigente un ${data.tipoContratoOriginal || 'Contrato de Trabajo'} celebrado el día ${data.fechaContratoOriginal || ''}.
2. Que de conformidad con el Art. 50 del Código Sustantivo del Trabajo (C.S.T.), las partes han decidido de mutuo acuerdo modificar las estipulaciones contractuales respecto a ${data.clausulaModificada || 'la cláusula acordada'}.

CLÁUSULAS MODIFICATORIAS:
PRIMERA. OBJETO DE LA MODIFICACIÓN:
Se modifica la ${data.clausulaModificada || 'cláusula acordada'} del contrato de trabajo base.

SEGUNDA. NUEVA REDACCIÓN ACORDADA:
${data.textoNuevo || ''}

${data.textoAnterior ? `[Texto anterior: ${data.textoAnterior}]` : ''}

TERCERA. VIGENCIA:
La presente modificación rige a partir del ${data.fechaVigenciaModificacion || data.fecha || ''}.

${
  data.incluyeRatificacion
    ? `CUARTA. RATIFICACIÓN:
${data.ratificacionTexto || ''}`
    : ''
}

FIRMAS:

_____________________________
POR EL EMPLEADOR:
${data.nombreRepresentanteLegal || data.nombreEmpresa || 'EMPLEADOR'}
${data.nombreEmpresa ? `En representación de: ${data.nombreEmpresa}` : ''}
${data.nitEmpresa ? `NIT: ${data.nitEmpresa}` : ''}

_____________________________
EL TRABAJADOR:
${data.nombreTrabajador || 'TRABAJADOR'}
${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || ''}
${data.cargoTrabajador || ''}`;
}

export function calculateCompletion(data: OtrosiLaboralData): number {
  const fields = [
    data.nombreEmpresa,
    data.fechaContratoOriginal,
    data.nombreTrabajador,
    data.numeroDocumento,
    data.clausulaModificada,
    data.textoNuevo,
    data.fechaVigenciaModificacion,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: OtrosiLaboralData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Otrosi_Laboral';
  const person = (data.nombreTrabajador || 'Trabajador')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const otrosiLaboralDefinition = createDocumentDefinition<OtrosiLaboralData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'otrosiLaboral',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreTrabajador',
    numeroDocumento: 'numeroDocumento',
    tipoDocumento: 'tipoDocumento',
    ciudad: 'ciudad',
    cargoOProfesion: 'cargoTrabajador',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'POR EL EMPLEADOR:',
      name: data.nombreRepresentanteLegal || data.nombreEmpresa || 'EMPLEADOR',
      doc: data.numDocRepresentante
        ? `${data.tipoDocRepresentante || 'C.C.'}: ${data.numDocRepresentante}`
        : data.nitEmpresa
          ? `NIT: ${data.nitEmpresa}`
          : undefined,
      note: data.nombreEmpresa,
    },
    right: {
      role: 'EL TRABAJADOR:',
      name: data.nombreTrabajador || 'TRABAJADOR',
      doc: `${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || '________________'}`,
      note: data.cargoTrabajador,
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
