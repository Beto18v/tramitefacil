import React from 'react';
import { ReclamoServiciosPublicosData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: ReclamoServiciosPublicosData): string {
  const valor = formatearMoneda(data.valorReclamado);

  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.empresaServicios || 'EMPRESA DE SERVICIOS PÚBLICOS DOMICILIARIOS'}
Oficina de Peticiones, Quejas, Reclamos y Recursos (PQR)
${data.ciudadEmpresa || data.ciudad || ''}

ASUNTO: Reclamo contra factura y Derecho de Petición (Ley 142 de 1994, Arts. 149, 154 y 155)
REFERENCIA: Cuenta Contrato / NIC: ${data.cuentaContrato || ''} - Factura N°: ${data.numeroFactura || ''}

Yo, ${data.nombreUsuario || 'USUARIO'}, identificado(a) con ${data.tipoDocUsuario || 'C.C.'} N° ${data.numDocUsuario || ''}, en mi condición de ${data.calidadUsuario || 'usuario(a)'} del predio ubicado en ${data.direccionInmueble || 'Dirección'}${data.ciudadInmueble ? ` de ${data.ciudadInmueble}` : ''}, formulo RECLAMO FORMAL frente a la factura N° ${data.numeroFactura || ''} por valor de ${valor} correspondiente al período ${data.periodoFacturado || ''}.

I. HECHOS:
1. En la factura se imputa un consumo extraordinario de ${data.consumoCobrado || 'consumo elevado'} por valor de ${valor}, frente al promedio histórico habitual del predio de ${data.consumoHistoricoPromedio || 'promedio ordinario'}, configurando una desviación significativa en los términos del Art. 149 de la Ley 142 de 1994.
2. La empresa omitió practicar la investigación técnica previa e imperativa antes de emitir la factura.
${data.descripcionHechos ? `3. Detalles adicionales:\n${data.descripcionHechos}\n` : ''}
II. FUNDAMENTOS JURÍDICOS:
- Art. 23 de la Constitución Política (Derecho Fundamental de Petición).
- Arts. 149, 154 y 155 de la Ley 142 de 1994 (Régimen de Servicios Públicos Domiciliarios).

III. PETICIONES:
${data.solicitaInvestigacionDesviacion ? '1. Practicar visita técnica especializada en el predio para revisión del medidor y verificación de ausencia de fugas.\n' : ''}${data.solicitaReliquidacion ? `2. Reliquidar la factura al promedio histórico del predio (${data.consumoHistoricoPromedio || 'promedio histórico'}).\n` : ''}${data.solicitaNoSuspension ? '3. Abstenerse de suspender o cortar el servicio de conformidad con el Art. 155 de la Ley 142 de 1994 y expedir cupón provisional para pagos no reclamados.\n' : ''}${data.peticionesAdicionales ? `${data.peticionesAdicionales}\n` : ''}
IV. ANEXOS:
${data.anexos || 'Copia de factura reclamada y facturas anteriores.'}

V. NOTIFICACIONES:
Dirección: ${data.direccionInmueble || ''} (${data.ciudadInmueble || ''})
Correo: ${data.correoNotificaciones || ''}
Teléfono: ${data.telefonoUsuario || ''}

Cordialmente,

_____________________________
${data.nombreUsuario || 'USUARIO'}
${data.tipoDocUsuario || 'C.C.'}: ${data.numDocUsuario || ''}`;
}

export function calculateCompletion(data: ReclamoServiciosPublicosData): number {
  const fields = [
    data.empresaServicios,
    data.nombreUsuario,
    data.numDocUsuario,
    data.cuentaContrato,
    data.direccionInmueble,
    data.correoNotificaciones,
    data.numeroFactura,
    data.periodoFacturado,
    data.valorReclamado > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: ReclamoServiciosPublicosData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Reclamo_Servicios_Publicos';
  const person = (data.nombreUsuario || 'Usuario')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const reclamoServiciosPublicosDefinition = createDocumentDefinition<ReclamoServiciosPublicosData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'reclamoServiciosPublicos',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreUsuario',
    numeroDocumento: 'numDocUsuario',
    tipoDocumento: 'tipoDocUsuario',
    telefono: 'telefonoUsuario',
    correo: 'correoNotificaciones',
    direccion: 'direccionInmueble',
    ciudad: 'ciudad',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'EL USUARIO / PETICIONARIO:',
      name: data.nombreUsuario || 'USUARIO',
      doc: `${data.tipoDocUsuario || 'C.C.'}: ${data.numDocUsuario || '____________'}`,
      phone: data.telefonoUsuario ? `Tel: ${data.telefonoUsuario}` : undefined,
      address: data.direccionInmueble,
    },
    right: {
      role: 'CONSTANCIA DE RADICACIÓN PQR:',
      name: data.empresaServicios || 'Empresa de Servicios Públicos',
      note: 'Número de radicado / Fecha de recepción',
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
