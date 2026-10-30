import React from 'react';
import { PropuestaServiciosData, DocumentStyleConfig } from '../../../types/documents';
import { formatearMoneda } from '../../../utils/numberToWords';
import { LegalDocumentShell } from '../../common';

export interface DocumentViewProps {
  data: PropuestaServiciosData;
  styleConfig: DocumentStyleConfig;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ data, styleConfig }) => {
  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      headerType="banner"
      banner={{
        title: 'Propuesta Comercial de Servicios',
        subtitle: 'Oferta Mercantil de Servicios Profesionales (Art. 845 Código de Comercio)',
        dateCity: `${data.ciudad || 'Bogotá D.C.'}, ${data.fecha || 'Fecha'}`,
        extraInfo: `Validez: ${data.validezDias || 15} días calendario`,
      }}
      signatures={
        <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-between items-end gap-6">
          <div className="w-full max-w-sm">
            <div className="border-b-2 border-slate-900 mb-2 w-64 max-w-full h-8"></div>
            <p className="font-bold text-slate-950 uppercase text-xs tracking-tight">
              {data.nombreProponente || 'NOMBRE DEL PROPONENTE'}
            </p>
            {data.identificacionProponente && (
              <p className="text-[11px] text-slate-700 font-mono mt-0.5">{data.identificacionProponente}</p>
            )}
            {data.profesionProponente && (
              <p className="text-[10px] text-slate-500 mt-0.5">{data.profesionProponente}</p>
            )}
          </div>

          <div className="w-60 border border-slate-300 p-3 bg-slate-50 rounded-lg text-center text-[10px] text-slate-600">
            <p className="font-semibold text-slate-800 mb-1">Aceptación de la Propuesta:</p>
            <div className="h-6"></div>
            <div className="border-t border-dashed border-slate-400 pt-1 text-[9px] text-slate-500">
              Firma del Cliente y Fecha
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Emisor y Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 text-xs rounded-lg">
          <div>
            <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
              Presentado por:
            </p>
            <p className="font-bold text-slate-900 text-sm">
              {data.nombreProponente || 'Nombre del Proponente'}
            </p>
            {data.profesionProponente && <p className="text-slate-600 mt-0.5">{data.profesionProponente}</p>}
            {data.identificacionProponente && <p className="text-slate-500">{data.identificacionProponente}</p>}
            {(data.telefonoProponente || data.correoProponente) && (
              <p className="text-slate-500 mt-0.5">
                {[data.telefonoProponente, data.correoProponente].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <div>
            <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
              Dirigido a:
            </p>
            <p className="font-bold text-slate-900 text-sm">
              {data.nombreCliente || 'Nombre del Cliente'}
            </p>
            {data.empresaCliente && <p className="text-slate-700 font-medium mt-0.5">{data.empresaCliente}</p>}
            {data.cargoCliente && <p className="text-slate-500">{data.cargoCliente}</p>}
          </div>
        </div>

        {/* Título del Proyecto */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 p-3.5 my-3 rounded-r-lg">
          <p className="text-[10px] uppercase font-bold text-blue-900 tracking-wider">Proyecto:</p>
          <p className="text-base font-bold text-slate-950 mt-0.5 leading-snug">
            {data.tituloProyecto || 'Título de la Propuesta'}
          </p>
        </div>

        {/* Objetivo General */}
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
            1. Objetivo General
          </h2>
          <p className="text-justify text-slate-700 leading-relaxed">
            {data.objetivoGeneral || '(Describa aquí el objetivo del servicio...)'}
          </p>
        </div>

        {/* Alcance Detallado */}
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
            2. Alcance del Servicio
          </h2>
          <p className="text-justify text-slate-700 whitespace-pre-line leading-relaxed">
            {data.alcanceDetallado || '(Detalle aquí las fases y tareas que comprende la propuesta...)'}
          </p>
        </div>

        {/* Entregables */}
        {data.entregables && data.entregables.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
              3. Entregables Principales
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              {data.entregables.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cronograma */}
        {data.cronogramaSemanas && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
              4. Tiempo de Ejecución y Cronograma
            </h2>
            <p className="text-xs text-slate-700 font-medium">{data.cronogramaSemanas}</p>
          </div>
        )}

        {/* Condiciones Económicas Adaptables */}
        <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-2">
            5. Inversión y Forma de Pago
          </h2>
          <div className="flex justify-between items-baseline gap-4 py-2 border-b border-slate-200">
            <span className="font-semibold text-slate-700 whitespace-nowrap">Honorarios Totales Propuestos:</span>
            <span className="text-lg font-bold font-mono text-slate-950 shrink-0">
              {formatearMoneda(data.honorariosTotales)}
            </span>
          </div>
          <div className="pt-2 text-xs text-slate-700">
            <span className="font-semibold block mb-0.5">Esquema de Pago:</span>
            <p className="leading-relaxed">{data.formaDePago}</p>
          </div>
        </div>

        {/* Exclusiones */}
        {data.exclusionesYCondiciones && (
          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2 leading-relaxed">
            <strong>Exclusiones y Condiciones Generales:</strong> {data.exclusionesYCondiciones}
          </div>
        )}
      </div>
    </LegalDocumentShell>
  );
};
