import React from 'react';
import { DerechoPeticionData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: DerechoPeticionData): string {
  const hechosTexto = (data.hechos || [])
    .filter((h: string) => h.trim() !== '')
    .map((h: string, i: number) => `${i + 1}. ${h}`)
    .join('\n');
  const peticionesTexto = (data.pretensiones || [])
    .filter((p: string) => p.trim() !== '')
    .map((p: string, i: number) => `${i + 1}. ${p}`)
    .join('\n');
  const anexosTexto = (data.anexos || [])
    .filter((a: string) => a.trim() !== '')
    .map((a: string) => `- ${a}`)
    .join('\n');

  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.entidadDestinataria || 'ENTIDAD DESTINATARIA'}
Atención: ${data.cargoDestinatario || ''} (${data.dependenciaDestinataria || ''})
${data.direccionEntidad || ''}
${data.correoEntidad ? `Correo: ${data.correoEntidad}` : ''}

ASUNTO: ${data.asunto || 'DERECHO DE PETICIÓN (Art. 23 C.P.)'}
${data.referencia ? `Referencia: ${data.referencia}\n` : ''}
Yo, ${data.nombrePeticionario || 'Peticionario'}, identificado con ${data.tipoDocumento} N° ${data.numeroDocumento || ''} expedida en ${data.lugarExpedicion || ''}, acudo en ejercicio del derecho fundamental del Art. 23 de la Constitución Política y Ley 1755 de 2015, con base en los siguientes:

HECHOS:
${hechosTexto}

PETICIONES:
${peticionesTexto}

${data.fundamentosDerecho ? `FUNDAMENTOS DE DERECHO:\n${data.fundamentosDerecho}\n` : ''}
${anexosTexto ? `ANEXOS:\n${anexosTexto}\n` : ''}
NOTIFICACIONES:
Dirección: ${data.direccionNotificacion || ''} (${data.ciudadNotificacion || data.ciudad || ''})
Correo: ${data.correo || ''} | Tel: ${data.telefono || ''}

Atentamente,

_____________________________
${data.nombrePeticionario || 'PETICIONARIO'}
${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}`;
}

export function calculateCompletion(data: DerechoPeticionData): number {
  const fieldsToCheck = [
    data.entidadDestinataria,
    data.asunto,
    data.nombrePeticionario,
    data.numeroDocumento,
    data.correo,
    data.direccionNotificacion,
    data.hechos?.length,
    data.pretensiones?.length,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const derechoPeticionDefinition: DocumentDefinition<DerechoPeticionData> = {
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

