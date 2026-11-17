import React from 'react';
import { LiquidacionLaboralData } from '../../../types/documents';
import { createDocumentDefinition } from '../../factory';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: LiquidacionLaboralData): string {
  const baseCalculo =
    data.salarioBaseLiquidacion ||
    data.salarioBase + (data.incluyeAuxilioTransporte ? data.auxilioTransporte : 0);

  return `LIQUIDACIÓN DEFINITIVA DE CONTRATO DE TRABAJO
Fecha: ${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}
Referencia Legal: C.S.T. Arts. 65, 249, 306 y Ley 50 de 1990

EMPLEADOR:
Razón Social: ${data.nombreEmpresa || 'EMPRESA'}
NIT: ${data.nitEmpresa || 'NIT'}
Ciudad: ${data.ciudadEmpresa || data.ciudad || ''}
Representante Legal: ${data.nombreRepresentante || ''}

TRABAJADOR:
Nombre: ${data.nombreTrabajador || 'TRABAJADOR'}
Documento: ${data.tipoDocumento || 'C.C.'} ${data.numeroDocumento || ''}
Cargo: ${data.cargoTrabajador || ''}

PERIODO LABORAL Y BASES:
Fecha de Ingreso: ${data.fechaIngreso || ''}
Fecha de Retiro: ${data.fechaRetiro || ''}
Motivo de Retiro: ${data.motivoRetiro || ''}
Salario Básico Mensual: ${formatearMoneda(data.salarioBase || 0)}
Auxilio de Transporte: ${data.incluyeAuxilioTransporte ? formatearMoneda(data.auxilioTransporte || 0) : '$ 0'}
Base Liquidación: ${formatearMoneda(baseCalculo)}

LIQUIDACIÓN DE CONCEPTOS:
1. Cesantías (${data.diasCesantias || 0} días): ${formatearMoneda(data.cesantiasValor || 0)}
2. Intereses a las Cesantías (${data.diasCesantias || 0} días): ${formatearMoneda(data.interesesCesantiasValor || 0)}
3. Prima Legal de Servicios (${data.diasPrima || 0} días): ${formatearMoneda(data.primaValor || 0)}
4. Vacaciones Compensadas (${data.diasVacaciones || 0} días): ${formatearMoneda(data.vacacionesValor || 0)}
${(data.otrosDevengos || 0) > 0 ? `5. Otros Devengos (${data.descripcionOtrosDevengos || 'Adicionales'}): ${formatearMoneda(data.otrosDevengos)}` : ''}
${(data.saludPensionDeducciones || 0) > 0 ? `(-) Deducciones Salud/Pensión: ${formatearMoneda(data.saludPensionDeducciones)}` : ''}
${(data.otrasDeducciones || 0) > 0 ? `(-) Otras Deducciones (${data.descripcionOtrasDeducciones || ''}): ${formatearMoneda(data.otrasDeducciones)}` : ''}

TOTAL NETO A PAGAR: ${formatearMoneda(data.totalLiquidacion || 0)}
SON EN LETRAS: ${data.totalEnLetras || ''}

DECLARACIÓN DE PAZ Y SALVO:
${data.pazYSalvoDeclaracion || ''}

FIRMAS:
__________________________________
EMPLEADOR: ${data.nombreRepresentante || data.nombreEmpresa || 'EMPLEADOR'}
NIT: ${data.nitEmpresa || ''}

__________________________________
TRABAJADOR: ${data.nombreTrabajador || 'TRABAJADOR'}
${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || ''}`;
}

export function calculateCompletion(data: LiquidacionLaboralData): number {
  const fields = [
    data.nombreEmpresa,
    data.nitEmpresa,
    data.nombreTrabajador,
    data.numeroDocumento,
    data.cargoTrabajador,
    data.fechaRetiro,
    data.motivoRetiro,
    data.salarioBase > 0,
    data.totalLiquidacion > 0,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export function getFilename(data: LiquidacionLaboralData, ext: 'pdf' | 'docx'): string {
  const today = new Date().toISOString().split('T')[0];
  const cleanPrefix = 'Liquidacion_Laboral';
  const person = (data.nombreTrabajador || 'Trabajador')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .slice(0, 20);
  return `${cleanPrefix}_${person}_${today}.${ext}`;
}

export const liquidacionLaboralDefinition = createDocumentDefinition<LiquidacionLaboralData>({
  meta,
  defaultData,
  sampleData,
  dataKey: 'liquidacionLaboral',
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
  getFilename,
  profileFieldMap: {
    nombreCompleto: 'nombreTrabajador',
    numeroDocumento: 'numeroDocumento',
    tipoDocumento: 'tipoDocumento',
    ciudad: 'ciudad',
    cargoOProfesion: 'cargoTrabajador',
  },
  getSignaturesForDocx: (data) => ({
    left: {
      role: 'POR EL EMPLEADOR:',
      name: data.nombreRepresentante || data.nombreEmpresa || 'EMPLEADOR',
      doc: data.nitEmpresa ? `NIT: ${data.nitEmpresa}` : undefined,
    },
    right: {
      role: 'EL TRABAJADOR (RECIBÍ CONFORME):',
      name: data.nombreTrabajador || 'TRABAJADOR',
      doc: `${data.tipoDocumento || 'C.C.'}: ${data.numeroDocumento || '________________'}`,
      note: 'Firma y huella dactilar',
    },
  }),
});

export * from './schema';
export * from './DocumentView';
export * from './DocumentForm';
