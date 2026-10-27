import React from 'react';
import { CartaRenunciaData, DocumentStyleConfig } from '../../types/documents';

interface Props {
  data: CartaRenunciaData;
  styleConfig: DocumentStyleConfig;
}

export const CartaRenunciaTemplate: React.FC<Props> = ({ data, styleConfig }) => {
  const fontClass =
    styleConfig.fontFamily === 'serif' ? 'font-document-serif' : 'font-document-sans';
  const sizeClass =
    styleConfig.fontSize === 'compact'
      ? 'text-[12.5px] leading-relaxed'
      : styleConfig.fontSize === 'spacious'
      ? 'text-[15px] leading-loose'
      : 'text-[13.5px] leading-relaxed';

  return (
    <div className={`${fontClass} ${sizeClass} text-slate-900 bg-white p-6 sm:p-10 md:p-12 min-h-[1050px] flex flex-col justify-between`}>
      <div className="space-y-6">
        {/* Ciudad y fecha */}
        <div className="text-right text-xs md:text-sm text-slate-700">
          <p>
            {data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}
          </p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900">Señores:</p>
          <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
            {data.nombreEmpresa || 'NOMBRE DE LA EMPRESA / EMPLEADOR'}
          </p>
          {data.nombreDestinatario && (
            <p className="text-slate-800">
              Atención: <strong>{data.nombreDestinatario}</strong>
            </p>
          )}
          {data.cargoDestinatario && (
            <p className="text-slate-600">{data.cargoDestinatario}</p>
          )}
          {data.departamento && (
            <p className="text-slate-500">{data.departamento}</p>
          )}
          <p className="text-slate-600">{data.ciudad || 'Presente'}</p>
        </div>

        {/* Asunto */}
        <div className="border-b border-slate-300 pb-2">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              Renuncia formal e irrevocable al cargo de {data.cargoTrabajador || '[Cargo desempeñado]'}
            </span>
          </p>
        </div>

        {/* Saludo formal */}
        <div>
          <p className="text-slate-800">
            Respetados señores:
          </p>
        </div>

        {/* Cuerpo principal */}
        <div className="space-y-4 text-justify text-slate-800">
          <p>
            Por medio de la presente me dirijo a ustedes de la manera más atenta con el propósito de comunicar
            mi decisión voluntaria de presentar <strong>renuncia irrevocable</strong> al cargo de{' '}
            <strong>{data.cargoTrabajador || '[Cargo]'}</strong> que he venido ejerciendo en la compañía
            {data.fechaIngreso ? ` desde el día ${data.fechaIngreso}` : ''}.
          </p>

          <p>
            De conformidad con los términos y buenas prácticas laborales, me permito informar que mi último
            día laborable de prestación de servicios en la empresa será el próximo{' '}
            <strong className="text-slate-950">
              {data.ultimoDiaLaboral || '[Fecha del último día de labores]'}
            </strong>
            , fecha a partir de la cual surtirá plenos efectos legales mi desvinculación laboral.
          </p>

          {data.solicitaExoneracionPreaviso && (
            <p className="bg-slate-50 border-l-4 border-slate-900 p-2.5 text-xs text-slate-800">
              <strong>Solicitud de Exoneración de Preaviso:</strong> Solicito comedidamente a la empresa me sea
              concedida la exoneración del término legal o contractual de preaviso, permitiéndome hacer efectiva
              mi salida voluntaria en la fecha señalada sin que ello cause perjuicio o penalidad alguna.
            </p>
          )}

          {data.motivoDetalle ? (
            <p className="whitespace-pre-line">{data.motivoDetalle}</p>
          ) : (
            <p>
              Esta decisión obedece a razones estrictamente de crecimiento personal y profesional, orientadas
              hacia nuevos proyectos que demandan mi dedicación exclusiva.
            </p>
          )}

          {data.parrafoAgradecimiento && (
            <p className="whitespace-pre-line">{data.parrafoAgradecimiento}</p>
          )}

          {data.ofrecimientoEmpalme && (
            <p>
              Reitero mi completa disposición para llevar a cabo una transición ordenada de mis funciones,
              entregar a satisfacción los proyectos y pendientes a mi cargo, así como realizar el debido empalme
              con la persona que sea designada para asumir estas responsabilidades, garantizando la continuidad
              operativa de la organización.
            </p>
          )}

          {data.solicitudLiquidacion && (
            <p>
              Asimismo, solicito comedidamente se disponga la realización de la respectiva orden para el examen
              médico de retiro (ocupacional de egreso), la expedición del certificado laboral correspondiente y
              la liquidación definitiva de mis salarios y prestaciones sociales de ley de conformidad con lo
              estipulado en el Código Sustantivo del Trabajo.
            </p>
          )}
        </div>
      </div>

      {/* Despedida y firma */}
      <div className="pt-10 mt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">
          Agradeciendo de antemano su amable atención y deseándoles continuos éxitos,
        </p>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="w-72">
            <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
            <p className="font-bold text-slate-950 uppercase text-sm">
              {data.nombreTrabajador || 'NOMBRE DEL TRABAJADOR'}
            </p>
            <p className="text-xs text-slate-700">
              {data.tipoDocumento}:{' '}
              <span className="font-mono">{data.numeroDocumento || '________________'}</span>
            </p>
            {data.cargoTrabajador && (
              <p className="text-xs text-slate-600">{data.cargoTrabajador}</p>
            )}
          </div>

          <div className="w-56 border border-dashed border-slate-300 p-3 bg-slate-50 text-center text-[11px] text-slate-500">
            <p className="font-semibold text-slate-700 mb-1">Recibido por la Empresa:</p>
            <div className="h-6"></div>
            <div className="border-b border-slate-300 mx-4 mb-1"></div>
            <p className="text-[10px]">Firma / Sello de RRHH y Fecha</p>
          </div>
        </div>
      </div>
    </div>
  );
};
