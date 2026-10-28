import React from 'react';
import { CompraventaVehiculoData } from '../../../types/documents';
import { DocumentDefinition } from '../../types';
import { meta, defaultData, sampleData } from './schema';
import { DocumentView } from './DocumentView';
import { DocumentForm } from './DocumentForm';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';

export function toPlainText(data: CompraventaVehiculoData): string {
  return `CONTRATO DE COMPRAVENTA DE VEHÍCULO AUTOMOTOR
(Ley 769 de 2002 y Código de Comercio)

${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}

Entre los suscritos:
VENDEDOR: ${data.nombreVendedor || '[VENDEDOR]'}, ${data.tipoDocVendedor} N° ${data.numDocVendedor || '____________'}, domiciliado en ${data.direccionVendedor || ''}, tel. ${data.telefonoVendedor || ''}.
COMPRADOR: ${data.nombreComprador || '[COMPRADOR]'}, ${data.tipoDocComprador} N° ${data.numDocComprador || '____________'}, domiciliado en ${data.direccionComprador || ''}, tel. ${data.telefonoComprador || ''}.

PRIMERA. OBJETO: El VENDEDOR transfiere a título de compraventa al COMPRADOR el siguiente automotor:
- Placa: ${data.placa || ''}
- Clase: ${data.claseVehiculo || ''}
- Marca: ${data.marca || ''}
- Línea: ${data.linea || ''}
- Modelo (Año): ${data.modeloAnio || ''}
- Color: ${data.color || ''}
- N° Motor: ${data.numeroMotor || ''}
- N° Chasis / VIN: ${data.numeroChasis || ''}

SEGUNDA. PRECIO: El precio convenido es ${formatearMoneda(data.precioVenta)} (${numeroALetras(data.precioVenta)}), cancelado así: ${data.formaPago || 'Conforme a lo pactado'}.

TERCERA. TRASPASO Y GASTOS: ${data.gastosTraspasoPorcentajes || 'Por partes iguales (50% y 50%)'}.

CUARTA. SANEAMIENTO Y PAZ Y SALVO: El VENDEDOR garantiza saneamiento por evicción y vicios redhibitorios.${data.pazYSalvoMultas ? ' Asimismo garantiza entrega a paz y salvo total por multas SIMIT, impuestos y gravámenes.' : ''}

_____________________________               _____________________________
EL VENDEDOR                                  EL COMPRADOR
${data.nombreVendedor || ''}                ${data.nombreComprador || ''}
${data.tipoDocVendedor} ${data.numDocVendedor || ''}   ${data.tipoDocComprador} ${data.numDocComprador || ''}`;
}

export function calculateCompletion(data: CompraventaVehiculoData): number {
  const fieldsToCheck = [
    data.nombreVendedor,
    data.numDocVendedor,
    data.nombreComprador,
    data.numDocComprador,
    data.placa,
    data.marca,
    data.linea,
    data.modeloAnio,
    data.precioVenta,
    data.formaPago,
  ];

  const filled = fieldsToCheck.filter(Boolean).length;
  return Math.round((filled / fieldsToCheck.length) * 100);
}

export const compraventaVehiculoDefinition: DocumentDefinition<CompraventaVehiculoData> = {
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

