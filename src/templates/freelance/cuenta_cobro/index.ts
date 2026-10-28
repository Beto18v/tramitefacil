import React from 'react';
import { CuentaCobroData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { calcularTotalesCuentaCobro, calcularSubtotalConceptos } from './calculations';
import { numeroALetras, formatearMoneda } from '../../../utils/numberToWords';

export function toPlainText(data: CuentaCobroData): string {
  const subtotalCalculado =
    data.usarConceptosMultiples && data.conceptos && data.conceptos.length > 0
      ? calcularSubtotalConceptos(data.conceptos)
      : data.valorSubtotal || 0;

  const { subtotal, reteFuente, reteICA, totalNeto } = calcularTotalesCuentaCobro(
    subtotalCalculado,
    data.aplicaReteFuente,
    data.porcentajeReteFuente,
    data.aplicaReteICA,
    data.porcentajeReteICA
  );

  const letras = numeroALetras(totalNeto, data.moneda || 'PESOS M/CTE.');

  return `CUENTA DE COBRO N° ${data.numeroConsecutivo || '001'}

Ciudad y Fecha: ${data.ciudad || 'Ciudad'}, ${data.fechaEmision || 'Fecha'}

DEBE A:
Contratista: ${data.nombreContratista || 'NOMBRE DEL CONTRATISTA'}
${data.tipoDocumentoContratista || 'C.C.'}: ${data.numeroDocumentoContratista || 'Documento'} de ${data.expedicionContratista || ''}
Teléfono: ${data.telefonoContratista || 'N/A'} | Correo: ${data.correoContratista || 'N/A'}
Dirección: ${data.direccionContratista || 'N/A'}

A FAVOR DE:
Cliente / Empresa: ${data.nombreCliente || 'NOMBRE DEL CLIENTE'}
${data.tipoDocumentoCliente || 'NIT'}: ${data.numeroDocumentoCliente || 'NIT'}
Ciudad: ${data.ciudadCliente || ''}

LIQUIDACIÓN:
Subtotal Honorarios: ${formatearMoneda(subtotal)}
${data.aplicaReteFuente ? `(-) Retención en la Fuente (${data.porcentajeReteFuente}%): ${formatearMoneda(reteFuente)}` : ''}
${data.aplicaReteICA ? `(-) Retención de ICA (${data.porcentajeReteICA}%): ${formatearMoneda(reteICA)}` : ''}
TOTAL NETO A PAGAR: ${formatearMoneda(totalNeto)}
SON: ${letras}

CONCEPTO:
${data.concepto || 'Prestación de servicios profesionales.'}

Período de prestación: ${data.periodoPrestacion || 'N/A'}
N° de Contrato / O.S.: ${data.numeroContrato || 'N/A'}

DATOS BANCARIOS:
Banco: ${data.banco || 'Bancolombia'} | Tipo: ${data.tipoCuenta || 'Ahorros'}
Número: ${data.numeroCuenta || 'XXXXXXXX'}
Titular: ${data.titularCuenta || data.nombreContratista || ''}

DECLARACIONES LEGALES:
${data.declaraSeguridadSocial ? '- Declaro bajo juramento haber realizado los aportes correspondientes a la Seguridad Social Integral (Salud, Pensión y Riesgos Laborales) de acuerdo a la normatividad legal vigente.' : ''}
${data.declaraNoResponsableIVA ? '- Manifiesto pertenecer al régimen de no responsables del Impuesto sobre las Ventas (IVA) conforme al Art. 437 del Estatuto Tributario.' : ''}

Atentamente,

_____________________________
${data.nombreContratista || 'FIRMA CONTRATISTA'}
${data.tipoDocumentoContratista}: ${data.numeroDocumentoContratista || ''}`;
}

export function calculateCompletion(data: CuentaCobroData): number {
  const fieldsToCheck = [
    data.numeroConsecutivo,
    data.fechaEmision,
    data.ciudad,
    data.nombreContratista,
    data.numeroDocumentoContratista,
    data.nombreCliente,
    data.numeroDocumentoCliente,
    data.usarConceptosMultiples ? data.conceptos?.length : (data.concepto && data.valorSubtotal),
    data.numeroCuenta,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const cuentaCobroDefinition: DocumentDefinition<CuentaCobroData> = {
  meta,
  defaultData,
  sampleData,
  renderView: (props) => React.createElement(DocumentView, props),
  renderForm: (props) => React.createElement(DocumentForm, props),
  toPlainText,
  calculateCompletion,
};

export * from './schema';
export * from './calculations';
export * from './DocumentView';
export * from './DocumentForm';

