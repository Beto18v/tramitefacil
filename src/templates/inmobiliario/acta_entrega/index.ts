import React from 'react';
import { ActaEntregaData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: ActaEntregaData): string {
  const pazSalvosTexto = (data.pazSalvosPresentados || []).map((p: string) => `- ${p}`).join('\n');

  return `ACTA DE ENTREGA DE INMUEBLE, INVENTARIO Y LLAVES

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'} - Hora: ${data.hora || ''}
Inmueble: ${data.direccionInmueble || ''}

QUIEN ENTREGA: ${data.nombreEntrega || ''} (${data.calidadEntrega || ''}) - ${data.docEntrega || ''}
QUIEN RECIBE: ${data.nombreRecibe || ''} (${data.calidadRecibe || ''}) - ${data.docRecibe || ''}

1. LLAVES ENTREGADAS:
Se entregan un total de ${data.juegosLlavesEntregados || 2} juego(s) de llaves de las cerraduras principales y accesos.

2. ESTADO FÍSICO GENERAL:
${data.estadoGeneralParedesPisos || ''}

3. LECTURAS FINALES DE MEDIDORES:
- Acueducto / Agua: ${data.lecturaAgua || ''}
- Energía Eléctrica: ${data.lecturaEnergia || ''}
- Gas Domiciliario: ${data.lecturaGas || ''}

4. PAZ Y SALVOS APORTADOS:
${pazSalvosTexto || '- No se aportaron soportes en este acto.'}

5. OBSERVACIONES Y ACUERDOS:
${data.observacionesPendientes || 'Sin observaciones pendientes.'}

En constancia se firma a conformidad:

_____________________________
ENTREGA: ${data.nombreEntrega || ''}
${data.docEntrega || ''}

_____________________________
RECIBE: ${data.nombreRecibe || ''}
${data.docRecibe || ''}`;
}

export function calculateCompletion(data: ActaEntregaData): number {
  const fieldsToCheck = [
    data.nombreEntrega,
    data.docEntrega,
    data.nombreRecibe,
    data.docRecibe,
    data.direccionInmueble,
    data.fecha,
    data.juegosLlavesEntregados,
    data.estadoGeneralParedesPisos,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const actaEntregaDefinition: DocumentDefinition<ActaEntregaData> = {
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

