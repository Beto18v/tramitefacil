import React from 'react';
import { ReciboPagoCanonData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda, numeroALetras } from '../../../utils/numberToWords';
import { SignatureBlock, LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<ReciboPagoCanonData>> = ({
  data,
  styleConfig,
}) => {
  const canonFormateado = formatearMoneda(data.valorCanon);
  const adminFormateado = formatearMoneda(data.valorAdministracion || 0);
  const serviciosFormateado = formatearMoneda(data.valorServicios || 0);
  const otrosFormateado = formatearMoneda(data.valorOtrosConceptos || 0);
  const totalFormateado = formatearMoneda(data.valorTotal);
  const totalLetras = data.valorTotalLetras || numeroALetras(data.valorTotal);

  const getFormaPagoTexto = (forma: string) => {
    switch (forma) {
      case 'transferencia':
        return 'Transferencia Electrónica';
      case 'efectivo':
        return 'Efectivo';
      case 'consignacion':
        return 'Consignación Bancaria';
      case 'cheque':
        return 'Cheque';
      default:
        return 'Consignación / Transferencia';
    }
  };

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'Recibo de Pago de Canon de Arrendamiento',
        subtitle: 'Comprobante de Pago y Paz y Salvo Periódico (Ley 820 de 2003, Art. 11)',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fechaPago || 'Fecha de pago'}`,
        badge: `RECIBO N° ${data.numeroConsecutivo || '001'}`,
      }}
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <SignatureBlock
              label="RECIBÍ CONFORME (ARRENDADOR):"
              signatureType={data.signatureType || 'text'}
              signatureDataUrl={data.signatureDataUrl}
              name={data.nombreArrendador}
              docType={data.tipoDocArrendador}
              docNumber={data.numDocArrendador}
              phone={data.telefonoArrendador}
              widthClass="w-72"
            />

            <div className="w-64 border border-slate-300 p-3 bg-slate-50 text-[11px] text-slate-700">
              <p className="font-bold text-slate-900 mb-1">ARRENDATARIO (PAGADOR):</p>
              <p className="font-semibold uppercase text-xs">{data.nombreArrendatario || 'Nombre Arrendatario'}</p>
              <p>
                {data.tipoDocArrendatario}: <span className="font-mono">{data.numDocArrendatario || '__________'}</span>
              </p>
              <p className="text-slate-500 mt-2 text-[10px]">
                Conserve este comprobante como soporte formal de pago y paz y salvo del período.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-slate-800 text-xs md:text-sm">
        {/* Identificación del arrendamiento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Inmueble Arrendado:</p>
            <p className="font-semibold text-slate-900">{data.direccionInmueble || '[Dirección del inmueble]'}</p>
            {data.ciudadInmueble && <p className="text-slate-600">{data.ciudadInmueble}</p>}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Período Cancelado:</p>
            <p className="font-bold text-emerald-800 text-sm md:text-base">
              {data.periodoMes || '[Mes / Período pagado]'}
            </p>
            <p className="text-slate-600">
              Forma de Pago: <strong>{getFormaPagoTexto(data.formaPago)}</strong>
              {data.referenciaPago ? ` (${data.referenciaPago})` : ''}
            </p>
          </div>
        </div>

        {/* Declaración de recepción */}
        <p className="text-justify leading-relaxed">
          Recibí de <strong>{data.nombreArrendatario || '________________'}</strong>, identificado(a) con{' '}
          {data.tipoDocArrendatario} N° <strong>{data.numDocArrendatario || '________________'}</strong>, en mi
          calidad de Arrendador(a) / Administrador(a) del inmueble descrito, la suma de{' '}
          <strong>{totalFormateado}</strong> (<strong>{totalLetras}</strong>), por los conceptos que a continuación
          se discriminan:
        </p>

        {/* Tabla de liquidación */}
        <div className="overflow-hidden border border-slate-300 rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 border-b border-slate-300 text-xs font-semibold">
                <th className="py-2 px-3">Concepto Liquidado</th>
                <th className="py-2 px-3 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              <tr>
                <td className="py-2 px-3">
                  <span className="font-medium text-slate-900">Canon mensual de arrendamiento</span>
                  <span className="block text-[11px] text-slate-500">Correspondiente al período {data.periodoMes}</span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">{canonFormateado}</td>
              </tr>
              {data.incluyeAdministracion && (Number(data.valorAdministracion) || 0) > 0 && (
                <tr>
                  <td className="py-2 px-3">
                    <span className="font-medium text-slate-900">Cuota de administración</span>
                    <span className="block text-[11px] text-slate-500">Expensas comunes del edificio / conjunto</span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">{adminFormateado}</td>
                </tr>
              )}
              {data.incluyeServicios && (Number(data.valorServicios) || 0) > 0 && (
                <tr>
                  <td className="py-2 px-3">
                    <span className="font-medium text-slate-900">Servicios públicos domiciliarios</span>
                    <span className="block text-[11px] text-slate-500">Aporte / reintegro facturación de servicios</span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">{serviciosFormateado}</td>
                </tr>
              )}
              {(Number(data.valorOtrosConceptos) || 0) > 0 && (
                <tr>
                  <td className="py-2 px-3">
                    <span className="font-medium text-slate-900">
                      {data.otrosConceptosDescripcion || 'Otros conceptos autorizados'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-medium text-slate-900">{otrosFormateado}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-300 font-bold">
                <td className="py-2.5 px-3 text-slate-950 uppercase text-xs">Total Recibido</td>
                <td className="py-2.5 px-3 text-right text-emerald-800 text-sm md:text-base font-mono font-bold">
                  {totalFormateado}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Declaración de Paz y Salvo */}
        {data.declaraPazYSalvo && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 text-xs space-y-1">
            <p className="font-bold uppercase tracking-wide text-emerald-900">
              Constancia Expresa de Paz y Salvo (Art. 11 Ley 820 de 2003):
            </p>
            <p className="text-justify leading-relaxed">
              El arrendador hace constar de manera fehaciente que, con la efectividad del presente pago, el arrendatario
              se encuentra a <strong>PAZ Y SALVO TOTAL</strong> por concepto de canon de arrendamiento y de las expensas
              aquí liquidadas correspondientes al período de <strong>{data.periodoMes}</strong>.
            </p>
          </div>
        )}

        {/* Observaciones adicionales */}
        {data.observaciones && (
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Observaciones: </span>
            {data.observaciones}
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};
