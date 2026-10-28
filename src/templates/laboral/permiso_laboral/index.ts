import React from 'react';
import { PermisoLaboralData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: PermisoLaboralData): string {
  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.nombreEmpresa || 'EMPRESA'}
Atención: ${data.nombreJefe || 'Jefe Inmediato'} (${data.cargoJefe || ''})

ASUNTO: Solicitud de Permiso / Licencia Laboral

Yo, ${data.nombreEmpleado || 'Empleado'}, identificado con ${data.tipoDocumento} N° ${data.numeroDocumento}, desempeñando el cargo de ${data.cargoEmpleado || ''}, me permito solicitar formalmente autorización para ausentarme de mis labores.

Tipo de solicitud: ${(data.tipoPermiso || '').toUpperCase()}
Período: Desde el ${data.fechaInicio || ''} hasta el ${data.fechaFin || ''} (Total: ${data.diasTotales || 1} días hábiles)

Motivación detallada:
${data.motivoDetallado || ''}

${data.anexaSoportes ? 'Se adjuntan los soportes y documentos justificativos pertinentes.' : ''}
${data.compensacionHoras ? `Compromiso de compensación: ${data.compensacionHoras}` : ''}

Cordialmente,

_____________________________
${data.nombreEmpleado || 'EMPLEADO'}
${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}`;
}

export function calculateCompletion(data: PermisoLaboralData): number {
  const fieldsToCheck = [
    data.nombreEmpresa,
    data.nombreJefe,
    data.ciudad,
    data.fecha,
    data.nombreEmpleado,
    data.numeroDocumento,
    data.cargoEmpleado,
    data.tipoPermiso,
    data.fechaInicio,
    data.fechaFin,
    data.motivoDetallado,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const permisoLaboralDefinition: DocumentDefinition<PermisoLaboralData> = {
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

