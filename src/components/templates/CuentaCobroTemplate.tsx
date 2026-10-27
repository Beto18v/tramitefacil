import React from 'react';
import { CuentaCobroData, DocumentStyleConfig } from '../../types/documents';
import { numeroALetras, formatearMoneda, calcularTotalesCuentaCobro } from '../../utils/numberToWords';

interface Props {
  data: CuentaCobroData;
  styleConfig: DocumentStyleConfig;
}

export const CuentaCobroTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[15px] leading-relaxed'
      : 'text-[13.5px] leading-relaxed';

  const { subtotal, reteFuente, reteICA, totalNeto } = calcularTotalesCuentaCobro(
    data.valorSubtotal || 0,
    data.aplicaReteFuente,
    data.porcentajeReteFuente,
    data.aplicaReteICA,
    data.porcentajeReteICA
  );

  const valorLetras = numeroALetras(totalNeto, data.moneda || 'PESOS M/CTE.');

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div>
        {/* Header bar */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950 uppercase">
              Cuenta de Cobro
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Documento equivalente a factura (Art. 1.6.1.4.12 D.U.R. 1625/2016)
            </p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 font-mono text-sm font-semibold text-slate-900">
              N° {data.numeroConsecutivo || '001'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {data.ciudad || 'Ciudad'}, {data.fechaEmision || 'Fecha de emisión'}
            </p>
          </div>
        </div>

        {/* Cliente / Deudor */}
        <div className="bg-slate-50 border border-slate-200 p-4 mb-6 text-xs md:text-sm">
          <p className="font-semibold text-slate-700 uppercase tracking-wide text-[11px] mb-1">
            Debe a favor de:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-800">
            <div>
              <span className="font-medium text-slate-600">Cliente / Empresa:</span>{' '}
              <strong className="text-slate-900">{data.nombreCliente || '__________________________________'}</strong>
            </div>
            <div>
              <span className="font-medium text-slate-600">{data.tipoDocumentoCliente}:</span>{' '}
              <span className="font-mono">{data.numeroDocumentoCliente || '___________________'}</span>
            </div>
            {data.direccionCliente && (
              <div>
                <span className="font-medium text-slate-600">Dirección:</span>{' '}
                {data.direccionCliente} ({data.ciudadCliente || 'Ciudad'})
              </div>
            )}
            {data.representanteCliente && (
              <div>
                <span className="font-medium text-slate-600">Atención / Ref:</span>{' '}
                {data.representanteCliente}
              </div>
            )}
          </div>
        </div>

        {/* Liquidación de montos con retenciones */}
        <div className="border border-slate-300 rounded-lg overflow-hidden my-5">
          <table className="w-full text-xs md:text-sm">
            <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 uppercase text-[11px]">
              <tr>
                <th className="text-left p-2.5">Detalle de Liquidación</th>
                <th className="text-right p-2.5">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="p-2.5 font-medium">Subtotal Honorarios / Servicios</td>
                <td className="p-2.5 text-right font-mono font-semibold">{formatearMoneda(subtotal)}</td>
              </tr>
              {data.aplicaReteFuente && (
                <tr className="text-slate-600">
                  <td className="p-2.5 pl-6">(-) Retención en la Fuente ({data.porcentajeReteFuente}%)</td>
                  <td className="p-2.5 text-right font-mono text-rose-700">-{formatearMoneda(reteFuente)}</td>
                </tr>
              )}
              {data.aplicaReteICA && (
                <tr className="text-slate-600">
                  <td className="p-2.5 pl-6">(-) Retención de ICA ({data.porcentajeReteICA}%)</td>
                  <td className="p-2.5 text-right font-mono text-rose-700">-{formatearMoneda(reteICA)}</td>
                </tr>
              )}
              <tr className="bg-slate-50/80 font-bold text-slate-950 text-sm md:text-base border-t-2 border-slate-900">
                <td className="p-3 uppercase">Total Neto a Pagar</td>
                <td className="p-3 text-right font-mono text-blue-900">{formatearMoneda(totalNeto)}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-700">
            <strong>SON:</strong> <span className="uppercase font-semibold">{valorLetras}</span>
          </div>
        </div>

        {/* Concepto del servicio */}
        <div className="my-6">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            Por concepto de:
          </h2>
          <div className="text-justify text-slate-800 bg-white leading-relaxed">
            {data.concepto ? (
              <p className="whitespace-pre-line">{data.concepto}</p>
            ) : (
              <p className="text-slate-400 italic">
                (Indique aquí la descripción detallada de los honorarios o servicios profesionales prestados...)
              </p>
            )}
          </div>

          {(data.periodoPrestacion || data.numeroContrato) && (
            <div className="mt-4 pt-2 border-t border-dashed border-slate-200 flex flex-wrap gap-6 text-xs text-slate-600">
              {data.periodoPrestacion && (
                <div>
                  <span className="font-semibold text-slate-800">Período de prestación:</span>{' '}
                  {data.periodoPrestacion}
                </div>
              )}
              {data.numeroContrato && (
                <div>
                  <span className="font-semibold text-slate-800">N° Contrato / O.S.:</span>{' '}
                  <span className="font-mono">{data.numeroContrato}</span>
                </div>
              )}
              {data.fechaVencimiento && (
                <div>
                  <span className="font-semibold text-slate-800">Fecha oportuna de pago:</span>{' '}
                  {data.fechaVencimiento}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Datos de transferencia bancaria */}
        <div className="bg-slate-50 border border-slate-200 p-4 my-5 text-xs md:text-sm">
          <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2">
            Instrucciones para Pago o Transferencia Bancaria:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-700">
            <div>
              <span className="text-slate-500 block text-[11px]">Entidad Bancaria:</span>
              <strong className="text-slate-900">{data.banco || 'Bancolombia'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Tipo de Cuenta:</span>
              <span className="text-slate-800">{data.tipoCuenta || 'Ahorros'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Número de Cuenta:</span>
              <span className="font-mono font-semibold text-slate-900">
                {data.numeroCuenta || 'XXXXXXXXXXXX'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Titular:</span>
              <span className="text-slate-800">
                {data.titularCuenta || data.nombreContratista || 'Nombre del titular'}
              </span>
            </div>
          </div>
        </div>

        {/* Declaraciones legales */}
        <div className="space-y-2 text-[11px] text-slate-600 text-justify border-t border-slate-200 pt-3">
          {data.declaraSeguridadSocial && (
            <p>
              <strong>Manifestación de Seguridad Social:</strong> Declaro bajo la gravedad de juramento que
              he realizado los aportes correspondientes al Sistema General de Seguridad Social Integral
              (Salud, Pensión y Riesgos Laborales) conforme a las disposiciones legales del Decreto 1273 de 2018
              y el Estatuto Tributario, sobre el ingreso base de cotización aplicable al presente contrato.
            </p>
          )}
          {data.declaraNoResponsableIVA && (
            <p>
              <strong>Régimen Tributario:</strong> Manifiesto bajo la gravedad de juramento que pertenezco al
              grupo de no responsables del Impuesto sobre las Ventas (IVA) de conformidad con el parágrafo 3°
              del artículo 437 del Estatuto Tributario colombiano.
            </p>
          )}
        </div>
      </div>

      {/* Bloque de firma */}
      <div className="pt-10 mt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">Atentamente,</p>
        <div className="w-72">
          <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
          <p className="font-bold text-slate-900 uppercase text-sm">
            {data.nombreContratista || 'NOMBRE DEL CONTRATISTA'}
          </p>
          <p className="text-xs text-slate-700">
            {data.tipoDocumentoContratista}:{' '}
            <span className="font-mono">{data.numeroDocumentoContratista || '________________'}</span>
            {data.expedicionContratista ? ` de ${data.expedicionContratista}` : ''}
          </p>
          {data.telefonoContratista && (
            <p className="text-xs text-slate-600">Tel: {data.telefonoContratista}</p>
          )}
          {data.correoContratista && (
            <p className="text-xs text-slate-600">Email: {data.correoContratista}</p>
          )}
          {data.direccionContratista && (
            <p className="text-xs text-slate-600">Dirección: {data.direccionContratista}</p>
          )}
        </div>
      </div>
    </div>
  );
};
