import React from 'react';
import { ActaEntregaData } from '../../../types/documents';
import { DocumentViewProps } from '../../types';
import { LegalDocumentShell } from '../../common';

export const DocumentView: React.FC<DocumentViewProps<ActaEntregaData>> = ({
  data,
  styleConfig,
}) => {
  return (
    <LegalDocumentShell
      styleConfig={styleConfig}
      headerType="banner"
      banner={{
        align: 'center',
        title: 'Acta Formal de Entrega y Restitución de Inmueble',
        subtitle: 'Constancia de Inventario, Lectura de Servicios y Devolución de Llaves',
      }}
      contentClassName="space-y-5"
      signatures={
        <div className="pt-8 border-t border-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
              <p className="font-bold text-slate-950 uppercase text-xs">ENTREGA A SATISFACCIÓN:</p>
              <p className="font-semibold text-slate-900 text-xs">{data.nombreEntrega}</p>
              <p className="text-[11px] text-slate-600">
                {data.calidadEntrega} · {data.docEntrega}
              </p>
            </div>

            <div>
              <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
              <p className="font-bold text-slate-950 uppercase text-xs">RECIBE A SATISFACCIÓN:</p>
              <p className="font-semibold text-slate-900 text-xs">{data.nombreRecibe}</p>
              <p className="text-[11px] text-slate-600">
                {data.calidadRecibe} · {data.docRecibe}
              </p>
            </div>
          </div>
        </div>
      }
    >
      {/* Date, Time, City */}
      <div className="flex justify-between items-center text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
        <div>
          <strong>Lugar:</strong> {data.ciudad || 'Ciudad'}
        </div>
        <div>
          <strong>Fecha y Hora:</strong> {data.fecha || 'Fecha'} a las {data.hora || '10:00 AM'}
        </div>
      </div>

      {/* Inmueble */}
      <div className="bg-slate-50/80 border-l-4 border-slate-900 p-3">
        <p className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
          Inmueble Objeto de la Entrega:
        </p>
        <p className="font-bold text-slate-950 text-sm mt-0.5">
          {data.direccionInmueble || '[Dirección del Inmueble]'}
        </p>
      </div>

      {/* Partes que intervienen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3 border border-slate-200 rounded-lg bg-white">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Quién Hace Entrega:</span>
          <strong className="text-slate-900 text-sm block mt-0.5">
            {data.nombreEntrega || 'Nombre Quien Entrega'}
          </strong>
          <p className="text-slate-600">En calidad de: {data.calidadEntrega}</p>
          <p className="text-slate-500 font-mono">{data.docEntrega}</p>
        </div>

        <div className="p-3 border border-slate-200 rounded-lg bg-white">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Quién Recibe a Satisfacción:
          </span>
          <strong className="text-slate-900 text-sm block mt-0.5">
            {data.nombreRecibe || 'Nombre Quien Recibe'}
          </strong>
          <p className="text-slate-600">En calidad de: {data.calidadRecibe}</p>
          <p className="text-slate-500 font-mono">{data.docRecibe}</p>
        </div>
      </div>

      {/* 1. Llaves */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
          1. Devolución Material de Llaves y Accesos
        </h2>
        <p className="text-justify text-slate-700 text-xs leading-relaxed">
          Se hace entrega real y material de{' '}
          <strong>{data.juegosLlavesEntregados || 2} juego(s) de llaves</strong> correspondiente(s) a las
          cerraduras de acceso principal, interiores y controles si aplicare, quedando el inmueble bajo
          exclusiva tenencia del receptor.
        </p>
      </div>

      {/* 2. Estado Físico */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
          2. Estado de Muros, Pisos y Conservación
        </h2>
        <p className="text-justify text-slate-700 text-xs leading-relaxed whitespace-pre-line">
          {data.estadoGeneralParedesPisos || '(Verificación del estado físico de las instalaciones...)'}
        </p>
      </div>

      {/* 3. Lecturas de Servicios */}
      <div className="border border-slate-300 rounded-lg overflow-hidden">
        <div className="bg-slate-100 p-2 border-b border-slate-200 text-xs font-bold uppercase text-slate-800">
          3. Registro de Lecturas Finales de Medidores
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs p-3 bg-white">
          <div>
            <span className="text-slate-500 block text-[11px]">Acueducto / Agua:</span>
            <span className="font-mono font-semibold text-slate-900">{data.lecturaAgua || 'N/A'}</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-3">
            <span className="text-slate-500 block text-[11px]">Energía Eléctrica:</span>
            <span className="font-mono font-semibold text-slate-900">{data.lecturaEnergia || 'N/A'}</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-3">
            <span className="text-slate-500 block text-[11px]">Gas Domiciliario:</span>
            <span className="font-mono font-semibold text-slate-900">{data.lecturaGas || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* 4. Paz y salvos aportados */}
      {data.pazSalvosPresentados && data.pazSalvosPresentados.length > 0 && (
        <div>
          <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
            4. Comprobantes y Paz y Salvos Aportados
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700 text-xs">
            {data.pazSalvosPresentados.map((paz, idx) => (
              <li key={idx} className="pl-1">
                {paz}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Observaciones */}
      <div>
        <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-1.5">
          5. Declaración de Conformidad y Cierre
        </h2>
        <p className="text-justify text-slate-700 text-xs leading-relaxed">
          {data.observacionesPendientes}
        </p>
      </div>
    </LegalDocumentShell>
  );
};
