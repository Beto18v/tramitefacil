import React from 'react';
import { PropuestaServiciosData, DocumentStyleConfig } from '../../types/documents';
import { formatearMoneda } from '../../utils/numberToWords';

interface Props {
  data: PropuestaServiciosData;
  styleConfig: DocumentStyleConfig;
}

export const PropuestaServiciosTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[14.5px] leading-relaxed'
      : 'text-[13px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-5">
        {/* Header Title */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-950">
              Propuesta Comercial de Servicios
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Oferta Mercantil de Servicios Profesionales (Art. 845 Código de Comercio)
            </p>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p className="font-semibold text-slate-900">{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Validez: {data.validezDias || 15} días calendario</p>
          </div>
        </div>

        {/* Emisor y Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 border border-slate-200 text-xs">
          <div>
            <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
              Presentado por:
            </p>
            <p className="font-bold text-slate-900 text-sm">{data.nombreProponente || 'Nombre del Proponente'}</p>
            <p className="text-slate-600">{data.profesionProponente}</p>
            <p className="text-slate-500">{data.identificacionProponente}</p>
            <p className="text-slate-500">{data.telefonoProponente} · {data.correoProponente}</p>
          </div>

          <div>
            <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">
              Dirigido a:
            </p>
            <p className="font-bold text-slate-900 text-sm">{data.nombreCliente || 'Nombre del Cliente'}</p>
            <p className="text-slate-700 font-medium">{data.empresaCliente}</p>
            <p className="text-slate-500">{data.cargoCliente}</p>
          </div>
        </div>

        {/* Título del Proyecto */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 p-3.5 my-3">
          <p className="text-[10px] uppercase font-bold text-blue-900 tracking-wider">Proyecto:</p>
          <p className="text-base font-bold text-slate-950 mt-0.5">{data.tituloProyecto || 'Título de la Propuesta'}</p>
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
        {data.entregables && data.entregables.length > 0 && data.entregables.some((e) => e.trim()) && (
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
              3. Entregables Principales
            </h2>
            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700 text-xs">
              {data.entregables
                .filter((e) => e.trim())
                .map((entregable, idx) => (
                  <li key={idx} className="pl-1">
                    {entregable}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Cronograma y Duración */}
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
            4. Tiempo de Ejecución y Cronograma
          </h2>
          <p className="text-slate-700 text-xs">{data.cronogramaSemanas}</p>
        </div>

        {/* Condiciones Económicas */}
        <div className="bg-slate-50 border border-slate-300 p-4 rounded-lg">
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-2">
            5. Inversión y Forma de Pago
          </h2>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="font-semibold text-slate-700">Honorarios Totales Propuestos:</span>
            <span className="text-lg font-bold font-mono text-slate-950">
              {formatearMoneda(data.honorariosTotales)}
            </span>
          </div>
          <div className="pt-2 text-xs text-slate-700">
            <span className="font-semibold block mb-0.5">Esquema de Pago:</span>
            <p>{data.formaDePago}</p>
          </div>
        </div>

        {/* Exclusiones */}
        {data.exclusionesYCondiciones && (
          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
            <strong>Exclusiones y Condiciones Generales:</strong> {data.exclusionesYCondiciones}
          </div>
        )}
      </div>

      {/* Firma del Proponente */}
      <div className="pt-8 mt-6 border-t border-slate-200 flex justify-between items-end">
        <div className="w-72">
          <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
          <p className="font-bold text-slate-950 uppercase text-xs">
            {data.nombreProponente || 'NOMBRE DEL PROPONENTE'}
          </p>
          <p className="text-[11px] text-slate-700">{data.identificacionProponente}</p>
          <p className="text-[10px] text-slate-500">{data.profesionProponente}</p>
        </div>

        <div className="w-56 border border-slate-300 p-3 bg-slate-50 text-center text-[10px] text-slate-600">
          <p className="font-semibold text-slate-800 mb-1">Aceptación de la Propuesta:</p>
          <div className="h-6"></div>
          <div className="border-b border-slate-300 mb-1"></div>
          <p>Firma del Cliente y Fecha</p>
        </div>
      </div>
    </div>
  );
};
