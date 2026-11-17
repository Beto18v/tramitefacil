import React from 'react';
import { LiquidacionLaboralData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { formatearMoneda } from '../../../utils/numberToWords';
import { LegalDocumentShell, SignatureBlock } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<LiquidacionLaboralData>> = ({
  data,
  styleConfig,
}) => {
  const baseCalculo = data.salarioBaseLiquidacion || (data.salarioBase + (data.incluyeAuxilioTransporte ? data.auxilioTransporte : 0));
  const subtotalDevengado =
    (data.cesantiasValor || 0) +
    (data.interesesCesantiasValor || 0) +
    (data.primaValor || 0) +
    (data.vacacionesValor || 0) +
    (data.otrosDevengos || 0);

  const totalDeducciones = (data.saludPensionDeducciones || 0) + (data.otrasDeducciones || 0);
  const totalNeto = data.totalLiquidacion || Math.max(0, subtotalDevengado - totalDeducciones);

  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      density="comfortable"
      headerType="banner"
      banner={{
        align: 'center',
        title: 'LIQUIDACIÓN DEFINITIVA DE CONTRATO DE TRABAJO',
        subtitle: 'Prestaciones Sociales, Vacaciones y Finiquito Laboral (C.S.T. Arts. 65, 249 y 306)',
        badge: data.motivoRetiro || 'Liquidación Final',
        dateCity: `${data.ciudad || 'Ciudad'}, ${data.fecha || 'Fecha'}`,
      }}
      signatures={
        <div className="pt-6 border-t border-slate-300">
          <p className="text-xs text-slate-500 mb-6 text-center italic">
            En constancia de aceptación del cálculo liquidatorio y paz y salvo mutuo, se firma el presente documento:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <SignatureBlock
              label="POR EL EMPLEADOR:"
              signatureType="text"
              name={data.nombreRepresentante || data.nombreEmpresa || 'EMPLEADOR / REPRESENTANTE LEGAL'}
              docType="NIT / C.C."
              docNumber={data.nitEmpresa || '____________________'}
              role={data.nombreEmpresa ? `En representación de: ${data.nombreEmpresa}` : 'Representante Legal'}
              widthClass="w-full"
            />

            <div className="space-y-3">
              <SignatureBlock
                label="EL TRABAJADOR (RECIBÍ CONFORME):"
                signatureType={data.signatureType || 'text'}
                signatureDataUrl={data.signatureDataUrl}
                name={data.nombreTrabajador || 'TRABAJADOR'}
                docType={data.tipoDocumento || 'C.C.'}
                docNumber={data.numeroDocumento || '____________________'}
                role={data.cargoTrabajador || 'Trabajador'}
                widthClass="w-full"
              />

              {data.incluirHuella && (
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-20 h-24 border-2 border-dashed border-slate-400 rounded flex flex-col items-center justify-end p-1 text-[9px] text-slate-500 bg-slate-50/50">
                    <span className="text-center font-medium leading-tight">Huella dactilar</span>
                    <span className="text-center text-[8px] text-slate-400">Índice derecho</span>
                  </div>
                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p className="font-medium text-slate-700">Constancia de recepción:</p>
                    <p>Fecha de pago: ___/___/2026</p>
                    <p>Medio: Transferencia bancaria / Cheque</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5 text-slate-900 text-xs md:text-sm">
        {/* Ficha técnica de partes y contrato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-slate-950 uppercase tracking-wide text-[11px] border-b border-slate-200 pb-1">
              Datos del Empleador
            </p>
            <p>
              <strong className="text-slate-800">Razón Social:</strong> {data.nombreEmpresa || '[Empresa Empleadora]'}
            </p>
            <p>
              <strong className="text-slate-800">NIT:</strong> {data.nitEmpresa || 'Sin especificar'}
            </p>
            <p>
              <strong className="text-slate-800">Ciudad de labores:</strong> {data.ciudadEmpresa || data.ciudad}
            </p>
            {data.nombreRepresentante && (
              <p>
                <strong className="text-slate-800">Rep. Legal:</strong> {data.nombreRepresentante}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="font-bold text-slate-950 uppercase tracking-wide text-[11px] border-b border-slate-200 pb-1">
              Datos del Trabajador
            </p>
            <p>
              <strong className="text-slate-800">Nombre completo:</strong> {data.nombreTrabajador || '[Trabajador]'}
            </p>
            <p>
              <strong className="text-slate-800">{data.tipoDocumento || 'C.C.'}:</strong>{' '}
              <span className="font-mono">{data.numeroDocumento || 'Sin especificar'}</span>
            </p>
            <p>
              <strong className="text-slate-800">Cargo desempeñado:</strong> {data.cargoTrabajador || 'Colaborador'}
            </p>
          </div>
        </div>

        {/* Periodo laborado y bases de cálculo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white border border-slate-200 rounded-lg p-3 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-slate-950 uppercase tracking-wide text-[11px] border-b border-slate-200 pb-1">
              Periodo Laboral
            </p>
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Fecha de Ingreso</span>
                <strong className="text-slate-900">{data.fechaIngreso || '____-__-__'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Fecha de Retiro</span>
                <strong className="text-slate-900">{data.fechaRetiro || '____-__-__'}</strong>
              </div>
            </div>
            <p className="pt-1 text-slate-700">
              <strong className="text-slate-800">Causa de Retiro:</strong> {data.motivoRetiro}
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-slate-950 uppercase tracking-wide text-[11px] border-b border-slate-200 pb-1">
              Bases de Liquidación
            </p>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-600">Salario Básico Mensual:</span>
              <strong className="font-mono text-slate-900">{formatearMoneda(data.salarioBase || 0)}</strong>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-600">
                Auxilio de Transporte {data.incluyeAuxilioTransporte ? '(Incluido)' : '(No aplica)'}:
              </span>
              <span className="font-mono text-slate-800">
                {data.incluyeAuxilioTransporte ? formatearMoneda(data.auxilioTransporte || 0) : '$ 0'}
              </span>
            </div>
            <div className="flex justify-between items-center py-0.5 border-t border-slate-100 font-semibold text-slate-900">
              <span>Base Prestaciones (Cesantías/Prima):</span>
              <span className="font-mono text-emerald-800">{formatearMoneda(baseCalculo)}</span>
            </div>
          </div>
        </div>

        {/* Tabla formal de Liquidación */}
        <div className="overflow-x-auto border border-slate-300 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Concepto Liquidado</th>
                <th className="py-2.5 px-3">Fórmula Legal (C.S.T.)</th>
                <th className="py-2.5 px-2 text-center">Días</th>
                <th className="py-2.5 px-3 text-right">Valor Liquidado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="py-2 px-3 font-medium text-slate-950">Cesantías de Ley</td>
                <td className="py-2 px-3 text-slate-600 text-[11px]">
                  (Salario Base {formatearMoneda(baseCalculo)} × Días) / 360
                </td>
                <td className="py-2 px-2 text-center font-mono">{data.diasCesantias || 0}</td>
                <td className="py-2 px-3 text-right font-mono font-medium">
                  {formatearMoneda(data.cesantiasValor || 0)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-950">Intereses a las Cesantías</td>
                <td className="py-2 px-3 text-slate-600 text-[11px]">
                  (Cesantías {formatearMoneda(data.cesantiasValor || 0)} × Días × 12%) / 360
                </td>
                <td className="py-2 px-2 text-center font-mono">{data.diasCesantias || 0}</td>
                <td className="py-2 px-3 text-right font-mono font-medium">
                  {formatearMoneda(data.interesesCesantiasValor || 0)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-950">Prima Legal de Servicios</td>
                <td className="py-2 px-3 text-slate-600 text-[11px]">
                  (Salario Base {formatearMoneda(baseCalculo)} × Días) / 360
                </td>
                <td className="py-2 px-2 text-center font-mono">{data.diasPrima || 0}</td>
                <td className="py-2 px-3 text-right font-mono font-medium">
                  {formatearMoneda(data.primaValor || 0)}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-slate-950">Vacaciones Compensadas</td>
                <td className="py-2 px-3 text-slate-600 text-[11px]">
                  (Salario Básico {formatearMoneda(data.salarioBase || 0)} × Días) / 720
                </td>
                <td className="py-2 px-2 text-center font-mono">{data.diasVacaciones || 0}</td>
                <td className="py-2 px-3 text-right font-mono font-medium">
                  {formatearMoneda(data.vacacionesValor || 0)}
                </td>
              </tr>

              {(data.otrosDevengos || 0) > 0 && (
                <tr className="bg-emerald-50/40">
                  <td className="py-2 px-3 font-medium text-emerald-950">
                    Otros Devengos / Bonificaciones
                    {data.descripcionOtrosDevengos && (
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {data.descripcionOtrosDevengos}
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-slate-600 text-[11px]">Pagos adicionales reconocidos</td>
                  <td className="py-2 px-2 text-center text-slate-400">—</td>
                  <td className="py-2 px-3 text-right font-mono font-medium text-emerald-900">
                    {formatearMoneda(data.otrosDevengos || 0)}
                  </td>
                </tr>
              )}

              <tr className="bg-slate-50 font-semibold border-t border-slate-300">
                <td colSpan={3} className="py-2 px-3 text-slate-900 uppercase text-[11px]">
                  Subtotal Devengado
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-950">
                  {formatearMoneda(subtotalDevengado)}
                </td>
              </tr>

              {totalDeducciones > 0 && (
                <>
                  {(data.saludPensionDeducciones || 0) > 0 && (
                    <tr className="text-rose-900">
                      <td colSpan={3} className="py-1.5 px-3 text-slate-700">
                        (-) Deducciones de Ley (Seguridad Social en Salud y Pensión):
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono">
                        - {formatearMoneda(data.saludPensionDeducciones || 0)}
                      </td>
                    </tr>
                  )}
                  {(data.otrasDeducciones || 0) > 0 && (
                    <tr className="text-rose-900">
                      <td colSpan={3} className="py-1.5 px-3 text-slate-700">
                        (-) Otras Deducciones Autorizadas{' '}
                        {data.descripcionOtrasDeducciones ? `(${data.descripcionOtrasDeducciones})` : ''}:
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono">
                        - {formatearMoneda(data.otrasDeducciones || 0)}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-rose-50/50 text-rose-950 font-semibold">
                    <td colSpan={3} className="py-1.5 px-3 uppercase text-[11px]">
                      Total Deducciones
                    </td>
                    <td className="py-1.5 px-3 text-right font-mono">
                      - {formatearMoneda(totalDeducciones)}
                    </td>
                  </tr>
                </>
              )}

              <tr className="bg-slate-900 text-white font-bold text-sm">
                <td colSpan={3} className="py-3 px-3 uppercase tracking-wider text-xs">
                  TOTAL NETO A LIQUIDAR Y PAGAR
                </td>
                <td className="py-3 px-3 text-right font-mono text-base text-emerald-300">
                  {formatearMoneda(totalNeto)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Monto en letras */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <p className="text-slate-600 font-semibold uppercase text-[10px] tracking-wide mb-0.5">
            Son en letras:
          </p>
          <p className="font-bold text-slate-950 uppercase tracking-tight">
            {data.totalEnLetras || 'Cero pesos m/cte.'}
          </p>
        </div>

        {/* Declaración de Paz y Salvo */}
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-3.5 space-y-2 text-justify text-xs text-slate-800 leading-relaxed">
          <p className="font-bold text-slate-950 uppercase text-[11px] tracking-wide">
            Manifestación Expresa de Paz y Salvo Mutuo (C.S.T. Art. 65)
          </p>
          <p>{data.pazYSalvoDeclaracion}</p>
        </div>
      </div>
    </LegalDocumentShell>
  );
};
