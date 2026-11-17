import React from 'react';
import { PagareInstruccionesData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: PagareInstruccionesData): string {
  const capitalLetras = data.capitalLetras || numeroALetras(data.capital);
  const capitalStr = formatearMoneda(data.capital);

  return `PAGARÉ INDIVIDUAL O SOLIDARIO (TÍTULO VALOR)
PAGARÉ N°: ${data.numeroPagare || '001'}
Ciudad y Fecha de Suscripción: ${data.ciudad || 'Ciudad'}, ${data.fechaSuscripcion || 'Fecha'}
Vencimiento: ${data.tipoVencimiento === 'a_la_vista' ? 'A LA VISTA' : data.fechaVencimiento || 'Según instrucciones'}
Capital Adeudado: ${capitalStr} (${capitalLetras})

ACREEDOR / TENEDOR LEGÍTIMO:
${data.nombreAcreedor || 'ACREEDOR'} (${data.tipoDocAcreedor} N° ${data.numDocAcreedor || ''})
Domicilio: ${data.ciudadAcreedor || data.ciudad}

DEUDOR PRINCIPAL (OTORGANTE):
${data.nombreDeudor || 'DEUDOR'} (${data.tipoDocDeudor} N° ${data.numDocDeudor || ''})
Dirección: ${data.direccionDeudor || ''} - Teléfono: ${data.telefonoDeudor || ''}
${
  data.incluirCodeudor
    ? `\nCODEUDOR / AVALISTA SOLIDARIO:
${data.nombreCodeudor || 'CODEUDOR'} (${data.tipoDocCodeudor} N° ${data.numDocCodeudor || ''})
Dirección: ${data.direccionCodeudor || ''} - Teléfono: ${data.telefonoCodeudor || ''}`
    : ''
}

1. PROMESA INCONDICIONAL DE PAGO:
Por medio del presente título valor prometemos pagar incondicionalmente a la orden del acreedor la suma de ${capitalLetras} (${capitalStr}), junto con los intereses causados.

2. INTERESES CORRIENTES Y DE MORA:
Interés corriente mensual: ${data.tasaInteresCorrienteMensual ?? 0}%. Interés moratorio a la ${data.tasaInteresMora}.

3. CLÁUSULA DE ACELERACIÓN Y RENUNCIA A REQUERIMIENTOS:
El no pago o retardo autoriza al acreedor a exigir judicial o extrajudicialmente el pago total de la obligación sin necesidad de requerimientos para constitución en mora ni protesto.
${
  data.incluirCartaInstrucciones
    ? `\nCARTA DE INSTRUCCIONES PARA LLENADO DE ESPACIOS EN BLANCO (Art. 622 C.Co):
Autorización irrevocable para llenar los espacios en blanco del pagaré adjunto en caso de mora:
- Causal de exigibilidad: ${data.eventoExigibilidad || ''}
- Instrucciones: ${data.instruccionesLlenado || ''}`
    : ''
}

_____________________________
DEUDOR PRINCIPAL: ${data.nombreDeudor || ''}
${data.tipoDocDeudor} N° ${data.numDocDeudor || ''}
${
  data.incluirCodeudor
    ? `\n_____________________________
CODEUDOR SOLIDARIO: ${data.nombreCodeudor || ''}
${data.tipoDocCodeudor} N° ${data.numDocCodeudor || ''}`
    : ''
}`;
}

export function calculateCompletion(data: PagareInstruccionesData): number {
  const fields: Array<string | number | undefined> = [
    data.numeroPagare,
    data.ciudad,
    data.fechaSuscripcion,
    data.nombreAcreedor,
    data.numDocAcreedor,
    data.nombreDeudor,
    data.numDocDeudor,
    data.direccionDeudor,
    data.capital,
  ];

  if (data.incluirCodeudor) {
    fields.push(data.nombreCodeudor, data.numDocCodeudor);
  }

  const filled = fields.filter((f) => f !== undefined && f !== null && f !== '').length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: PagareInstruccionesData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Pagare_Instrucciones';
  const person = (data.nombreDeudor || 'Deudor')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const pagareInstruccionesDefinition =
  createDocumentDefinition<PagareInstruccionesData>({
    meta,
    defaultData,
    sampleData,
    dataKey: 'pagareInstrucciones',
    renderView: (props) => React.createElement(DocumentView, props),
    renderForm: (props) => React.createElement(DocumentForm, props),
    toPlainText,
    calculateCompletion,
    getFilename,
    profileFieldMap: {
      nombreCompleto: 'nombreDeudor',
      tipoDocumento: 'tipoDocDeudor',
      numeroDocumento: 'numDocDeudor',
      ciudad: 'ciudadDeudor',
      direccion: 'direccionDeudor',
      telefono: 'telefonoDeudor',
      correo: 'correoDeudor',
    },
    getSignaturesForDocx: (data) => ({
      left: {
        role: 'DEUDOR(A) PRINCIPAL (OTORGANTE):',
        name: data.nombreDeudor || 'DEUDOR',
        doc: `${data.tipoDocDeudor} N° ${data.numDocDeudor || ''}`,
        note: data.incluirHuella ? 'Firma y huella dactilar' : undefined,
      },
      right: data.incluirCodeudor
        ? {
            role: 'CODEUDOR(A) / AVALISTA SOLIDARIO(A):',
            name: data.nombreCodeudor || 'CODEUDOR',
            doc: `${data.tipoDocCodeudor} N° ${data.numDocCodeudor || ''}`,
            note: data.incluirHuella ? 'Firma y huella dactilar' : undefined,
          }
        : {
            role: 'ACREEDOR / BENEFICIARIO:',
            name: data.nombreAcreedor || 'ACREEDOR',
            doc: `${data.tipoDocAcreedor} N° ${data.numDocAcreedor || ''}`,
          },
    }),
  });

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
