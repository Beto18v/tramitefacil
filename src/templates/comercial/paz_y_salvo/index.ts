import React from 'react';
import { PazYSalvoData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: PazYSalvoData): string {
  const tieneMonto = data.montoTotalSaldado !== undefined && data.montoTotalSaldado > 0;
  const montoSaldado = tieneMonto ? `\nValor cancelado: ${formatearMoneda(data.montoTotalSaldado!)}` : '';

  return `CERTIFICADO DE PAZ Y SALVO GENERAL
Certificado N°: ${data.numeroCertificado || '001'}
Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

QUIEN SUSCRIBE:
${data.nombreEmisor || 'EMISOR'} (${data.tipoDocEmisor} N° ${data.numDocEmisor || ''})
${data.cargoEmisor ? `Calidad / Cargo: ${data.cargoEmisor}\n` : ''}Dirección: ${data.direccionEmisor || ''}

HACE CONSTAR QUE:
El(la) señor(a) / entidad ${data.nombreBeneficiario || 'BENEFICIARIO'} (${data.tipoDocBeneficiario} N° ${data.numDocBeneficiario || ''})
ha dado cumplimiento a cabalidad a las obligaciones a su cargo derivadas de:
- Referencia: ${data.referenciaContrato || 'Relación contractual'}
- Cumplimiento: ${data.detalleCumplimiento || ''}${montoSaldado}

DECLARACIÓN DE PAZ Y SALVO:
${data.declaracionTexto || ''}

${
  data.renunciaAcciones
    ? 'Las partes reconocen que las obligaciones han quedado legalmente extinguidas de conformidad con el Artículo 1625 del Código Civil colombiano, sin reclamación pendiente judicial o extrajudicial.'
    : ''
}
${data.incluyeNotaAclaratoria && data.notaAclaratoria ? `\nNota: ${data.notaAclaratoria}` : ''}

_____________________________
${data.nombreEmisor || 'EMISOR'}
${data.tipoDocEmisor} N° ${data.numDocEmisor || ''}
${data.cargoEmisor || ''}`;
}

export function calculateCompletion(data: PazYSalvoData): number {
  const fields = [
    data.numeroCertificado,
    data.ciudad,
    data.fecha,
    data.nombreEmisor,
    data.numDocEmisor,
    data.nombreBeneficiario,
    data.numDocBeneficiario,
    data.referenciaContrato,
    data.detalleCumplimiento,
    data.declaracionTexto,
  ];

  const filled = fields.filter((f) => f !== undefined && f !== null && f !== '').length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: PazYSalvoData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Paz_y_Salvo';
  const person = (data.nombreBeneficiario || 'Beneficiario')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const pazYSalvoDefinition = createDocumentDefinition<PazYSalvoData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'pazYSalvo',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreEmisor',
    tipoDocumento: 'tipoDocEmisor',
    numeroDocumento: 'numDocEmisor',
    ciudad: 'ciudad',
    telefono: 'telefonoEmisor',
    correo: 'correoEmisor',
    direccion: 'direccionEmisor',
    cargoOProfesion: 'cargoEmisor',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'EXPEDIDO Y CERTIFICADO POR:',
      name: data.nombreEmisor || 'EMISOR',
      doc: `${data.tipoDocEmisor} N° ${data.numDocEmisor || ''}`,
      note: data.cargoEmisor || undefined,
    },
    right: {
      role: 'BENEFICIARIO (PAZ Y SALVO):',
      name: data.nombreBeneficiario || 'BENEFICIARIO',
      doc: `${data.tipoDocBeneficiario} N° ${data.numDocBeneficiario || ''}`,
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
