import React from 'react';
import { CertificadoLaboralData, DocumentStyleConfig } from '../../types/documents';

interface Props {
  data: CertificadoLaboralData;
  styleConfig: DocumentStyleConfig;
}

export const CertificadoLaboralTemplate: React.FC<Props> = ({ data, styleConfig }) => {
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
          <p>{data.ciudad || 'Ciudad'}, {data.fecha || 'Fecha'}</p>
        </div>

        {/* Destinatario */}
        <div className="space-y-1 text-xs md:text-sm">
          <p className="font-semibold text-slate-900">Señores:</p>
          <p className="font-bold text-slate-950 uppercase text-sm md:text-base">
            {data.nombreEmpresa || 'NOMBRE DE LA EMPRESA / EMPLEADOR'}
          </p>
          <p className="text-slate-700">Atención: {data.destinatarioArea || 'Departamento de Talento Humano'}</p>
          <p className="text-slate-600">{data.ciudad || 'Presente'}</p>
        </div>

        {/* Asunto */}
        <div className="border-b-2 border-slate-900 pb-2">
          <p className="font-bold text-slate-950 text-xs md:text-sm uppercase">
            ASUNTO:{' '}
            <span className="font-semibold normal-case text-slate-900">
              Solicitud formal de expedición de Certificado Laboral (Art. 57, numeral 7° del Código Sustantivo del Trabajo)
            </span>
          </p>
        </div>

        {/* Saludo formal */}
        <p className="text-slate-800">Respetados señores:</p>

        {/* Cuerpo */}
        <div className="space-y-4 text-justify text-slate-800">
          <p>
            Por medio de la presente comunicación, yo, <strong>{data.nombreTrabajador || '[NOMBRE DEL TRABAJADOR]'}</strong>,
            mayor de edad, identificado(a) con <strong>{data.tipoDocumento} N° {data.numeroDocumento || '____________'}</strong>,
            en mi condición de trabajador(a) / ex-trabajador(a) de esta empresa, acudo de manera respetuosa con el fin de solicitar
            la expedición de un <strong>Certificado Laboral</strong> formal.
          </p>

          <p>
            De conformidad con el artículo 57, numeral 7° del Código Sustantivo del Trabajo, el empleador está en la obligación de
            expedir a solicitud del trabajador la certificación laboral en la que conste el tiempo de servicio, la índole de la labor y
            el salario devengado.
          </p>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs md:text-sm">
            <p className="font-bold text-slate-900 uppercase text-xs">Especificaciones requeridas para el certificado:</p>
            <ul className="list-disc list-outside ml-5 space-y-1 text-slate-700">
              <li><strong>Cargo desempeñado:</strong> {data.cargoDesempenado || 'El correspondiente en el contrato'}</li>
              <li><strong>Período laborado:</strong> {data.periodoTrabajado || 'Indicar fecha de ingreso y retiro o si continúa vigente'}</li>
              {data.incluirSalario && <li><strong>Asignación salarial:</strong> Incluir el salario mensual devengado y tipo de salario</li>}
              {data.incluirFunciones && <li><strong>Funciones principales:</strong> Relacionar brevemente las responsabilidades del cargo</li>}
            </ul>
          </div>

          <p>
            La presente solicitud obedece a razones de: <strong>{data.motivoSolicitud || 'Trámites personales / bancarios'}</strong>.
          </p>

          {data.correoEntrega && (
            <p>
              Agradezco remitir el certificado debidamente firmado y membretado al correo electrónico:{' '}
              <strong className="text-blue-900 font-mono">{data.correoEntrega}</strong>.
            </p>
          )}
        </div>
      </div>

      {/* Firma */}
      <div className="pt-10 mt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-8">Atentamente,</p>
        <div className="w-72">
          <div className="border-b-2 border-slate-900 mb-2 h-10"></div>
          <p className="font-bold text-slate-950 uppercase text-sm">
            {data.nombreTrabajador || 'NOMBRE DEL TRABAJADOR'}
          </p>
          <p className="text-xs text-slate-700">
            {data.tipoDocumento}: <span className="font-mono">{data.numeroDocumento || '________________'}</span>
          </p>
          {data.correoEntrega && (
            <p className="text-xs text-slate-600">Email: {data.correoEntrega}</p>
          )}
        </div>
      </div>
    </div>
  );
};
