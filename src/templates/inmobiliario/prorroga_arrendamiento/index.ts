import React from 'react';
import { ProrrogaArrendamientoData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: ProrrogaArrendamientoData): string {
  const canonAnt = formatearMoneda(data.canonAnterior);
  const nuevoCan = formatearMoneda(data.nuevoCanon);
  const nuevoLetras = data.nuevoCanonLetras || numeroALetras(data.nuevoCanon);

  return `OTROSÍ DE PRÓRROGA E INCREMENTO DE ARRENDAMIENTO
Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

PARTES INTERVINIENTES:
ARRENDADOR: ${data.nombreArrendador || 'ARRENDADOR'} (${data.tipoDocArrendador || 'C.C.'} ${data.numDocArrendador || ''})
ARRENDATARIO: ${data.nombreArrendatario || 'ARRENDATARIO'} (${data.tipoDocArrendatario || 'C.C.'} ${data.numDocArrendatario || ''})
${data.incluyeCodeudor && data.nombreCodeudor ? `CODEUDOR SOLIDARIO: ${data.nombreCodeudor} (${data.tipoDocCodeudor || 'C.C.'} ${data.numDocCodeudor || ''})` : ''}

CONSIDERANDO:
1. Que entre las partes se celebró contrato de arrendamiento sobre el inmueble ubicado en ${data.direccionInmueble || 'Dirección'}${data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}${data.fechaContratoOriginal ? `, suscrito el ${data.fechaContratoOriginal}` : ''}.
2. Que es mutua voluntad de las partes prorrogar el plazo pactado y concertar el nuevo canon de arrendamiento.

CLÁUSULAS:
PRIMERA. PRÓRROGA DEL PLAZO: Se prorroga la duración del contrato por ${data.duracionMeses || 12} meses, iniciando el ${data.fechaInicioProrroga || 'Fecha inicio'} hasta el ${data.fechaFinProrroga || 'Fecha fin'}.

SEGUNDA. INCREMENTO Y NUEVO CANON: De acuerdo con la Ley 820 de 2003 y el acuerdo voluntario, se aplica un incremento del ${data.porcentajeIncremento}% sobre el canon anterior (${canonAnt}), quedando fijado el nuevo canon mensual en ${nuevoCan} (${nuevoLetras}).

TERCERA. FORMA DE PAGO: ${data.formaDePago || 'Dentro de los primeros días de cada período mensual.'}${data.cuentaBancariaPago ? ` Cuenta de pago: ${data.cuentaBancariaPago}.` : ''}

CUARTA. RATIFICACIÓN: ${data.ratificacionTexto || 'Las demás cláusulas y obligaciones del contrato base no modificadas continúan plenamente vigentes.'}

FIRMAS:

_____________________________
EL ARRENDADOR:
${data.nombreArrendador || 'ARRENDADOR'}
${data.tipoDocArrendador || 'C.C.'} ${data.numDocArrendador || ''}
${data.telefonoArrendador ? `Tel: ${data.telefonoArrendador}` : ''}

_____________________________
EL ARRENDATARIO:
${data.nombreArrendatario || 'ARRENDATARIO'}
${data.tipoDocArrendatario || 'C.C.'} ${data.numDocArrendatario || ''}
${data.telefonoArrendatario ? `Tel: ${data.telefonoArrendatario}` : ''}
${
  data.incluyeCodeudor && data.nombreCodeudor
    ? `
_____________________________
CODEUDOR SOLIDARIO:
${data.nombreCodeudor}
${data.tipoDocCodeudor || 'C.C.'} ${data.numDocCodeudor || ''}
${data.telefonoCodeudor ? `Tel: ${data.telefonoCodeudor}` : ''}`
    : ''
}`;
}

export function calculateCompletion(data: ProrrogaArrendamientoData): number {
  const fields = [
    data.nombreArrendador,
    data.numDocArrendador,
    data.nombreArrendatario,
    data.numDocArrendatario,
    data.direccionInmueble,
    data.fechaContratoOriginal,
    data.fechaInicioProrroga,
    data.fechaFinProrroga,
    data.nuevoCanon > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: ProrrogaArrendamientoData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Prorroga_Arrendamiento';
  const person = (data.nombreArrendatario || 'Arrendatario')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const prorrogaArrendamientoDefinition = createDocumentDefinition<ProrrogaArrendamientoData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'prorrogaArrendamiento',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreArrendatario',
    numeroDocumento: 'numDocArrendatario',
    tipoDocumento: 'tipoDocArrendatario',
    telefono: 'telefonoArrendatario',
    correo: 'correoArrendatario',
    ciudad: 'ciudad',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'EL ARRENDADOR:',
      name: data.nombreArrendador || 'ARRENDADOR',
      doc: `${data.tipoDocArrendador || 'C.C.'}: ${data.numDocArrendador || '____________'}`,
      phone: data.telefonoArrendador ? `Tel: ${data.telefonoArrendador}` : undefined,
    },
    right: {
      role: 'EL ARRENDATARIO:',
      name: data.nombreArrendatario || 'ARRENDATARIO',
      doc: `${data.tipoDocArrendatario || 'C.C.'}: ${data.numDocArrendatario || '____________'}`,
      phone: data.telefonoArrendatario ? `Tel: ${data.telefonoArrendatario}` : undefined,
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
