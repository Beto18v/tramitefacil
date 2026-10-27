import React from 'react';
import { PoderAutorizacionData, DocumentStyleConfig } from '../../types/documents';

interface Props {
  data: PoderAutorizacionData;
  styleConfig: DocumentStyleConfig;
}

export const PoderAutorizacionTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[14.5px] leading-relaxed'
      : 'text-[13px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-8 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="border-b-2 border-slate-900 pb-3 text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-slate-950">
            Poder Especial Amplio y Suficiente
          </h1>
          <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest font-medium">
            Autorización Formal para Gestión y Trámite Específico
          </p>
        </div>

        {/* Ciudad y fecha */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>
            {data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha de suscripción'}
          </p>
        </div>

        {/* Destinatario o A Quien Corresponda */}
        <div className="text-xs md:text-sm">
          <p className="font-semibold text-slate-900">Señores:</p>
          <p className="font-bold text-slate-950 uppercase">
            {data.entidadTramite || 'A QUIEN CORRESPONDA / ENTIDAD COMPETENTE'}
          </p>
          <p className="text-slate-600">{data.ciudad || 'Ciudad'}</p>
        </div>

        {/* Cláusula de otorgamiento */}
        <div className="space-y-4 text-justify text-slate-800">
          <p>
            Yo, <strong>{data.nombreOtorgante || '[NOMBRE DEL OTORGANTE / PODERDANTE]'}</strong>, mayor de edad,
            identificado(a) con <strong>{data.tipoDocOtorgante} N° {data.numDocOtorgante || '____________'}</strong>
            {data.expedicionOtorgante ? ` expedida en ${data.expedicionOtorgante}` : ''}, con domicilio y residencia en{' '}
            {data.domicilioOtorgante || 'esta ciudad'}
            {data.telefonoOtorgante ? `, teléfono ${data.telefonoOtorgante}` : ''}, por medio del presente documento
            manifiesto que confiero <strong>PODER ESPECIAL, AMPLIO Y SUFICIENTE</strong> pero en cuanto a derecho se
            requiere a:
          </p>

          {/* Bloque Apoderado */}
          <div className="bg-slate-50 border border-slate-300 p-3 my-2 text-xs md:text-sm">
            <p>
              <strong>{data.nombreApoderado || '[NOMBRE DEL APODERADO / AUTORIZADO]'}</strong>, mayor de edad,
              identificado(a) con <strong>{data.tipoDocApoderado} N° {data.numDocApoderado || '____________'}</strong>
              {data.expedicionApoderado ? ` expedida en ${data.expedicionApoderado}` : ''}
              {data.telefonoApoderado ? `, teléfono ${data.telefonoApoderado}` : ''}.
            </p>
          </div>

          <p>
            Para que en mi nombre, representación y lugar, lleve a cabo todas las actuaciones administrativas,
            diligencias y gestiones inherentes al siguiente objeto:
          </p>

          {/* Objeto específico */}
          <div className="bg-slate-50 border-l-4 border-slate-900 p-3.5 my-3">
            <h2 className="font-bold text-slate-950 uppercase tracking-wide text-xs mb-1">
              Objeto del Trámite Autorizado:
            </h2>
            <div className="text-slate-800 text-xs md:text-sm leading-relaxed">
              {data.objetoAutorizacion ? (
                <p className="whitespace-pre-line">{data.objetoAutorizacion}</p>
              ) : (
                <p className="text-slate-400 italic">
                  (Describa en detalle el trámite, número de expediente, placas, certificado o gestión específica autorizada...)
                </p>
              )}
            </div>
          </div>

          {/* Facultades */}
          {data.facultadesEspecificas && data.facultadesEspecificas.length > 0 && (
            <div>
              <p className="font-semibold text-slate-900 text-xs uppercase tracking-wide mb-1.5">
                Facultades expresamente concedidas al apoderado:
              </p>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-xs text-slate-700">
                {data.facultadesEspecificas
                  .filter((f) => f.trim() !== '')
                  .map((facultad, idx) => (
                    <li key={idx} className="pl-1">
                      {facultad}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Vigencia */}
          {data.vigenciaTexto && (
            <div className="text-xs text-slate-700">
              <strong>Término de Vigencia:</strong> {data.vigenciaTexto}
            </div>
          )}

          {/* Nota Legal */}
          {data.notaLegal && (
            <p className="text-[11px] text-slate-600 text-justify">
              {data.notaLegal}
            </p>
          )}
        </div>
      </div>

      {/* Firmas y Recuadros de Huella */}
      <div className="pt-8 mt-6 border-t border-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Otorgante con huella */}
          <div className="border border-slate-200 p-4 bg-slate-50/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
              Otorgante (Poderdante):
            </p>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <div className="border-b-2 border-slate-900 mb-2 h-14"></div>
                <p className="font-bold text-slate-950 uppercase text-xs">
                  {data.nombreOtorgante || 'NOMBRE DEL OTORGANTE'}
                </p>
                <p className="text-[11px] text-slate-700">
                  {data.tipoDocOtorgante}:{' '}
                  <span className="font-mono">{data.numDocOtorgante || '________________'}</span>
                </p>
                {data.expedicionOtorgante && (
                  <p className="text-[10px] text-slate-500">Expedida en: {data.expedicionOtorgante}</p>
                )}
                {data.telefonoOtorgante && (
                  <p className="text-[10px] text-slate-500">Tel: {data.telefonoOtorgante}</p>
                )}
              </div>

              {data.incluirRecuadroHuella && (
                <div className="w-20 h-24 border-2 border-dashed border-slate-400 bg-white flex flex-col justify-between items-center p-1 text-center shrink-0">
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Índice Derecho</span>
                  <div className="my-auto text-slate-300 text-[10px]">Huella</div>
                  <span className="text-[7px] text-slate-400">Dactilar</span>
                </div>
              )}
            </div>
          </div>

          {/* Apoderado / Acepta */}
          <div className="border border-slate-200 p-4 bg-slate-50/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
              Acepta el Poder (Apoderado / Autorizado):
            </p>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <div className="border-b-2 border-slate-900 mb-2 h-14"></div>
                <p className="font-bold text-slate-950 uppercase text-xs">
                  {data.nombreApoderado || 'NOMBRE DEL APODERADO'}
                </p>
                <p className="text-[11px] text-slate-700">
                  {data.tipoDocApoderado}:{' '}
                  <span className="font-mono">{data.numDocApoderado || '________________'}</span>
                </p>
                {data.expedicionApoderado && (
                  <p className="text-[10px] text-slate-500">Expedida en: {data.expedicionApoderado}</p>
                )}
                {data.telefonoApoderado && (
                  <p className="text-[10px] text-slate-500">Tel: {data.telefonoApoderado}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
