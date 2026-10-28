import React from 'react';
import { CartaRenunciaData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: CartaRenunciaData): string {
  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.nombreEmpresa || 'EMPRESA'}
Atención: ${data.nombreDestinatario || ''}
${data.cargoDestinatario || 'Gestión Humana'} (${data.departamento || ''})

ASUNTO: Renuncia voluntaria e irrevocable al cargo de ${data.cargoTrabajador || 'Cargo'}

Respetados señores:

Por medio de la presente me permito comunicar mi decisión voluntaria de presentar renuncia irrevocable al cargo de ${data.cargoTrabajador || 'Cargo'} que he venido desempeñando en la empresa${data.fechaIngreso ? ` desde el ${data.fechaIngreso}` : ''}.

Mi último día laborable será el ${data.ultimoDiaLaboral || 'Fecha'}.
${data.solicitaExoneracionPreaviso ? 'Solicito comedidamente la exoneración del término legal de preaviso para hacer efectiva mi desvinculación en la fecha indicada.' : ''}

${data.motivoDetalle || ''}

${data.parrafoAgradecimiento || ''}

${data.ofrecimientoEmpalme ? 'Reitero mi completa disposición para llevar a cabo una transición ordenada y empalme de mis funciones.' : ''}
${data.solicitudLiquidacion ? 'Solicito comedidamente la realización del examen médico de retiro y la liquidación definitiva de mis prestaciones sociales de ley.' : ''}

Cordialmente,

_____________________________
${data.nombreTrabajador || 'TRABAJADOR'}
${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}`;
}

export function calculateCompletion(data: CartaRenunciaData): number {
  const fieldsToCheck = [
    data.nombreEmpresa,
    data.ciudad,
    data.fecha,
    data.nombreTrabajador,
    data.numeroDocumento,
    data.cargoTrabajador,
    data.ultimoDiaLaboral,
    data.motivoDetalle,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const cartaRenunciaDefinition: DocumentDefinition<CartaRenunciaData> = {
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

