import React from 'react';
import { PropuestaServiciosData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: PropuestaServiciosData): string {
  const entregablesTexto =
    data.entregables && data.entregables.length > 0
      ? data.entregables.map((e, idx) => `  ${idx + 1}. ${e}`).join('\n')
      : '  (No especificados)';

  return `PROPUESTA DE SERVICIOS PROFESIONALES
${data.tituloProyecto ? data.tituloProyecto.toUpperCase() : 'OFERTA COMERCIAL'}

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}
Validez de la oferta: ${data.validezDias || 15} días calendario

PRESENTADO POR (PROPONENTE):
${data.nombreProponente || 'Nombre del Proponente'}
${data.profesionProponente || 'Profesional'}
ID: ${data.identificacionProponente || 'N/A'}
Teléfono: ${data.telefonoProponente || 'N/A'} | Correo: ${data.correoProponente || 'N/A'}

DIRIGIDO A (CLIENTE):
${data.nombreCliente || 'Nombre Cliente'}
${data.cargoCliente ? `${data.cargoCliente} - ` : ''}${data.empresaCliente || 'Empresa Cliente'}

1. OBJETIVO GENERAL:
${data.objetivoGeneral || 'Prestación de servicios profesionales.'}

2. ALCANCE DETALLADO:
${data.alcanceDetallado || 'Actividades acordadas según propuesta.'}

3. ENTREGABLES PRINCIPALES:
${entregablesTexto}

4. CRONOGRAMA ESTIMADO:
${data.cronogramaSemanas || 'A convenir'}

5. CONDICIONES ECONÓMICAS:
Honorarios Totales: ${formatearMoneda(data.honorariosTotales || 0)}
Forma de Pago: ${data.formaDePago || 'Contra entrega a satisfacción'}

6. EXCLUSIONES Y CONDICIONES:
${data.exclusionesYCondiciones || 'No incluye costos imprevistos de terceros.'}

Atentamente,

_____________________________
${data.nombreProponente || 'FIRMA PROPONENTE'}
${data.identificacionProponente || ''}`;
}

export function calculateCompletion(data: PropuestaServiciosData): number {
  const fieldsToCheck = [
    data.tituloProyecto,
    data.nombreProponente,
    data.identificacionProponente,
    data.nombreCliente,
    data.objetivoGeneral,
    data.alcanceDetallado,
    data.entregables?.length,
    data.honorariosTotales,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export function getFilename(data: PropuestaServiciosData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = meta.title.replace(/[^a-zA-Z0-9]/g, '_');
  const personOrOrg = (data.nombreProponente || 'Proponente');
  const cleanPerson = personOrOrg.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  return `${cleanPrefix}_${cleanPerson}_${today}.${ext}`;
}

export const propuestaServiciosDefinition: DocumentDefinition<PropuestaServiciosData> = {
  getFilename,
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

