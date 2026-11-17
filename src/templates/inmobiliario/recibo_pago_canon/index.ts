import React from 'react';
import { ReciboPagoCanonData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: ReciboPagoCanonData): string {
  const canon = formatearMoneda(data.valorCanon);
  const admin = formatearMoneda(data.valorAdministracion || 0);
  const servicios = formatearMoneda(data.valorServicios || 0);
  const otros = formatearMoneda(data.valorOtrosConceptos || 0);
  const total = formatearMoneda(data.valorTotal);
  const totalLetras = data.valorTotalLetras || numeroALetras(data.valorTotal);

  return `RECIBO DE PAGO DE CANON DE ARRENDAMIENTO N° ${data.numeroConsecutivo || '001'}
Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fechaPago || 'Fecha'}

INMUEBLE ARRENDADO: ${data.direccionInmueble || 'Dirección'}${data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}
PERÍODO CANCELADO: ${data.periodoMes || 'Mes cancelado'}

ARRENDADOR / RECEPTOR: ${data.nombreArrendador || 'ARRENDADOR'} (${data.tipoDocArrendador || 'C.C.'} ${data.numDocArrendador || ''})
ARRENDATARIO / PAGADOR: ${data.nombreArrendatario || 'ARRENDATARIO'} (${data.tipoDocArrendatario || 'C.C.'} ${data.numDocArrendatario || ''})

DESGLOSE DE VALORES:
- Canon de arrendamiento: ${canon}
${data.incluyeAdministracion ? `- Cuota de administración: ${admin}\n` : ''}${data.incluyeServicios ? `- Servicios públicos: ${servicios}\n` : ''}${(Number(data.valorOtrosConceptos) || 0) > 0 ? `- ${data.otrosConceptosDescripcion || 'Otros conceptos'}: ${otros}\n` : ''}TOTAL RECIBIDO: ${total} (${totalLetras})

FORMA DE PAGO: ${data.formaPago ? data.formaPago.toUpperCase() : 'TRANSFERENCIA'}${data.referenciaPago ? ` (Ref: ${data.referenciaPago})` : ''}

${
  data.declaraPazYSalvo
    ? `PAZ Y SALVO (Art. 11 Ley 820 de 2003):
El arrendador deja constancia de que recibe a entera conformidad la suma detallada y declara a paz y salvo al arrendatario por el período ${data.periodoMes || ''}.`
    : ''
}
${data.observaciones ? `Observaciones: ${data.observaciones}` : ''}

FIRMA DE QUIEN RECIBE:

_____________________________
${data.nombreArrendador || 'EL ARRENDADOR'}
${data.tipoDocArrendador || 'C.C.'}: ${data.numDocArrendador || ''}
${data.telefonoArrendador ? `Tel: ${data.telefonoArrendador}` : ''}`;
}

export function calculateCompletion(data: ReciboPagoCanonData): number {
  const fields = [
    data.numeroConsecutivo,
    data.fechaPago,
    data.nombreArrendador,
    data.numDocArrendador,
    data.nombreArrendatario,
    data.numDocArrendatario,
    data.direccionInmueble,
    data.periodoMes,
    data.valorTotal > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: ReciboPagoCanonData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = `Recibo_Canon_${data.numeroConsecutivo || '001'}`;
  const person = (data.nombreArrendatario || 'Arrendatario')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const reciboPagoCanonDefinition = createDocumentDefinition<ReciboPagoCanonData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'reciboPagoCanon',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreArrendador',
    numeroDocumento: 'numDocArrendador',
    tipoDocumento: 'tipoDocArrendador',
    telefono: 'telefonoArrendador',
    ciudad: 'ciudad',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'RECIBÍ CONFORME (ARRENDADOR):',
      name: data.nombreArrendador || 'ARRENDADOR',
      doc: `${data.tipoDocArrendador || 'C.C.'}: ${data.numDocArrendador || '____________'}`,
      phone: data.telefonoArrendador ? `Tel: ${data.telefonoArrendador}` : undefined,
    },
    right: {
      role: 'ARRENDATARIO (PAGADOR):',
      name: data.nombreArrendatario || 'ARRENDATARIO',
      doc: `${data.tipoDocArrendatario || 'C.C.'}: ${data.numDocArrendatario || '____________'}`,
      note: 'Constancia de pago y paz y salvo recibido',
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
