import React from 'react';
import { ContratoArrendamientoData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: ContratoArrendamientoData): string {
  return `CONTRATO DE ARRENDAMIENTO DE VIVIENDA URBANA (LEY 820 DE 2003)

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

ARRENDADOR: ${data.nombreArrendador || 'Arrendador'}, ${data.tipoDocArrendador} N° ${data.numDocArrendador}, Tel: ${data.telefonoArrendador}
ARRENDATARIO: ${data.nombreArrendatario || 'Arrendatario'}, ${data.tipoDocArrendatario} N° ${data.numDocArrendatario}, Tel: ${data.telefonoArrendatario}
${data.incluyeCodeudor && data.nombreCodeudor ? `CODEUDOR SOLIDARIO: ${data.nombreCodeudor}, ${data.tipoDocCodeudor} N° ${data.numDocCodeudor}, Tel: ${data.telefonoCodeudor}\n` : ''}
PRIMERA. INMUEBLE OBJETO:
${data.direccionInmueble || ''}${data.matriculaInmobiliaria ? ` (Matrícula Inmobiliaria: ${data.matriculaInmobiliaria})` : ''}.

SEGUNDA. CANON MENSUAL:
El canon mensual pactado es de ${formatearMoneda(data.canonMensual || 0)} (${numeroALetras(data.canonMensual || 0)}).
Pago en los primeros ${data.diaLimitePago || 5} días de cada mes.
Forma de pago: ${data.formaPagoCanon || ''}.

TERCERA. TÉRMINO DE DURACIÓN:
${data.duracionMeses || 12} meses, contados desde el ${data.fechaInicio || ''} hasta el ${data.fechaFin || ''}.

CUARTA. SERVICIOS PÚBLICOS Y ADMINISTRACIÓN:
Servicios a cargo de: ${data.responsableServicios || 'Arrendatario'}.
${data.cuotaAdministracion ? `Cuota de administración mensual: ${formatearMoneda(data.cuotaAdministracion)}.` : ''}

${data.montoDepositoGarantia ? `QUINTA. DEPÓSITO DE SERVICIOS: ${formatearMoneda(data.montoDepositoGarantia)}.` : ''}

En constancia se firma por las partes:

_____________________________
ARRENDADOR: ${data.nombreArrendador || ''}
${data.tipoDocArrendador || 'C.C.'} ${data.numDocArrendador || ''}

_____________________________
ARRENDATARIO: ${data.nombreArrendatario || ''}
${data.tipoDocArrendatario || 'C.C.'} ${data.numDocArrendatario || ''}
${data.incluyeCodeudor && data.nombreCodeudor ? `\n_____________________________\nCODEUDOR: ${data.nombreCodeudor}\n${data.tipoDocCodeudor || 'C.C.'} ${data.numDocCodeudor || ''}` : ''}`;
}

export function calculateCompletion(data: ContratoArrendamientoData): number {
  const fieldsToCheck = [
    data.nombreArrendador,
    data.numDocArrendador,
    data.nombreArrendatario,
    data.numDocArrendatario,
    data.direccionInmueble,
    data.canonMensual,
    data.fechaInicio,
    data.fechaFin,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const contratoArrendamientoDefinition: DocumentDefinition<ContratoArrendamientoData> = {
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

