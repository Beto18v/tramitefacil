import React from 'react';
import { AutorizacionPatiosData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: AutorizacionPatiosData): string {
  const facultadesTexto = (data.facultadesExpresas || [])
    .filter((f: string) => f.trim() !== '')
    .map((f: string, i: number) => `${i + 1}. ${f}`)
    .join('\n');

  return `PODER ESPECIAL Y AUTORIZACIÓN PARA RETIRO DE VEHÍCULO EN PATIOS
(Ley 769 de 2002 - Código Nacional de Tránsito)

${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.organismoTransito || 'ORGANISMO DE TRÁNSITO Y TRANSPORTE'}
Área de Trámites y Entrega de Vehículos Inmovilizados / Patios

ASUNTO: Poder especial amplio y suficiente para retiro de vehículo inmovilizado con placas ${data.placaVehiculo || ''}${data.numeroComparendo ? ` (Comparendo N° ${data.numeroComparendo})` : ''}

Yo, ${data.nombrePropietario || '[PROPIETARIO]'}, mayor de edad, identificado(a) con ${data.tipoDocPropietario} N° ${data.numDocPropietario || '____________'}, domiciliado(a) en ${data.ciudad || 'esta ciudad'}, propietario(a) del automotor de placas ${data.placaVehiculo || ''}, marca/línea ${data.marcaModelo || ''}, confiero PODER ESPECIAL, AMPLIO Y SUFICIENTE a ${data.nombreAutorizado || '[AUTORIZADO]'}, identificado(a) con ${data.tipoDocAutorizado} N° ${data.numDocAutorizado || '____________'}, para tramitar la desinmovilización y retiro del automotor.

${facultadesTexto ? `FACULTADES EXPRESAS:\n${facultadesTexto}\n` : ''}
El apoderado cuenta con facultades para comparecer a audiencias, presentar comprobantes de pago de grúa y parqueadero en el patio ${data.patioUbicacion || 'oficial'}, suscribir acta de entrega e inventario físico, y retirar el automotor.

_____________________________               _____________________________
OTORGANTE / PODERDANTE                       ACEPTO (APODERADO / AUTORIZADO)
${data.nombrePropietario || ''}              ${data.nombreAutorizado || ''}
${data.tipoDocPropietario} ${data.numDocPropietario || ''} ${data.tipoDocAutorizado} ${data.numDocAutorizado || ''}`;
}

export function calculateCompletion(data: AutorizacionPatiosData): number {
  const fieldsToCheck = [
    data.nombrePropietario,
    data.numDocPropietario,
    data.nombreAutorizado,
    data.numDocAutorizado,
    data.placaVehiculo,
    data.organismoTransito,
    data.marcaModelo,
    data.ciudad,
    data.fecha,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const autorizacionPatiosDefinition: DocumentDefinition<AutorizacionPatiosData> = {
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

