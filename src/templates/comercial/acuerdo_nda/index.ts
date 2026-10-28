import React from 'react';
import { AcuerdoNdaData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: AcuerdoNdaData): string {
  return `ACUERDO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN (${data.tipoNda === 'bilateral' ? 'BILATERAL' : 'UNILATERAL'})

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}
Vigencia de la reserva: ${data.duracionAnos || 3} años

ENTRE:
Parte Divulgante: ${data.nombreParteEmisora || 'Parte A'} (${data.tipoDocEmisora} N° ${data.numDocEmisora || ''})
Domicilio: ${data.domicilioEmisora || ''}

Y:
Parte Receptora: ${data.nombreParteReceptora || 'Parte B'} (${data.tipoDocReceptora} N° ${data.numDocReceptora || ''})
Domicilio: ${data.domicilioReceptora || ''}

1. PROPÓSITO DE LA REVELACIÓN:
${data.propositoNegociacion || ''}

2. OBLIGACIONES DE CONFIDENCIALIDAD:
La parte receptora se compromete a mantener estricta confidencialidad respecto a cualquier información técnica, operativa, comercial o de propiedad intelectual recibida.

3. VIGENCIA:
Las obligaciones permanecerán vigentes durante ${data.duracionAnos || 3} años a partir de la firma.

${data.clausulaPenalMonto ? `4. CLÁUSULA PENAL: ${formatearMoneda(data.clausulaPenalMonto)} en caso de filtración o uso no autorizado.` : ''}

En constancia se firma por las partes:

_____________________________
${data.nombreParteEmisora || 'PARTE A'}
${data.tipoDocEmisora} ${data.numDocEmisora || ''}

_____________________________
${data.nombreParteReceptora || 'PARTE B'}
${data.tipoDocReceptora} ${data.numDocReceptora || ''}`;
}

export function calculateCompletion(data: AcuerdoNdaData): number {
  const fieldsToCheck = [
    data.nombreParteEmisora,
    data.numDocEmisora,
    data.nombreParteReceptora,
    data.numDocReceptora,
    data.propositoNegociacion,
    data.duracionAnos,
    data.fecha,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const acuerdoNdaDefinition: DocumentDefinition<AcuerdoNdaData> = {
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

