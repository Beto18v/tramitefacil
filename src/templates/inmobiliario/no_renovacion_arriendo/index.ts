import React from 'react';
import { NoRenovacionArriendoData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: NoRenovacionArriendoData): string {
  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señor(a):
${data.nombreDestinatario || 'DESTINATARIO'}
${data.tipoDocDestinatario}: ${data.numDocDestinatario || ''}
Dirección: ${data.direccionNotificacion || ''}

ASUNTO: Comunicación formal de no renovación y restitución de inmueble arrendado

En mi calidad de ${data.rolRemitente ? data.rolRemitente.toUpperCase() : 'ARRENDADOR'} del inmueble ubicado en ${data.direccionInmueble || 'Dirección'}${data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}${data.matriculaInmobiliaria ? ` (Matrícula: ${data.matriculaInmobiliaria})` : ''}, le notifico de manera formal mi decisión irrevocable de no prorrogar el contrato de arrendamiento${data.fechaContrato ? ` suscrito el ${data.fechaContrato}` : ''}, conforme a la Ley 820 de 2003.

CAUSAL: ${data.causalInvocada || ''}
${data.detalleCausal || ''}

FECHA DE ENTREGA Y RESTITUCIÓN DE LLAVES:
${data.fechaEntregaInmueble || 'Fecha'} a las ${data.horaEntrega || '10:00 AM'}.

${data.instruccionesPazSalvo || ''}
${data.restitucionDeposito ? 'Una vez verificado el inventario y paz y salvos, se procederá al balance del depósito de garantía.' : ''}

Cordialmente,

_____________________________
${data.nombreRemitente || 'REMITENTE'}
${data.tipoDocRemitente || 'C.C.'} ${data.numDocRemitente || ''}
Tel: ${data.telefonoRemitente || ''}`;
}

export function calculateCompletion(data: NoRenovacionArriendoData): number {
  const fieldsToCheck = [
    data.nombreRemitente,
    data.numDocRemitente,
    data.nombreDestinatario,
    data.numDocDestinatario,
    data.direccionInmueble,
    data.fechaEntregaInmueble,
    data.causalInvocada,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const noRenovacionArriendoDefinition: DocumentDefinition<NoRenovacionArriendoData> = {
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

