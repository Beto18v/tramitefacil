import React from 'react';
import { CertificadoLaboralData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';

export function toPlainText(data: CertificadoLaboralData): string {
  return `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Señores:
${data.nombreEmpresa || 'EMPRESA'}
Atención: ${data.destinatarioArea || 'Gestión Humana'}

ASUNTO: Solicitud de expedición de Certificado Laboral (Art. 57 Numeral 7 del C.S.T.)

Yo, ${data.nombreTrabajador || 'Nombre del Trabajador'}, identificado con ${data.tipoDocumento} N° ${data.numeroDocumento}, en calidad de empleado / ex-empleado de su compañía, acudo respetuosamente con el fin de solicitar la expedición de un certificado laboral formal.

Detalles requeridos:
- Cargo desempeñado: ${data.cargoDesempenado || ''}
- Período laborado: ${data.periodoTrabajado || ''}
${data.incluirSalario ? '- Se solicita incluir el salario básico y tipo de remuneración.' : ''}
${data.incluirFunciones ? '- Se solicita incluir el detalle de responsabilidades y funciones desempeñadas.' : ''}
Motivo: ${data.motivoSolicitud || 'Trámites personales'}

Agradezco enviar dicho certificado al correo electrónico: ${data.correoEntrega || ''}.

Atentamente,

_____________________________
${data.nombreTrabajador || 'TRABAJADOR'}
${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}`;
}

export function calculateCompletion(data: CertificadoLaboralData): number {
  const fieldsToCheck = [
    data.nombreEmpresa,
    data.destinatarioArea,
    data.ciudad,
    data.fecha,
    data.nombreTrabajador,
    data.numeroDocumento,
    data.cargoDesempenado,
    data.periodoTrabajado,
    data.correoEntrega,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const certificadoLaboralDefinition: DocumentDefinition<CertificadoLaboralData> = {
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

