import React from 'react';
import { ImpugnacionFotomultasData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: ImpugnacionFotomultasData): string {
  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.organismoTransito || 'ORGANISMO DE TRÁNSITO Y TRANSPORTE'}
Área de Contravenciones / Inspección de Tránsito
${data.ciudadEntidad || data.ciudad || ''}

ASUNTO: Derecho de Petición e Impugnación de Fotocomparendo N° ${data.numeroComparendo || ''}
REFERENCIA: Vehículo Placa ${data.placaVehiculo || ''} - Sentencia C-038 de 2020

Yo, ${data.nombreSolicitante || 'PETICIONARIO'}, identificado(a) con ${data.tipoDocSolicitante || 'C.C.'} N° ${data.numDocSolicitante || ''}${data.expedicionSolicitante ? ` de ${data.expedicionSolicitante}` : ''}, en calidad de ${data.calidadSolicitante || 'propietario(a)'} del automotor de placa ${data.placaVehiculo || ''}, acudo en ejercicio del derecho de petición consagrado en el Art. 23 de la C.P. y la Ley 1755 de 2015, para solicitar la IMPUGNACIÓN Y ARCHIVO DEFINITIVO de la orden de comparendo N° ${data.numeroComparendo || ''}.

I. HECHOS:
1. Se expidió comparendo por presunta infracción ${data.codigoInfraccion || ''} el día ${data.fechaComparendo || ''}${data.horaComparendo ? ` a las ${data.horaComparendo}` : ''} en ${data.lugarInfraccion || 'la dirección registrada'}.
${data.causalFaltaIdentificacion ? '2. FALTA DE IDENTIFICACIÓN PLENA DEL CONDUCTOR: Conforme a la Sentencia C-038 de 2020 de la Corte Constitucional, la responsabilidad contravencional es estrictamente individual y subjetiva. No existe prueba técnica o testimonial que demuestre que el suscrito conducía el vehículo.\n' : ''}${data.causalFaltaNotificacion ? '3. INDEBIDA NOTIFICACIÓN: Incumplimiento del plazo de 3 días hábiles del Art. 8 Ley 1843 de 2017 para el envío formal de la citación.\n' : ''}${data.causalCalibracionSenalizacion ? '4. FALTA DE CALIBRACIÓN / SEÑALIZACIÓN: Ausencia de acreditación de calibración y señalización previa reglamentaria.\n' : ''}${data.hechosAdicionales ? `Detalles adicionales:\n${data.hechosAdicionales}\n` : ''}
II. FUNDAMENTOS JURÍDICOS:
- Arts. 23 y 29 de la Constitución Política (Debido Proceso y Derecho de Petición).
- Sentencia C-038 de 2020 y C-321 de 2022 de la Corte Constitucional.
- Ley 1843 de 2017 y Ley 1437 de 2011 (CPACA).

III. PETICIONES:
${data.solicitaExoneracion ? '1. EXONERAR al peticionario de toda responsabilidad contravencional.\n' : ''}${data.solicitaArchivoComparendo ? '2. ARCHIVAR definitivamente la orden de comparendo y actualizar el estado a paz y salvo en el SIMIT.\n' : ''}${data.solicitaPruebaTecnica ? '3. En subsidio, aportar prueba idónea donde se individualice fehacientemente al conductor infractor.\n' : ''}${data.peticionesAdicionales ? `${data.peticionesAdicionales}\n` : ''}
IV. ANEXOS:
${data.anexos || 'Copia de cédula y tarjeta de propiedad.'}

V. NOTIFICACIONES:
Dirección: ${data.direccionNotificacion || ''} (${data.ciudadNotificacion || ''})
Correo: ${data.correoNotificacion || ''}
Teléfono: ${data.telefonoSolicitante || ''}

Cordialmente,

_____________________________
${data.nombreSolicitante || 'PETICIONARIO'}
${data.tipoDocSolicitante || 'C.C.'}: ${data.numDocSolicitante || ''}`;
}

export function calculateCompletion(data: ImpugnacionFotomultasData): number {
  const fields = [
    data.organismoTransito,
    data.nombreSolicitante,
    data.numDocSolicitante,
    data.correoNotificacion,
    data.direccionNotificacion,
    data.numeroComparendo,
    data.fechaComparendo,
    data.placaVehiculo,
    data.codigoInfraccion,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: ImpugnacionFotomultasData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const placa = (data.placaVehiculo || 'Vehiculo').replace(/[^a-zA-Z0-9]/g, '');
  const cleanPrefix = `Impugnacion_Fotomulta_${placa}`;
  const person = (data.nombreSolicitante || 'Peticionario')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 15);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const impugnacionFotomultasDefinition = createDocumentDefinition<ImpugnacionFotomultasData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'impugnacionFotomultas',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreSolicitante',
    numeroDocumento: 'numDocSolicitante',
    tipoDocumento: 'tipoDocSolicitante',
    expedicionDocumento: 'expedicionSolicitante',
    telefono: 'telefonoSolicitante',
    correo: 'correoNotificacion',
    direccion: 'direccionNotificacion',
    ciudad: 'ciudad',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'EL SOLICITANTE / PETICIONARIO:',
      name: data.nombreSolicitante || 'SOLICITANTE',
      doc: `${data.tipoDocSolicitante || 'C.C.'}: ${data.numDocSolicitante || '____________'}`,
      phone: data.telefonoSolicitante ? `Tel: ${data.telefonoSolicitante}` : undefined,
      address: data.direccionNotificacion,
    },
    right: {
      role: 'CONSTANCIA DE RADICACIÓN:',
      name: data.organismoTransito || 'Organismo de Tránsito',
      note: 'Sello / Fecha / Radicado oficial',
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
