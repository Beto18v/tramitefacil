import React from 'react';
import { CuentaCobroData, DocumentStyleConfig } from '../../../types/documents';
import { numeroALetras, formatearMoneda } from '../../../utils/numberToWords';
import { SignatureBlock } from '../../../components/templates/SignatureBlock';
import { calcularSubtotalConceptos, calcularTotalesCuentaCobro } from './calculations';

export interface DocumentViewProps {
  data: CuentaCobroData;
  styleConfig: DocumentStyleConfig;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[15px] leading-relaxed'
      : 'text-[13.5px] leading-relaxed';

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

  const valorLetras = numeroALetras(totalNeto, data.moneda || 'PESOS M/CTE.');

  return (
    <div
      className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}
    >
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
              <strong className="text-slate-900">
                {data.nombreCliente || '__________________________________'}
              </strong>
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

        {/* Conceptos Multilínea o Concepto General */}
        {data.usarConceptosMultiples && data.conceptos && data.conceptos.length > 0 ? (
          <div className="my-5 border border-slate-300 rounded-lg overflow-hidden">
            <div className="bg-slate-100 p-2.5 border-b border-slate-300 text-xs font-bold text-slate-800 uppercase tracking-wide">
              Desglose de Conceptos y Servicios Prestados:
            </div>
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase text-[11px]">
                <tr>
                  <th className="py-2 px-3 text-left w-12 font-semibold">Item</th>
                  <th className="py-2 px-3 text-left font-semibold">Descripción del Servicio</th>
                  <th className="py-2 px-3 text-center w-16 font-semibold">Cant.</th>
                  <th className="py-2 px-3 text-right w-28 font-semibold">Valor Unitario</th>
                  <th className="py-2 px-3 text-right w-32 font-semibold">Total Parcial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.conceptos.map((item, index) => {
                  const cant = item.cantidad || 1;
                  const unit = item.valorUnitario || 0;
                  const parcial = cant * unit;
                  return (
                    <tr key={item.id || index} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-center">
                        {index + 1}
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-medium leading-snug">
                        {item.descripcion || 'Descripción del concepto'}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono text-center">
                        {cant}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono text-right">
                        {formatearMoneda(unit)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-mono font-semibold text-right">
                        {formatearMoneda(parcial)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="my-5">
            <p className="font-semibold text-slate-700 uppercase tracking-wide text-xs mb-1">
              Por concepto de:
            </p>
            <p className="text-justify text-slate-800 bg-slate-50/70 p-3.5 border border-slate-200 rounded-lg">
              {data.concepto || 'Prestación de servicios profesionales independientes.'}
            </p>
          </div>
        )}

        {/* Metadatos adicionales de contrato/período */}
        {(data.periodoPrestacion || data.numeroContrato) && (
          <div className="flex flex-wrap gap-4 text-xs text-slate-600 my-3 py-2 border-y border-dashed border-slate-300">
            {data.periodoPrestacion && (
              <div>
                <span className="font-medium text-slate-500">Período de prestación:</span>{' '}
                <span className="font-semibold text-slate-800">{data.periodoPrestacion}</span>
              </div>
            )}
            {data.numeroContrato && (
              <div>
                <span className="font-medium text-slate-500">Contrato / Orden N°:</span>{' '}
                <span className="font-semibold text-slate-800 font-mono">{data.numeroContrato}</span>
              </div>
            )}
          </div>
        )}

        {/* Liquidación Económica */}
        <div className="my-6 flex justify-end">
          <div className="w-full sm:w-80 md:w-96 border border-slate-300 bg-slate-50/90 rounded-lg p-3.5 space-y-2 text-xs md:text-sm">
            <div className="flex justify-between items-center text-slate-700">
              <span>Subtotal Honorarios:</span>
              <span className="font-mono font-semibold">{formatearMoneda(subtotal)}</span>
            </div>

            {data.aplicaReteFuente && (
              <div className="flex justify-between items-center text-rose-700">
                <span>(-) Retención Fuente ({data.porcentajeReteFuente}%):</span>
                <span className="font-mono font-semibold">-{formatearMoneda(reteFuente)}</span>
              </div>
            )}

            {data.aplicaReteICA && (
              <div className="flex justify-between items-center text-rose-700">
                <span>(-) Retención ICA ({data.porcentajeReteICA}%):</span>
                <span className="font-mono font-semibold">-{formatearMoneda(reteICA)}</span>
              </div>
            )}

            <div className="border-t-2 border-slate-900 pt-2 flex justify-between items-center text-slate-950 font-bold text-sm md:text-base">
              <span>Total Neto a Pagar:</span>
              <span className="font-mono text-blue-900">{formatearMoneda(totalNeto)}</span>
            </div>
          </div>
        </div>

        {/* Valor en letras */}
        <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg text-xs md:text-sm text-blue-950 mb-6">
          <span className="font-semibold uppercase tracking-wide text-[11px] text-blue-800 block mb-0.5">
            Valor en letras:
          </span>
          <span className="font-bold">{valorLetras}</span>
        </div>

        {/* Datos Bancarios para transferencia */}
        {data.incluirDatosBancarios && data.numeroCuenta && (
          <div className="p-3.5 border border-slate-300 bg-slate-50 rounded-lg text-xs mb-6">
            <p className="font-bold text-slate-800 uppercase tracking-wide text-[11px] mb-1.5">
              Instrucciones de Pago / Datos Bancarios:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[10px]">Entidad Bancaria:</span>
                <strong className="text-slate-900">{data.banco || 'Bancolombia'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Tipo de Cuenta:</span>
                <strong className="text-slate-900">{data.tipoCuenta}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Número de Cuenta:</span>
                <strong className="font-mono text-slate-900">{data.numeroCuenta}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Titular:</span>
                <strong className="text-slate-900">
                  {data.titularCuenta || data.nombreContratista}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* Declaraciones Legales Tributarias y de Seguridad Social */}
        {(data.declaraSeguridadSocial || data.declaraNoResponsableIVA) && (
          <div className="text-[11px] text-slate-600 space-y-1.5 my-6 p-3 bg-slate-50/70 border border-slate-200 rounded-lg leading-relaxed">
            <p className="font-bold text-slate-700 uppercase tracking-wide text-[10px]">
              Manifestaciones y Declaraciones del Contratista:
            </p>
            {data.declaraSeguridadSocial && (
              <p>
                • <strong>Aportes a Seguridad Social:</strong> Declaro bajo la gravedad de juramento
                haber realizado los aportes correspondientes al Sistema de Seguridad Social Integral
                (Salud, Pensión y ARL) sobre los ingresos derivados del presente cobro, conforme al
                Art. 244 de la Ley 1955 de 2019.
              </p>
            )}
            {data.declaraNoResponsableIVA && (
              <p>
                • <strong>Régimen de IVA:</strong> Manifiesto pertenecer al régimen de no
                responsables del Impuesto sobre las Ventas (IVA), de conformidad con el Art. 437 del
                Estatuto Tributario Nacional.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bloque de Firma del Contratista Emisor */}
      <div className="pt-8 mt-6 border-t border-slate-200 flex justify-between items-end">
        <SignatureBlock
          signatureType={data.signatureType}
          signatureDataUrl={data.signatureDataUrl}
          name={data.nombreContratista || 'NOMBRE DEL CONTRATISTA'}
          docType={data.tipoDocumentoContratista || 'C.C.'}
          docNumber={data.numeroDocumentoContratista || '___________________'}
          expedition={data.expedicionContratista}
          phone={data.telefonoContratista}
          email={data.correoContratista}
          address={data.direccionContratista}
          role="EL CONTRATISTA / PRESTADOR DEL SERVICIO"
          label="Atentamente,"
          widthClass="w-80"
        />

        <div className="text-right text-[10px] text-slate-400 font-mono hidden sm:block">
          Generado vía TrámiteFácil Hub · Documento Privado
        </div>
      </div>
    </div>
  );
};

